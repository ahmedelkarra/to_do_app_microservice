from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import AccessToken
from .userSerializer import UserSerializer
from django.contrib.auth.models import User
import json
import re

# Create your views here.

@api_view(["GET","PUT","DELETE"])
def user_info(request):
    try:
        token = request.headers.get('Authorization')
        if not token:
            return Response({'message':'Token is missing'},status=400)
        token_status = AccessToken(str(token))
        id=token_status['user_id']
        if request.method == "GET":
            try:
                user = User.objects.filter(id=id).first()
                if user:
                    user_info = UserSerializer(user)
                    return Response({'message':user_info.data})
                else:
                    return Response({'message':'Token is invalid or expired'},status=400)
            except TokenError:
                return Response({'message':'Token is invalid or expired'},status=400)
            
        elif request.method == "PUT":
            data=json.loads(request.body)
            first_name=data.get('first_name')
            last_name=data.get('last_name')
            email=data.get('email')
            username=data.get('username')
            password=data.get('password')
            new_password=data.get('new_password')
            confirm_new_password=data.get('confirm_new_password')
            user=User.objects.filter(id=id).first()
            regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'
            is_email = re.fullmatch(regex, email)
            password_status=user.check_password(password)

            if not user:
                return Response({'message':'Wrong username or password'},status=404)
            if not is_email:
                return Response({'message':'Your enter a valid email'},status=403)
            if not password_status:
                return Response({'message':'Wrong username or password'},status=404)
            
            print(password_status)
            if user and password_status and not new_password or not confirm_new_password:
                user.first_name=first_name
                user.last_name=last_name
                user.email=email
                user.username=username
                user.save()
                return Response({'message':'User has been updated'},status=200)
            
            elif new_password != confirm_new_password:
                return Response({'message':'Your password not match'},status=400)
            
            elif user and password_status and new_password and confirm_new_password:
                user.first_name=first_name
                user.last_name=last_name
                user.email=email
                user.username=username
                user.set_password(new_password)
                user.save()
                return Response({'message':'User has been updated'},status=200)
            
            else:
                return Response({'message':'Wrong username or password'},status=404)
            
        elif request.method == "DELETE":
            data=json.loads(request.body)
            password=data.get('password')
            user=User.objects.filter(id=id).first()

            if not user:
                return Response({'message':'Wrong username or password'},status=404)
            
            password_status=user.check_password(password)
            if user and password_status:
                user.delete()
                return Response({'message':'User has been deleted'},status=200)
            else:
                return Response({'message':'Wrong username or password'},status=404)
        else:
            return Response({'message':'Method not allowed'},status=405)
    except:
        return Response({'message':'Token is invalid or expired'},status=400)