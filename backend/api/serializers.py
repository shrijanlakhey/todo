# use serializers to objects into data types understandable by javascript and front-end frameworks

from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task   # specifying the model to be serialized
        fields = '__all__' # specifying the fields from the model which are to be serialized
