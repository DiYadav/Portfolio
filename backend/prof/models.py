from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
# from django.db import models
# from django.contrib.auth import get_user_model



# # Create your models here.
# User = get_user_model()
# class Profile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     id_user = models.IntegerField()
   

#     def __str__(self):
#         return self.user.username



class UserProfile(models.Model):
    profile=models.OneToOneField(User, on_delete=models.CASCADE)
    id_user = models.IntegerField(default=1)
    full_name=models.CharField(max_length=100)
    email=models.EmailField(blank=True)
    bio=models.TextField(blank=True)
    profile_image=models.ImageField(upload_to='profile.images/', blank=True, null=True)
    github=models.URLField(blank=True)
    Linkdin=models.URLField(blank=True)

    def __str__(self):
        return self.full_name
    
# Education Model
class Education(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='educations')
    degree = models.CharField(max_length=100)
    institute = models.CharField(max_length=150)
    year_start = models.IntegerField()
    year_end = models.IntegerField(blank=True, null=True)
    Location=models.CharField(max_length=50, blank=False, null=False)

    def __str__(self):
        return f"{self.degree} at {self.institute}"

# Experience Model
class Experience(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='experiences')
    Role = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    description = models.TextField(max_length=100, blank=True, null=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    Location = models.CharField(max_length=50, blank=False, null=False)
    details=models.CharField(max_length=50, blank=True, null=False)

    def __str__(self):
        return f"{self.title} at {self.company}"

# Project Model
class Project(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='projects')
    Project_Year=models.DateField()
    title = models.CharField(max_length=100)
    description = models.TextField(max_length=100, blank=True, null=True )
    link = models.URLField(blank=True)
    contribute = models.CharField(max_length=50, blank=False, null=False)
    def __str__(self):
        return self.title

# Skill Model
class Skill(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='skills')
    certificate=models.ImageField(upload_to="Certificate/", blank=True, null=True)
    description = models.CharField(max_length=100)
    skills = models.CharField(max_length=100)
    proficiency = models.IntegerField( validators=[MinValueValidator(1), MaxValueValidator(100)],
    help_text="Enter a value between 1 and 100")

    def __str__(self):
        return f"{self.name} - {self.proficiency}%"
