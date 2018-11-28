# -*- coding: utf-8 -*-
# @Time    : 18-11-27 下午7:07
# @Author  : Felix Wang

from django import template
from ..models import Room, Book

# 注册自定义模板标签
register = template.Library()


@register.simple_tag
def get_rooms():
    return Room.objects.all()


@register.simple_tag
def get_time_choise():
    return [choose for choose in Book.time_choices]


@register.simple_tag
def get_books(date):
    return Book.objects.filter(date=date)

@register.simple_tag
def get_room_user(obj,date,room_caption,choise_id):
    user_name = obj.objects.filter(date=date, room__caption='会议室1', time_id=4).values('user__user__username')

    return user_name


