from django.shortcuts import render
from main.models import Section, Card
from rest_framework import viewsets
from rest_framework import permissions
from main.serializers import SectionSerializer, CardSerializer


class CardViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Cards to be view
    """
    queryset = Card.objects.all()
    serializer_class = CardSerializer


class SectionViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows Sections to be viewed or edited.
    """
    queryset = Section.objects.all()
    serializer_class = SectionSerializer


