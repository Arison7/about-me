# Generated by Django 4.2.5 on 2023-09-11 18:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_rename_context_article_content'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='description',
            field=models.TextField(default='lorem po relum'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='card',
            name='imgage',
            field=models.ImageField(default=None, upload_to=''),
            preserve_default=False,
        ),
    ]
