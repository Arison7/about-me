from django.db import models



"""
*Navigational elemenent that holds cards

"""
class Section(models.Model):
    name = models.TextField()
    
"""
*Card model holds it's name as well the section it's assigin to 
TODO: add is_leaf field in order to determinate if card's link goes to section or article
TODO: add url going from the card

"""
class Card(models.Model):
    name = models.TextField()
    is_leaf = models.BooleanField(default=False)
    section = models.ForeignKey('Section',on_delete=models.CASCADE)
    nextSection = models.ForeignKey('Section',on_delete=models.CASCADE,null=True,default=None,related_name="next")
    article = models.ForeignKey('Article',on_delete=models.CASCADE,null=True,default=None)

class Article(models.Model):
    name = models.TextField()

    




