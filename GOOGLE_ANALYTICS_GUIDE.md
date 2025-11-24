# Guide d'installation - Google Analytics 4 (GA4)

## 📊 Pourquoi installer Google Analytics 4 ?

✅ **Suivre le trafic** : Nombre de visiteurs, pages vues, durée des sessions  
✅ **Comprendre vos visiteurs** : Localisation, appareils utilisés, comportement  
✅ **Mesurer les conversions** : Formulaires soumis, appels téléphoniques, réservations  
✅ **Optimiser votre stratégie** : Identifier ce qui fonctionne et ce qui ne fonctionne pas  
✅ **Gratuit** : Aucun coût pour les petites et moyennes entreprises

---

## 🚀 Étape 1 : Créer un compte Google Analytics

### 1.1 Accéder à Google Analytics

1. Allez sur **https://analytics.google.com**
2. Cliquez sur **"Commencer"** ou **"Créer un compte"**
3. Connectez-vous avec votre compte Google (makayakevinh00@gmail.com)

### 1.2 Créer une propriété

**Nom du compte** : `ProClean Empire`

**Nom de la propriété** : `Site Web ProClean Empire`

**Fuseau horaire** : `(GMT+01:00) Paris`

**Devise** : `Euro (EUR - €)`

**Catégorie du secteur** : `Services professionnels`

**Taille de l'entreprise** : `Petite entreprise (1-10 employés)`

### 1.3 Objectifs commerciaux

Cochez les cases suivantes :
- ✅ Générer des prospects
- ✅ Augmenter les ventes en ligne ou hors ligne
- ✅ Augmenter l'engagement des utilisateurs

---

## 📋 Étape 2 : Configurer le flux de données

### 2.1 Créer un flux de données Web

1. Cliquez sur **"Flux de données Web"**
2. Renseignez les informations :

**URL du site web** : `https://procleanempire-multiservice.manus.space`

**Nom du flux** : `Site Web ProClean`

**Mesure améliorée** : ✅ **Activée** (recommandé)

3. Cliquez sur **"Créer un flux"**

### 2.2 Récupérer l'ID de mesure

Après la création, vous verrez :

```
ID de mesure : G-XXXXXXXXXX
```

⚠️ **Important** : Notez cet ID, vous en aurez besoin pour l'étape suivante !

---

## 🔧 Étape 3 : Installer le code sur votre site

### Option 1 : Installation manuelle (recommandée)

Je vais ajouter le code Google Analytics dans votre fichier `index.html`.

**Voici le code à ajouter** (remplacez `G-XXXXXXXXXX` par votre vrai ID) :

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Option 2 : Via Google Tag Manager (avancé)

Si vous voulez plus de flexibilité, utilisez Google Tag Manager. Je peux vous guider si nécessaire.

---

## 📊 Étape 4 : Configurer les événements importants

### 4.1 Événements automatiques (déjà actifs)

Avec la "Mesure améliorée" activée, GA4 suit automatiquement :
- ✅ Pages vues
- ✅ Défilements (scrolls)
- ✅ Clics sortants
- ✅ Recherches sur le site
- ✅ Engagement vidéo
- ✅ Téléchargements de fichiers

### 4.2 Événements personnalisés à configurer

Je vais ajouter le suivi pour :

**1. Soumission du formulaire de devis**
```javascript
gtag('event', 'generate_lead', {
  'event_category': 'Formulaire',
  'event_label': 'Devis gratuit',
  'value': 1
});
```

**2. Soumission du formulaire de réservation**
```javascript
gtag('event', 'conversion', {
  'event_category': 'Formulaire',
  'event_label': 'Réservation intervention',
  'value': 1
});
```

**3. Clic sur le numéro de téléphone**
```javascript
gtag('event', 'phone_call', {
  'event_category': 'Contact',
  'event_label': '06 17 21 22 30',
  'value': 1
});
```

