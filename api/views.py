from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TaskSerializer

from .models import Task

# Create your views here.

# showing possible url routes to users who want to use this API
@api_view(['GET'])
def apiOverview(reqeust):
    api_urls = {
        'List': '/task-list/',
        'Detail View': '/task-detail/<str:pk>/',
        'Create': '/task-create/',
        'Update': '/task-update/<str:pk>/',
        'Delete': '/task-delete/<str:pk>/',
    }
    return Response(api_urls)

@api_view(['GET'])
def taskList(request):
    tasks = Task.objects.all() # equivalent to SELECT * FROM task

    # here, tasks is a variable used to store the query which will reterive all the objects in the Task model
    # then the query will be passed to the TaskSerializer, which will serialize the data retreived by the query in format that is understood by js 
    # since we are serializing a list of objects, we set many=True, if we wanted to serialize only one object set many=False 
    serializer = TaskSerializer(tasks, many=True) 
    return Response(serializer.data) # returns the data serialized by TaskSerializer

@api_view(['POST'])
def taskCreate(request):
    serializer = TaskSerializer(data=request.data) # 'request.data' is  equivalent to request.post, we will be receiving json data

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


@api_view(['POST'])
def taskUpdate(request, pk):
    task = Task.objects.get(id=pk)
    serializer = TaskSerializer(instance=task, data=request.data) # same as above view but here, 'instance=task' will update the current instance, i.e. the task with specific id
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

@api_view(['DELETE'])
def taskDelete(request, pk):
    task = Task.objects.get(id=pk)
    task.delete()

    return Response('Item deleted successfully')