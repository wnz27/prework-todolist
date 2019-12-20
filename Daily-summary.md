## 2019.12.19
1. 查找跨域问题
    - [django-cors-headers](https://github.com/adamchainz/django-cors-headers)
2. 解决react脚手架搭建问题
    - 脚手架搭建结构不完整，问题原因在于create-react-app不是最新版
    - react项目脚手架项目初始化
3. Django项目初始化
4. 学习virtualenvwrapper使用及配置~/.bashrc
    - pip安装
    - 使用`find / -name virtualenvwrapper.sh`
    - 更改里面python搜寻路径，从python改为pyhton3
    - 之后source使之生效
5. 云服务器的连接
    - 密码连接
    - 秘钥连接
    - 秘钥连接相对更安全
6. 给ubuntu配置新的用户及权限

## 2019.12.20
1. 学习在ubuntu搭建PostgreSQL
    - [How To Use PostgreSQL with your Django Application on Ubuntu](https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-your-django-application-on-ubuntu-14-04)
2. 回顾Django的ORM及modelAPI操作
3. todolistmodel构思及完成
4. 一个问题未解决:
想批量导入假数据，但是出现如下错误
``` import_data.py
import sys
import os
# import random
# from datetime import date

pwd = os.path.dirname(os.path.realpath(__file__))
# print(pwd)
sys.path.append('../')
# print(sys.path)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todoBackend.settings')
# print(os.environ.items())
import django
django.setup()
# 此处省略导入逻辑
```
出现如下错误
```
Traceback (most recent call last):
  File "import_data.py", line 16, in <module>
    django.setup()
  File "/Users/fzk27/.virtualenvs/testpy36/lib/python3.6/site-packages/django/__init__.py", line 19, in setup
    configure_logging(settings.LOGGING_CONFIG, settings.LOGGING)
  File "/Users/fzk27/.virtualenvs/testpy36/lib/python3.6/site-packages/django/conf/__init__.py", line 79, in __getattr__
    self._setup(name)
  File "/Users/fzk27/.virtualenvs/testpy36/lib/python3.6/site-packages/django/conf/__init__.py", line 66, in _setup
    self._wrapped = Settings(settings_module)
  File "/Users/fzk27/.virtualenvs/testpy36/lib/python3.6/site-packages/django/conf/__init__.py", line 157, in __init__
    mod = importlib.import_module(self.SETTINGS_MODULE)
  File "/Users/fzk27/.virtualenvs/testpy36/lib/python3.6/importlib/__init__.py", line 126, in import_module
    return _bootstrap._gcd_import(name[level:], package, level)
  File "<frozen importlib._bootstrap>", line 994, in _gcd_import
  File "<frozen importlib._bootstrap>", line 971, in _find_and_load
  File "<frozen importlib._bootstrap>", line 941, in _find_and_load_unlocked
  File "<frozen importlib._bootstrap>", line 219, in _call_with_frames_removed
  File "<frozen importlib._bootstrap>", line 994, in _gcd_import
  File "<frozen importlib._bootstrap>", line 971, in _find_and_load
  File "<frozen importlib._bootstrap>", line 953, in _find_and_load_unlocked
ModuleNotFoundError: No module named 'todoBackend'
The terminal process terminated with exit code: 1
```
项目结构如图：![项目结构图](./other_source/截屏2019-12-2023.37.10.png)
没有明白为什么出现：No module named 'todoBackend'
反思：批量导入是必经之途，手动导入小项目没有问题，大的项目就会很麻烦了。

## 2019.12.21