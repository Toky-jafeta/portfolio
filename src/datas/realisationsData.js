// src/datas/realisationsData.js

const realisationsData = [
  {
    id: 1,
    periode: "Sept. 2024",
    client: "Africa50",
    domaine: "Network Provisioning",
    role: "Chef de Projet / Ingénieur IT",
    description:
      "Pilotage du projet de provisioning réseau avec coordination des équipes, communication client et gestion complète de la documentation technique.",
    taches: [
      "Leadership du projet et coordination inter-équipes",
      "Communication client et gestion des parties prenantes",
      "Participation aux réunions de suivi et rédaction des comptes rendus",
      "Supervision de l'installation et configuration des équipements",
    ],
  },
  {
    id: 2,
    periode: "Oct. 2024 – Présent",
    client: "Orange Madagascar – CBIO",
    domaine: "Network & Security Implementation",
    role: "Chef de Projet / Ingénieur IT",
    description:
      "Pilotage complet du déploiement réseau et sécurité d'une nouvelle infrastructure, avec haute disponibilité sur l'ensemble des équipements (routeurs, firewalls, switches).",
    taches: [
      "Leadership et coordination de toutes les phases du projet",
      "Conception et déploiement de l'architecture réseau",
      "Configuration des routeurs (VRF, routage statique, HSRP, HA tracking)",
      "Configuration des firewalls FortiGate & Juniper",
      "Configuration des switches (stacking, VLAN, STP, LACP)",
      "Mise en place de la haute disponibilité sur routeurs, firewalls et switches",
      "Tests exhaustifs de toutes les fonctionnalités configurées",
    ],
  },
  {
    id: 3,
    periode: "Avr. – Août 2025",
    client: "TALYS Group",
    domaine: "Firewalling & Sécurité",
    role: "Chef de Projet / Ingénieur IT",
    description:
      "Migration de l'architecture Check Point vers FortiGate avec mise en place de FortiManager et FortiAnalyzer pour la gestion centralisée et le monitoring avancé.",
    taches: [
      "Pilotage du projet et coordination des équipes techniques",
      "Interface client principale et communication avec les parties prenantes",
      "Rédaction de la documentation technique et comptes rendus de réunion",
      "Supervision du câblage et de l'installation des équipements réseau",
      "Audit et évaluation des flux réseau existants (Check Point)",
      "Migration physique et logique vers FortiGate",
      "Déploiement et configuration de FortiManager & FortiAnalyzer",
      "Optimisation des configurations et maintenance post-migration",
    ],
  },
  {
    id: 4,
    periode: "Sept. 2025",
    client: "BMOI",
    domaine: "Firewalling & Routing",
    role: "Chef de Projet / Ingénieur IT",
    description:
      "Migration complète de l'architecture de sécurité réseau vers un nouvel équipement FortiGate, avec transfert de toutes les connexions réseau et conformité aux meilleures pratiques de sécurité.",
    taches: [
      "Évaluation et audit du pare-feu et des flux réseau existants",
      "Migration physique du pare-feu vers FortiGate",
      "Optimisation de la configuration et des politiques de sécurité",
      "Configuration des sorties pare-feu vers les routeurs DMVPN de deux opérateurs",
      "Optimisation du routage sur les routeurs et les commutateurs",
      "Mise à jour et documentation de l'infrastructure post-migration",
    ],
  },
  {
    id: 5,
    periode: "Nov. 2025 - Jan. 2026",
    client: "Groupe Aina",
    domaine: "Infrastructure & Cybersécurité",
    role: "Chef de Projet / Ingénieur Système, Réseau et Sécurité",
    description:
      "Projet de sécurisation globale de l'infrastructure informatique du Groupe Aina, incluant la mise en place d'une architecture Active Directory hautement disponible, l'intégration d'une authentification Wi-Fi sécurisée basée sur 802.1X avec Microsoft NPS et Cisco Meraki, ainsi que l'optimisation des services DNS de l'entreprise.",
    taches: [
      "Audit et analyse de l'infrastructure existante",
      "Conception et déploiement d'une architecture Active Directory Domain Services (AD DS)",
      "Mise en place de contrôleurs de domaine avec réplication pour assurer la haute disponibilité des services d'authentification",
      "Configuration et optimisation des services DNS intégrés à Active Directory",
      "Correction et migration des résolutions DNS vers les serveurs DNS privés de Nexthope",
      "Déploiement d'un serveur Microsoft Network Policy Server (NPS)",
      "Intégration de l'authentification Wi-Fi 802.1X avec l'infrastructure Cisco Meraki",
      "Configuration du flux d'authentification Meraki → NPS → Active Directory",
      "Mise en place des politiques d'accès réseau basées sur les groupes Active Directory",
      "Attribution dynamique des VLANs selon les profils utilisateurs authentifiés",
      "Configuration des stratégies de sécurité et de contrôle d'accès réseau (NAC)",
      "Tests de validation, de résilience et de basculement des services critiques",
      "Documentation technique complète de l'architecture mise en œuvre",
      "Transfert de compétences et accompagnement des équipes techniques"
    ],
  },
];

export default realisationsData;
