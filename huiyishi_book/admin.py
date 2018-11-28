from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User
from .models import UserInfo, Room, Book


@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('caption', 'num')


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('user', 'room', 'date', 'time')


# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton
class UserInfoInline(admin.StackedInline):
    model = UserInfo
    can_delete = False


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    inlines = (UserInfoInline,)
    list_display = ('username', 'tel')

    def tel(self, obj):
        return obj.userinfo.tel

    tel.short_description = '手机号'  # 后台字段


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, UserAdmin)


@admin.register(UserInfo)
class UserInfoAdmin(admin.ModelAdmin):
    list_display = ('user', 'tel')
