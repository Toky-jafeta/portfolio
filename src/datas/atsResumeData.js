// src/datas/atsResumeData.js
// Source unique de vérité : toutes les données sont importées depuis les fichiers existants du portfolio.
// Chaque champ textuel est bilingue { fr, en } — le générateur utilise le paramètre lang pour choisir la langue.

import realisationsData from './realisationsData';
import { ExperienceList } from './experienceList';
import { CompetencesTechniques } from './competences';
import certifications from './certifications.json';
import formations from './formations.json';

export const atsResumeData = {
  personalInfo: {
    firstName: "Toky Jafeta",
    lastName: "Rasolomanitra",
    currentRole: {
      fr: "Ingénieur Systèmes, Réseaux & Cybersécurité",
      en: "Systems, Network & Cybersecurity Engineer"
    },
    summary: {
      fr: "Ingénieur IT Senior avec plus de 10 ans d'expérience, spécialisé en architecture réseau, ingénierie système et cybersécurité. Expertise confirmée dans la conception, le déploiement et la sécurisation d'infrastructures complexes pour de grands comptes (Orange Madagascar, BMOI, TALYS Group, Groupe Aina). Compétences avancées en pentesting, automatisation Python et pilotage de projets techniques de bout en bout.",
      en: "Senior IT Engineer with over 10 years of experience specializing in network architecture, systems engineering, and cybersecurity. Proven track record of designing, deploying, and securing complex infrastructures for major enterprise clients (Orange Madagascar, BMOI, TALYS Group, Groupe Aina). Adept at pentesting, process automation via Python, and leading technical projects from conception to completion."
    },
    email: "trasolomanitra@gmail.com",
    phone: "+261 38 90 016 79",
    location: "Antananarivo, Madagascar",
    linkedin: "linkedin.com/in/toky-rasolomanitra-121896220",
    github: "github.com/Toky-jafeta",
    portfolio: "toky-jafeta.github.io"
  },

  // Réalisations bilingues depuis realisationsData.js
  realisations: realisationsData,

  // Expériences bilingues depuis experienceList.js
  experience: ExperienceList,

  // Compétences bilingues depuis competences.js
  skills: CompetencesTechniques,

  // Formations bilingues depuis formations.json
  education: formations,

  // Certifications depuis certifications.json (noms officiels, pas traduits)
  certifications: certifications,
};

