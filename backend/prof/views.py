from django.shortcuts import render,redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status
from rest_framework import request
from django.contrib.auth import authenticate
from django.contrib import auth
from .models import UserProfile
from .serializers import *
from  django.contrib.auth import get_user_model
User = get_user_model()

@api_view(['GET','POST'])
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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    user = auth.authenticate(username=username, password=password)

    if user is not None:
        auth.login(request, user)
        return Response({'message': 'Login successful', 'username': username}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
def register(request):
    print("🚀 Register view called!")
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')
    password2 = request.data.get('password2')

    if password != password2:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    user.save()

    # Automatically login after registration
    user_login = auth.authenticate(username=username, password=password)
    auth.login(request, user_login)

    # Create profile for user
    new_profile = UserProfile.objects.create(user=user, id_user=user.id)
    new_profile.save()

    return Response({'message': 'User registered successfully', 'username': username}, status=status.HTTP_201_CREATED)




# from django.shortcuts import render,redirect
# from django.contrib.auth.decorators import login_required
# from django.contrib.auth.models import User, auth
# from django.contrib import messages
# from .models import Profile


# # Create your views here.
# @login_required(login_url='login')
# def homepage(request):
#     return render(request,'homepage.html')

# # def login(request):
# #     return render(request,'login.html')

# def login(request):
    
#     if request.method == 'POST':
#         username = request.POST.get('username')
#         password = request.POST.get('password')

#         user = auth.authenticate(username=username, password=password)

#         if user is not None:
#             auth.login(request, user)
#             return redirect('homepage')
#         else:
#             messages.info(request, 'Credentials Invalid')
#             return redirect('login')

#     else:
#         return render(request, 'login.html')



# # def register(request):
# #     return render(request,'register.html')

# def register(request):

#     if request.method == 'POST':
#         username = request.POST.get('username')
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#         password2 = request.POST.get('password2')

#         if password == password2:
#             if User.objects.filter(email=email).exists():
#                 messages.info(request, 'Email Taken')
#                 return redirect('register')
#             elif User.objects.filter(username=username).exists():
#                 messages.info(request, 'Username Taken')
#                 return redirect('register')
#             else:
#                 user = User.objects.create_user(username=username, email=email, password=password)
#                 user.save()

#                 #log user in and redirect to settings page
#                 user_login = auth.authenticate(username=username, password=password)
#                 auth.login(request, user_login)

#                 #create a Profile object for the new user
#                 user_model = User.objects.get(username=username)
#                 new_profile = Profile.objects.create(user=user_model, id_user=user_model.id)
#                 new_profile.save()
#                 return redirect('homepage')
#         else:
#             messages.info(request, 'Password Not Matching')
#             return redirect('register')
        
#     else:
#         return render(request, 'register.html')




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