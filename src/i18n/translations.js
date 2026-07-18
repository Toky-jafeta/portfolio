// src/i18n/translations.js
// Toutes les traductions statiques de l'interface

export const t = {
  // ── HEADER / NAV ──────────────────────────────────────────────
  nav: {
    home:            { fr: 'Accueil',       en: 'Home' },
    about:           { fr: 'À propos',      en: 'About' },
    expertise:       { fr: 'Expertise',     en: 'Expertise' },
    realisations:    { fr: 'Réalisations',  en: 'Projects' },
    services:        { fr: 'Services',      en: 'Services' },
    certifications:  { fr: 'Certifications', en: 'Certifications' },
    contact:         { fr: 'Contact',       en: 'Contact' },
    available:       { fr: 'Disponible',    en: 'Available' },
  },

  // ── HERO ──────────────────────────────────────────────────────
  hero: {
    eyebrow:    { fr: 'Ingénieur Systèmes, Réseaux & Cybersécurité', en: 'Systems, Network & Cybersecurity Engineer' },
    title1:     { fr: 'Je conçois, sécurise et pilote', en: 'I design, secure and lead' },
    title2:     { fr: 'vos infrastructures IT critiques.', en: 'your critical IT infrastructures.' },
    desc:       { fr: "Expert en architectures réseau, cybersécurité et automatisation Python, j'aide les entreprises à innover tout en renforçant leur résilience numérique.", en: 'Expert in network architecture, cybersecurity and Python automation, I help companies innovate while strengthening their digital resilience.' },
    yearsExp:   { fr: "Ans d'expérience", en: 'Years experience' },
    projects:   { fr: 'Projets livrés',   en: 'Projects delivered' },
    certs:      { fr: 'Certifs Fortinet',  en: 'Fortinet Certs' },
    clients:    { fr: 'Clients majeurs',   en: 'Major clients' },
    cta1:       { fr: 'Voir mes réalisations →', en: 'View my projects →' },
    cta2:       { fr: 'Me contacter',           en: 'Contact me' },
  },

  // ── ABOUT ────────────────────────────────────────────────────
  about: {
    label:    { fr: '// À propos',   en: '// About' },
    title:    { fr: 'Ingénieur polyvalent, orienté résultats.', en: 'Versatile engineer, results-driven.' },
    subtitle: { fr: "Basé à Antananarivo, je combine une expertise en systèmes & réseaux, une passion pour la cybersécurité et un savoir-faire en développement pour concevoir des solutions IT robustes et sécurisées. De l'architecture réseau au pentest, du scripting Python au pilotage de projets — je couvre l'ensemble de la chaîne de valeur IT.", en: "Based in Antananarivo, I combine expertise in systems & networks, a passion for cybersecurity and development skills to design robust and secure IT solutions. From network architecture to pentesting, from Python scripting to project management — I cover the entire IT value chain." },
    genCV:    { fr: 'Générer CV ATS', en: 'Generate ATS Resume' },
    pillars: [
      {
        icon: '🏗️',
        title: { fr: 'Architecture & Infrastructure', en: 'Architecture & Infrastructure' },
        desc:  { fr: "Conception et déploiement d'architectures réseau complexes : firewalls Fortinet, switches Cisco, VPN, haute disponibilité, segmentation VLAN/VRF.", en: 'Design and deployment of complex network architectures: Fortinet firewalls, Cisco switches, VPN, high availability, VLAN/VRF segmentation.' }
      },
      {
        icon: '🛡️',
        title: { fr: 'Cybersécurité & Pentesting', en: 'Cybersecurity & Pentesting' },
        desc:  { fr: "Audits de sécurité, tests d'intrusion, bug bounty, détection de vulnérabilités. Certifié Fortinet (FCP, FCA, FCF). Actif sur RootMe et HackTheBox.", en: "Security audits, penetration testing, bug bounty, vulnerability detection. Fortinet certified (FCP, FCA, FCF). Active on RootMe and HackTheBox." }
      },
      {
        icon: '⚡',
        title: { fr: 'Développement & Automatisation', en: 'Development & Automation' },
        desc:  { fr: "Développement Python avancé, scripting d'automatisation, applications web React/Django, outils de monitoring et génération de rapports.", en: 'Advanced Python development, automation scripting, React/Django web apps, monitoring tools and report generation.' }
      },
      {
        icon: '📋',
        title: { fr: 'Pilotage de Projets IT', en: 'IT Project Management' },
        desc:  { fr: "Chef de projet sur des missions critiques : coordination d'équipes, gestion des délais, communication client, documentation technique complète.", en: 'Project manager on critical missions: team coordination, deadline management, client communication, complete technical documentation.' }
      }
    ]
  },

  // ── EXPERTISE ────────────────────────────────────────────────
  expertise: {
    label:    { fr: '// Expertise',          en: '// Expertise' },
    title:    { fr: 'Compétences techniques', en: 'Technical Skills' },
    subtitle: { fr: "Un spectre large de compétences, de l'infrastructure réseau au développement logiciel, en passant par la cybersécurité et le cloud.", en: 'A broad spectrum of skills, from network infrastructure to software development, including cybersecurity and cloud.' },
    tools:    { fr: 'Outils & Technologies',  en: 'Tools & Technologies' },
  },

  // ── REALISATIONS ─────────────────────────────────────────────
  realisations: {
    label:      { fr: '// Portfolio',                 en: '// Portfolio' },
    title:      { fr: 'Réalisations marquantes',       en: 'Key Projects' },
    subtitle:   { fr: 'Découvrez mes récents projets de migration, sécurisation d\'infrastructure et pilotage chez des grands comptes.', en: 'Explore my recent migration, infrastructure security and project management work for major enterprise clients.' },
    filterAll:  { fr: 'Tous les projets',             en: 'All projects' },
    filterNet:  { fr: 'Réseau & Routage',             en: 'Network & Routing' },
    filterSec:  { fr: 'Sécurité & Firewalling',       en: 'Security & Firewalling' },
    details:    { fr: 'Détails du projet →',          en: 'Project details →' },
    modalDesc:  { fr: 'Description',                  en: 'Description' },
    modalTasks: { fr: 'Tâches clés réalisées',        en: 'Key tasks completed' },
  },

  // ── SERVICES ─────────────────────────────────────────────────
  services: {
    label:    { fr: '// Services',                en: '// Services' },
    title:    { fr: 'Ce que je propose',          en: 'What I offer' },
    subtitle: { fr: 'Des prestations sur-mesure adaptées à vos besoins technologiques, alliant sécurité, performance et scalabilité.', en: 'Tailored services adapted to your technological needs, combining security, performance and scalability.' },
    learnMore:{ fr: 'En savoir plus',             en: 'Learn more' },
  },

  // ── EXPERIENCES ──────────────────────────────────────────────
  experiences: {
    label:       { fr: '// Parcours',                    en: '// Journey' },
    title:       { fr: 'Expériences & Formations',        en: 'Experience & Education' },
    subtitle:    { fr: 'Un résumé de mon parcours professionnel et universitaire au cours des dernières années.', en: 'A summary of my professional and academic journey over the past years.' },
    expTitle:    { fr: 'Expérience Professionnelle',      en: 'Professional Experience' },
    eduTitle:    { fr: 'Formations Académiques',          en: 'Academic Education' },
  },

  // ── CERTIFICATIONS ───────────────────────────────────────────
  certifications: {
    label:    { fr: '// Accréditations',   en: '// Credentials' },
    title:    { fr: 'Certifications & Badges', en: 'Certifications & Badges' },
    subtitle: { fr: 'Mes titres de compétences officiels et certifications dans les domaines des réseaux, de la cybersécurité et du cloud.', en: 'My official credentials and certifications in the fields of networks, cybersecurity and cloud.' },
    year:     { fr: 'Année',              en: 'Year' },
  },

  // ── CONTACT ──────────────────────────────────────────────────
  contact: {
    label:       { fr: '// Contact',                     en: '// Contact' },
    title:       { fr: 'Discutons de votre projet',       en: "Let's talk about your project" },
    subtitle:    { fr: "Une question, une collaboration ou un projet d'infrastructure à sécuriser ? N'hésitez pas à me contacter.", en: "A question, a collaboration or an infrastructure project to secure? Don't hesitate to reach out." },
    emailLabel:  { fr: 'Email',                          en: 'Email' },
    phoneLabel:  { fr: 'Téléphone',                     en: 'Phone' },
    locLabel:    { fr: 'Localisation',                   en: 'Location' },
    nameLbl:     { fr: 'Votre nom',                      en: 'Your name' },
    emailLbl:    { fr: 'Adresse email',                  en: 'Email address' },
    msgLbl:      { fr: 'Message',                        en: 'Message' },
    namePh:      { fr: 'Jean Dupont',                    en: 'John Doe' },
    msgPh:       { fr: 'Votre message...',               en: 'Your message...' },
    send:        { fr: 'Envoyer le message',             en: 'Send message' },
    sending:     { fr: 'Envoi en cours...',              en: 'Sending...' },
    errorEmpty:  { fr: 'Veuillez remplir tous les champs.', en: 'Please fill in all fields.' },
    successMsg:  { fr: 'Message envoyé avec succès !',   en: 'Message sent successfully!' },
    errorMsg:    { fr: 'Une erreur est survenue. Veuillez réessayer.', en: 'An error occurred. Please try again.' },
  },

  // ── FOOTER ────────────────────────────────────────────────────
  footer: {
    rights:   { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
    about:    { fr: 'À propos',              en: 'About' },
    projects: { fr: 'Réalisations',          en: 'Projects' },
    journey:  { fr: 'Parcours',             en: 'Journey' },
  },
};

// Helper: tr(t.hero.title1, lang) → returns the correct string
export const tr = (key, lang) => key?.[lang] ?? key?.['fr'] ?? '';