**4. Clic sur WhatsApp**
```javascript
gtag('event', 'whatsapp_click', {
  'event_category': 'Contact',
  'event_label': 'WhatsApp',
  'value': 1
});
```

**5. Clic sur email**
```javascript
gtag('event', 'email_click', {
  'event_category': 'Contact',
  'event_label': 'makayakevinh00@gmail.com',
  'value': 1
});
```

---

## 🎯 Étape 5 : Définir les conversions

### 5.1 Marquer les événements comme conversions

1. Dans Google Analytics, allez dans **"Événements"**
2. Trouvez les événements suivants et cliquez sur **"Marquer comme conversion"** :
   - `generate_lead` (Devis)
   - `conversion` (Réservation)
   - `phone_call` (Appel téléphonique)
   - `whatsapp_click` (WhatsApp)

### 5.2 Objectifs de conversion

Définissez vos objectifs mensuels :
- **Devis** : 20-30 par mois
- **Réservations** : 10-15 par mois
- **Appels** : 30-50 par mois
- **Messages WhatsApp** : 20-30 par mois

---

## 📈 Étape 6 : Créer des rapports personnalisés

### 6.1 Rapport "Acquisition de clients"

1. Allez dans **"Exploration"** → **"Créer une exploration"**
2. Sélectionnez **"Exploration libre"**
3. Ajoutez les dimensions :
   - Source / Support
   - Ville
   - Appareil
4. Ajoutez les métriques :
   - Utilisateurs
   - Sessions
   - Conversions
   - Taux de conversion

### 6.2 Rapport "Parcours utilisateur"

1. Créez une nouvelle exploration
2. Sélectionnez **"Exploration de l'entonnoir"**
3. Définissez les étapes :
   - Étape 1 : Page d'accueil
   - Étape 2 : Section services
   - Étape 3 : Formulaire de contact
   - Étape 4 : Soumission du formulaire

### 6.3 Rapport "Performance des services"

Suivez quel service génère le plus d'intérêt :
- Nettoyage automobile
- Nettoyage de tapis
- Nettoyage de terrasse
- Nettoyage de balcon
- Jardinage

---

## 🔔 Étape 7 : Configurer les alertes

### 7.1 Alertes personnalisées

Créez des alertes pour être notifié :

**Alerte 1 : Baisse de trafic**
- Si les sessions diminuent de plus de 30% par rapport à la semaine précédente

**Alerte 2 : Pic de conversions**
- Si les conversions augmentent de plus de 50%

**Alerte 3 : Problème technique**
- Si le taux de rebond dépasse 80%

### 7.2 Rapports hebdomadaires par email

1. Allez dans **"Bibliothèque"** → **"Collections"**
2. Créez une collection avec vos rapports favoris
3. Activez l'envoi par email chaque lundi matin

---

## 📱 Étape 8 : Installer l'application mobile

### 8.1 Télécharger l'app

- **iOS** : https://apps.apple.com/app/google-analytics/id881599038
- **Android** : https://play.google.com/store/apps/details?id=com.google.android.apps.giant

### 8.2 Configurer les notifications

Activez les notifications pour :
- ✅ Pics de trafic
- ✅ Nouvelles conversions
- ✅ Anomalies détectées

---

## 🎓 Étape 9 : Comprendre les métriques clés

### 9.1 Métriques de trafic

**Utilisateurs** : Nombre de visiteurs uniques  
**Sessions** : Nombre de visites (un utilisateur peut avoir plusieurs sessions)  
**Pages vues** : Nombre total de pages consultées  
**Durée moyenne des sessions** : Temps passé sur le site  
**Taux de rebond** : % de visiteurs qui quittent sans interaction

### 9.2 Métriques d'acquisition

**Source** : D'où viennent vos visiteurs (Google, Facebook, direct, etc.)  
**Support** : Type de trafic (organic, cpc, referral, social, etc.)  
**Campagne** : Nom de vos campagnes marketing

### 9.3 Métriques de conversion

