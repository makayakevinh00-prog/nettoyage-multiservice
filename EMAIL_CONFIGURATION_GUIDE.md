# Guide de Configuration - Email Professionnel serviceclient@procleanempire.com

## 🎯 Objectif

Configurer l'envoi d'emails depuis **serviceclient@procleanempire.com** pour recevoir toutes les demandes de contact et réservations sur cette adresse professionnelle.

---

## 📋 Informations nécessaires

Pour configurer l'envoi d'emails, j'ai besoin des informations SMTP de votre hébergeur de domaine :

### Informations SMTP requises :

1. **Serveur SMTP** (host) : `smtp.votre-hebergeur.com`
2. **Port SMTP** : généralement `587` (TLS) ou `465` (SSL)
3. **Nom d'utilisateur** : `serviceclient@procleanempire.com`
4. **Mot de passe** : Le mot de passe de cette adresse email
5. **Sécurité** : `TLS` ou `SSL`

---

## 🔍 Comment obtenir ces informations ?

### Option 1 : Vous avez acheté le domaine chez un hébergeur

Si vous avez acheté **procleanempire.com** chez un hébergeur (OVH, Hostinger, Ionos, etc.), suivez ces étapes :

#### Pour OVH :
1. Connectez-vous à votre espace client OVH
2. Allez dans **"Emails"** → **"Emails"**
3. Cliquez sur votre domaine `procleanempire.com`
4. Cliquez sur **"Guides de configuration"**
5. Notez les paramètres SMTP :
   - Serveur SMTP : `ssl0.ovh.net`
   - Port : `587` (TLS) ou `465` (SSL)
   - Utilisateur : `serviceclient@procleanempire.com`

#### Pour Hostinger :
1. Connectez-vous à hPanel
2. Allez dans **"Emails"**
3. Cliquez sur **"Configurer"** à côté de votre email
4. Notez les paramètres SMTP :
   - Serveur SMTP : `smtp.hostinger.com`
   - Port : `587`
   - Utilisateur : `serviceclient@procleanempire.com`

#### Pour Ionos :
1. Connectez-vous à votre espace client Ionos
2. Allez dans **"Email & Office"**
3. Cliquez sur **"Paramètres SMTP"**
4. Notez les informations :
   - Serveur SMTP : `smtp.ionos.fr`
   - Port : `587`
   - Utilisateur : `serviceclient@procleanempire.com`

### Option 2 : Vous utilisez Google Workspace

Si vous avez configuré votre domaine avec Google Workspace :

1. Serveur SMTP : `smtp.gmail.com`
2. Port : `587`
3. Utilisateur : `serviceclient@procleanempire.com`
4. Mot de passe : Mot de passe d'application Google (à créer)

**Créer un mot de passe d'application Google** :
1. Allez sur https://myaccount.google.com/apppasswords
2. Sélectionnez "Mail" et "Autre"
3. Nommez-le "ProClean Empire Website"
4. Copiez le mot de passe de 16 caractères

### Option 3 : Vous utilisez Microsoft 365

Si vous avez configuré votre domaine avec Microsoft 365 :

1. Serveur SMTP : `smtp.office365.com`
2. Port : `587`
3. Utilisateur : `serviceclient@procleanempire.com`
4. Mot de passe : Votre mot de passe Microsoft 365

---

## ⚙️ Configuration actuelle du site

Actuellement, le site utilise :
- **Email d'envoi** : makayakevinh00@gmail.com
- **Serveur SMTP** : smtp.gmail.com
- **Port** : 587

### Ce qui doit changer :

1. **Email d'envoi** : serviceclient@procleanempire.com
2. **Email de réception** : serviceclient@procleanempire.com
3. **Serveur SMTP** : Celui de votre hébergeur
4. **Utilisateur SMTP** : serviceclient@procleanempire.com
5. **Mot de passe SMTP** : Le mot de passe de cette adresse

---

## 📝 Prochaines étapes

### Étape 1 : Créer l'adresse email (si pas encore fait)

1. Connectez-vous à votre hébergeur de domaine
2. Allez dans la section **"Emails"** ou **"Email Accounts"**
3. Créez l'adresse : `serviceclient@procleanempire.com`
4. Définissez un mot de passe fort
5. Notez ce mot de passe (vous en aurez besoin)

### Étape 2 : Récupérer les paramètres SMTP

Suivez les instructions ci-dessus selon votre hébergeur pour obtenir :
- Serveur SMTP
- Port
- Type de sécurité (TLS/SSL)

### Étape 3 : Me fournir les informations

Une fois que vous avez ces informations, fournissez-moi :

```
Serveur SMTP : _______________
Port : _______________
Utilisateur : serviceclient@procleanempire.com
Mot de passe : _______________
Sécurité : TLS ou SSL
```

### Étape 4 : Je configure le site

Avec ces informations, je vais :
1. ✅ Mettre à jour la configuration email dans `server/lib/email.ts`
2. ✅ Changer l'email partout sur le site vers `serviceclient@procleanempire.com`
3. ✅ Configurer l'envoi d'emails vers cette nouvelle adresse
4. ✅ Tester l'envoi pour vérifier que tout fonctionne
5. ✅ Corriger le bug "Une erreur est survenue"

---

## 🔧 Solution temporaire (en attendant)

En attendant d'avoir les paramètres SMTP de procleanempire.com, je peux :

### Option A : Continuer avec Gmail temporairement
- Garder `makayakevinh00@gmail.com` comme expéditeur
- Mais afficher `serviceclient@procleanempire.com` partout sur le site
- Rediriger les emails de serviceclient vers makayakevinh00@gmail.com

### Option B : Utiliser une redirection d'emails
- Créer une redirection depuis `serviceclient@procleanempire.com`
- Vers `makayakevinh00@gmail.com`
- Vous recevrez tous les emails sur Gmail

**Quelle option préférez-vous en attendant ?**

---

## ❓ Questions fréquentes

### Q : Je n'ai pas encore créé l'adresse serviceclient@procleanempire.com
**R :** Pas de problème ! Connectez-vous à votre hébergeur de domaine et créez-la. C'est généralement gratuit avec votre domaine.

### Q : Je ne trouve pas les paramètres SMTP
**R :** Contactez le support de votre hébergeur (OVH, Hostinger, etc.) et demandez-leur les "paramètres SMTP pour l'envoi d'emails". Ils vous les fourniront rapidement.

### Q : Puis-je utiliser Gmail avec mon domaine personnalisé ?
**R :** Oui, avec Google Workspace (payant, ~6€/mois). Sinon, utilisez les emails fournis par votre hébergeur (souvent gratuits).

### Q : Le site fonctionnera-t-il en attendant ?
**R :** Oui, je peux faire une configuration temporaire avec Gmail en attendant vos paramètres SMTP définitifs.

---

## 📞 Besoin d'aide ?

Si vous avez des difficultés :
1. Contactez le support de votre hébergeur de domaine
2. Demandez-leur de vous aider à configurer `serviceclient@procleanempire.com`
3. Demandez-leur les paramètres SMTP
4. Fournissez-moi ces informations

---

**Créé le** : 23 novembre 2025  
**Pour** : ProClean Empire  
**Objectif** : Configurer l'email professionnel pour le site web
