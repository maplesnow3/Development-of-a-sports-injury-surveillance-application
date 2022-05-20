import json

from django.http import HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# from django.shortcuts import redirect

from Backend import database

@api_view(['POST'])
def loginUser(request):
    if request.method != 'POST':
        return Response({
            "status": "failure",
            "message": "Receives POST only"
        })

    if request.session.has_key("user_id") or request.session.has_key("user_type"):
        return Response({
            "status": "failure",
            "message": "Already logged in"
        })

    try:
        request_data = request.body
        request_dict = json.loads(request_data.decode('utf-8'))
        account = request_dict.get('account')
        password = request_dict.get('password')
        db_user_info = database.login(account, password)
        if db_user_info == None:
            return Response({
                "status": "failure",
                "message": "Invalid username/password"
            })
        else:
            request.session["user_id"] = db_user_info[0]
            request.session["user_type"] = db_user_info[3]

            response = HttpResponse(json.dumps({ "status": "success" }))
            response.set_cookie("user_id", value=request.session["user_id"], max_age=1209600)
            response.set_cookie("user_type", value=request.session["user_type"], max_age=1209600)
            return response
    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })

@api_view(['POST'])
def logoutUser(request):
    if request.session.has_key("user_id"):
        del request.session["user_id"]
    if request.session.has_key("user_type"):
        del request.session["user_type"]

    response = HttpResponse(json.dumps({ "status": "success" }))
    response.delete_cookie("user_id")
    response.delete_cookie("user_type")
    return response


@api_view(['POST'])
def registerUser(request):
    if request.method != 'POST':
        return Response({
            "status": "failure",
            "message": "Receives POST only"
        })

    if request.session.has_key("user_id") or request.session.has_key("user_type"):
        return Response({
            "status": "failure",
            "message": "Already logged in"
        })

    try:
        request_data = request.body
        request_dict = json.loads(request_data.decode('utf-8'))

        # Check usertype limit
        user_type = request_dict.get('usertype')
        if user_type != "player" and user_type != "coach":
            return Response({
                "status": "failure",
                "message": "Cannot create user - invalid user type"
            })

        # Create user
        user_id = "Fail"
        try:
            user_id = database.register(
                request_dict.get('email'),
                request_dict.get('password'),
                request_dict.get('usertype')
            )
        except Exception as e:
            print(e)
        finally:
            if user_id == "Fail":
                return Response({
                    "status": "failure",
                    "message": "Cannot create user - email may have been used"
                })

        # For players...
        if user_type == "player":
            # Create PerInfo
            per_info_save_status = "Fail"

            per_info_save_status = database.addPerInf(
                user_id,
                request_dict.get('surname'),
                request_dict.get('givenName'),
                request_dict.get('birthday'),
                request_dict.get('ethicBackground'),
                request_dict.get('phone'),
                request_dict.get('address'),
                request_dict.get('country')
            )

            if per_info_save_status == "Fail":
                # Remove created user to keep atomicity
                database.unregister(user_id)

                return Response({
                    "status": "failure",
                    "message": "User not created - invalid personal info"
                })

            # Create BaseInfo
            base_info_save_status = "Fail"
            try:
                base_info_save_status = database.addBaseInf(
                    user_id,
                    request_dict.get('medicalHistory'),
                    request_dict.get('medicalHistoryInput'),
                    request_dict.get('medicineTaken'),
                    request_dict.get('medicineTakenInput'),
                    request_dict.get('injuryHistory'),
                    request_dict.get('injuryHistoryInput'),
                    request_dict.get('surgery'),
                    [],  # surgeryYear Ignored for frontend requirement
                    request_dict.get('concussionQuestions'),
                    request_dict.get('describe'),
                )
            except Exception as e:
                print(e)
            finally:
                if base_info_save_status == "Fail":
                    # Remove created user and personal info for atomicity
                    database.removeBaseInf(user_id)
                    database.unregister(user_id)

                    return Response({
                        "status": "failure",
                        "message": "User not created - invalid baseline info"
                    })

        # Login the user after reg
        request.session["user_id"] = user_id
        request.session["user_type"] = user_type
        return Response({
            "status": "success"
        })
    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })


@api_view(['POST'])
def changeUserSelfPassword(request):
    if request.method != 'POST':
        return Response({
            "status": "failure",
            "message": "Receives POST only"
        })

    if not request.session.has_key("user_id"):
        return Response({
            "status": "failure",
            "message": "Not logged in"
        })

    try:
        request_data = request.body
        request_dict = json.loads(request_data.decode('utf-8'))

        old_password = request_dict.get('old_pw')
        new_password = request_dict.get('new_pw')

        if old_password == "" or new_password == "":
            return Response({
                "status": "failure",
                "message": "Invalid old/new password"
            })
        elif old_password == new_password:
            return Response({
                "status": "failure",
                "message": "New password cannot be the same as the old one"
            })

        user_id = request.session["user_id"]
        try:
            result = database.changePw(
                user_id,
                old_password,
                new_password
            )
        except Exception as e:
            print(e)
        finally:
            if result == "Fail":
                return Response({
                    "status": "failure",
                    "message": "Failed to change - is the old password correct?"
                })
            elif result == "Success":
                return Response({
                    "status": "success"
                })
            else:
                return Response({
                    "status": "failure",
                    "message": "Failed to change - unidentified error"
                })

    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })


