
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


@api_view(['GET'])
def getTeamMembers(request, team_id_in):
    """
    Get all members of specified team

    INPUT:
    - `team_id_in` (str, from function param)

    OUTPUT (SUCCESS):
    ```
    {
        "status": "success",
        "team_members": [
            {
                "user_id": 123,
                "name": "First Last"
            },
            {...}
        ]
    }
    ```

    OUTPUT (FAILURE):
    ```
    {"status": "failure", "message": "Failure reason message"}
    ```

    **Always return something**
    """
    if request.method != 'GET':
        return Response({
            "status": "failure",
            "message": "Receives GET only"
        })

    # TODO
    # Check:
    # 1. Requested by "coach"
    # 2. Coach is managing team `team_id`

    # Fake data for testing without functional backend
    return Response({
        "status": "success",
        "team_members": [
            {
                "user_id": 121,
                "name": "Test name 1"
            },
            {
                "user_id": 122,
                "name": "Test name 2"
            },
            {
                "user_id": 123,
                "name": "Test name 3"
            },
            {
                "user_id": 124,
                "name": "Test name 4"
            },
            {
                "user_id": 123,
                "name": "Test name 5"
            },
            {
                "user_id": 126,
                "name": "Test name 6"
            },
            {
                "user_id": 127,
                "name": "Test name 7"
            },
            {
                "user_id": 128,
                "name": "Test name 8"
            }
        ]
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

    OUTPUT (SUCCESS):
    ```
    {"status": "success"}
    ```

    OUTPUT (Some members are not added):
    ```
    {
        "status": "failure",
        "message": "Not all members are added",
        "failed_members": [
            {
                "user_id": 123,
                "access_code": "AcCeSsCoDe"
            },
            {...}
        ]
    }
    ```

    OUTPUT (Other FAILURE):
    ```
    {"status": "failure", "message": "Failure reason message"}
    ```

    **Always return something**
    """

    if request.method != 'POST':
        return Response({
            "status": "failure",
            "message": "Receives POST only"
        })

    # TODO
    # Check:
    # 1. Requested by "coach"
    # 2. Coach is managing team `team_id`

    return Response({
        "status": "failure",
        "message": "API TODO addTeamMembers"
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

    OUTPUT (SUCCESS):
    ```
    {"status": "success"}
    ```

    OUTPUT (Some members are not removed):
    ```
    {
        "status": "failure",
        "message": "Not all members are removed",
        "failed_members": [
            { "user_id": 123 },
            {...}
        ]
    }
    ```

    OUTPUT (Other FAILURE):
    ```
    {"status": "failure", "message": "Failure reason message"}
    ```

    **Always return something**
    """
    if request.method != 'POST':
        return Response({
            "status": "failure",
            "message": "Receives POST only"
        })

    # TODO
    # Check:
    # 1. Requested by "coach"
    # 2. Coach is managing team `team_id`

    return Response({
        "status": "failure",
        "message": "API TODO removeTeamMembers"
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

    # Fake data for testing without functional backend
    return Response({
        "status": "success",
        "players": [
            {
                "user_id": 11,
                "name": "Test user 11"
            },
            {
                "user_id": 121,
                "name": "Test name 1"
            },
            {
                "user_id": 122,
                "name": "Test name 2"
            },
            {
                "user_id": 123,
                "name": "Test name 3"
            },
            {
                "user_id": 124,
                "name": "Test name 4"
            },
            {
                "user_id": 123,
                "name": "Test name 5"
            },
            {
                "user_id": 126,
                "name": "Test name 6"
            },
            {
                "user_id": 127,
                "name": "Test name 7"
            },
            {
                "user_id": 128,
                "name": "Test name 8"
            }
        ]
    })
