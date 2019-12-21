from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from .models import TodoTask

# Create your views here.
class Index(View):
    TEMPLATE = 'index.html'
    def get(self, request, name):
        task = TodoTask.externalAPI.get_task('44f2dda6-2603-4624-a010-b99158483f00')
        page_tasks = TodoTask.externalAPI.search_tasks_for_page(1)
        data = {}
        data['name'] = task.title
        data['array'] = page_tasks
        return render(request, self.TEMPLATE, data)