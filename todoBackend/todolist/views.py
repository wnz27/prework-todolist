from django.shortcuts import render
from django.views.generic import View
from django.http import HttpResponse
from .models import TodoTask

# Create your views here.
class Index(View):
    TEMPLATE = 'index.html'
    def get(self, request, name):
        data = {}
        data['name'] = name
        data['array'] = range(10)
        return render(request, self.TEMPLATE, data)