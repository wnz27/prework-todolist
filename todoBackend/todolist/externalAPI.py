#! -*- encoding=utf-8 -*-
from django.db import models

class taskManager(models.Manager):
    '''
    todolist task API interface
    所有操作TodoTask这个表数据的函数接口
    在models里实例化为管理员对象
    这个对象提供给各种视图函数调用
    '''
    
    def create_task(self, title, tag, taskPri, project, deadline=None):
        '''

        '''
        task = self.create(title=title, tag=tag, taskPriority=taskPri, 
        project=project, deadline=deadline)
        return task
    
    def get_task(self, id):
        task = self.filter(pk=id)
        return task

    def bulk_cre(self, taskList):
        return self.bulk_create(taskList)
