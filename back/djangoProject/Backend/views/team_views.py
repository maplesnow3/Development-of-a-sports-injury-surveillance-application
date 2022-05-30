
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
            if result == "Fail":
                return Response({
                    "status": "failure",
                    "message": "Cannot find team list"
                })
            elif result == None:
                return Response({
                    "status": "success",
                    "team_list": []
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


@api_view(['GET'])
def getTeamMembers(request, team_id_in):
    """
    Get all members of specified team
    """
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
    # Check whether coach is managing team `team_id`
    if database.coachIsManagingTeam(team_id_in, user_id):
        pass
    else:
        return Response({
            "status": "failure",
            "message": "Team member list unavailable"
        })
    # Get team member list
    try:
        result = "Fail"
        try:
            result = database.viewTeamMember(team_id_in)
        except Exception as e:
            print(e)
        finally:
            if result == "Fail":
                return Response({
                    "status": "failure",
                    "message": "Cannot find team member list"
                })
            elif result == None:
                return Response({
                    "status": "success",
                    "team_members": []
                })
            else:
                return Response({
                    "status": "success",
                    "team_members": result
                })

    except Exception as e:
        print(e)
        return Response({
            "status": "failure",
            "message": "Invalid request / undefined issue"
        })


@api_view(['POST'])
def addTeamMembers(request):
    """
    add members into specified team

    INPUT JSON:
    {
        "team_id": 12
        "add_members": [
            {
                "user_id": 123,
                "access_code": "AcCeSsCoDe"
            },
            {...}
        ]
    }
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

        team_id_in = request_dict.get('team_id')
        add_members = request_dict.get('add_members')
        if team_id_in is None or team_id_in == "":
            return Response({
                "status": "failure",
                "message": "Empty team id"
            })
        # Check whether coach is managing team `team_id`
        if database.coachIsManagingTeam(team_id_in, user_id):
            pass
        else:
            return Response({
                "status": "failure",
                "message": "Function not allowed"
            })
        result = "Fail"
        fails=0
        try:
            fail_members=[]
            for member in add_members:
                result = database.addTeamMember(team_id_in, member.get('user_id'), member.get('access_code'))
                if result != "Success":
                    fail_members.append(member)
                    fails=fails+1

        except Exception as e:
            print(e)
        finally:
            if fails > 0:
                return Response({
                    "status": "failure",
                    "message": "Not all members are added",
                    "failed_members": fail_members
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
def removeTeamMembers(request):
    """
    add members into specified team

    INPUT JSON:
    {
        "team_id": 12
        "remove_members": [
            { "user_id": 123 },
            {...}
        ]
    }
    **Always return something**
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

        team_id_in = request_dict.get('team_id')
        remove_members = request_dict.get('remove_members')
        if team_id_in is None or team_id_in == "":
            return Response({
                "status": "failure",
                "message": "Empty team id"
            })
        # Check whether coach is managing team `team_id`
        if database.coachIsManagingTeam(team_id_in, user_id):
            pass
        else:
            return Response({
                "status": "failure",
                "message": "Function not allowed"
            })
        removeList=[]
        for member in remove_members:
            removeList.append(member.get('user_id'))
        result = "Fail"
        try:
            result = database.removeTeamMember(removeList)
        except Exception as e:
            print(e)
        finally:
            if result == "Fail":
                return Response({
                    "status": "failure",
                    "message": "Is every member selected exists?"
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
def getAllPlayers(request):
    """
    ADMIN FUNC
    """
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

    # Access check - admin only
    user_type = request.session["user_type"]
    if user_type != "admin":
        return Response({
            "status": "failure",
            "message": "API not available for the user"
        })

    result = "Fail"
    try:
        result = database.getAllAth()
    except Exception as e:
        print(e)
    finally:
        print(result)
        if result == "Fail":
            return Response({
                "status": "failure",
                "message": "query failed"
            })
        elif result == None:
            return Response({
                "status": "success",
                "players": []
            })
        else:
            return Response({
                "status": "success",
                "players": result
            })
