// src/features/about/AtsGenerator.js
// Générateur CV optimisé ATS et élégant avec couleurs soignées, texte justifié et hiérarchie de titres bien différenciée

import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { atsResumeData } from "../../datas/atsResumeData";

if (pdfMake && pdfFonts) {
  const vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;
  pdfMake.vfs = vfs;
}

const COLOR_PRIMARY = "003366";    // Bleu Nuit (Titres principaux)
const COLOR_ACCENT = "008080";     // Teal / Vert canard (Bordures & Dates)
const COLOR_SUBTITLE = "1A5276";   // Bleu intermédiaire (Sous-titres / Noms d'organisations / Entreprises)
const COLOR_DARK = "222222";       // Texte sombre pour le corps (Lisibilité)
const COLOR_MUTED = "555555";      // Métadonnées & détails secondaires

// ─────────────────────────────────────────────────────────────────────────────
// GÉNÉRATEUR DOCX (Élégant + compatible ATS)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateAtsDocx(lang = "fr") {
  const { personalInfo, realisations, experience, skills, education, certifications } = atsResumeData;

  const isFr = lang === "fr";

  const t = {
    role:            isFr ? personalInfo.currentRole.fr     : personalInfo.currentRole.en,
    summary:         isFr ? "PROFIL PROFESSIONNEL"          : "PROFESSIONAL SUMMARY",
    education:       isFr ? "FORMATION"                     : "EDUCATION",
    skills:          isFr ? "COMPÉTENCES TECHNIQUES"        : "TECHNICAL SKILLS",
    certifications:  isFr ? "CERTIFICATIONS"                : "CERTIFICATIONS",
    experience:      isFr ? "EXPÉRIENCE PROFESSIONNELLE"    : "PROFESSIONAL EXPERIENCE",
    realisations:    isFr ? "DERNIÈRES RÉALISATIONS"        : "LATEST ACHIEVEMENTS",
    tasks:           isFr ? "Missions principales :"        : "Main Tasks:",
  };

  // Grand Titre de Section (H1) avec ligne de séparation Teal sous le titre
  const sectionHeading = (text) => new Paragraph({
    children: [
      new TextRun({
        text: `■  ${text}`,
        bold: true,
        size: 24, // 12pt
        color: COLOR_PRIMARY
      })
    ],
    spacing: { before: 300, after: 100 },
    border: { bottom: { color: COLOR_ACCENT, space: 3, value: "single", size: 12 } }
  });

  const bullet = (text) => new Paragraph({
    alignment: AlignmentType.JUSTIFY,
    children: [new TextRun({ text: `• ${text}`, color: COLOR_DARK, size: 20 })],
    spacing: { before: 40, after: 40 },
    indent: { left: 360 }
  });

  const children = [
    // ── EN-TÊTE ──────────────────────────────────────────────────────────────
    new Paragraph({
      children: [new TextRun({ text: `${personalInfo.firstName} ${personalInfo.lastName}`, bold: true, size: 36, color: COLOR_PRIMARY })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 }
    }),
    new Paragraph({
      children: [new TextRun({ text: t.role, size: 24, italics: true, color: COLOR_ACCENT, bold: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `${personalInfo.email}  |  ${personalInfo.phone}  |  ${personalInfo.location}`, size: 20, color: COLOR_MUTED })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `${personalInfo.linkedin}  |  ${personalInfo.github}  |  ${personalInfo.portfolio}`, size: 20, color: COLOR_MUTED })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),

    // ── 1. PROFIL ────────────────────────────────────────────────────────────
    sectionHeading(t.summary),
    new Paragraph({
      alignment: AlignmentType.JUSTIFY,
      children: [new TextRun({ text: personalInfo.summary[lang], color: COLOR_DARK, size: 20 })],
      spacing: { after: 180 }
    }),

    // ── 2. FORMATION ─────────────────────────────────────────────────────────
    sectionHeading(t.education),
    ...education.map((edu) => new Paragraph({
      alignment: AlignmentType.JUSTIFY,
      children: [
        new TextRun({ text: edu.titre[lang], bold: true, color: COLOR_SUBTITLE, size: 21 }),
        new TextRun({ text: `  |  ${edu.ecole}`, color: COLOR_MUTED, italics: true, size: 20 }),
        new TextRun({ text: `  |  ${edu.annee}`, color: COLOR_ACCENT, bold: true, size: 20 }),
      ],
      spacing: { before: 100, after: 60 }
    })),

    // ── 3. COMPÉTENCES TECHNIQUES (Déplacé juste après la formation) ─────────
    sectionHeading(t.skills),
    ...skills.flatMap((cat) => [
      new Paragraph({
        children: [new TextRun({ text: `► ${cat.categorie[lang]}`, bold: true, color: COLOR_SUBTITLE, size: 21 })],
        spacing: { before: 140, after: 40 }
      }),
      ...cat.items[lang].map(item => bullet(item)),
    ]),

    // ── 4. CERTIFICATIONS ────────────────────────────────────────────────────
    sectionHeading(t.certifications),
    ...certifications.map((cert) => bullet(`${cert.nom}  –  ${cert.organisme}  (${cert.annee})`)),

    // ── 5. EXPÉRIENCE PROFESSIONNELLE ────────────────────────────────────────
    sectionHeading(t.experience),
    ...experience
      .slice()
      .reverse()
      .flatMap((exp) => [
        new Paragraph({
          children: [
            new TextRun({ text: exp.entreprise, bold: true, color: COLOR_SUBTITLE, size: 21 }),
            new TextRun({ text: `  |  ${exp.poste[lang]}`, color: COLOR_DARK, bold: true, size: 20 }),
            new TextRun({ text: `  |  ${exp.periode}`, color: COLOR_ACCENT, size: 20 }),
          ],
          spacing: { before: 160, after: 40 }
        }),
        new Paragraph({ children: [new TextRun({ text: exp.lieu, italics: true, color: COLOR_MUTED, size: 19 })], spacing: { after: 60 } }),
        new Paragraph({
          alignment: AlignmentType.JUSTIFY,
          children: [new TextRun({ text: exp.description_court[lang], color: COLOR_DARK, size: 20 })],
          spacing: { after: 80 }
        }),
      ]),

    // ── 6. DERNIÈRES RÉALISATIONS (Déplacé en dernier) ────────────────────────
    sectionHeading(t.realisations),
    ...realisations.slice().reverse().flatMap((r) => [
      new Paragraph({
        children: [
          new TextRun({ text: r.client, bold: true, color: COLOR_SUBTITLE, size: 21 }),
          new TextRun({ text: `  |  ${r.role[lang]}`, color: COLOR_DARK, bold: true, size: 20 }),
          new TextRun({ text: `  |  ${r.periode}`, color: COLOR_ACCENT, size: 20 }),
        ],
        spacing: { before: 160, after: 40 }
      }),
      new Paragraph({ children: [new TextRun({ text: r.domaine[lang], italics: true, color: COLOR_MUTED, size: 19 })], spacing: { after: 60 } }),
      new Paragraph({
        alignment: AlignmentType.JUSTIFY,
        children: [new TextRun({ text: r.description[lang], color: COLOR_DARK, size: 20 })],
        spacing: { after: 60 }
      }),
      new Paragraph({ children: [new TextRun({ text: t.tasks, bold: true, color: COLOR_SUBTITLE, size: 20 })], spacing: { after: 40 } }),
      ...r.taches[lang].map(tache => bullet(tache)),
    ]),
  ];

  const doc = new Document({
    creator: `${personalInfo.firstName} ${personalInfo.lastName}`,
    title: `CV ATS - ${personalInfo.firstName} ${personalInfo.lastName}`,
    description: "Curriculum Vitae optimisé ATS et élégant",
    sections: [{
      properties: {
        page: {
          margin: { top: 720, right: 720, bottom: 720, left: 720 }
        }
      },
      children
    }]
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `CV_ATS_${personalInfo.lastName}_${personalInfo.firstName}_${lang.toUpperCase()}.docx`);
}