@api_view(['GET'])
def getPersonalInfoByUserId(request, info_user_id_in):
    if request.method != 'GET':
        return Response({
            "status": "failure",
            "message": "Receives GET only"
        })

    if not request.session.has_key("user_id"):
        return Response({
            "status": "failure",
            "message": "Not logged in"
        })

    try:
        # Check usertype limit
        user_id = request.session["user_id"]
        user_type = request.session["user_type"]
        if user_type != "player" and user_type != "coach" and user_type != "admin":
            return Response({
                "status": "failure",
                "message": "Undefined user type"
            })

        # Convert input datatype
        if info_user_id_in == "-1":
            # -1 for "self"
            info_user_id = user_id
        else:
            info_user_id = int(info_user_id_in)

        # Check access limit and set proper checked user id
        if user_type == "admin":
            pass
        elif (user_type == "player" or user_type == "coach") and info_user_id == user_id:
            pass
        elif user_type == "coach" and database.coachIsManagingPlayer(coach_user_id, player_user_id):
            pass
        else:
            return Response({
                "status": "failure",
                "message": "Personal info unavailable"
            })

        # Get baseline
        info_data = database.viewPerInf(info_user_id)
        if info_data == None:
            return Response({
                "status": "failure",
                "message": "Personal info does not exist"
            })
        elif info_data == "Fail":
            return Response({
                "status": "failure",
                "message": "Cannot get personal info"
            })
        else:
            info_data_res = {
                "surname": info_data[0],
                "givenName": info_data[1],
                "birthday": info_data[2],
                "ethicBackground": info_data[6],
                "phone": info_data[5],
                "address": info_data[3],
                "country": info_data[7],
            }

            return Response({
                "status": "success",
                "personal_info": info_data_res
            })
    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })


@api_view(['POST'])
def setPersonalInfoForSelf(request):
    if request.method != 'POST':
        return Response({
            "status": "failure",
            "message": "Receives POST only"
        })

    if not request.session.has_key("user_id"):
        return Response({
            "status": "failure",
            "message": "Not logged in"
        })

    try:
        request_data = request.body
        request_dict = json.loads(request_data.decode('utf-8'))

        # Request is completed?
        new_address = request_dict.get('address')
        new_phone = request_dict.get('phone')
        if new_address == None or new_phone == None:
            return Response({
                "status": "failure",
                "message": "Infomations is not completed"
            })

        user_id = request.session["user_id"]
        update_result = database.updatePerInf(user_id, new_address, new_phone)
        if update_result == "Success":
            return Response({
                "status": "success"
            })
        else:
            return Response({
                "status": "failure",
                "message": "Failed to edit personal information - please try later"
            })
    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })


@api_view(['GET'])
def getBaselineByUserId(request, baseline_user_id_in):
    if request.method != 'GET':
        return Response({
            "status": "failure",
            "message": "Receives GET only"
        })

    if not request.session.has_key("user_id"):
        return Response({
            "status": "failure",
            "message": "Not logged in"
        })

    try:
        # Check usertype limit
        user_id = request.session["user_id"]
        user_type = request.session["user_type"]
        if user_type != "player" and user_type != "coach" and user_type != "admin":
            return Response({
                "status": "failure",
                "message": "Undefined user type"
            })

        # Convert input datatype
        if baseline_user_id_in == "-1":
            # -1 for "self"
            baseline_user_id = user_id
        else:
            baseline_user_id = int(baseline_user_id_in)

        # Check access limit and set proper checked user id
        if user_type == "admin":
            pass
        elif user_type == "player" and baseline_user_id == user_id:
            pass
        elif user_type == "coach" and database.coachIsManagingPlayer(coach_user_id, player_user_id):
            pass
        else:
            return Response({
                "status": "failure",
                "message": "Baseline unavailable"
            })

        # Get baseline
        baseline_data = database.viewBaseInf(baseline_user_id)
        if baseline_data == None:
            return Response({
                "status": "failure",
                "message": "Baseline does not exist"
            })
        else:
            baseline_data_res = {
                "medicalHistory": baseline_data[0],
                "medicalHistoryInput": baseline_data[1],
                "medicineTaken": baseline_data[2],
                "medicineTakenInput": baseline_data[3],
                "injuryHistory": baseline_data[4],
                "injuryHistoryInput": baseline_data[5],
                "surgery": baseline_data[6],
                "concussionQuestions": baseline_data[8],
                "describe": baseline_data[9]
            }

            return Response({
                "status": "success",
                "baseline": baseline_data_res
            })
    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })


# @api_view(['GET'])
# def getUserById(request, pk):
#     # user = User.objects.get(id=pk)
#     # serializer = UserSerializer(user,many=False)
#     return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

# @api_view(['POST'])
# def deleteUser(requset,pk):
#     return Response(status=status.HTTP_501_NOT_IMPLEMENTED)
