# YOUTUBE CREATOR ACADEMY RDC (YCA RDC)

**Slogan :** Apprendre. Créer. Grandir.  
**Positionnement :** La communauté des créateurs YouTube de la RDC. 🇨🇩

Plateforme web professionnelle, moderne, responsive et **entièrement administrable**
pour l’écosystème des créateurs YouTube en République démocratique du Congo.

---

## 1. Démarrer

Ouvrez `index.html` dans un navigateur, ou servez le dossier :

```bash
python3 -m http.server 8080
# puis http://127.0.0.1:8080
```

**Administration :** ouvrez `gestion-yca-9f3c.html`  
Identifiant de démo : `admin` / mot de passe : `admin`

> ⚠️ L’authentification est une **démo côté client**. Voir la section Sécurité.

---

## 2. Ce qui est livré

### Pages publiques
- **Accueil** (`index.html`) — Hero, présentation, 4 piliers + Creator Support,
  statistiques, créateurs, créateur de la semaine, formations, opportunités,
  campagnes, événements, articles, rejoindre, réseaux, newsletter, footer.
- **Créateurs** (`creators.html`) — annuaire avec recherche + filtres
  (ville, province, niche, taille, type). Respecte le choix public/privé.
- **Academy** (`academy.html`) — formations gratuites / payantes / premium,
  filtres par catégorie et type.
- **Opportunités** (`opportunities.html`) — avec formulaire « Postuler ».
- **Campagnes** (`campaigns.html`) — statuts (Brouillon, Ouverte, En cours…).
- **Événements** (`events.html`) — avec inscription.
- **Média / Blog** (`media.html`, `article.html`) — articles dynamiques + SEO.
- **Communauté** (`community.html`) — tous les réseaux (liens administrables).
- **À propos** (`about.html`) — mission + fondateur + mention d’indépendance.
- **Contact** (`contact.html`), **Rejoindre** (`join.html`), **Espace Marque** (`brand.html`).
- **Espace Créateur** (`creator-space.html`) et **Espace Étudiant** (`student-space.html`).
- **Pages légales** (`legal.html`) — 8 documents éditables.

### Administration (`gestion-yca-9f3c.html`)
Dashboard type SaaS avec KPI et menu complet : Dashboard, Contenu, Utilisateurs,
Créateurs, Formations, Étudiants, Articles, Opportunités, Campagnes, Marques,
Événements, Communauté, Paiements, Contrats, Notifications, Messages,
Statistiques, SEO, Pages, Rôles & permissions, Journal d’activité, Paramètres.

CRUD complet (ajout / modification / suppression) pour créateurs, formations,
opportunités, campagnes, événements, articles ; édition des textes, du hero,
des réseaux, du SEO, des pages légales et du menu ; export / import / reset JSON.

---

## 3. Architecture (évolutive)

```
yca-rdc/
├─ *.html            Pages (chaque page ne contient AUCUN contenu écrit en dur)
├─ css/style.css     Design system (Rouge / Noir / Blanc / Gris) mobile-first
├─ js/data.js        CMS : tout le contenu + API de stockage (localStorage)
├─ js/app.js         Header, footer, SEO, animations (injectés depuis le CMS)
├─ js/components.js  Cartes réutilisables (créateur, formation, article…)
├─ js/admin.js       Tableau de bord d’administration
├─ robots.txt / sitemap.xml
```

**Principe clé :** le contenu vit dans `js/data.js` (couche CMS). Les pages lisent
via `YCA.get(...)`. Vous pouvez donc **tout modifier depuis l’admin sans toucher
au code** : textes, titres, images, liens, prix, catégories, menus, réseaux, etc.

### Passer en production
Ce prototype stocke les données dans le navigateur (localStorage). Pour une vraie
plateforme multi-utilisateurs, remplacez la couche `data.js` par une **API + base
de données** (les méthodes `YCA.get/add/update/remove` correspondent déjà à des
endpoints REST GET/POST/PUT/DELETE). Recommandations : back-end Node/Laravel/Django,
base PostgreSQL/MySQL, stockage média S3-compatible.

---

## 4. Sécurité (à implémenter côté serveur)
Le formulaire de connexion admin est une **démo**. En production, prévoir :
authentification serveur (hachage des mots de passe, sessions/JWT, HTTPS),
gestion des rôles/permissions, protection anti-spam (captcha), validation
côté serveur, sauvegardes et journal d’activité persistant.

## 5. Paiements
Aucun moyen de paiement fictif n’est intégré. L’architecture (factures, statut
payé/non payé, historique) est prête pour brancher un prestataire réellement
disponible en RDC / à l’international.

## 6. Indépendance (important)
YCA RDC est une **organisation indépendante**. Ce n’est pas YouTube, ni une
filiale, ni un représentant officiel de YouTube. Aucune promesse de monétisation,
d’abonnés, de revenus, ni de suppression de sanction ou récupération de chaîne.


## Notifications email
Les formulaires enregistrent toujours les demandes dans le CMS local et utilisent `js/email.js` pour envoyer une notification à l'adresse définie dans `site.email` dans `js/data.js`.
Le site utilise FormSubmit en mode AJAX, ce qui permet un hébergement statique. Lors de la première utilisation avec une nouvelle adresse, FormSubmit peut demander une confirmation de l'adresse de destination.
Pour la production, remplacez impérativement `contact@ycardc.cd` par une adresse email réelle que vous contrôlez, ou remplacez `js/email.js` par votre propre backend/API email.
