# Projet AMQP avec Node.js, RabbitMQ et MariaDB

Ce projet illustre une implémentation simple d'une file d'attente de messages en utilisant AMQP avec RabbitMQ, une API REST en Node.js, et une base de données MariaDB pour l'enregistrement des utilisateurs et la gestion des logs.

## Prérequis

Avant de démarrer, assurez-vous d'avoir installé Docker et Docker Compose sur votre machine.

## Installation

Clonez le dépôt Git à l'aide de :

```
git clone https://github.com/f4d3l21/api_amqp.git
```

Ensuite, naviguez dans le répertoire du projet :
```
cd chemin/vers/le/projet
```

## Configuration

Démarrage de l'application
Pour démarrer l'application, exécutez :

```
docker-compose up --build
```

Cela va construire les images si nécessaire et démarrer les conteneurs des services définis dans docker-compose.yml.

## Utilisation
Une fois les conteneurs en cours d'exécution, vous pouvez accéder à l'API REST à l'adresse 

#### http://localhost:3000.

Enregistrement d'un nouvel utilisateur
Pour enregistrer un nouvel utilisateur, envoyez une requête POST à /register avec un corps de requête JSON comme suit :

```
json
{
  "username": "nomdutilisateur",
  "email": "email@exemple.com",
  "password": "motdepasse"
}
```

### Interface de gestion RabbitMQ

Vous pouvez accéder à l'interface de gestion RabbitMQ à l'adresse http://localhost:15672.

### MailHog

Pour visualiser les emails interceptés, ouvrez MailHog à l'adresse http://localhost:8025.

## Tests
Pour exécuter les tests, utilisez la commande :


docker-compose exec app npm test
Remplacez npm test par la commande appropriée pour vos tests.

Arrêt de l'application
Pour arrêter et supprimer les conteneurs, exécutez :


docker-compose down
Contribution
Les contributions à ce projet sont les bienvenues. Veuillez envoyer une Pull Request ou ouvrir un problème pour discuter de ce que vous souhaitez changer.


## Auteur

- [f4d3l21]