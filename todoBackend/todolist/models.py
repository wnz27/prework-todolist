from django.db import models
from .externalAPI import TaskManager
import uuid

TASK_PRIORITY = [
    ('Priority 1', 'very important'),
    ('Priority 2', 'important'),
    ('Priority 3', 'normal'),
    ('Priority 4', 'slow')
]

class TodoTask(models.Model):
    '''
    todolist tasks
    '''
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, 
                          verbose_name='任务唯一标识', unique=True, null=False)
    title = models.CharField(max_length=255, verbose_name='任务内容', 
                             editable=True, null=False)
    deadline = models.DateTimeField(auto_now_add=True, editable=True, 
                                    verbose_name='任务截止时间', null=True, blank=True)
    tag = models.CharField(max_length=20, verbose_name='任务标签', 
                           editable=True, null=True, blank=True)
    done = models.BooleanField(verbose_name='任务是否完成', default=False)
    taskPriority = models.CharField(max_length=12, choices=TASK_PRIORITY, 
                                    null=True, blank=True, verbose_name='任务优先级')
    project = models.CharField(max_length=50, null=True, blank=True,
                               verbose_name='任务所属项目')
    create_at = models.DateTimeField(auto_now_add=True, verbose_name='任务创建时间')
    update_at = models.DateTimeField(auto_now=True,verbose_name='任务更新时间')

    def __str__(self):
        return self.title

    # externalAPI对象包含所有允许对外操作的方法
    # 视图函数只能从该属性包含方法操作该表
    externalAPI = TaskManager()

    class Meta:         # 元数据定义
        verbose_name = '待办任务'
        verbose_name_plural = verbose_name
        db_table = 'task'
        ordering = ['create_at']
        index_together = ['project', 'tag', 'taskPriority', 'deadline', 'done']




