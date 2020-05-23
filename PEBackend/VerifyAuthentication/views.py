
from rest_framework import status, exceptions
from django.http import HttpResponse
from rest_framework.authentication import get_authorization_header, BaseAuthentication
from django.contrib.auth.models import User
from rest_framework.views import APIView
import jwt
import json


class VerifyAuthentication(APIView):
    def post(self, request, *args, **kwargs):
        auth = get_authorization_header(request).split()
        if not auth or auth[0].lower() != b'token':
            msg = 'No token provided.'
            raise exceptions.AuthenticationFailed(msg)
        if len(auth) == 1:
            msg = 'Invalid token header. No credentials provided.'
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = 'Invalid token header'
            raise exceptions.AuthenticationFailed(msg)
        try:
            token = auth[1]
            if token=="null":
                msg = 'Null token not allowed'
                raise exceptions.AuthenticationFailed(msg)
        except UnicodeError:
            msg = 'Invalid token header. Token string should not contain invalid characters.'
            raise exceptions.AuthenticationFailed(msg)
        payload = jwt.decode(token, "PCSK")
        email = payload['email']
        userid = payload['id']
        msg = {'Error': "Token mismatch",'status' :"401"}
        try:
            user = User.objects.get(
                email=email,
                id=userid,
                is_active=True
            )
            if not user.token['token'] == token:
                raise exceptions.AuthenticationFailed(msg)
            else:
                resp = HttpResponse({"Success":"User logged in"}, status= "200")
        except jwt.ExpiredSignature or jwt.DecodeError or jwt.InvalidTokenError:
            resp = HttpResponse({'Error': "Token is invalid"}, status="403", headers= {"Access-Control-Allow-Origin": "*"})
        except User.DoesNotExist:
            resp = HttpResponse({'Error': "Internal server error"}, status="500", headers= {"Access-Control-Allow-Origin": "*"})
        finally:
            resp["Access-Control-Allow-Origin"] = "*"
            resp["Access-Control-Allow-Methods"] = "POST, OPTIONS"
            resp["Access-Control-Max-Age"] = "1000"
            resp["Access-Control-Allow-Headers"] = "X-Requested-With, Content-Type"
            return resp
