import { ArrowLeft, Clock, User } from "lucide-react";
import { useLocation } from "wouter";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: number;
  category: string;
  image: string;
}

const articles: Article[] = [
  {
    id: "tache-vin",
    title: "Comment enlever une tache de vin sur un canapé en tissu ?",
    excerpt: "Guide complet pour éliminer les taches de vin tenaces sans endommager votre canapé",
    category: "Nettoyage Tapis & Canapé",
    author: "ProClean Empire",
    date: "24 janvier 2026",
    readTime: 5,
    image: "/gallery-carpet-before.jpg",
    content: `
## Comment enlever une tache de vin sur un canapé en tissu ?

Les taches de vin sont parmi les plus difficiles à enlever sur un canapé en tissu. Mais ne vous inquiétez pas ! Voici un guide complet pour vous aider.

### Étape 1 : Agir rapidement

**Le secret est d'agir dans les 30 minutes suivant l'accident.** Plus vous attendez, plus la tache pénètre profondément dans les fibres du tissu.

- Blottissez immédiatement la tache avec un chiffon blanc sec
- Ne frottez pas, tamponnez simplement pour absorber le liquide
- Continuez jusqu'à ce que le chiffon ne se teinte plus

### Étape 2 : Traitement initial

**Préparation :**
- 1 verre d'eau froide
- 1 cuillère à café de savon à vaisselle doux
- 1 chiffon blanc propre

**Application :**
1. Mélangez l'eau et le savon
2. Humidifiez le chiffon avec la solution
3. Tamponnez la tache en commençant par l'extérieur vers le centre
4. Rincez avec un chiffon humidifié à l'eau froide
5. Séchez avec un chiffon sec

### Étape 3 : Traitement avancé (si nécessaire)

Si la tache persiste après le traitement initial :

**Solution vinaigre blanc :**
- 1 part de vinaigre blanc
- 2 parts d'eau
- Appliquez et tamponnez comme précédemment

**Solution alcool isopropylique :**
- Utilisez de l'alcool à 70° (pharmacie)
- Testez d'abord sur une zone cachée
- Tamponnez délicatement

### Étape 4 : Séchage

- Laissez sécher à l'air libre
- Utilisez un ventilateur si possible
- Évitez la lumière directe du soleil
- Ne chauffez pas (cela fixerait la tache)

### Quand faire appel à un professionnel ?

Si après 48h la tache persiste, contactez **ProClean Empire**. Notre technique d'injection-extraction élimine 99% des taches tenaces sans endommager votre canapé.

**Avantages du nettoyage professionnel :**
- Élimination garantie des taches
- Produits écologiques et sans danger
- Séchage rapide (2-4 heures)
- Traitement anti-tache pour prévention

[Réserver un nettoyage →](#booking)
    `,
  },
  {
    id: "nettoyer-terrasse",
    title: "Pourquoi nettoyer sa terrasse avant le printemps ?",
    excerpt: "Découvrez les 5 raisons essentielles de nettoyer votre terrasse dès maintenant",
    category: "Nettoyage Extérieur",
    author: "ProClean Empire",
    date: "23 janvier 2026",
    readTime: 6,
    image: "/services-grid.png",
    content: `
## Pourquoi nettoyer sa terrasse avant le printemps ?

Le printemps arrive ! C'est le moment idéal pour préparer votre terrasse. Voici 5 raisons essentielles de la nettoyer maintenant.

### 1. Éliminer la mousse et les algues

**Pendant l'hiver :**
- L'humidité favorise la croissance de mousse
- Les algues s'accumulent sur les surfaces
- Les dépôts deviennent glissants et dangereux

**Bénéfices du nettoyage :**
- Élimine 99% de la mousse
- Réduit les risques de chute
- Prévient les dégâts futurs

### 2. Préparer l'espace pour l'été

Vous voulez profiter de votre terrasse cet été ? Commencez maintenant !

- Nettoyage en profondeur avec haute pression
- Traitement anti-mousse pour 6-12 mois
- Préparation des meubles et accessoires

### 3. Protéger votre investissement

Une terrasse bien entretenue dure plus longtemps.

- Prévention de l'usure prématurée
- Protection contre les intempéries
- Augmentation de la valeur immobilière

### 4. Préparer les repas en plein air

Rien de mieux que de manger dehors au printemps !

- Surface propre et hygiénique
- Élimination des résidus d'hiver
- Environnement sain pour la famille

### 5. Améliorer l'apparence générale

Une terrasse propre transforme votre maison.

- Façade plus attrayante
- Meilleure première impression
- Espace plus accueillant

### Calendrier d'entretien recommandé

- **Février-Mars** : Nettoyage complet de printemps
- **Juin** : Inspection et retouches si nécessaire
- **Septembre** : Nettoyage avant l'automne
- **Novembre** : Préparation pour l'hiver

### Nos services de nettoyage de terrasse

**Technique haute pression :**
- Élimination complète de la mousse
- Nettoyage en profondeur
- Traitement anti-mousse inclus

**Tarifs :**
- Terrasse jusqu'à 20m² : 80€
- Terrasse 20-40m² : 140€
- Terrasse 40-60m² : 200€

[Demander un devis gratuit →](#booking)
    `,
  },
  {
    id: "guide-cuir-voiture",
    title: "Le guide ultime pour entretenir le cuir de sa voiture",
    excerpt: "Conseils professionnels pour préserver et nettoyer le cuir de votre véhicule",
    category: "Nettoyage Automobile",
    author: "ProClean Empire",
    date: "22 janvier 2026",
    readTime: 7,
    image: "/hero-proclean.png",
    content: `
## Le guide ultime pour entretenir le cuir de sa voiture

Le cuir de votre voiture est un investissement. Voici comment le préserver et le nettoyer correctement.

### Pourquoi entretenir le cuir ?

**Le cuir se détériore :**
- Sous l'exposition au soleil
- Avec l'humidité et la chaleur
- À cause de la saleté et des résidus
- Par manque d'hydratation

**Conséquences :**
- Craquelures et déchirures
- Décoloration
- Perte de souplesse
- Réduction de la valeur du véhicule

### Nettoyage régulier

**Fréquence :**
- Aspirage : chaque semaine
- Nettoyage léger : tous les mois
- Nettoyage profond : tous les 3 mois

**Produits recommandés :**
- Nettoyant cuir spécialisé (pH neutre)
- Microfibre douce (jamais d'abrasif)
- Conditionneur cuir premium

### Étapes du nettoyage

#### 1. Aspiration
- Éliminez la poussière et les débris
- Insistez sur les coutures et les crevasses
- Utilisez un embout rembourré

#### 2. Nettoyage
- Appliquez le nettoyant cuir
- Frottez doucement avec un chiffon microfibre
- Essuyez avec un chiffon sec

#### 3. Conditionnement
- Appliquez le conditionneur
- Laissez poser 10-15 minutes
- Essuyez l'excédent

### Erreurs à éviter

❌ **Ne pas faire :**
- Utiliser de l'eau de Javel
- Frotter avec des chiffons rêches
- Exposer au soleil direct prolongé
- Utiliser des produits agressifs
- Ignorer les taches fraîches

✅ **À faire :**
- Agir rapidement sur les taches
- Utiliser des produits spécialisés
- Protéger du soleil avec des pare-soleil
- Aérer régulièrement la voiture
- Faire un nettoyage professionnel annuel

### Taches courantes et solutions

**Tache de café :**
1. Blottissez immédiatement
2. Appliquez le nettoyant cuir
3. Tamponnez délicatement
4. Séchez

**Tache de graisse :**
1. Saupoudrez de talc
2. Laissez agir 30 minutes
3. Aspirez le talc
4. Nettoyez avec le produit spécialisé

**Tache de sang :**
1. Utilisez de l'eau froide (jamais chaude)
2. Tamponnez avec un chiffon blanc
3. Appliquez le nettoyant cuir
4. Rincez et séchez

### Nettoyage professionnel

**Quand faire appel à un professionnel :**
- Taches tenaces ou anciennes
- Odeurs persistantes
- Dégâts importants
- Nettoyage complet annuel

**Nos services :**
- Nettoyage professionnel du cuir
- Traitement protecteur
- Restauration de brillance
- Élimination des odeurs

**Forfait Detailing Premium :**
- Nettoyage complet intérieur/extérieur
- Traitement cuir professionnel
- Lustrage carrosserie
- Nettoyage moteur
- **Prix : 150€**

[Réserver votre nettoyage →](#booking)
    `,
  },
  {
    id: "demoussage-toiture",
    title: "Démoussage de toiture : quand est-ce le meilleur moment ?",
    excerpt: "Guide complet pour déterminer le meilleur moment pour nettoyer votre toiture",
    category: "Nettoyage Extérieur",
    author: "ProClean Empire",
    date: "21 janvier 2026",
    readTime: 6,
    image: "/services-grid.png",
    content: `
## Démoussage de toiture : quand est-ce le meilleur moment ?

La mousse sur votre toiture peut causer des dégâts importants. Découvrez quand la nettoyer.

### Pourquoi enlever la mousse ?

**Risques de la mousse :**
- Retient l'humidité
- Accélère la dégradation des tuiles
- Crée des fissures
- Réduit la durée de vie du toit
- Peut causer des fuites

**Coût des réparations :**
- Remplacement de tuiles : 500-2000€
- Réparation de charpente : 2000-5000€+
- Prévention par démoussage : 200-400€

### Le meilleur moment pour démousser

#### Printemps (Mars-Mai)
✅ **Avantages :**
- Conditions météo idéales
- Mousse bien visible
- Prévention avant l'été
- Séchage rapide

❌ **Inconvénients :**
- Forte demande
- Prix potentiellement plus élevés

#### Automne (Septembre-Octobre)
✅ **Avantages :**
- Moins de demandes
- Tarifs potentiellement réduits
- Préparation pour l'hiver
- Bonne météo

❌ **Inconvénients :**
- Nouvelle mousse peut apparaître en hiver
- Humidité plus importante

#### Été (Juin-Août)
❌ **À éviter :**
- Trop chaud
- Risque de dégâts
- Conditions dangereuses
- Séchage trop rapide

#### Hiver (Novembre-Février)
❌ **À éviter :**
- Conditions glissantes
- Risque d'accident
- Humidité excessive
- Efficacité réduite

### Fréquence recommandée

**Selon la région :**
- **Nord/Ouest (humide)** : Tous les 2-3 ans
- **Centre/Est (modéré)** : Tous les 3-4 ans
- **Sud (sec)** : Tous les 4-5 ans

**Signes que votre toit a besoin d'un nettoyage :**
- Mousse visible à l'oeil nu
- Taches vertes ou noires
- Fuites d'eau
- Gouttières bouchées

### Technique de démoussage

**Haute pression :**
- Élimination complète de la mousse
- Nettoyage en profondeur
- Traitement anti-mousse
- Résultats durables

**Traitement anti-mousse :**
- Prévient la repousse pendant 12-24 mois
- Protège les tuiles
- Écologique et sans danger

### Nos services

**Forfait démoussage complet :**
- Inspection gratuite
- Nettoyage haute pression
- Traitement anti-mousse
- Garantie 12 mois

**Tarifs :**
- Petite toiture : 300€
- Toiture moyenne : 500€
- Grande toiture : 800€+

[Demander une inspection gratuite →](#booking)
    `,
  },
  {
    id: "astuces-tapis-propre",
    title: "5 astuces pour garder son tapis propre plus longtemps",
    excerpt: "Conseils pratiques pour maintenir votre tapis en parfait état entre les nettoyages",
    category: "Nettoyage Tapis & Canapé",
    author: "ProClean Empire",
    date: "20 janvier 2026",
    readTime: 5,
    image: "/gallery-carpet-after.jpg",
    content: `
## 5 astuces pour garder son tapis propre plus longtemps

Un tapis propre dure plus longtemps. Voici 5 astuces simples pour le maintenir en parfait état.

### Astuce 1 : Aspirer régulièrement

**Fréquence :**
- Tapis très utilisé : 2-3 fois par semaine
- Tapis modérément utilisé : 1 fois par semaine
- Tapis peu utilisé : 1 fois toutes les 2 semaines

**Technique :**
- Passez lentement pour meilleure aspiration
- Faites plusieurs passages
- Insistez sur les zones à fort trafic
- Nettoyez le filtre régulièrement

### Astuce 2 : Traiter les taches immédiatement

**Les 30 premières minutes sont cruciales !**

**Procédure :**
1. Blottissez la tache (ne frottez pas)
2. Appliquez un nettoyant adapté
3. Tamponnez doucement
4. Rincez avec de l'eau froide
5. Séchez complètement

**Taches courantes :**
- Vin rouge : eau froide + vinaigre blanc
- Café : eau froide + savon doux
- Graisse : talc puis nettoyant spécialisé
- Boue : laissez sécher puis aspirez

### Astuce 3 : Utiliser des protecteurs

**Tapis protecteur :**
- Placez des tapis à l'entrée
- Changez les chaussures
- Utilisez des dessous de meuble

**Traitement protecteur :**
- Appliquez un traitement anti-tache
- Dure 12-24 mois
- Facilite le nettoyage futur
- Prévient les taches permanentes

### Astuce 4 : Aérer et ventiler

**Prévention des odeurs :**
- Aérez la pièce quotidiennement
- Utilisez un ventilateur
- Évitez l'humidité excessive
- Laissez sécher complètement après nettoyage

**Élimination des odeurs :**
- Saupoudrez de bicarbonate de soude
- Laissez agir 30 minutes
- Aspirez complètement
- Aérez la pièce

### Astuce 5 : Rotation et entretien

**Rotation :**
- Tournez le tapis tous les 6 mois
- Réduit l'usure inégale
- Prolonge la durée de vie
- Améliore l'apparence

**Entretien saisonnier :**
- **Printemps** : Nettoyage profond
- **Été** : Aération régulière
- **Automne** : Traitement protecteur
- **Hiver** : Aspiration fréquente

### Nettoyage professionnel

**Quand faire appel à un professionnel :**
- Taches tenaces
- Odeurs persistantes
- Nettoyage annuel complet
- Restauration de brillance

**Nos services :**
- Technique injection-extraction
- Élimination des acariens
- Traitement anti-tache
- Séchage rapide (2-4h)

**Tarifs :**
- Petit tapis : 40€
- Tapis moyen : 70€
- Grand tapis : 100€

[Réserver un nettoyage professionnel →](#booking)
    `,
  },
];

