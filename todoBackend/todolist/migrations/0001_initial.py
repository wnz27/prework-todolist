# Generated by Django 2.2 on 2019-12-20 16:31

from django.db import migrations, models
import django.db.models.manager
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='TodoTask',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False, unique=True, verbose_name='任务唯一标识')),
                ('title', models.CharField(max_length=255, verbose_name='任务内容')),
                ('deadline', models.DateTimeField(auto_now_add=True, null=True, verbose_name='任务截止时间')),
                ('tag', models.CharField(blank=True, max_length=20, null=True, verbose_name='任务标签')),
                ('done', models.BooleanField(default=False, verbose_name='任务是否完成')),
                ('taskPriority', models.CharField(blank=True, choices=[('Priority 1', 'very important'), ('Priority 2', 'important'), ('Priority 3', 'normal'), ('Priority 4', 'slow')], max_length=12, null=True, verbose_name='任务优先级')),
                ('project', models.CharField(blank=True, max_length=50, null=True, verbose_name='任务所属项目')),
                ('create_at', models.DateTimeField(auto_now_add=True, verbose_name='任务创建时间')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='任务更新时间')),
            ],
            options={
                'verbose_name': '待办任务',
                'verbose_name_plural': '待办任务',
                'db_table': 'task',
                'ordering': ['create_at'],
            },
            managers=[
                ('externalAPI', django.db.models.manager.Manager()),
            ],
        ),
    ]
