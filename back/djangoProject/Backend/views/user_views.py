import json

# from django.contrib.gis.gdal.libgdal import function
# from django.shortcuts import render
# from django.db import connection
# from Backend.users import users
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from Backend.serializers import UserSerializer,UserSerializerWithToken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.shortcuts import redirect
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from Backend import database


# class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
#     def validate(self, attrs):
#         data = super.validate(attrs)
#         serializer = UserSerializerWithToken(self.user).data
#         for k, v in serializer.items():
#             data[k] = v
#         return data


# class MyTokenObtainPairView(TokenObtainPairView):
#     serializer_class = MyTokenObtainPairSerializer


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
        request.session["user_type"] = db_user_info[0]
        return Response({
            "status": "success"
        })


@api_view(['POST'])
def logoutUser(request):
    if request.session.has_key("user_id"):
        del request.session["user_id"]
    if request.session.has_key("user_type"):
        del request.session["user_type"]
    return Response({ "status": "success" })


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
    user_id = database.register(
        request_dict.get('email'),
        request_dict.get('password'),
        request_dict.get('usertype')
    )
    if user_id == "Fail":
        return Response({
            "status": "failure",
            "message": "Cannot create user - email may have been used"
        })

    # For players...
    if user_type == "player":
        # Create PerInfo
        per_info_save_status = database.addPerInf(
            user_id,
            request_dict.get('surname'),
            request_dict.get('givenName'),
            request_dict.get('birthday'),
            request_dict.get('ethicBackground'),
            request_dict.get('mobile'),
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
        base_info_save_status = database.addBaseInf(
            user_id,
            request_dict.get('medicalHistory'),
            request_dict.get('medicalHistoryInput'),
            request_dict.get('medicineTaken'),
            request_dict.get('medicineTakenInput'),
            request_dict.get('injuryHistory'),
            request_dict.get('injuryHistoryInput'),
            request_dict.get('surgery'),
            request_dict.get('surgeryYear'),
            request_dict.get('concussionQuestions'),
            request_dict.get('describe'),
        )
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




@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user,many=False)
    return Response(status=status.HTTP_501_NOT_IMPLEMENTED)

@api_view(['POST'])
def deleteUser(requset,pk):
    return Response(status=status.HTTP_501_NOT_IMPLEMENTED)