**Conversions** : Nombre d'objectifs atteints  
**Taux de conversion** : % de visiteurs qui convertissent  
**Valeur de conversion** : Valeur estimée de chaque conversion

### 9.4 Métriques d'engagement

**Engagement moyen** : Temps passé activement sur le site  
**Pages par session** : Nombre de pages vues par visite  
**Événements par session** : Nombre d'interactions par visite

---

## 📊 Étape 10 : Analyser et optimiser

### 10.1 Questions à se poser chaque semaine

1. **D'où viennent mes visiteurs ?**
   - Google Search ? Réseaux sociaux ? Recommandations ?
   
2. **Quelles pages sont les plus populaires ?**
   - Services ? Contact ? Réservation ?
   
3. **Quel est mon taux de conversion ?**
   - Combien de visiteurs deviennent des clients ?
   
4. **Quels appareils utilisent mes visiteurs ?**
   - Mobile ? Desktop ? Tablette ?
   
5. **Quelles villes génèrent le plus de trafic ?**
   - Paris ? Banlieue ? Départements limitrophes ?

### 10.2 Actions d'optimisation

**Si le taux de rebond est élevé (>70%)** :
- Améliorer la vitesse de chargement
- Rendre le site plus attractif
- Clarifier votre offre

**Si peu de conversions** :
- Simplifier les formulaires
- Ajouter plus de preuves sociales (avis)
- Mettre en avant les appels à l'action

**Si le trafic est faible** :
- Améliorer le SEO
- Publier plus sur les réseaux sociaux
- Lancer des campagnes Google Ads

---

## 🔒 Étape 11 : Conformité RGPD

### 11.1 Bannière de consentement

⚠️ **Obligatoire en France** : Vous devez demander le consentement avant d'activer Google Analytics.

**Solutions recommandées** :
- Axeptio (français, facile)
- Cookiebot (international)
- Tarteaucitron (gratuit, open source)

### 11.2 Politique de confidentialité

Ajoutez une page "Politique de confidentialité" mentionnant :
- Utilisation de Google Analytics
- Données collectées (anonymes)
- Droit de refus et de suppression
- Contact pour exercer ses droits

---

## ✅ Checklist finale

Avant de considérer l'installation comme terminée :

- [ ] Compte Google Analytics 4 créé
- [ ] Propriété "ProClean Empire" configurée
- [ ] Flux de données Web ajouté
- [ ] ID de mesure récupéré (G-XXXXXXXXXX)
- [ ] Code GA4 installé dans index.html
- [ ] Événements personnalisés configurés
- [ ] Conversions marquées
- [ ] Rapports personnalisés créés
- [ ] Alertes configurées
- [ ] Application mobile installée
- [ ] Bannière de consentement ajoutée (RGPD)
- [ ] Politique de confidentialité rédigée

---

## 🎯 Résultats attendus

### Après 1 semaine
- Premiers visiteurs trackés
- Identification des sources de trafic principales
- Premières conversions mesurées

### Après 1 mois
- Tendances claires identifiées
- Taux de conversion établi
- Optimisations basées sur les données

### Après 3 mois
- Historique suffisant pour comparer
- ROI marketing mesurable
- Stratégie data-driven en place

---

## 📞 Besoin d'aide ?

Si vous rencontrez des difficultés :
1. Centre d'aide Google Analytics : https://support.google.com/analytics
2. Académie Google Analytics (formations gratuites)
3. Communauté Google Analytics

---

**Créé le** : 23 novembre 2025  
**Pour** : ProClean Empire  
**Objectif** : Suivre et optimiser les performances du site web

---

## 🚨 Note importante

**Je ne peux pas installer Google Analytics directement** car vous devez d'abord :
1. Créer votre compte GA4
2. Récupérer votre ID de mesure (G-XXXXXXXXXX)
3. Me fournir cet ID

**Une fois que vous avez l'ID**, je pourrai l'intégrer automatiquement dans votre site !

Pour l'instant, je marque cette tâche comme "en attente de votre ID GA4".
