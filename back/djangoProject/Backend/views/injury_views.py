
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from Backend import database


@api_view(['POST'])
def createNewForm(request):
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

        # Check usertype limit
        # Is player and submit for himself
        user_id = request.session["user_id"]
        user_type = request.session["user_type"]
        submit_target = request_dict.get('targetId')
        if user_type == "player" and (submit_target != -1 and str(submit_target) != user_id):
            return Response({
                "status": "failure",
                "message": "You can only create new form for yourself"
            })
        elif user_type == "coach" and database.coachIsManagingPlayer(user_id, submit_target):
            return Response({
                "status": "failure",
                "message": "Target is not a valid player"
            })
        elif user_type != "player" and user_type != "coach":
            return Response({
                "status": "failure",
                "message": "Undefined user type"
            })

        # Redirect to real self ID if -1 is used
        if submit_target == -1:
            submit_target = user_id

        result, created_form_id, need_concussion_form = "Fail", "Fail", "Fail"
        try:
            result, created_form_id, need_concussion_form = database.addInj(
                submit_target,
                request_dict.get('injuredBodyPart'),
                request_dict.get('injuryOccurrence'),
                request_dict.get('nature_typeOfInjury'),
                request_dict.get('removalFromField'),
                request_dict.get('actionsFollowingInjury'),
                request_dict.get('mechanismOfInjury'),
                request_dict.get('trainingSpecific'),
                request_dict.get('protectiveEquipmentWorn'),
                request_dict.get('contributingFactors'),
                request_dict.get('provisionalInjuryDiagnosis'),
                request_dict.get('injuryPresentation'),
                request_dict.get('initialTreatment'),
                request_dict.get('initialTreatingPerson'),
                request_dict.get('referralTo')
            )
        except Exception as e:
            print(e)
        finally:
            if result == "Fail":
                return Response({
                    "status": "failure",
                    "message": "Cannot create form - please try again later"
                })

        if need_concussion_form == 1:
            try:
                conc_result = database.addConc(
                    created_form_id,
                    request_dict.get('concussionProblems'),
                    request_dict.get('ConcussionSymptom'),
                    request_dict.get('physicalActivity'),
                    request_dict.get('mentalActivity'),
                    request_dict.get('percentOfFeel'),
                    request_dict.get('why')
                )
            except Exception as e:
                print(e)
            finally:
                if conc_result == "Fail":
                    # Remove created injury form for atmoi
                    database.removeInj(created_form_id)
                    return Response({
                        "status": "failure",
                        "message": "Cannot create form - invalid Concussion details"
                    })

        return Response({
            "status": "success",
            "inj_form_id": created_form_id
        })
    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })

@api_view(['GET'])
def getFormById(request, form_id):
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

    # Check usertype limit
    user_id = request.session["user_id"]
    user_type = request.session["user_type"]
    if user_type != "player" and user_type != "coach" and user_type != "admin":
        return Response({
            "status": "failure",
            "message": "Undefined user type"
        })

    # Check access limit
    form_owner_id = database.getOwnerIdByInjFormId(form_id)
    if form_owner_id == None:
        return Response({
            "status": "failure",
            "message": "Invalid form"
        })

    if user_type == "admin":
        pass
    elif user_type == "player" and form_owner_id == user_id:
        pass
    elif user_type == "coach" and database.coachIsManagingPlayer(user_id, form_owner_id):
        pass
    else:
        return Response({
            "status": "failure",
            "message": "Form unavailable"
        })

    # Get form
    form_data = database.viewInj(form_id)
    if form_data == None:
        # Fallback for potential situation - should never reach this part at all
        return Response({
            "status": "failure",
            "message": "Form does not exist"
        })
    else:
        # Convert list to dict for responsing
        form_data_res = {
            "targetId": int(form_owner_id),
            "injuredBodyPart": form_data[0],

            "injuryOccurrence": form_data[1],
            "nature_typeOfInjury": form_data[2],
            "removalFromField": form_data[3],
            "actionsFollowingInjury": form_data[4],
            "mechanismOfInjury": form_data[5],
            "trainingSpecific": form_data[6],
            "protectiveEquipmentWorn": form_data[7],
            "contributingFactors": form_data[8],
            "provisionalInjuryDiagnosis": form_data[9],

            "injuryPresentation": form_data[10],
            "initialTreatment": form_data[11],
            "initialTreatingPerson": form_data[12],
            "referralTo": form_data[13],
        }

        # Check if "Concussion" is specified
        if "Concussion" in form_data_res["nature_typeOfInjury"]:
            conc_form = database.viewConc(form_id)
            if conc_form == None:
                # Append fallback values with a flag
                form_data_res["concussionFormRetrived"] = False
                form_data_res["concussionProblems"] = [0,0,0,0,0,0,0,0,0,0,0]
                form_data_res["ConcussionSymptom"] = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
                form_data_res["physicalActivity"] = False
                form_data_res["mentalActivity"] = False
                form_data_res["percentOfFeel"] = 0
                form_data_res["why"] = "(Concussion form unavailable)"
            else:
                form_data_res["concussionFormRetrived"] = True  # Flag value
                form_data_res["concussionProblems"] = conc_form[0]
                form_data_res["ConcussionSymptom"] = conc_form[1]
                form_data_res["physicalActivity"] = conc_form[2]
                form_data_res["mentalActivity"] = conc_form[3]
                form_data_res["percentOfFeel"] = conc_form[4]
                form_data_res["why"] = conc_form[5]

        return Response({
            "status": "success",
            "report": form_data_res
        })



@api_view(['GET'])
def injuryByTimeID(request,pk):
    return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

@api_view(["POST"])
def newConcussion(request):
    return Response(status=status.HTTP_501_NOT_IMPLEMENTED)
