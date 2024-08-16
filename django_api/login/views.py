from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import AccessToken
import json
import re

# Create your views here.

@api_view(['POST'])
def login_user(request):
    try:
        regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
        data=json.loads(request.body)
        email_username=data.get('email_username')
        password=data.get('password')
        is_email = re.fullmatch(regex, email_username)
        if is_email:
            user = User.objects.filter(email=email_username).first()
            password_status=user.check_password(password)
        if not is_email:
            user = User.objects.filter(username=email_username).first()
            password_status=user.check_password(password)
        if not email_username or not password:
            return Response({'message':'Please check your inputs'},status=400)
        if user and password_status:
            token = AccessToken.for_user(user)
            return Response({'message': f"Wellcome {user.first_name.capitalize()} {user.last_name.capitalize()}" , "token" :str(token)}, status=200)
        else:
            return Response({'message':'Wrong username or password'},status=404)
    except:
        return Response({'message':'Wrong username or password'},status=404)