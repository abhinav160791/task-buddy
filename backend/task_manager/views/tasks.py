from django.http import Http404
from pydantic import BaseModel, ValidationError
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from task_manager.models import Task


class Input(BaseModel):
    description: str
    title: str


class View(APIView):
    permission_classes = [AllowAny]

    def get(self, _: Request):
        tasks = Task.objects.all().order_by("-created_at")
        response = {
            "tasks": [task.dict() for task in tasks],
            "total_count": tasks.count(),
        }
        return Response(response, status=200)

    def post(self, request: Request, **kwargs):
        try:
            data = Input.model_validate(request.data)
            task = Task(**data.model_dump())
            task.full_clean()
            task.save()
            return Response(task.dict(), status=201)
        except ValidationError as e:
            return Response(e.errors(), status=400)

    def delete(self, _: Request, task_id: str):
        task = Task.objects.filter(id=task_id).first()
        if not task:
            raise Http404()
        task.delete()
        return Response({}, status=200)
