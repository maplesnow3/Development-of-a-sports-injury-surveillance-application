
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

    request_data = request.body
    request_dict = json.loads(request_data.decode('utf-8'))

    # Check usertype limit
    # Is player and submit for himself
    user_type = request_dict.get('usertype')
    submit_target = request_dict.get('targetId')
    if user_type == "player" and (submit_target != -1 and submit_target != request.session["user_id"]):
        return Response({
            "status": "failure",
            "message": "You can only create new form for yourself"
        })
    elif False: #user_type == "coach" and database.isPlayerUser(submit_target):
        # TODO: Add check for coach
        return Response({
            "status": "failure",
            "message": "Target is not a valid player"
        })

    # Redirect to real self ID if -1 is used
    if submit_target == -1:
        submit_target = request.session["user_id"]

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
                # TODO
                #database.removeInj(created_form_id)
                return Response({
                    "status": "failure",
                    "message": "Cannot create form - invalid Concussion details"
                })

    return Response({
        "status": "success",
        "inj_form_id": created_form_id
    })


@api_view(['GET'])
def injurys(request,pk):
    return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

@api_view(['GET'])
def injuryByTimeID(request,pk):
    return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

@api_view(["POST"])
def newConcussion(request):
    return Response(status=status.HTTP_501_NOT_IMPLEMENTED)
