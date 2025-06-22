from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User    


# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = '__all__'
#         read_only_fields = ['user']


class UserProfileSerializer(serializers.ModelSerializer):
    skills_count = serializers.SerializerMethodField()
    myskills_count = serializers.SerializerMethodField()
    myprojects_count=serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = [
            'id', 'full_name', 'email', 'phone', 'bio',
            'image', 'document', 'links', 'user', 'position',
            'skills_count', 'myskills_count','myprojects_count',
        ]

    def get_skills_count(self, obj):
        return obj.skills.count()

    def get_myskills_count(self, obj):
        return obj.myskills.count()
    
    def get_myprojects_count(self, obj):
        return obj.projects.count()



class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'

    def validate_cgpa_marks(self, value):
        if value < 0 or value > 100:
            raise serializers.ValidationError("CGPA or Marks must be between 0 and 100.")
        return value


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = '__all__'
    
    def validate_year(self, value):
        import re
        if not re.match(r'^\d{4}-\d{4}$', value):
            raise serializers.ValidationError("Year must be in YYYY-YYYY format.")
        return value

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        
    def validate_year(self, value):
        import re
        if not re.match(r'^\d{4}-\d{4}$', value):
            raise serializers.ValidationError("Year must be in YYYY-YYYY format.")
        return value   
    

class SkillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skills
        fields = '__all__'
        read_only_fields = ['id', 'profile']

class MyskillsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Myskills
        fields = '__all__'
       

