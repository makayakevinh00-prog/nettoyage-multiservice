# Configuration HubSpot pour ProClean Empire

## 🎯 Objectif
Synchroniser automatiquement toutes les réservations et demandes de devis avec votre CRM HubSpot pour un suivi client optimal.

## 📋 Prérequis
- Un compte HubSpot (gratuit ou payant)
- Accès à l'API HubSpot

## 🔑 Étape 1 : Obtenir votre Clé API HubSpot

1. **Connectez-vous à HubSpot** : https://app.hubspot.com
2. **Allez dans les Paramètres** :
   - Cliquez sur l'icône ⚙️ en haut à droite
   - Sélectionnez "Paramètres"
3. **Trouvez les Clés API** :
   - Dans la barre latérale, allez à **Intégrations** → **Clés privées d'application**
   - Ou directement : https://app.hubspot.com/private-apps/
4. **Créez une nouvelle clé privée** :
   - Cliquez sur "Créer une application privée"
   - Donnez-lui un nom : "ProClean Empire"
   - Cliquez sur "Créer une application"
5. **Configurez les permissions** :
   - Allez à l'onglet "Autorisations"
   - Activez les permissions suivantes :
     - **CRM** → Contacts (lecture, création, modification)
     - **CRM** → Deals (lecture, création, modification)
     - **CRM** → Tasks (lecture, création, modification)
   - Cliquez sur "Enregistrer les modifications"
6. **Copiez le token** :
   - Allez à l'onglet "Afficher le token"
   - Copiez le token complet (commence par `pat-`)

## 🔐 Étape 2 : Configurer la Clé dans Manus

1. **Allez dans les Paramètres du site** :
   - Cliquez sur le bouton "Management UI" dans le chat
   - Allez à **Settings** → **Secrets**
2. **Ajoutez la clé API** :
   - Trouvez `HUBSPOT_API_KEY`
   - Collez votre token HubSpot
   - Cliquez sur "Enregistrer"
3. **Redémarrez le serveur** :
   - Le serveur se redémarrera automatiquement

## ✅ Étape 3 : Tester la Connexion

Après avoir configuré la clé, les réservations seront automatiquement synchronisées avec HubSpot :

**Chaque réservation créera :**
- ✅ Un **Contact** avec les informations du client
- ✅ Un **Deal** (opportunité) avec les détails du service
- ✅ Une **Tâche** de rappel 24h avant le rendez-vous
- ✅ Une **Association** entre le contact et le deal

## 📊 Flux de Synchronisation

```
Réservation sur le site
        ↓
✅ Notification au propriétaire
✅ Email de confirmation au client
✅ Événement Google Calendar
✅ Synchronisation HubSpot
   ├─ Contact créé/mis à jour
   ├─ Deal créé
   ├─ Association contact-deal
   └─ Tâche de rappel créée
```

## 🚨 Dépannage

### Erreur 403 Forbidden
- **Cause** : Token invalide ou permissions insuffisantes
- **Solution** : Vérifiez que le token est correct et que les permissions CRM sont activées

### Erreur 401 Unauthorized
- **Cause** : Token expiré ou supprimé
- **Solution** : Créez un nouveau token et mettez à jour la clé

### Les réservations ne s'ajoutent pas à HubSpot
- **Cause** : Clé API non configurée
- **Solution** : Vérifiez que `HUBSPOT_API_KEY` est défini dans les Secrets

## 📞 Support
Si vous avez besoin d'aide avec HubSpot, consultez :
- Documentation HubSpot : https://developers.hubspot.com/
- Support HubSpot : https://support.hubspot.com/

## 💡 Conseils Utiles

1. **Organisez vos contacts** : Créez des listes HubSpot pour segmenter vos clients par service
2. **Automatisez les workflows** : Utilisez les workflows HubSpot pour envoyer des emails de suivi automatiques
3. **Suivez vos deals** : Utilisez les deals pour suivre le pipeline de vos réservations
4. **Créez des rapports** : Utilisez les rapports HubSpot pour analyser vos réservations

---

**Statut** : ✅ Intégration HubSpot active et prête à l'emploi
