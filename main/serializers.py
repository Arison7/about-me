from rest_framework import serializers
from main.models import Section, Card, Article





class SectionInfoSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Section
        fields = ['url','pk','name']
        

class CardSerializer(serializers.HyperlinkedModelSerializer):
    destination = serializers.SerializerMethodField(read_only = True)
    section = SectionInfoSerializer(read_only = True)
    class Meta:
        model = Card
        fields = ['url', 'name','description','section','destination','nextSection','article','image']
        extra_kwargs = {
            'nextSection': {'write_only': True},
            'article': {'write_only':True}
        }
        
    def get_destination(self,obj):
        if (obj.article != None):
            return f'/articles/{obj.article.id}' 
        if (obj.nextSection != None):
            return f'/sections/{obj.nextSection.id}'
        #&edge case scenario technically should never occour. 
        #&Only possible if the was a mistake during model creation.
        return None
        


class SectionSerializer(serializers.HyperlinkedModelSerializer):
    cards_list = CardSerializer(read_only = True,many =True)

    class Meta:
        model = Section
        fields = ['url', 'name','origin','cards_list','is_defualt']
        extra_kwargs = {
            "is_defualt" : {"write_only" : True}

        }




class ArticleSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Article
        fields = ['url','name','origin','content']

        


    



