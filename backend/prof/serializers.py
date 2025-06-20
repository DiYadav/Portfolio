from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User    


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = '__all__'
        read_only_fields = ['user']


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

# class ProjectSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Project
#         fields = '__all__'

# # class SkillSerializer(serializers.ModelSerializer):
# #     class Meta:
# #         model = Skill
# #         fields = '__all__'



