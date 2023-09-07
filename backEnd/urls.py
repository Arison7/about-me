from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from main import views



#*registering views to a router
router = routers.DefaultRouter()
router.register(r'cards', views.CardViewSet)
router.register(r'sections', views.SectionViewSet)
router.register(r'articles', views.ArticleViewSet)









#*including the api routers in the urls
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
