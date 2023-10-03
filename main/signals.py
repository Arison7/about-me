from django.dispatch import receiver
from django.db.models.signals import post_save
from main.models import Card,Section,Article
from main.serializers import SectionSerializer



def update_tree(section : Section):
	
	#iterate over all the cards in the section
    for card in section.cards_list.all():
        #if the card points to the article we can add it's origin and finish recursion
        if card.article:
            card.article.origin = card
            card.article.save()
        #alternatively we add origin to section and continue iterating over its cards
        else:
            card.nextSection.origin = card
            card.nextSection.save()
            update_tree(card.nextSection)
        
        
"""
*Whenever any changes are done to card models
both Article and Section models are being updated to have 
correct origin data
"""     
@receiver(post_save,sender = Card)
def update_models_origins(sender,**kwargs):
    #grabs the root of the tree AKA defualt section
	root = Section.objects.filter(is_defualt=True)[0]
	update_tree(section=root)
 