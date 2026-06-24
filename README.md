# EventHub — Plateforme de gestion d'événements

> Application web de gestion d'événements avec sessions, intervenants, salles et Q&A en temps réel.


## Table des matières

- [Présentation](#-présentation)
- [Stack technique](#-stack-technique)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Variables d'environnement](#-variables-denvironnement)
- [Base de données](#-base-de-données)
- [Équipe](#-équipe)


## Présentation

EventHub est une application fullstack permettant de gérer des événements, des sessions de conférences, des intervenants et des questions du public. L'accès est réservé aux administrateurs — aucun compte public n'est disponible.

**Fonctionnalités principales :**

- Gestion des événements, sessions et salles
- Gestion des intervenants (biographie, réseaux sociaux, tags)
- Système de questions / upvotes par session
- Interface d'administration complète
- API structurée via Next.js App Router


## Stack technique

| Couche | Technologie | Version |
|---|---|---|
| **Framework** | Next.js | `^16.2.4` |
| **Administration** | React-Admin (Headless) | `^5.14.7` |
| **Langage** | TypeScript | `^5` |
| **Runtime** | Bun | `^1.3.4` |
| **Base de données** | PostgreSQL | — |
| **ORM** | Prisma | `^6.11.1` |
| **UI Components** | Shadcn/UI + Radix UI | — |
| **Styles** | Tailwind CSS | `^4` |
| **Icônes** | Lucide React | `^0.525.0` |
| **Authentification** | NextAuth.js | `^4.24.14` |
| **State management** | Zustand | `^5.0.6` |
| **Formulaires** | React Hook Form + Zod | — |
| **Data fetching** | TanStack Query | `^5.82.0` |
| **Tableaux** | TanStack Table | `^8.21.3` |
| **Animations** | Framer Motion | `^12.23.2` |
| **Graphiques** | Recharts | `^3.8.1` |
| **Internationalisation** | next-intl | `^4.9.1` |
| **Notifications** | Sonner | `^2.0.7` |
| **Déploiement** | Caddy (standalone Next.js) | — |


## Architecture


src/
├── app/               # Pages et routes (App Router Next.js)
│   ├── api/           # Routes API (endpoints REST)
│   └── (admin)/       # Interface d'administration
├── components/
│   ├── ui/            # Composants Shadcn/UI
│   └── ...            # Composants métier
├── lib/               # Utilitaires, helpers
├── hooks/             # Custom hooks React
prisma/
└── schema.prisma      # Schéma de la base de données


### Modèles de données

- **Event** — Événement principal (titre, dates, lieu, couverture)
- **Session** — Conférences rattachées à un événement
- **Speaker** — Intervenants avec profil complet
- **SpeakerOnSession** — Relation many-to-many sessions ↔ intervenants
- **Question** — Questions du public avec upvotes par session
- **Room** — Salles de conférence
- **User** — Compte administrateur (accès restreint)



## Installation

# Cloner le dépôt
git clone <url-du-repo>
cd <nom-du-projet>

# Installer les dépendances
bun install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir les valeurs dans .env

# Initialiser la base de données
bun run db:push

# Lancer en développement
bun run dev


L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

# Base de données PostgreSQL
DATABASE_URL="postgresql://user:password@localhost:5432/eventhub"

# NextAuth
NEXTAUTH_SECRET="votre-secret-ici"
NEXTAUTH_URL="http://localhost:3000"
```

## Base de données

# Appliquer le schéma sans migration
bun run db:push

# Créer une migration
bun run db:migrate

# Réinitialiser la base
bun run db:reset

# Générer le client Prisma
bun run db:generate

> La connexion utilise PostgreSQL. Assurez-vous qu'une instance est disponible avant de lancer l'application.

## Équipe
_Shaim STD23093
_Mathieu STD24056
_Sombin'ny Aina STD24063
_Jonathan STD24095

