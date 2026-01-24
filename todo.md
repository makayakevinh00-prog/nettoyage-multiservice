# TODO - Nettoyage Multiservice

## Fonctionnalités principales

- [x] Page d'accueil avec hero section attractive
- [x] Section présentation de l'entreprise
- [x] Section services de nettoyage (résidentiel, commercial, industriel, vitres, etc.)
- [x] Section tarifs ou packages
- [x] Section témoignages clients
- [x] Formulaire de contact fonctionnel
- [x] Section coordonnées et zone d'intervention
- [x] Navigation responsive avec menu mobile
- [x] Footer avec informations de contact
- [x] Design moderne et professionnel avec palette de couleurs appropriée
- [x] Images et icônes pour les services
- [x] Optimisation responsive pour mobile/tablette/desktop

## Mises à jour demandées

- [x] Changer le nom en "ProClean Empire"
- [x] Intégrer le logo ProClean fourni
- [x] Remplacer les images par celles fournies par l'utilisateur
- [x] S'inspirer du design de l'exemple fourni
- [x] Mettre en avant les services: Voiture, Tapis, Terrasse, Balcon
- [x] Adapter la palette de couleurs au bleu ProClean
- [x] Améliorer la hero section avec un style plus moderne

## Nouvelles fonctionnalités à ajouter

- [x] Créer une galerie photos avant/après avec images générées par IA
- [x] Développer un système de réservation en ligne (choix service, date, heure)
- [x] Ajouter une grille tarifaire détaillée par service
- [x] Configurer l'email de contact : makayakevinh00@gmail.com
- [x] Mettre à jour le numéro de téléphone : 06 17 21 22 30
- [x] Intégrer l'envoi d'emails pour les demandes de contact et réservations

## Modifications demandées

- [x] Retirer la section galerie avant/après
- [x] Retirer la section tarifs/prix
- [x] Générer de belles images pour chaque service (automobile, terrasse, tapis, balcon)
- [x] Ajouter le service de jardinage
- [x] Rendre le design plus lumineux et accueillant
- [x] Améliorer l'ergonomie et la fluidité du site
- [x] Conserver le système de réservation

## Nouvelles améliorations UX

- [x] Ajouter les réseaux sociaux (Instagram, TikTok, LinkedIn) dans le footer
- [x] Créer des liens directs vers chaque service avec pré-sélection du formulaire
- [x] Intégrer l'autocomplétion d'adresse avec Google Maps Places API
- [x] Envoyer un email de confirmation automatique au client après réservation
- [x] Ajouter le logo comme favicon (icône dans l'onglet navigateur)
- [x] Rendre le logo cliquable pour retourner en haut de page
- [x] Améliorer la navigation et l'ergonomie générale

## Bugs à corriger

- [x] Corriger l'erreur de chargement de Google Maps Places API dans AddressAutocomplete

## Bugs critiques

- [x] Retirer l'autocomplétion Google Maps (erreurs d'API key) et utiliser un champ standard

## Améliorations UX et SEO

- [x] Ajouter un calendrier interactif pour la sélection de date
- [x] Créer des créneaux horaires prédéfinis (matin, après-midi, soir)
- [x] Intégrer l'autocomplétion d'adresse avec l'API adresse.data.gouv.fr (gratuite)
- [x] Optimiser le SEO (meta tags, descriptions, mots-clés)
- [x] Ajouter un sitemap.xml pour les moteurs de recherche
- [x] Ajouter robots.txt pour le référencement
- [x] Optimiser les balises Open Graph pour les réseaux sociaux

## Intégration Calendrier

- [x] Générer des fichiers .ics pour les rendez-vous
- [x] Envoyer le fichier .ics au client par email
- [x] Permettre au client d'ajouter le rendez-vous à son calendrier en un clic
- [x] Le fichier .ics contient toutes les informations (date, heure, lieu, participants)

## Mise à jour favicon

- [x] Remplacer le favicon par le logo ProClean dans le Management Dashboard
- [x] Optimiser le titre du site pour le référencement Google
- [x] Améliorer la description pour apparaître dans les recherches

## Optimisation LinkedIn et Sécurité

- [x] Analyser la page LinkedIn ProClean Empire
- [x] Préparer du contenu optimisé pour LinkedIn basé sur le site
- [x] Créer le guide LINKEDIN_OPTIMIZATION.md avec toutes les instructions
- [x] Sécuriser le site web (validation stricte des entrées avec Zod)
- [x] Ajouter une protection contre les injections SQL, XSS
- [x] Validation des types TypeScript pour la sécurité
- [x] Créer le document SECURITY.md avec toutes les mesures

## Nouvelles fonctionnalités

- [x] Créer le guide Google My Business complet
- [x] Ajouter un bouton WhatsApp flottant en bas à droite
- [x] Intégrer Google Analytics 4 pour le suivi des visiteurs (guide créé, en attente de l'ID GA4)
- [x] Corriger les bugs du site (suppression de Map.tsx inutilisé)

## Bug critique à corriger

- [x] Corriger l'erreur d'envoi des formulaires de contact et réservation
- [x] Changer l'email vers serviceclient@procleanempire.com partout
- [x] Mettre à jour le nom de domaine vers procleanempire.com
- [x] Configurer l'envoi d'emails vers serviceclient@procleanempire.com
- [x] Vérifier la configuration email avec test SMTP réussi

## Bugs urgents à corriger

- [x] Changer l'email dans le Footer vers serviceclient@procleanempire.com
- [x] Corriger le bug "Une erreur est survenue" lors de la prise de rendez-vous
- [x] Tester le formulaire de réservation en conditions réelles


## Intégration Google Calendar et Stripe

- [x] Configurer Google Calendar API avec Service Account
- [x] Ajouter automatiquement les rendez-vous au calendrier serviceclient@procleanempire.com
- [x] Implémenter le paiement de caution Stripe (25€)
- [x] Créer le formulaire de paiement avec Stripe
- [ ] Ajouter le webhook Stripe pour les paiements confirmés
- [ ] Implémenter la logique de remboursement automatique
- [ ] Tester les paiements avec la clé Stripe fournie
- [ ] Documenter le processus de remboursement pour l'admin


## Corrections critiques demandées

- [x] Ajouter le rendez-vous au calendrier du propriétaire (serviceclient@procleanempire.com)
- [x] Rediriger vers le paiement Stripe après la réservation
- [x] Intégrer HubSpot CRM pour les formulaires et contacts
- [x] Ajouter le tracking Google Ads (AW-17788571669)
- [x] Ajouter Google Analytics 4


## Système de réservation avancé avec options détaillées

- [x] Ajouter les options détaillées pour chaque service (automobile, tapis, terrasse, etc.)
- [x] Implémenter la tarification dynamique basée sur les options choisies
- [x] Créer les calculs de prix en temps réel dans le formulaire
- [x] Intégrer HubSpot pour créer les opportunités avec montants
- [x] Générer les emails de devis personnalisés avec tarifs
- [x] Configurer les rappels HubSpot avec demande de confirmation
- [ ] Ajouter les frais d'annulation (25€ si annulation < 24h)
- [ ] Intégrer le formulaire avancé dans Home.tsx
- [ ] Mettre à jour les routes tRPC pour gérer les options détaillées
- [ ] Tester le flux complet de réservation à paiement
- [ ] Valider l'intégration HubSpot avec les opportunités
