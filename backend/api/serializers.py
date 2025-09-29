from rest_framework import serializers
from .models import User, Note

class UserSerializer(serializers.ModelSerializer):
    class Meta: 
        model = User
        fields = ['id', 'username', 'email', 'role']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        # This method is called when .save() is used on the serializer.
        # It correctly creates the user and hashes the password.
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class NoteSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Note
        fields = ['id', 'title', 'content', 'owner', 'created_at', 'updated_at']
        read_only_fields = ['owner']
