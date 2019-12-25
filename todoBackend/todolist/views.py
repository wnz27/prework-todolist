from django.shortcuts import render
from django.views import View
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
# from django.forms.models import model_to_dict
from django.http import HttpResponse, JsonResponse
from django.http import Http404
from todolist.models import TodoTask
import json

# ###########################  对象查询返回数据处理  ####################
# 只根据页数显示任务数量
class TasksForPageListView(ListView):
    model = TodoTask
    # template_name = 'index.html'
    def get_queryset(self, page):
        tasks_for_page = self.model.externalAPI.search_tasks_for_page(page)
        return tasks_for_page
    def get(self, request, pageNum=1):
        res = self.get_queryset(pageNum)
        return JsonResponse(res, safe=False)

# 根据过期时间显示任务列表
class TasksForDateListView(ListView):
    model = TodoTask
    def get_queryset(self, page):
        tasks_for_deadline = self.model.externalAPI.search_tasks_for_deadline(page)
        return tasks_for_deadline
    def get(self, request, pageNum=1):
        res = self.get_queryset(pageNum)
        return JsonResponse(res, safe=False)

# 根据优先级显示任务列表
class TasksForPriorityListView(ListView):
    model = TodoTask
    def get_queryset(self, pri, page):
        tasks_for_deadline = self.model.externalAPI.search_task_for_priority(pri, page)
        return tasks_for_deadline
    def get(self, request, priority, pageNum=1):
        res = self.get_queryset(priority, pageNum)
        return JsonResponse(res, safe=False)


# 根据项目显示任务列表
class TasksForProjectListView(ListView):
    model = TodoTask
    def get_queryset(self, project, page):
        tasks_for_deadline = self.model.externalAPI.search_tasks_for_project(project, page)
        return tasks_for_deadline
    def get(self, request, project, pageNum=1):
        res = self.get_queryset(project, pageNum)
        return JsonResponse(res, safe=False)

# 根据标签显示任务列表
class TasksForTagListView(ListView):
    model = TodoTask
    def get_queryset(self, tag, page):
        tasks_for_deadline = self.model.externalAPI.search_tasks_for_tag(tag, page)
        return tasks_for_deadline
    def get(self, request, tag, pageNum=1):
        res = self.get_queryset(tag, pageNum)
        return JsonResponse(res, safe=False)

# 获取一个任务
class TaskDetailView(DetailView):
    model = TodoTask
    def get_queryset(self, task_id):
        task = self.model.externalAPI.get_task(task_id)
        return task
    def get(self, request, task_id):
        res = self.get_queryset(task_id)
        print(res)
        return JsonResponse(res, safe=False)

# ###########################  对象数据操作处理  ####################
# 删除一个任务
class TaskDeleteView(View):
    model = TodoTask
    def delete(self, request, task_id):
        print(task_id)
        res = self.model.externalAPI.delete_a_task(task_id)
        if res:
            return JsonResponse({'success':1}, safe=False)
        else:
            return JsonResponse({'error':0}, safe=False)

# 编辑一个任务
class TaskEditView(DetailView):
    model = TodoTask
    def post(self, request, task_id):
        data = json.loads(request.body)
        new_title = data.get('new_title', None)
        new_project = data.get('new_project', None)
        new_deadline = data.get('new_deadline', None)
        new_tag = data.get('new_tag', None)
        new_priority = data.get('new_priority', None)
        res = self.model.externalAPI.update_task(task_id, new_title=new_title, 
                        deadline=new_deadline, tag=new_tag, taskPri=new_priority,
                        project=new_project)
        print(res)
        if res:
            return JsonResponse(res, safe=False)
        return JsonResponse({'error':0}, safe=False)

# 创建一个任务
class TaskCreateView(DetailView):
    model = TodoTask
    def post(self, request):
        data = json.loads(request.body)
        new_title = data.get('new_title', None)
        new_project = data.get('new_project', None)
        new_deadline = data.get('new_deadline', None)
        new_tag = data.get('new_tag', None)
        new_priority = data.get('new_priority', None)
        if new_title == None:
            return JsonResponse({'error':0}, safe=False)
        res = self.model.externalAPI.create_task(new_title, deadline=new_deadline, 
                    tag=new_tag, taskPri=new_priority, project= new_project)
        if res:
            return JsonResponse({'success':1}, safe=False)
        return JsonResponse({'error':0}, safe=False)

# 标记一个任务为已经完成
class TaskDoneView(DetailView):
    model = TodoTask
    def post(self, request, task_id):
        data = json.loads(request.body)
        new_done = data.get('new_done', False)
        res = self.model.externalAPI.update_a_task_done(task_id, new_done)
        if res:
            return JsonResponse({'success':1}, safe=False)
        else:
            return JsonResponse({'error':0}, safe=False)