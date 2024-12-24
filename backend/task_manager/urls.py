from django.conf import settings
from django.urls import path
from rest_framework.routers import DefaultRouter, SimpleRouter

from task_manager.views import tasks

router = (DefaultRouter if settings.DEBUG else SimpleRouter)(
    trailing_slash=False
)

urlpatterns = [
    path("api/v1/tasks", tasks.View.as_view(), name="GetTasks"),
    path(
        f"api/v1/task/<str:task_id>", tasks.View.as_view(), name="DeleteTasks"
    ),
]