export default function BlogArticles() {
  const [, navigate] = useLocation();
  const [selectedArticle, setSelectedArticle] = React.useState<Article | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {selectedArticle ? (
        // Article Detail View
        <div className="max-w-4xl mx-auto px-4 py-12">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-8"
          >
            <ArrowLeft size={20} />
            Retour aux articles
          </button>

          <article className="prose max-w-none">
            <div className="mb-8">
              <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {selectedArticle.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{selectedArticle.title}</h1>
              <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={18} />
                  <span>{selectedArticle.author}</span>
                </div>
                <span>{selectedArticle.date}</span>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{selectedArticle.readTime} min de lecture</span>
                </div>
              </div>
            </div>

            <img
              src={selectedArticle.image}
              alt={selectedArticle.title}
              className="w-full h-96 object-cover rounded-lg mb-8"
            />

            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: selectedArticle.content
                  .split('\n')
                  .map(line => {
                    if (line.startsWith('## ')) {
                      return `<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">${line.substring(3)}</h2>`;
                    }
                    if (line.startsWith('### ')) {
                      return `<h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">${line.substring(4)}</h3>`;
                    }
                    if (line.startsWith('#### ')) {
                      return `<h4 class="text-lg font-bold text-gray-900 mt-4 mb-2">${line.substring(5)}</h4>`;
                    }
                    if (line.startsWith('- ')) {
                      return `<li class="ml-4">${line.substring(2)}</li>`;
                    }
                    if (line.startsWith('✅ ') || line.startsWith('❌ ')) {
                      return `<p class="font-semibold text-gray-900 mt-2">${line}</p>`;
                    }
                    if (line.startsWith('**') && line.endsWith('**')) {
                      return `<p class="font-bold text-gray-900 mt-2">${line.substring(2, line.length - 2)}</p>`;
                    }
                    if (line.startsWith('[')) {
                      return `<p class="mt-6 text-center"><a href="#booking" class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg">${line.substring(1, line.length - 8)}</a></p>`;
                    }
                    return line ? `<p class="mb-3">${line}</p>` : '';
                  })
                  .join('')
              }}
            />

            <div className="mt-12 bg-orange-50 p-8 rounded-lg text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Besoin d'un nettoyage professionnel ?</h3>
              <p className="text-gray-700 mb-6">
                Nos experts ProClean Empire sont prêts à vous aider avec des solutions adaptées à vos besoins.
              </p>
              <button
                onClick={() => navigate("/#booking")}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg inline-block"
              >
                Réserver un service
              </button>
            </div>
          </article>
        </div>
      ) : (
        // Blog List View
        <div>
          {/* Hero */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold mb-4">Blog ProClean Empire</h1>
              <p className="text-xl text-blue-100">
                Conseils, astuces et guides pour garder vos biens impeccables
              </p>
            </div>
          </section>

          {/* Articles Grid */}
          <section className="max-w-6xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-8">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="inline-block bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      {article.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{article.readTime} min</span>
                      </div>
                      <span>{article.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Besoin d'aide ?</h2>
              <p className="text-lg text-orange-100 mb-8">
                Contactez nos experts pour des conseils personnalisés
              </p>
              <a href="https://wa.me/33617212230" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-orange-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg">
                💬 Contacter sur WhatsApp
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

import React from "react";