// ─────────────────────────────────────────────────────────────────────────────
// GÉNÉRATEUR PDF (Élégant + compatible ATS)
// ─────────────────────────────────────────────────────────────────────────────
export function generateAtsPdf(lang = "fr") {
  const { personalInfo, realisations, experience, skills, education, certifications } = atsResumeData;

  const isFr = lang === "fr";

  const t = {
    role:            isFr ? personalInfo.currentRole.fr     : personalInfo.currentRole.en,
    summary:         isFr ? "PROFIL PROFESSIONNEL"          : "PROFESSIONAL SUMMARY",
    education:       isFr ? "FORMATION"                     : "EDUCATION",
    skills:          isFr ? "COMPÉTENCES TECHNIQUES"        : "TECHNICAL SKILLS",
    certifications:  isFr ? "CERTIFICATIONS"                : "CERTIFICATIONS",
    experience:      isFr ? "EXPÉRIENCE PROFESSIONNELLE"    : "PROFESSIONAL EXPERIENCE",
    realisations:    isFr ? "DERNIÈRES RÉALISATIONS"        : "LATEST ACHIEVEMENTS",
    tasks:           isFr ? "Missions principales :"        : "Main Tasks:",
  };

  // Grand Titre de Section avec fond très léger et grand texte en majuscule
  const sectionHeader = (text) => ({
    text: [
      { text: "■  ", color: "#008080", fontSize: 11 },
      { text: text, color: "#003366", fontSize: 12, bold: true }
    ],
    margin: [0, 16, 0, 6]
  });

  const bullet = (text) => ({
    text: `• ${text}`,
    style: "bullet"
  });

  const content = [
    // ── EN-TÊTE ──────────────────────────────────────────────────────────────
    { text: `${personalInfo.firstName} ${personalInfo.lastName}`, style: "name" },
    { text: t.role, style: "subName" },
    {
      text: `${personalInfo.email}  |  ${personalInfo.phone}  |  ${personalInfo.location}`,
      style: "contact"
    },
    {
      text: `${personalInfo.linkedin}  |  ${personalInfo.github}  |  ${personalInfo.portfolio}`,
      style: "contact",
      margin: [0, 0, 0, 12]
    },

    // ── 1. PROFIL ────────────────────────────────────────────────────────────
    sectionHeader(t.summary),
    { text: personalInfo.summary[lang], style: "body", margin: [0, 0, 0, 8] },

    // ── 2. FORMATION ─────────────────────────────────────────────────────────
    sectionHeader(t.education),
    ...education.map((edu) => ({
      text: [
        { text: edu.titre[lang], bold: true, color: "#1A5276", fontSize: 10.5 },
        { text: `  |  ${edu.ecole}`, color: "#555555" },
        { text: `  |  ${edu.annee}`, color: "#008080", bold: true }
      ],
      style: "jobTitle",
      margin: [0, 5, 0, 3]
    })),

    // ── 3. COMPÉTENCES TECHNIQUES (Déplacé juste après la formation) ─────────
    sectionHeader(t.skills),
    ...skills.flatMap((cat) => [
      { text: `► ${cat.categorie[lang]}`, bold: true, fontSize: 10.5, color: "#1A5276", margin: [0, 6, 0, 2] },
      ...cat.items[lang].map(item => bullet(item)),
    ]),

    // ── 4. CERTIFICATIONS ────────────────────────────────────────────────────
    sectionHeader(t.certifications),
    ...certifications.map((cert) => bullet(`${cert.nom}  –  ${cert.organisme}  (${cert.annee})`)),

    // ── 5. EXPÉRIENCE PROFESSIONNELLE ────────────────────────────────────────
    sectionHeader(t.experience),
    ...experience
      .slice()
      .reverse()
      .flatMap((exp) => [
        {
          text: [
            { text: exp.entreprise, bold: true, color: "#1A5276", fontSize: 10.5 },
            { text: `  |  ${exp.poste[lang]}`, bold: true, color: "#222222" },
            { text: `  |  ${exp.periode}`, color: "#008080" }
          ],
          style: "jobTitle",
          margin: [0, 8, 0, 2]
        },
        { text: exp.lieu, italics: true, fontSize: 9, color: "#555555", margin: [0, 0, 0, 3] },
        { text: exp.description_court[lang], style: "body", margin: [0, 0, 0, 6] },
      ]),

    // ── 6. DERNIÈRES RÉALISATIONS (Déplacé en dernier) ────────────────────────
    sectionHeader(t.realisations),
    ...realisations.slice().reverse().flatMap((r) => [
      {
        text: [
          { text: r.client, bold: true, color: "#1A5276", fontSize: 10.5 },
          { text: `  |  ${r.role[lang]}`, bold: true, color: "#222222" },
          { text: `  |  ${r.periode}`, color: "#008080" }
        ],
        style: "jobTitle",
        margin: [0, 8, 0, 2]
      },
      { text: r.domaine[lang], italics: true, fontSize: 9, color: "#555555", margin: [0, 0, 0, 3] },
      { text: r.description[lang], style: "body", margin: [0, 0, 0, 3] },
      { text: t.tasks, bold: true, fontSize: 10, color: "#1A5276", margin: [0, 3, 0, 2] },
      ...r.taches[lang].map(tache => bullet(tache)),
    ]),
  ];

  const docDefinition = {
    content,
    styles: {
      name: {
        fontSize: 22,
        bold: true,
        color: "#003366",
        alignment: "center",
        margin: [0, 0, 0, 4]
      },
      subName: {
        fontSize: 11,
        italics: true,
        bold: true,
        color: "#008080",
        alignment: "center",
        margin: [0, 0, 0, 4]
      },
      contact: {
        fontSize: 9,
        color: "#555555",
        alignment: "center",
        margin: [0, 0, 0, 2]
      },
      jobTitle: {
        fontSize: 10,
        alignment: "justify"
      },
      body: {
        fontSize: 9.5,
        color: "#222222",
        alignment: "justify",
        lineHeight: 1.3
      },
      bullet: {
        fontSize: 9.5,
        color: "#222222",
        alignment: "justify",
        margin: [12, 1, 0, 1]
      }
    },
    defaultStyle: {
      font: "Roboto",
      fontSize: 10,
      lineHeight: 1.25
    },
    pageMargins: [40, 40, 40, 40],
    info: {
      title: `CV ATS - ${personalInfo.firstName} ${personalInfo.lastName}`,
      author: `${personalInfo.firstName} ${personalInfo.lastName}`,
      subject: "Curriculum Vitae ATS-Optimized",
      keywords: "CV, ATS, cybersecurity, network, engineer"
    }
  };

  pdfMake
    .createPdf(docDefinition)
    .download(`CV_ATS_${personalInfo.lastName}_${personalInfo.firstName}_${lang.toUpperCase()}.pdf`);
}


