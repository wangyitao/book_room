import time
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.contrib import auth
from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
from .forms import LoginForm, RegisterForm
from .models import Book, UserInfo, Room


def isVaildDate(date):
    try:
        if ":" in date:
            time.strptime(date, "%Y-%m-%d %H:%M:%S")
        else:
            time.strptime(date, "%Y-%m-%d")
        return True
    except:
        return False


def index(requests):
    today = str(timezone.now().date())
    date = requests.GET.get('date', today)

    books = Book.objects.filter(date=date if isVaildDate(date) else today)
    dic = {}
    for book in books:
        dic.setdefault(book.room.caption, []).append([book.time_id, book.user.user.username])

    context = {
        'today': today,
        'date': date,
        'book_list': dic,
    }

    return render(requests, 'index.html', context)


def login(requests):
    # 如果是form表单提交验证登录
    if requests.method == 'POST':
        login_form = LoginForm(requests.POST)
        if login_form.is_valid():  # 验证是否通过
            # 因为在form表单验证过了，所以不用自己再验证
            user = login_form.cleaned_data.get('user')
            auth.login(requests, user)
            return redirect(requests.GET.get('from', reverse('index')))
        else:
            login_form.add_error(None, '用户名或密码不正确')
    else:
        login_form = LoginForm()
    context = {
        'login_form': login_form,
    }
    return render(requests, 'login.html', context)


def login_for_model(requests):
    login_form = LoginForm(requests.POST)

    # 如果是form表单提交验证登录
    if login_form.is_valid():  # 验证是否通过
        # 因为在form表单验证过了，所以不用自己再验证
        user = login_form.cleaned_data.get('user')
        auth.login(requests, user)

        data = {
            'status': 'SUCCESS',
        }
    else:
        data = {
            'status': 'ERROR',
        }
    return JsonResponse(data)


def register(requests):
    if requests.method == 'POST':
        reg_form = RegisterForm(requests.POST)
        if reg_form.is_valid():
            username = reg_form.cleaned_data['username']
            email = reg_form.cleaned_data['email']
            tel = reg_form.cleaned_data['tel']
            password = reg_form.cleaned_data['password']

            # 创建用户
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()
            user2 = UserInfo.objects.create(user=user, tel=tel)
            user2.save()

            # 登录用户
            user = auth.authenticate(username=username, password=password)
            auth.login(requests, user)
            # 登录之后跳转
            return redirect(requests.GET.get('from', reverse('index')))
    else:
        reg_form = RegisterForm()

    context = {
        'reg_form': reg_form,
    }
    return render(requests, 'register.html', context)


def logout(requests):
    auth.logout(requests)
    return redirect(requests.GET.get('from', reverse('index')))


def book(requests):
    if requests.user.is_authenticated:
        today = timezone.now().date()
        date = requests.GET.get('date', today)

        username = requests.GET.get('user', '')
        choise_id = requests.GET.get('choise_id', '')
        room_caption = requests.GET.get('room_caption', '')
        is_book = Book.objects.filter(date=date if isVaildDate(date) else today , room__caption=room_caption, time_id=choise_id)
        book = Book.objects.filter(date=date if isVaildDate(date) else today, user__user__username=username, room__caption=room_caption,
                                   time_id=choise_id)
        is_book_count = is_book.count()
        book_count = book.count()

        if is_book_count == 0 and book_count == 0:
            user = UserInfo.objects.get(user__username=username)
            room = Room.objects.get(caption=room_caption)
            Book.objects.create(date=date if isVaildDate(date) else today, user=user, room=room, time_id=choise_id)
            data = {
                'status': 'SUCCESS',
                'msg': '预定成功',
            }
        elif is_book_count > 0 and book_count == 0:
            data = {
                'status': 'ERROR',
                'msg': '已经被他人预定',
            }
        else:
            data = {
                'status': 'ERROR',
                'msg': '预定失败',
            }
    else:
        data = {
            'status': 'ERROR',
            'msg': '你尚未登录，登录后才能预定',
        }

    return JsonResponse(data)


def un_book(requests):
    if requests.user.is_authenticated:
        today = timezone.now().date()
        date = requests.GET.get('date', today)
        username = requests.GET.get('user', '')
        choise_id = requests.GET.get('choise_id', '')
        room_caption = requests.GET.get('room_caption', '')
        book = Book.objects.filter(date=date if isVaildDate(date) else today, user__user__username=username, room__caption=room_caption,
                                   time_id=choise_id)
        is_book = Book.objects.filter(date=date if isVaildDate(date) else today, room__caption=room_caption, time_id=choise_id)
        book_count = book.count()
        is_book_count = is_book.count()
        if book_count == 1 and is_book_count == 1:
            book.delete()
            data = {
                'status': 'SUCCESS',
                'msg': '取消预定成功',
            }
        elif book_count == 0 and is_book_count == 1:
            data = {
                'status': 'ERROR',
                'msg': '无法取消他人预定的内容',
            }
        else:
            data = {
                'status': 'ERROR',
                'msg': '取消预定失败',
            }
    else:
        data = {
            'status': 'ERROR',
            'msg': '你尚未登录，登录后才能取消预定',
        }
    return JsonResponse(data)
