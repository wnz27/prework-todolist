#! -*- encoding=utf-8 -*-
from django.db import models, transaction

class taskManager(models.Manager):
    '''
    todolist task API interface
    所有操作TodoTask这个表数据的函数接口
    在models里实例化为管理员对象
    这个对象提供给各种视图函数调用
    '''

    # 创建一个任务
    def create_task(self, 
                    title, 
                    deadline=None, 
                    tag=None, 
                    taskPri=None, 
                    project=None):
        '''Create a task
        为数据库创建一条任务记录

        Args:
            title: 任务内容
            deadline: 任务截止时间
        
        Returns:
        
        Raises:
        '''
        saveId = transaction.savepoint()
        try:
            task = super().get_queryset().create(title=title, deadline=deadline, tag=tag,
                                             taskPriority=taskPri, project=project)
            transaction.savepoint_commit(saveId)
        except Exception as e:
            transaction.savepoint_rollback(saveId)
            raise print(e + ' create a task failed!!!')
        return task
    
    # 删除一个任务
    def delete_task(self, id):
        saveId = transaction.savepoint()
        try:
            super().get_queryset().filter(pk=id).delete()
            transaction.savepoint_commit(saveId)
        except Exception as e:
            transaction.savepoint_rollback(saveId)
            print(e + ' delete failed!')

    
    # 获取一个任务
    def get_task(self, id):
        try:
            task_queryset = super().get_queryset().filter(pk=id)
        except Exception as e:
            raise print(e + ' get a task failed!!!')
        return task_queryset

    # 编辑一个待办事项
    def update_task(self, task_id, new_title):
        saveId = transaction.savepoint()
        try:
            super().get_queryset().filter(pk=task_id).update(title=new_title)
            transaction.savepoint_commit(saveId)
        except Exception as e:
            transaction.savepoint_rollback(saveId)
            print(e + 'update task failed!!!')


    # 所有待办事项列表

    # 根据页号，显示任务列表

    # 根据project筛选待办事项

    # 根据tag筛选待办事项

    # 按照优先级筛选显示

    # 按照过期时间筛选显示
