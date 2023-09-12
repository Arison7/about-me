from django.shortcuts import render
from main.models import Section, Card, Article
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from main.serializers import SectionSerializer, CardSerializer, ArticleSerializer


#todo take care of permissions  
class CardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Cards to be view
    """
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def perform_create(self, serializer):
        serializer.validated_data['image'] = 'static/' + serializer.validated_data['image']
        serializer.save()


class SectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Sections to be viewed or edited.
    """
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

    @action(detail=False,methods=['GET'], url_path="default")
    def get_default(self, request, *args, **kwargs):
        serializer = self.get_serializer( Section.objects.filter(is_defualt=True)[0])
        return Response(serializer.data)

    



class ArticleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Articles to be viewed or edited.
    """
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer



#renders react's app
def mainWindowView(request):
    return render(request, 'index.html')