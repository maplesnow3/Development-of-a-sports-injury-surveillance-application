
import json

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from Backend import database


@api_view(['POST'])
def setNewTeam(request):
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
        user_id = request.session["user_id"]
        user_type = request.session["user_type"]
        if user_type == "player" or user_type == "admin":
            return Response({
                "status": "failure",
                "message": "Function not allowed"
            })
        elif user_type == "coach":
            pass
        else:
            return Response({
                "status": "failure",
                "message": "Undefined user type"
            })

        new_team_name = request_dict.get('name')
        if new_team_name == None or new_team_name == "":
            return Response({
                "status": "failure",
                "message": "Empty team name"
            })

        result = "Fail"
        try:
            result = database.createTeam(user_id, new_team_name)
        except Exception as e:
            print(e)
        finally:
            if result == "Fail":
                return Response({
                    "status": "failure",
                    "message": "Cannot create team - please try again later"
                })

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
def removeTeam(request):
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
        user_id = request.session["user_id"]
        user_type = request.session["user_type"]
        if user_type == "player" or user_type == "admin":
            return Response({
                "status": "failure",
                "message": "Function not allowed"
            })
        elif user_type == "coach":
            pass
        else:
            return Response({
                "status": "failure",
                "message": "Undefined user type"
            })

        removed_team_id = request_dict.get('team_id')
        if removed_team_id == None or removed_team_id == "":
            return Response({
                "status": "failure",
                "message": "Empty team name"
            })

        result = "Fail"
        try:
            result = database.removeTeam(user_id, removed_team_id)
        except Exception as e:
            print(e)
        finally:
            if result == "Fail":
                return Response({
                    "status": "failure",
                    "message": "Cannot remove team - please try again later"
                })

        return Response({
            "status": "success"
        })

    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })


@api_view(['GET'])
def getAllTeams(request):
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
    if user_type == "player" or user_type == "admin":
        return Response({
            "status": "failure",
            "message": "Function not allowed"
        })
    elif user_type == "coach":
        pass
    else:
        return Response({
            "status": "failure",
            "message": "Undefined user type"
        })

    # Get team list
    try:
        result = "Fail"
        try:
            result = database.viewTeam(user_id)
        except Exception as e:
            print(e)
        finally:
            if result == "Fail" or result == None:
                return Response({
                    "status": "failure",
                    "message": "Cannot find team list"
                })
            else:
                return Response({
                    "status": "success",
                    "team_list": result
                })

    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })