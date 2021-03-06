# Generated by Django 3.2 on 2022-04-27 11:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='user',
            fields=[
                ('userId', models.AutoField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=50, unique=True)),
                ('password', models.CharField(max_length=20)),
                ('type', models.CharField(choices=[('admin', 'Admin'), ('player', 'Player'), ('coach', 'Coach')], default='player', max_length=20)),
            ],
        ),
    ]
