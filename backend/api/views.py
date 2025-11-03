from rest_framework.viewsets import ModelViewSet
from .models import TodoItem
from .serializers import TodoItemSerializer

# Create your views here.


class TodoItemViewSet(ModelViewSet):
    queryset = TodoItem.objects.order_by("id")
    serializer_class = TodoItemSerializer
