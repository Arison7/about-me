# Generated by Django 4.2.5 on 2023-09-08 14:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_rename_content_article_context'),
    ]

    operations = [
        migrations.RenameField(
            model_name='article',
            old_name='context',
            new_name='content',
        ),
    ]
