# Generated by Django 4.2.5 on 2023-09-11 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_rename_imgage_card_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='section',
            name='is_defualt',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]