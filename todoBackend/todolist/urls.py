#! -*- encoding=utf-8 -*-
from django.urls import path, include
from . import views

# 应用路由说明
# list/
# list/
# 
# 
# 
# 
# 
# 
# 

extra_list_patterns = [
    path('', views.TasksForPageListView.as_view(), 
         name='tasks-first-page-list'),
    path('<int:pageNum>', views.TasksForPageListView.as_view(), 
         name='tasks-paged-list'),
    path('deadline/<int:pageNum>', views.TasksForDateListView.as_view(),
         name='tasks-deadline-list'),
    path('priority/<str:priority>/<int:pageNum>', views.TasksForPriorityListView.as_view(),
         name='tasks-priority-list'),
    path('project/<str:project>/<int:pageNum>', views.TasksForProjectListView.as_view(),
         name='tasks-project-list'),
    path('tag/<str:tag>/<int:pageNum>', views.TasksForTagListView.as_view(),
         name='tasks-tag-list')
]

extra_detail_patterns = [
    path('<uuid:task_id>', views.TaskDetailView.as_view(),
         name='task-detail'),
]

extra_operation_patterns = [
     path('destory/<uuid:task_id>', views.TaskDeleteView.as_view(),
          name='delete-a-task'),
     path('edit/<uuid:task_id>', views.TaskEditView.as_view(),
          name='edit-a-task'),
     path('create', views.TaskCreateView.as_view(),
          name='create-a-task'),
     path('done/<uuid:task_id>', views.TaskDoneView.as_view(),
          name='done-a-task')
]

urlpatterns = [
    path('list/', include(extra_list_patterns)),
    path('detail/', include(extra_detail_patterns)),
    path('operation/', include(extra_operation_patterns))
]
