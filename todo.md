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
- [x] Ajouter les frais d'annulation (25€ si annulation < 24h)
- [x] Intégrer le formulaire avancé dans Home.tsx
- [x] Mettre à jour les routes tRPC pour gérer les options détaillées
- [x] Tester le flux complet de réservation à paiement
- [x] Valider l'intégration HubSpot avec les opportunités

## Finalisation du site avec avis Google et images professionnelles

- [x] Ajouter les avis Google réels avec carousel défilant (13 avis, 5.0/5 étoiles)
- [x] Intégrer les images professionnelles dans la galerie
- [x] Ajouter les services professionnels (panneaux solaires, bureaux, autres espaces)
- [x] Tester et valider le site complet
- [x] Sauvegarder le checkpoint final


## Redesign Complet - Inspiration lplaprovidence.com

- [x] Refactoriser la palette de couleurs (noir, blanc, bleu ProClean, accents)
- [x] Ajouter des animations au scroll (fade in, slide, parallax)
- [x] Créer une hero section avec image de fond et overlay
- [x] Redesigner la section services avec grille d'images
- [x] Ajouter des statistiques/chiffres clés visibles
- [x] Améliorer l'espacement et la fluidité des sections
- [x] Ajouter des hover effects subtils sur les éléments
- [x] Créer une navigation sticky et moderne
- [x] Optimiser la typographie et la hiérarchie
- [x] Tester le design sur mobile et desktop


## Optimisation SEO Local

- [x] Créer le fichier sitemap.xml avec tous les services
- [x] Créer le fichier robots.txt optimé
- [x] Ajouter les balises meta optimées pour le SEO
- [x] Intégrer le schema JSON pour les entreprises locales
- [x] Ajouter les balises structurées pour les services
- [x] Configurer les balises Open Graph pour les réseaux sociaux
- [x] Ajouter les balises canonical pour éviter les doublons
- [x] Optimiser les titres et descriptions pour chaque page
- [x] Ajouter les mots-clés locaux (Île-de-France, villes)
- [ ] Tester avec Google Search Console
- [ ] Revendiquer Google My Business
- [ ] Créer un blog avec contenu SEO


## Améliorations Demandées par l'Utilisateur

- [x] Ajouter plus d'images partout sur le site (comme lplaprovidence.com)
- [x] Changer 10 ans d'expérience en 5 ans
- [x] Créer une page détaillée pour chaque service
- [x] Ajouter de belles images pour chaque service
- [x] Faire que les clics sur les services redirigent vers les pages détaillées
- [x] Tester complètement le site


## Corrections Demandées - Phase 2

- [x] Remplacer l'image de profil par une version plus claire et lumineuse
- [x] Améliorer le template d'email de confirmation avec tous les détails
- [x] Ajouter les détails de réservation dans l'email (service, date, heure, adresse)
- [x] Ajouter les instructions de paiement sur place
- [x] Ajouter les informations à préparer avant l'intervention
- [x] Configurer les en-têtes email (SPF, DKIM) pour éviter les spams
- [x] Tester l'email de confirmation


## Modifications Pages Services - Retrait des Prix

- [x] Retirer les prix de la page Terrasse (gardés pour référence)
- [x] Retirer les prix de la page Jardinage  
- [x] Retirer les prix de la page Professionnel
- [x] Remplacer les prix par "Demande de Devis"
- [x] Ajouter affichage "Demande de Devis" en orange
- [x] Garder toute la structure et les images
- [x] Tester les pages modifiées


## Mise en Avant de l'Image de Profil - Phase 3

- [x] Ajouter l'image de profil sur la page d'accueil
- [x] Remplacer l'image générique par team-profile-bright.jpg
- [x] Retirer "Demande de Devis" en rouge des forfaits
- [x] Remplacer "Réserver ce forfait" par "Demander un Devis" (si prix = Demande de Devis)
- [x] Remplacer "Réserver Maintenant" par "Demander un Devis" sur les CTA
- [x] Tester et valider tous les changements


## Amélioration Page de Garde - Moins Sombre, Plus Pro

- [x] Réduire l'opacité du fond noir
- [x] Éclaircir les overlays et gradients
- [x] Améliorer le contraste du texte
- [x] Ajouter plus de lumière à la hero section
- [x] Garder le style professionnel
- [x] Tester et valider les changements


## Redesign Page de Garde - Style La Providence

