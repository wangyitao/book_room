# 启动：
#### 找到manage.py目录，依次执行如下代码
```python
    # 初始化熟即可
    python3 manage.py makemigrations
    python3 manage.py migrate
    
    # 创建超级用户
    python3 manage.py createsuperuser
    
    # 启动服务
    python3 manage.py runserver
    
```

# 当前基于python3.6，bootstrap4开发

# 功能说明：
#### 可以使用多个账号，
#### 预定只能是当前日期或者当前日期之后的日期
#### 多个人预定时，如果有他人预定过了，则不能预定
#### 取消预定只能取消自己用户的，无法取消他人用户
#### 超级用户可以在界面直接进入后台，普通用户不行
