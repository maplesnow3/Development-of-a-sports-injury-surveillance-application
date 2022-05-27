import json
import random

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

            response = HttpResponse(json.dumps({
                "status": "success",
                "user_id": int(db_user_info[0]),
                "user_type": db_user_info[3]
            }))
            # Set cookie disabled
            # response.set_cookie("user_id", value=request.session["user_id"], max_age=1209600)
            # response.set_cookie("user_type", value=request.session["user_type"], max_age=1209600)
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
    # Set cookie disabled
    # response.delete_cookie("user_id")
    # response.delete_cookie("user_type")
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

        # # Login the user after reg - DISABLED
        # request.session["user_id"] = user_id
        # request.session["user_type"] = user_type
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
                    "message": "Is the old password correct?"
                })
            elif result == "Success":
                return Response({
                    "status": "success"
                })
            else:
                return Response({
                    "status": "failure",
                    "message": "Unidentified error"
                })

    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })


@api_view(['POST'])
def resetUserPassword(request):
    """
    ADMIN FUNC - unfinished TODO
    """
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

    # Access check - admin only
    user_type = request.session["user_type"]
    if user_type != "admin":
        return Response({
            "status": "failure",
            "message": "API not available for the user"
        })

    try:
        request_data = request.body
        request_dict = json.loads(request_data.decode('utf-8'))

        target_account = request_dict.get('account')
        if target_account == None or target_account == "":
            return Response({
                "status": "failure",
                "message": "Account is not given"
            })

        try:
            # Generate a new temp password
            new_pw_plaintext = "".join(random.sample("0123456789abcdefghijklmnopqrstuvwxyz",10))
            # TODO: Hash before save
            new_pw_saved = new_pw_plaintext
            # TODO: Mock result - INSERT DB METHOD
            result = "Success" #database.setPwTo(target_account, new_pw_saved)
        except Exception as e:
            print(e)
        finally:
            if result == "Fail":
                return Response({
                    "status": "failure",
                    "message": "Modification failed"
                })
            elif result == "Success":
                return Response({
                    "status": "success",
                    "new_password": new_pw_plaintext
                })
            else:
                return Response({
                    "status": "failure",
                    "message": "Unidentified error"
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

        # Convert input data
        if info_user_id_in == "-1":
            # -1 for "self"
            info_user_id = user_id
        else:
            info_user_id = info_user_id_in

        # Check access limit and set proper checked user id
        if user_type == "admin":
            pass
        elif (user_type == "player" or user_type == "coach") and info_user_id == user_id:
            pass
        elif user_type == "coach" and database.coachIsManagingPlayer(user_id, info_user_id):
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

        # Convert input data
        if baseline_user_id_in == "-1":
            # -1 for "self"
            baseline_user_id = user_id
        else:
            baseline_user_id = baseline_user_id_in

        # Check access limit and set proper checked user id
        if user_type == "admin":
            pass
        elif user_type == "player" and baseline_user_id == user_id:
            pass
        elif user_type == "coach" and database.coachIsManagingPlayer(user_id, baseline_user_id):
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


@api_view(['GET'])
def getAccessCodeByUserId(request, code_user_id_in):
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

        # Convert input data
        if code_user_id_in == "-1":
            # -1 for "self"
            code_user_id = user_id
        else:
            code_user_id = code_user_id_in

        # Check access limit and set proper checked user id
        if user_type == "admin":
            pass
        elif user_type == "player" and code_user_id == user_id:
            pass
        # DISABLED: coach should not be able to view the code
        # elif user_type == "coach" and database.coachIsManagingPlayer(user_id, code_user_id):
        #     pass
        else:
            return Response({
                "status": "failure",
                "message": "Code unavailable"
            })

        code = database.viewAthcode(code_user_id)
        if code == None:
            # should never happend in ordinary situations
            return Response({
                "status": "failure",
                "message": "Code does not exist"
            })
        else:
            return Response({
                "status": "success",
                "code": code[1]
            })
    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })


@api_view(['POST'])
def setAccessCodeForSelf(request):
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
        # Check usertype limit
        user_id = request.session["user_id"]
        user_type = request.session["user_type"]
        if user_type != "player":
            return Response({
                "status": "failure",
                "message": "API not available for the user"
            })

        request_data = request.body
        request_dict = json.loads(request_data.decode('utf-8'))

        # Request sanity check
        new_code = request_dict.get('code')
        if new_code == None:
            return Response({
                "status": "failure",
                "message": "New code is not given"
            })

        update_result = database.updateAthcode(user_id, new_code)
        if update_result == "Success":
            return Response({
                "status": "success"
            })
        else:
            return Response({
                "status": "failure",
                "message": "Failed to edit code - please try later"
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