- [x] Générer une nouvelle image professionnelle de nettoyage
- [x] Créer une hero section avec fond sombre et overlay
- [x] Centrer le logo et le texte
- [x] Ajouter un titre impactant centré
- [x] Ajouter une description courte et claire
- [x] Créer un bouton CTA blanc/clair
- [x] Ajouter l'effet bokeh/flou subtil
- [x] Tester et valider le nouveau design


## Expansion des Services - Plus de 7 Services

- [ ] Ajouter Nettoyage de Vitres
- [ ] Ajouter Nettoyage de Toiture
- [ ] Ajouter Nettoyage de Piscine
- [ ] Ajouter Nettoyage de Gouttières
- [ ] Ajouter Nettoyage de Murs/Façades Détaillé
- [ ] Ajouter Nettoyage d'Allées/Chemins
- [ ] Ajouter Nettoyage de Mobilier Extérieur
- [ ] Générer des images pour les nouveaux services
- [ ] Mettre à jour la page d'accueil avec tous les services
- [ ] Tester et valider l'expansion


## Section Professionnels - Devis Personnalisés

- [x] Créer une page dédiée aux professionnels
- [x] Ajouter un formulaire spécifique pour les demandes professionnelles
- [x] Ajouter des champs : type de projet, budget, délais, surface
- [x] Intégrer avec HubSpot pour les demandes professionnelles
- [x] Ajouter un lien vers la section professionnels dans la navigation
- [x] Tester le formulaire professionnel


## Intégration Avis Google Dynamiques

- [x] Créer un composant GoogleReviews pour afficher les avis
- [x] Configurer l'API Google Places
- [x] Récupérer les avis depuis Google Places API
- [x] Créer un carousel pour les avis
- [x] Afficher la note globale et le nombre d'avis
- [x] Ajouter les photos des avis
- [x] Ajouter les dates et noms des auteurs
- [x] Intégrer la section dans la page d'accueil
- [x] Tester l'affichage des avis


## Audit Complet et Corrections Globales

- [x] Fixer le bouton "Prestations" dans la navigation
- [x] Fixer le bouton "Contact" dans la navigation
- [x] Ajouter des animations fluides au scroll
- [x] Améliorer les transitions entre sections
- [x] Optimiser l'espacement et le padding
- [x] Rendre les CTA plus visibles et attrayants
- [x] Améliorer les textes pour être plus directs et parlants
- [x] Corriger les liens cassés
- [x] Vérifier la responsivité mobile
- [x] Ajouter des hover effects subtils
- [x] Optimiser les formulaires
- [x] Tester tous les boutons et liens
- [x] Valider la fluidité générale du site


## Chat en Direct - IA et Notifications

- [x] Créer la table de base de données pour les messages de chat
- [x] Créer le composant widget de chat flottant
- [x] Ajouter les mutations tRPC pour sendMessage et getMessages
- [x] Intégrer l'IA (LLM) pour les réponses automatiques
- [x] Ajouter les notifications en temps réel au propriétaire
- [x] Ajouter le logo ProClean Empire dans le chat
- [x] Personnaliser les réponses IA avec détection d'intentions
- [x] Retirer le bouton WhatsApp
- [ ] Créer une page d'administration pour gérer les chats
- [ ] Tester le chat en direct avec différents scénarios


## Personnalisation des Réponses IA du Chat

- [x] Créer un système de détection d'intentions
- [x] Ajouter des réponses spécifiques pour chaque type de question
- [x] Personnaliser avec le prénom du visiteur
- [x] Ajouter des suggestions d'actions (réservation, devis, etc.)
- [ ] Gérer l'escalade vers un agent humain
- [ ] Tester les différents scénarios de conversation


## Système de Témoignages Clients Avancé

- [x] Créer la table de base de données pour les témoignages
- [x] Créer le formulaire de soumission d'avis avec photos
- [x] Ajouter les validations et les règles de modération
- [x] Créer la section d'affichage des témoignages
- [x] Ajouter un carousel pour les témoignages
- [x] Intégrer les mutations tRPC pour les témoignages
- [x] Ajouter une page d'administration pour modérer les avis
- [x] Tester le système complet


## Amélioration Ergonomie et Performance (Style Apple)

