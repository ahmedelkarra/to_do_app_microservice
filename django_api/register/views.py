from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import AccessToken
import json
import re

# Create your views here.

@api_view(['POST'])
def register_user(request):
        data=json.loads(request.body)
        first_name=data.get('first_name')
        last_name=data.get('last_name')
        email=data.get('email')
        username=data.get('username')
        password=data.get('password')
        confirm_password=data.get('confirm_password')
        check_email=User.objects.filter(email=email).first()
        check_username=User.objects.filter(username=username).first()
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
        is_email = re.fullmatch(regex, email)

        if check_email:
            return Response({'message':'Email is already used'},status=403)
        if check_username:
            return Response({'message':'Username is already used'},status=403)
        if password and confirm_password and password != confirm_password:
             return Response({'message':'Your password not match'},status=403)
        if not is_email:
             return Response({'message':'Your enter a valid email'},status=403)
        
        if first_name and last_name and username and email and password and password == confirm_password:
            user = User.objects.create()
            user.first_name=first_name
            user.last_name=last_name
            user.email=email
            user.username=username
            user.set_password(password)
            user.save()
            token=AccessToken.for_user(user)
            return Response({'message':'User has been created','token':str(token)},status=201)
        
        else:
             return Response({'message':'Please check your inputs'},status=400)