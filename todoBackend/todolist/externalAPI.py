#! -*- encoding=utf-8 -*-
import json
from django.db import models, transaction
from django.db.models import Q
from django.core import serializers
import functools

#######################    全局常量    ######################
# 每页显示任务数量
PAGE_CONTENT = 8


#######################    自定义可复用方法    ######################
# 事务处理装饰器
# 封装数据库操作的异常回滚机制
def transaction_handler(pass_in_transaction):
    @functools.wraps(pass_in_transaction)  # 保证被装饰函数元信息不变
    def handler(*args, **kwargs):
        saveId = transaction.savepoint()  # 创建事物回滚点
        try:
            pass_in_transaction(*args, **kwargs)  # 事务处理
            transaction.savepoint_commit(saveId)  # 提交事物
            return True
        except Exception as e:
            transaction.savepoint_rollback(saveId)  # 如果事务提交不成功则回滚到回滚点
            raise print(e + pass_in_transaction.__name__ + 'and handler failed!!!')
        return handler

# 查询异常处理装饰器,封装查询异常捕捉
def search_exception(pass_in_search):
    @functools.wraps(pass_in_search)
    def wrapper(*args, **kwargs):
        try:
            return pass_in_search(*args, **kwargs)  # 查询操作
        except Exception as e:
            raise print(e + pass_in_search.__name__ + 'load failed!!!')
    return wrapper

# 基于model序列化操作封装
def serialize_to_json_handler(querysetObjs):
        json_tasks = serializers.serialize('json',querysetObjs)
        json_tasks = json.loads(json_tasks)
        return json_tasks

# 基于model序列化操作封装，生成manager基类，暂没想到办法
# class MyBaseManager(models.Manager):
#     @classmethod
#     def serialize_to_json_handler(cls, querysetObjs, filter_field=None):
#         if filter_field == None:
#             pass
#         else:
#             querysetObjs = super().get_queryset().filter()
#         json_tasks = serializers.serialize('json',querysetObjs)
#         json_tasks = json.loads(json_tasks)
#         return json_tasks

# 封装页数起始索引
def page_content_for(pageNum):
    start_index = PAGE_CONTENT * (pageNum-1)
    end_index = PAGE_CONTENT * pageNum
    return (start_index, end_index)

#######################    自定义model的Manager类    ######################
class TaskManager(models.Manager):
    '''
    todolist task API interface
    所有操作TodoTask这个表数据的函数接口
    在models里实例化为管理员对象
    这个对象提供给各种视图函数调用
    '''
    #######################    事务处理    ######################
    # 删除一个任务
    @transaction_handler
    def delete_task(self, task_id):
        super().get_queryset().filter(pk=task_id).delete()

    # 编辑一个待办事项
    @transaction_handler
    def update_task(self, task_id, new_title):
        super().get_queryset().filter(pk=task_id).update(title=new_title)

    #######################    非事务处理    ######################
    # 创建一个任务
    @transaction_handler
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
            tag: 任务标签
            taskPri: 任务优先级
            project: 任务所属项目

        Returns:
            返回新创建的task对象
        
        Raises:
            捕捉create方法里面可能存在的异常
        '''
        task = super().get_queryset().create(title=title, deadline=deadline, tag=tag,
                                             taskPriority=taskPri, project=project)
        task.save()
        return task

    # 查询一个待办事项
    @search_exception
    def get_task(self, task_id):
        task_queryset = super().get_queryset().filter(pk=task_id)
        return task_queryset[0]

    # # 查询所有待办事项
    # @search_exception
    # def search_all_tasks(self):
    #     tasks = super().get_queryset().all()
    #     return serialize_to_json_handler(tasks)


    # 根据页号，查询待办事项
    @search_exception
    def search_tasks_for_page(self, pageNum=1):
        indexs = page_content_for(pageNum)
        tasks = super().get_queryset().all()[indexs[0]:indexs[1]]
        return serialize_to_json_handler(tasks)

    # 根据project筛选待办事项
    @search_exception
    def search_tasks_for_project(self, pass_project, pageNum=1):
        indexs = page_content_for(pageNum)
        tasks = super().get_queryset().filter(project=pass_project)[indexs[0]:indexs[1]]
        return serialize_to_json_handler(tasks)

    # 根据tag筛选待办事项
    @search_exception
    def search_tasks_for_tag(self, pass_tag, pageNum=1):
        indexs = page_content_for(pageNum)
        tasks = super().get_queryset().filter(tag=pass_tag)[indexs[0]:indexs[1]]
        return serialize_to_json_handler(tasks)

    # 按照优先级筛选显示
    @search_exception
    def search_task_for_priority(self, pri, pageNum=1):
        indexs = page_content_for(pageNum)
        tasks = super().get_queryset().filter(taskPriority=pri)[indexs[0]:indexs[1]]
        return serialize_to_json_handler(tasks) 

    # 按照过期时间筛选显示
    @search_exception
    def search_tasks_for_deadline(self, pageNum=1):
        indexs = page_content_for(pageNum)
        tasks = super().get_queryset().order_by('deadline')[indexs[0]:indexs[1]]
        return tasks