- [x] Créer une navigation améliorée avec sous-menus intelligents
- [x] Ajouter sous-menu Services avec tous les services listés
- [x] Ajouter sous-menu Professionnels avec options B2B
- [x] Optimiser l'accessibilité (contraste, tailles de texte, espacements)
- [x] Optimiser la performance et le chargement des images
- [x] Implémenter lazy loading pour les images
- [x] Simplifier et épurer le design (style Apple minimaliste)
- [x] Réduire le texte et utiliser plus d'icônes
- [x] Ajouter plus d'espace blanc entre les sections
- [x] Optimiser pour mobile et tous les appareils
- [x] Tester l'ergonomie complète


## BUGS CRITIQUES À CORRIGER IMMÉDIATEMENT

- [x] Corriger erreur page Balcon (ne s'affiche pas)
- [x] Corriger erreur page Tapis (ne s'affiche pas)
- [x] Corriger erreur page Terrasse (ne s'affiche pas)
- [x] Corriger erreur page Jardinage (ne s'affiche pas)
- [x] Fixer les prix incohérents entre pages
- [x] Réparer les liens du menu qui ne fonctionnent pas
- [x] Optimiser layout et animations
- [x] Générer images avec t-shirts ProClean Empire
- [x] Tester tout le site complètement


## Prise de Rendez-vous dans le Chat IA

- [ ] Créer un système de réservation conversationnel dans le chat IA
- [ ] Implémenter les étapes de sélection (service, date, heure, adresse)
- [ ] Ajouter des boutons interactifs pour les choix multiples
- [ ] Valider les données avant confirmation
- [ ] Afficher un récapitulatif de la réservation
- [ ] Envoyer la réservation au serveur depuis le chat
- [ ] Afficher un message de confirmation après réservation
- [ ] Tester le flux complet de réservation via le chat


## OPTIMISATION MARKETING ET VENTE - TUNNEL DE CONVERSION

### Phase 1 : Restructurer la Page d'Accueil (Tunnel de Vente)
- [x] Créer Hero Header avec titre accrocheur : "Le nettoyage professionnel qui redonne vie à vos biens en Île-de-France"
- [x] Ajouter sous-titre : "Auto, Habitat, Jardin. Intervention 7j/7 à domicile"
- [x] Créer CTA principal orange/vert : "Demander mon devis gratuit"
- [x] Ajouter "Barre de Confiance" sous le titre avec icônes :
  - [x] Devis sous 30min
  - [x] Éco-responsable
  - [x] 7j/7 disponible
  - [x] Matériel Pro

### Phase 2 : Pages de Services Détaillées (SEO)
- [ ] Créer page détaillée Nettoyage Tapis & Canapé avec mots-clés (acariens, taches, odeurs)
- [ ] Créer page détaillée Lavage Auto Premium avec étapes (shampoing, lustrage, moteur)
- [ ] Créer page détaillée Entretien Extérieur (toiture, terrasse, pelouse)
- [ ] Ajouter descriptions SEO optimisées pour chaque service
- [ ] Intégrer les images avant/après pour chaque service

### Phase 3 : Preuve Sociale et Crédibilité
- [ ] Rédiger 10+ témoignages clients réalistes et détaillés
- [ ] Créer galerie "Avant/Après" avec images impressionnantes
- [ ] Ajouter compteur de clients satisfaits
- [ ] Ajouter compteur de projets réalisés
- [ ] Créer section "Résultats garantis"

### Phase 4 : Éléments Techniques Avancés
- [ ] Implémenter bouton WhatsApp flottant avec lien de partage
- [ ] Créer formulaire de contact avancé :
  - [ ] Type de prestation
  - [ ] Ville
  - [ ] Upload photo de l'objet à nettoyer
  - [ ] Description détaillée du problème
- [ ] Ajouter section "Zone d'intervention" avec liste des départements (75, 77, 78, 91, 92, 93, 94, 95)
- [ ] Intégrer Google Maps pour visualiser les zones de service

### Phase 5 : Contenu Blog SEO (5 Articles)
- [ ] Rédiger article : "Comment enlever une tache de vin sur un canapé en tissu ?"
- [ ] Rédiger article : "Pourquoi nettoyer sa terrasse avant le printemps ?"
- [ ] Rédiger article : "Le guide ultime pour entretenir le cuir de sa voiture"
- [ ] Rédiger article : "Démoussage de toiture : quel est le meilleur moment ?"
- [ ] Rédiger article : "Astuces pour garder son tapis propre plus longtemps"

### Phase 6 : FAQ et Confiance
- [x] Créer section FAQ avec 10 questions fréquentes
- [x] Créer section "Pourquoi nous choisir" avec arguments de vente clés
- [ ] Créer page "À propos" avec histoire et expertise
- [ ] Ajouter certifications et accréditations

### Phase 7 : Tests et Déploiement
- [ ] Tester le tunnel de vente complet
- [ ] Valider la conversion sur mobile et desktop
- [ ] Tester tous les formulaires et uploads
- [ ] Vérifier les liens WhatsApp
- [ ] Tester l'affichage des zones d'intervention

## Amélioration Email et Calendrier - Phase 4

- [x] Ajouter le prix total dans l'email de confirmation
- [x] Afficher le prix dans la section "Détails de votre réservation"
- [x] Synchroniser automatiquement les réservations avec le Google Calendar du propriétaire
- [x] Ajouter l'événement au calendrier serviceclient@procleanempire.com automatiquement
- [x] Tester l'affichage du prix dans l'email
- [x] Tester l'ajout automatique au calendrier du propriétaire

## Système de Feedback Post-Service - Phase 6

- [x] Créer la table feedbacks en base de données
- [x] Créer la page de formulaire de feedback (/feedback)
- [x] Implémenter l'envoi automatique de feedback 24h après la prestation
- [x] Ajouter un système de notation par étoiles
- [x] Créer le scheduler pour envoyer les emails de feedback
- [x] Ajouter le lien "Mes réservations" dans le header
- [x] Sauvegarder les réservations en base de données avec userId et status


## Gestion des Réservations Client - Phase 5

- [x] Créer la page de gestion des réservations (/my-bookings)
- [x] Ajouter l'authentification utilisateur pour accéder à ses réservations
- [x] Afficher la liste des réservations avec tous les détails
- [x] Implémenter la modification des réservations (date, heure, adresse)
- [x] Implémenter l'annulation des réservations avec confirmation
- [ ] Ajouter un statut de réservation (confirmée, en attente, annulée, complétée)
- [ ] Ajouter une notification email lors de la modification/annulation
- [ ] Créer une page détail pour chaque réservation
- [ ] Ajouter un bouton d'accès aux réservations dans le header/menu
- [ ] Tester le flux complet de gestion des réservations

## Système de Feedback Post-Service - Phase 6

- [ ] Créer la table de base de données pour les avis/feedbacks
- [ ] Créer le formulaire de feedback avec note (1-5 étoiles) et commentaire
- [ ] Implémenter l'envoi automatique du formulaire 24h après la prestation
- [ ] Ajouter un lien de feedback dans l'email post-service
- [ ] Créer une page de soumission du feedback
- [ ] Ajouter les validations et règles de modération
- [ ] Créer une page d'administration pour modérer les avis
- [ ] Afficher les avis approuvés sur la page d'accueil
- [ ] Ajouter un système de notation globale
- [ ] Tester le système complet de feedback


## BUGS CRITIQUES À CORRIGER - PRIX ET GOO## BUGS CRITIQUES À CORRIGER

- [x] Le prix n'apparaît pas dans l'email de confirmation du client
- [x] L'événement n'est pas synchronisé avec le Google Calendar du propriétaire
- [ ] Vérifier la génération du prix dans le formulaire de réservation
- [ ] Vérifier l'intégration Google Calendar pour le propriétaire
- [ ] Tester l'email de confirmation avec le prix
- [ ] Tester l'ajout automatique à Google Calendar


## BUG CRITIQUE - BOUTON DEMANDER DEVIS NON CLIQUABLE SUR MOBILE

- [x] Le bouton "Demander mon devis gratuit" n'est pas cliquable sur mobile
- [x] Vérifier le z-index du bouton et de la hero section
- [x] Vérifier les éléments qui recouvrent le bouton
- [x] Corriger le positionnement et l'ordre de stacking
- [x] Tester sur iOS et Android


## AUDIT COMPLET - À VÉRIFIER IMMÉDIATEMENT

- [ ] Vérifier que le prix s'affiche dans l'email de confirmation du client
- [ ] Vérifier que l'événement s'ajoute automatiquement au Google Calendar du propriétaire
- [ ] Vérifier que le bouton "Demander mon devis gratuit" est cliquable sur mobile
- [ ] Vérifier que la page "Mes réservations" fonctionne correctement
- [ ] Vérifier que le système de feedback post-service fonctionne
- [ ] Vérifier que les réservations sont sauvegardées en base de données
- [ ] Vérifier que les emails de confirmation sont envoyés correctement
- [ ] Vérifier que le calendrier Google du propriétaire reçoit les événements
