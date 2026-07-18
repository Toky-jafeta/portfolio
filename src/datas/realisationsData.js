// src/datas/realisationsData.js
// Chaque champ textuel est bilingue { fr, en }

const realisationsData = [
  {
    id: 1,
    periode: "Sept. 2024",
    client: "Africa50",
    domaine: { fr: "Provisioning Réseau", en: "Network Provisioning" },
    role: { fr: "Chef de Projet / Ingénieur IT", en: "Project Manager / IT Engineer" },
    description: {
      fr: "Pilotage du projet de provisioning réseau avec coordination des équipes, communication client et gestion complète de la documentation technique.",
      en: "Network provisioning project management including team coordination, client communication and complete technical documentation management."
    },
    taches: {
      fr: [
        "Leadership du projet et coordination inter-équipes",
        "Communication client et gestion des parties prenantes",
        "Participation aux réunions de suivi et rédaction des comptes rendus",
        "Supervision de l'installation et configuration des équipements",
      ],
      en: [
        "Project leadership and cross-team coordination",
        "Client communication and stakeholder management",
        "Attendance at progress meetings and writing of minutes",
        "Supervision of equipment installation and configuration",
      ]
    }
  },
  {
    id: 2,
    periode: "Oct. 2024 – Présent",
    client: "Orange Madagascar – CBIO",
    domaine: { fr: "Réseau & Sécurité", en: "Network & Security Implementation" },
    role: { fr: "Chef de Projet / Ingénieur IT", en: "Project Manager / IT Engineer" },
    description: {
      fr: "Pilotage complet du déploiement réseau et sécurité d'une nouvelle infrastructure, avec haute disponibilité sur l'ensemble des équipements (routeurs, firewalls, switches).",
      en: "Full management of the network and security deployment of a new infrastructure, with high availability across all equipment (routers, firewalls, switches)."
    },
    taches: {
      fr: [
        "Leadership et coordination de toutes les phases du projet",
        "Conception et déploiement de l'architecture réseau",
        "Configuration des routeurs (VRF, routage statique, HSRP, HA tracking)",
        "Configuration des firewalls FortiGate & Juniper",
        "Configuration des switches (stacking, VLAN, STP, LACP)",
        "Mise en place de la haute disponibilité sur routeurs, firewalls et switches",
        "Tests exhaustifs de toutes les fonctionnalités configurées",
      ],
      en: [
        "Leadership and coordination of all project phases",
        "Network architecture design and deployment",
        "Router configuration (VRF, static routing, HSRP, HA tracking)",
        "FortiGate & Juniper firewall configuration",
        "Switch configuration (stacking, VLAN, STP, LACP)",
        "High availability implementation on routers, firewalls and switches",
        "Exhaustive testing of all configured features",
      ]
    }
  },
  {
    id: 3,
    periode: "Avr. – Août 2025",
    client: "TALYS Group",
    domaine: { fr: "Firewalling & Sécurité", en: "Firewalling & Security" },
    role: { fr: "Chef de Projet / Ingénieur IT", en: "Project Manager / IT Engineer" },
    description: {
      fr: "Migration de l'architecture Check Point vers FortiGate avec mise en place de FortiManager et FortiAnalyzer pour la gestion centralisée et le monitoring avancé.",
      en: "Migration of the Check Point architecture to FortiGate with deployment of FortiManager and FortiAnalyzer for centralized management and advanced monitoring."
    },
    taches: {
      fr: [
        "Pilotage du projet et coordination des équipes techniques",
        "Interface client principale et communication avec les parties prenantes",
        "Rédaction de la documentation technique et comptes rendus de réunion",
        "Supervision du câblage et de l'installation des équipements réseau",
        "Audit et évaluation des flux réseau existants (Check Point)",
        "Migration physique et logique vers FortiGate",
        "Déploiement et configuration de FortiManager & FortiAnalyzer",
        "Optimisation des configurations et maintenance post-migration",
      ],
      en: [
        "Project management and coordination of technical teams",
        "Primary client interface and stakeholder communication",
        "Technical documentation and meeting minutes writing",
        "Supervision of network equipment cabling and installation",
        "Audit and assessment of existing network flows (Check Point)",
        "Physical and logical migration to FortiGate",
        "Deployment and configuration of FortiManager & FortiAnalyzer",
        "Configuration optimization and post-migration maintenance",
      ]
    }
  },
  {
    id: 4,
    periode: "Sept. 2025",
    client: "BMOI",
    domaine: { fr: "Firewalling & Routage", en: "Firewalling & Routing" },
    role: { fr: "Chef de Projet / Ingénieur IT", en: "Project Manager / IT Engineer" },
    description: {
      fr: "Migration complète de l'architecture de sécurité réseau vers un nouvel équipement FortiGate, avec transfert de toutes les connexions réseau et conformité aux meilleures pratiques de sécurité.",
      en: "Complete migration of the network security architecture to a new FortiGate appliance, with transfer of all network connections and compliance with security best practices."
    },
    taches: {
      fr: [
        "Évaluation et audit du pare-feu et des flux réseau existants",
        "Migration physique du pare-feu vers FortiGate",
        "Optimisation de la configuration et des politiques de sécurité",
        "Configuration des sorties pare-feu vers les routeurs DMVPN de deux opérateurs",
        "Optimisation du routage sur les routeurs et les commutateurs",
        "Mise à jour et documentation de l'infrastructure post-migration",
      ],
      en: [
        "Assessment and audit of existing firewall and network flows",
        "Physical firewall migration to FortiGate",
        "Security policy and configuration optimization",
        "Firewall output configuration toward DMVPN routers of two operators",
        "Routing optimization on routers and switches",
        "Post-migration infrastructure update and documentation",
      ]
    }
  },
  {
    id: 5,
    periode: "Nov. 2025 - Jan. 2026",
    client: "Groupe Aina",
    domaine: { fr: "Infrastructure & Cybersécurité", en: "Infrastructure & Cybersecurity" },
    role: { fr: "Chef de Projet / Ingénieur Système, Réseau et Sécurité", en: "Project Manager / System, Network & Security Engineer" },
    description: {
      fr: "Projet de sécurisation globale de l'infrastructure informatique du Groupe Aina, incluant la mise en place d'une architecture Active Directory hautement disponible, l'intégration d'une authentification Wi-Fi sécurisée basée sur 802.1X avec Microsoft NPS et Cisco Meraki, ainsi que l'optimisation des services DNS de l'entreprise.",
      en: "Global IT infrastructure security project for Groupe Aina, including the deployment of a highly available Active Directory architecture, integration of 802.1X-based secure Wi-Fi authentication with Microsoft NPS and Cisco Meraki, and DNS service optimization."
    },
    taches: {
      fr: [
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
        "Transfert de compétences et accompagnement des équipes techniques",
      ],
      en: [
        "Audit and analysis of the existing infrastructure",
        "Design and deployment of an Active Directory Domain Services (AD DS) architecture",
        "Domain controller setup with replication for high availability of authentication services",
        "Configuration and optimization of DNS services integrated with Active Directory",
        "DNS resolution correction and migration to Nexthope private DNS servers",
        "Deployment of a Microsoft Network Policy Server (NPS)",
        "802.1X Wi-Fi authentication integration with Cisco Meraki infrastructure",
        "Authentication flow configuration: Meraki → NPS → Active Directory",
        "Network access policies based on Active Directory groups",
        "Dynamic VLAN assignment based on authenticated user profiles",
        "Network Access Control (NAC) security policy configuration",
        "Validation, resilience and failover testing of critical services",
        "Complete technical documentation of the deployed architecture",
        "Knowledge transfer and technical team coaching",
      ]
    }
  },
];

export default realisationsData;
