from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status,permissions
from rest_framework import request
from django.contrib.auth import authenticate,login
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view, parser_classes
from django.contrib import auth
from django.shortcuts import get_object_or_404
from .models import UserProfile
from django.db import IntegrityError
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import *
from  django.contrib.auth import get_user_model,logout
User = get_user_model()
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from .models import UserProfile
from .serializers import UserProfileSerializer
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from .serializers import *
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def get_csrf_token(request):
    return JsonResponse({'message': 'CSRF cookie set'})

#Myprofile Section-------------------------------------
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def my_profile_view(request):
    try:
        profile = UserProfile.objects.get(user=request.user)
    except UserProfile.DoesNotExist:
        return Response({"detail": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    elif request.method == 'PUT':
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = UserProfileSerializer(profile, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#education Section---------------------------------------
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def education_list_create(request):
    #print(">> Incoming Data POST:", request.data)
    if request.method == 'GET':
        educations = Education.objects.filter(profile=request.user.profile)
        serializer = EducationSerializer(educations, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data.copy()

        # Validate year format (optional if already validated in model)
        year_range = data.get('year')
        if not (isinstance(year_range, str) and '-' in year_range):
            return Response(
                {"year": ["This field is required and must be in format YYYY-YYYY."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Assign current user's profile ID
        data['profile'] = request.user.profile.id

        serializer = EducationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['DELETE'])
@permission_classes([permissions.IsAuthenticated])
def delete_education(request):
    edu_id = request.data.get("id")
    if not edu_id:
        return Response({"error": "ID is required"}, status=status.HTTP_400_BAD_REQUEST)
    try:
        education = Education.objects.get(id=edu_id, profile=request.user.profile)
        education.delete()
        return Response({"message": "Deleted"}, status=status.HTTP_204_NO_CONTENT)
    except Education.DoesNotExist:
        return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)
    
#Experience Section---------------------------------
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def experience_list_create(request):
    if request.method == 'POST':
        profile = get_object_or_404(UserProfile, user=request.user)
        data = request.data.copy()
        data['profile'] = profile.id  # add profile id to data

        serializer = ExperienceSerializer(data=data)
        if serializer.is_valid():
            serializer.save(profile=profile)  # explicitly pass profile
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    elif request.method == 'GET':
        profile = get_object_or_404(UserProfile, user=request.user)
        experiences = Experience.objects.filter(profile=profile)
        serializer = ExperienceSerializer(experiences, many=True)
        return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_experience(request):
    exp_id = request.data.get('id')

    if not exp_id:
        return Response({'error': 'ID is required'}, status=400)

    profile = get_object_or_404(UserProfile, user=request.user)
    experience = get_object_or_404(Experience, id=exp_id, profile=profile)

    experience.delete()
    return Response({'message': 'Experience deleted successfully'})

#Project Section-----------------------------------------------------------
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def project_list_create(request):
    if request.method == 'GET':
        projects = Project.objects.filter(profile=request.user.profile)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        data = request.data.copy()
        data['profile'] = request.user.profile.id  # Use profile like Education
        serializer = ProjectSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_project(request):
    project_id = request.data.get('id')
    if not project_id:
        return Response({"error": "ID is required"}, status=400)
    try:
        project = Project.objects.get(id=project_id, profile=request.user.profile)
        project.delete()
        return Response({"message": "Deleted successfully"}, status=204)
    except Project.DoesNotExist:
        return Response({"error": "Project not found"}, status=404)

#Skills Section--------------------------------------------

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def skills_list_create(request):
    if request.method == 'GET':
        skills = Skills.objects.filter(profile__user=request.user)
        serializer = SkillsSerializer(skills, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = SkillsSerializer(data=request.data)
        if serializer.is_valid():
            profile = request.user.profile  # Adjust this if profile model is related differently
            serializer.save(profile=profile)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_skills(request):
    skill_id = request.data.get("id")
    try:
        skill = Skills.objects.get(id=skill_id, profile=request.user.profile)
        skill.delete()
        return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Skills.DoesNotExist:
        return Response({"error": "Skill not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET', 'POST'])
def myskills_list_create(request):
    if request.method == 'GET':
        # Assuming profile is fetched from authenticated user
        user_profile = get_object_or_404(UserProfile, user=request.user)
        skills = Myskills.objects.filter(profile=user_profile)
        serializer = MyskillsSerializer(skills, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        user_profile = get_object_or_404(UserProfile, user=request.user)
        data = request.data.copy()
        data['profile'] = user_profile.id
        serializer = MyskillsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_myskills(request):
    skill_id = request.data.get("id")
    if not skill_id:
        return Response({"error": "Skill ID is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        skill = Myskills.objects.get(id=skill_id, profile=request.user.profile)
        skill.delete()
        return Response({"message": "Deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
    except Myskills.DoesNotExist:
        return Response({"error": "Skill not found"}, status=status.HTTP_404_NOT_FOUND)

#login Section---------------------------------------
@api_view(['POST'])
def register(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    password2 = request.data.get('password2')

    if not all([username, email, password, password2]):
        return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

    if password != password2:
        return Response({"error": "Passwords do not match."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({"error": "Email already exists."}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    auth.login(request, user)

    # Create profile (optional fields like full_name, bio, etc. can be filled later)
    profile = UserProfile.objects.create(user=user, email=email, full_name=username)

    return Response({
        "message": "Signup successful",
        "user_id": user.id,
        "profile_id": profile.id,
        "username": user.username,
        "email": user.email
    }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def user_login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)  # Django session login
        return Response({
            "message": "Login successful.",
            "username": user.username,
        }, status=status.HTTP_200_OK)
    else:
        return Response({"error": "Invalid username or password."}, status=status.HTTP_401_UNAUTHORIZED)


@csrf_exempt
@require_POST
def user_login(request):
    username = request.POST.get("username")
    password = request.POST.get("password")

    if not username or not password:
        return JsonResponse({"error": "Username and password are required"}, status=400)

    user = authenticate(request, username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({
            "message": "Login successful",
            "username": user.username,
            "email": user.email,
            "user_id": user.id,
        })
    else:
        return JsonResponse({"error": "Invalid credentials"}, status=401)


# @login_required(login_url='login')
# def features(request):
#     return render(request,'features.html')


# @login_required(login_url='login')
# def contact(request):
#     return render(request,'contact.html')


# @login_required(login_url='login')
# def about(request):
#     return render(request, 'about.html')


@csrf_exempt
def logout_view(request):
    if request.method == 'POST':
        logout(request)
        return JsonResponse({'message': 'Logged out successfully'}, status=200)
    return JsonResponse({'error': 'Invalid request'}, status=400)