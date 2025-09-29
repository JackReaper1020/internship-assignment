from django.shortcuts import render
from rest_framework import viewsets, permissions, generics
from .models import Note, User
from .serializers import NoteSerializer, UserRegistrationSerializer, UserSerializer

class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Note.objects.all()
        return Note.objects.filter(owner=user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class RegisterView(generics.CreateAPIView): 
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(generics.RetrieveAPIView):
    serializer_class = UserSerializer 
    def get_object(self):
        return self.request.user
