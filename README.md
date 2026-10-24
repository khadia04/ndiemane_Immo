# Ndiemane Immo 🏠

Plateforme web de recherche de biens immobiliers à **acheter**, **louer** ou **faire construire** au Sénégal.

> Projet de fin de licence – Licence en Informatique, Développement d'applications (Web, Mobile), Université Numérique Cheikh Hamidou Kane (UNCHK), 2025.
> Réalisé par **Khardiata Thiam**.

---

## Fonctionnalités

- **Accueil** : présentation de l'agence et des biens mis en avant
- **Acheter / Louer** : catalogue des biens avec **filtres** (type de bien, localisation, prix, surface…)
- **Fiche détaillée** de chaque bien : photos, caractéristiques, prix
- **Construire** : présentation des projets de construction et demande de devis
- **Recherche** avec page de résultats
- **Inscription / connexion** et **profil utilisateur**
- **Formulaire de contact** avec envoi d'e-mail (EmailJS)
- Interface **responsive** (Bootstrap 5)

## Technologies

| Partie | Outils |
|---|---|
| Front-end | HTML5, CSS3, JavaScript, Bootstrap 5, Font Awesome |
| Données | API JSON hébergée sur Vercel, stockage local (`localStorage`) pour la session |
| Back-end | PHP 8.2 (Apache), schéma MySQL `agence_immo.sql` |
| Déploiement | Docker (`php:8.2-apache`), Vercel |
| Conception | Cahier des charges, scénarios utilisateurs, diagrammes UML (cas d'utilisation, classes, séquence) |

## Base de données

Le fichier [`agence_immo.sql`](agence_immo.sql) crée les 5 tables du modèle :
`users`, `biens`, `visites`, `contrats`, `paiements`.

## Lancer le projet

**Avec XAMPP**
1. Copier le dossier dans `C:\xampp\htdocs\`.
2. Démarrer Apache (et MySQL si besoin), puis importer `agence_immo.sql` dans phpMyAdmin.
3. Ouvrir `http://localhost/ndiemane_Immo/frontend/acceuil.html`.

**Avec Docker**
```bash
docker build -t ndiemane-immo .
docker run -p 8080:8080 ndiemane-immo
```

## Structure

```
ndiemane_Immo/
├── agence_immo.sql        Schéma de la base de données
├── Dockerfile             Image PHP 8.2 + Apache
└── frontend/
    ├── acceuil.html       Page d'accueil
    ├── Acheter.html       Biens à vendre (+ acheter.js)
    ├── Louer.html         Biens à louer (+ louer.js)
    ├── Construire.html    Projets de construction (+ construire.js)
    ├── detail.html        Fiche d'un bien (+ detail.js)
    ├── resultat-recherche.html
    ├── contact.html       Formulaire de contact (+ contact.js)
    ├── index.html         Connexion
    ├── inscription.html   Inscription
    ├── update_profile.php / logout.php
    └── pellicule/         Images des biens
```

---

📫 [LinkedIn](https://www.linkedin.com/in/khardiata-thiam) · [GitHub](https://github.com/khadia04)
