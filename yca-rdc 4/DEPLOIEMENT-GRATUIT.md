# Déploiement gratuit YCA RDC

## URL gratuite

Le plus simple est GitHub Pages : après publication, le site sera accessible sur `https://TON-PSEUDO.github.io/NOM-DU-REPO/`. GitHub Pages propose l’hébergement statique gratuitement avec GitHub Free pour un dépôt public.

## Accès privé

La page d’administration a été séparée et renommée :
`gestion-yca-9f3c.html`

Identifiant : `henock`
Mot de passe : `100722`

Le lien Administration n’est plus affiché dans le pied de page.

### Limite importante
Cette protection est une protection d’interface côté navigateur, pas une authentification serveur. Une personne techniquement compétente peut toujours inspecter les fichiers publics. Ne pas y stocker de secrets, clés privées ou données sensibles.

## Pour un vrai dashboard partagé entre tous les visiteurs

Le site actuel utilise `localStorage`. Donc les messages, inscriptions et modifications ne sont pas encore une base de données centrale : ils restent dans le navigateur qui les a créés.

Pour obtenir réellement :
- compteur global de visiteurs ;
- messages visibles depuis n’importe quel appareil ;
- comptes étudiants ;
- cours gratuits/payants ;
- liens de paiement ;
- authentification admin réelle ;
- créateurs tendance/à la une ;

il faut connecter une base de données et une authentification serveur. Une option sans abonnement au départ est Supabase Free + un hébergeur statique gratuit.
