# urls for backend


from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import NoteViewSet
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

router = DefaultRouter()
router.register('notes', NoteViewSet, basename='notes')

api_urlpatterns = [
    path('', include('api.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_urlpatterns)),
    path('api/schema/', SpectacularAPIView.as_view(patterns=api_urlpatterns), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
