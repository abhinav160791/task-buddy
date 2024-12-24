from uuid import uuid4
from django.db import models


class Task(models.Model):
    id = models.UUIDField(default=uuid4, unique=True, primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=255)
    description = models.TextField()

    def dict(self):
        return {
            "id": self.id,
            "created_at": self.created_at,
            "title": self.title,
            "description": self.description
        }