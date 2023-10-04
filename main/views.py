from django.shortcuts import render
from main.models import Section, Card, Article
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from main.serializers import SectionSerializer, CardSerializer, ArticleSerializer, SectionInfoSerializer






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
        serializer = SectionInfoSerializer(Section.objects.filter(is_defualt=True)[0])
        return Response(serializer.data)
    

    @action(detail=True, methods=['GET'],url_path="history")
    def get_history(self,request,*args,**kwargs):
        return build_history(self,request,*args,**kwargs)
        
class ArticleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Articles to be viewed or edited.
    """
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    
    @action(detail=True, methods=['GET'],url_path="history")
    def get_history(self,request,*args,**kwargs):
        return build_history(self,request,*args,**kwargs)

def build_history(self,request,*args,**kwargs):
    history = []
    obj = self.get_object()
    recursive_history(obj.origin,history,request)
    return Response(reversed(history))

def recursive_history(card,history,request):
    if card == None:
        return
    card_data = CardSerializer(card,context={'request': request}).data
    history.append({
        "url" : "/sections/" + str(card_data['section']['pk']),
        "name" : card_data['section']['name'],
        "image" : card_data['image'],
    }) 
    recursive_history(card.section.origin,history,request)


#renders react's app
def mainWindowView(request):
    return render(request, 'index.html')