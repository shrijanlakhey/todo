from django.db import models
import uuid
# Create your models here.
class Task(models.Model):
    id = models.UUIDField(default=uuid.uuid4, unique=True, primary_key=True, editable=False)
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False, null=True, blank=True)

    def __str__(self):
        return self.title
