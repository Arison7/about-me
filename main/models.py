from django.db import models



"""
*Navigational elemenent that holds cards

"""
class Section(models.Model):
    name = models.TextField()
    is_defualt = models.BooleanField()
    def __str__(self):
        return self.name
    
"""
*Card model holds it's name as well the section it's assigin to 

"""
class Card(models.Model):
    name = models.TextField()
    description = models.TextField()
    image = models.TextField()
    section = models.ForeignKey('Section',on_delete=models.CASCADE, related_name="cards_list")
    nextSection = models.ForeignKey('Section',on_delete=models.CASCADE,null=True,default=None,related_name="next")
    article = models.ForeignKey('Article',on_delete=models.CASCADE,null=True,default=None)
    def __str__(self,obj):
        return self.name

class Article(models.Model):
    name = models.TextField()
    content = models.TextField()


    def __str__(self):
        return self.name




