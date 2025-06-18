from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from rest_framework import request
from django.contrib.auth import authenticate
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, parser_classes
from django.contrib import auth
from .models import UserProfile
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from  django.contrib.auth import get_user_model
User = get_user_model()


@api_view(['GET', 'POST'])
def userprofile(request):
    if request.method == 'GET':
        profiles = UserProfile.objects.all()
        serializer = UserProfileSerializer(profiles, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print("Serializer Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@parser_classes([MultiPartParser, FormParser])
def update_profile(request, pk):
    try:
        profile = UserProfile.objects.get(pk=pk)
    except UserProfile.DoesNotExist:
        return Response({'error': 'Profile not found'}, status=404)

    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def register_view(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'error': 'All fields required'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'User registered'}, status=201)

#----------------------------------------Project-----------------------------------------
# views.py
@api_view(['GET', 'POST', 'DELETE'])
def education_list_create(request):
    if request.method == 'GET':
        educations = Education.objects.all()
        serializer = EducationSerializer(educations, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = EducationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        id = request.data.get("id")
        education = Education.objects.filter(id=id)
        if education.exists():
            education.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
def experience_list_create(request):
    if request.method == 'GET':
        experiences = Experience.objects.all()
        serializer = ExperienceSerializer(experiences, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ExperienceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def project_list_create(request):
    if request.method == 'GET':
        projects = Project.objects.all()
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    




@api_view(['POST'])
def register_user(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    password2 = request.data.get("password2")

    if not all([username, email, password, password2]):
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    if password != password2:
        return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username=username, email=email, password=password)
        refresh = RefreshToken.for_user(user)
        return Response({
            "message": "User registered successfully.",
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "username": user.username,
        }, status=status.HTTP_201_CREATED)

    except IntegrityError:
        return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)




# @api_view(['POST'])
# def login(request):
#     username = request.data.get('username')
#     password = request.data.get('password')

#     user = auth.authenticate(username=username, password=password)

#     if user is not None:
#         auth.login(request, user)
#         return Response({'message': 'Login successful', 'username': username}, status=status.HTTP_200_OK)
#     else:
#         return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


# @api_view(['POST'])
# def register(request):
#     username = request.data.get('username')
#     email = request.data.get('email')
#     password = request.data.get('password')
#     password2 = request.data.get('password2')

#     if password != password2:
#         return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

#     if User.objects.filter(email=email).exists():
#         return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

#     if User.objects.filter(username=username).exists():
#         return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

#     user = User.objects.create_user(username=username, email=email, password=password)
#     user.save()

#     # Optional login after registration
#     user_login = auth.authenticate(username=username, password=password)
#     auth.login(request, user_login)

#     # Correct profile field
#     new_profile = UserProfile.objects.create(profile=user, id_user=user.id)
#     new_profile.save()

#     return Response({'message': 'User registered successfully', 'username': username}, status=status.HTTP_201_CREATED)

# @login_required(login_url='login')
# def features(request):
#     return render(request,'features.html')


# @login_required(login_url='login')
# def contact(request):
#     return render(request,'contact.html')


# @login_required(login_url='login')
# def about(request):
#     return render(request, 'about.html')



# @login_required(login_url='login')
# def logout(request):
#     auth.logout(request)
#     return redirect('login')