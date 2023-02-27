--------------------------------------------------------DESCRIPTION-------------------------------------------------------------------

Projet WebMapping ENSG ING 2 2023

Elève contributeur : Tristan HILLAIRET

------------------------------------------------------OBJECTIFS ET CDG----------------------------------------------------------------

Objectif : Construire les outils permettant à un utilisateur d'effectuer une recherche sur les entrées disponibles et les afficher sur une carte.

Cahier des charges : 
- Sélection des entités sur la carte (marker)

- Sélection des entrées dans une liste contenant les 20 dernières entrées chargées.

- La Sélection provoque un zoom de la carte sur le marker correspondant.
                     
- 2 boutons Forts et Faibles devant afficher les Pokémons opposés à celui sélectionné.

----------------------------------------------------DESCRIPTION DU CONTENU---------------------------------------------------------- 

Ce dossier contient :

Une page HTML sur laquelle on affiche un carte leaflet, une barre de saisie de texte et 4 boutons (Select, Reset, Strong, Weak) qui permettent respectivement de sélectionner un pokémon saisi, reset la sélection, sélectionner les pokémons faibles face au pokémon sélectionné, forts face au pokémon sélcetionné

Un fichier JavaScript qui permet de :
      -1 Initialiser la carte de la page HTML
      -2 Initailiser tous les layers utilisés lors de l'utilisation de la page
      -3 Charger les données de la bdd pokémons à l'ouverture de la page
      -4 Initialiser les markers sur la carte
      -5 Sélectionner tous les pokémons semblables à une requête de l'utilisateur
      -6 Sélectonner un pokémonnpa saisie de texte dans la barre de recherche
      -7 Faire fonctionner les boutons de la page HTML
      
Un fichier PHP qui permet d'effectuer les requête suivante : 
      -1 Faire un lien vers la bdd
      -2 Sélectionner tous les pokémons de la bdd
      -3 Sélectionner tous les pokémons semblable à une saisie utilisateur
      -4 Sélectionner tous les pokémons du pokédex
      -5 Sélectionner le type d'un pokémon en input
      -6 Sélectionner tous les pokémons d'un type en input

Un fichier CSS qui permet d'ordonner la page.
