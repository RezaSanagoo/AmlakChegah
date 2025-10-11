from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import User, LoginLog
from .serializers import (
    UserSerializer, LoginSerializer, ChangePasswordSerializer, RegisterSerializer
)
from django.utils.timezone import now
from rest_framework.permissions import IsAuthenticated

class LoginAPIView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            username=serializer.validated_data['username'],
            password=serializer.validated_data['password']
        )
        if user:
            login(request, user)
            LoginLog.objects.create(user=user, ip_address=request.META.get('REMOTE_ADDR'))
            return Response({"message": "ورود موفقیت‌آمیز"}, status=200)
        return Response({"error": "نام کاربری یا رمز اشتباه است"}, status=400)

class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        logout(request)
        return Response({"message": "با موفقیت خارج شدید"}, status=200)

class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = [permissions.IsAdminUser]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class CurrentUserAPIView(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class ChangePasswordAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        serializer = ChangePasswordSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        request.user.set_password(serializer.validated_data['new_password'])
        request.user.save()
        return Response({"message": "رمز عبور تغییر یافت"}, status=200)

class ConsultantListAPIView(generics.ListAPIView):
    queryset = User.objects.filter(is_consultant=True, is_active=True)
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

class LoginLogListAPIView(generics.ListAPIView):
    queryset = LoginLog.objects.select_related('user').order_by('-login_time')
    serializer_class = ...  # تعریف کن
    permission_classes = [permissions.IsAdminUser]

class ConsultantDetailAPIView(APIView):
    def get(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
        return Response(UserSerializer(user).data)