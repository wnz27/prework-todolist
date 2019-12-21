from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from .models import TodoTask

# Create your views here.
class Index(View):
    TEMPLATE = 'index.html'
    def get(self, request, name):
        task_queryset = TodoTask.externalAPI.get_task('44f2dda6-2603-4624-a010-b99158483f00')
        data = {}
        data['name'] = task_queryset[0].title
        data['array'] = range(10)
        return render(request, self.TEMPLATE, data)