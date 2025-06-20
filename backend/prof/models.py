from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from django.core.validators import RegexValidator

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=10, null=True, blank=True)
    bio = models.TextField()
    image = models.ImageField(upload_to='profile_photos/', null=True, blank=True)
    document = models.FileField(upload_to='documents/', null=True, blank=True)
    links = models.JSONField(null=True, blank=True)  # For storing multiple links

    def __str__(self):
        return self.full_name
    
#Education Model
class Education(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='educations')
    year = models.CharField(max_length=11,  validators=[
            RegexValidator(
                regex=r'^\d{4}-\d{4}$',
                message='Year must be in YYYY-YYYY format (e.g., 2020-2023)'
            )
        ])
    degree = models.CharField(max_length=200, default='N/A')
    institute = models.CharField(max_length=200)
    location = models.CharField(max_length=100, blank=True, null=True)
    cgpa_marks = models.FloatField(null=False)

    def __str__(self):
        return f"{self.start_year}-{self.end_year} - {self.degree} at {self.institute}"


# # Experience Model
class Experience(models.Model):
    profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='experiences')
    year = models.CharField(max_length=11,  validators=[
            RegexValidator(
                regex=r'^\d{4}-\d{4}$',
                message='Year must be in YYYY-YYYY format (e.g., 2020-2023)'
            )
        ])
    role = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    location = models.CharField(max_length=50)
    tech_details=models.CharField(max_length=50, blank=True)

    def __str__(self):
        return f"{self.role} at {self.company}"

# # Project Model
# class Project(models.Model):
#     profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='projects')
#     Project_Year=models.DateField()
#     Project_title = models.CharField(max_length=100)
#     contributer = models.CharField(max_length=50, blank=False, null=False)
#     details = models.TextField(max_length=100, blank=True, null=True )
   
#     def __str__(self):
#         return self.Project_title
    
    # class Project(models.Model):
    # year = models.CharField(max_length=10)
    # title = models.CharField(max_length=255)
    # location = models.CharField(max_length=255)
    # details = models.TextField()

# Skill Model
# class Skill(models.Model):
#     profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='skills')
#     certificate=models.ImageField(upload_to="Certificate/", blank=True, null=True)
#     description = models.CharField(max_length=100)
#     skills = models.CharField(max_length=100)
#     proficiency = models.IntegerField( validators=[MinValueValidator(1), MaxValueValidator(100)],
#     help_text="Enter a value between 1 and 100")

#     def __str__(self):
#         return f"{self.name} - {self.proficiency}%"
