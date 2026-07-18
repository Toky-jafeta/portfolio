// src/features/about/AtsGenerator.js
// Générateur ATS pur - compatible avec tous les logiciels de recrutement (Taleo, Workday, SuccessFactors, Greenhouse, Lever...)
// Format : texte brut structuré, une seule colonne, pas d'image, pas de tableaux, pas de couleurs.

import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { atsResumeData } from "../../datas/atsResumeData";

if (pdfMake && pdfFonts) {
  const vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;
  pdfMake.vfs = vfs;
}

// ─────────────────────────────────────────────────────────────────────────────
// GÉNÉRATEUR DOCX (ATS-compatible)
// ─────────────────────────────────────────────────────────────────────────────
export async function generateAtsDocx(lang = "fr") {
  const { personalInfo, realisations, experience, skills, education, certifications } = atsResumeData;

  const isFr = lang === "fr";

  const t = {
    role:            isFr ? personalInfo.currentRole.fr     : personalInfo.currentRole.en,
    summary:         isFr ? "PROFIL PROFESSIONNEL"          : "PROFESSIONAL SUMMARY",
    realisations:    isFr ? "DERNIÈRES RÉALISATIONS"        : "LATEST ACHIEVEMENTS",
    experience:      isFr ? "EXPÉRIENCE PROFESSIONNELLE"    : "PROFESSIONAL EXPERIENCE",
    skills:          isFr ? "COMPÉTENCES TECHNIQUES"        : "TECHNICAL SKILLS",
    education:       isFr ? "FORMATION"                     : "EDUCATION",
    certifications:  isFr ? "CERTIFICATIONS"                : "CERTIFICATIONS",
    tasks:           isFr ? "Missions :"                    : "Tasks:",
  };

  const sectionHeading = (text) => new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26 })],
    spacing: { before: 280, after: 80 },
    border: { bottom: { color: "000000", space: 1, value: "single", size: 4 } }
  });

  const bullet = (text) => new Paragraph({
    text: `• ${text}`,
    spacing: { before: 40, after: 40 },
    indent: { left: 360 }
  });

  const children = [
    // ── EN-TÊTE ──────────────────────────────────────────────────────────────
    new Paragraph({
      children: [new TextRun({ text: `${personalInfo.firstName} ${personalInfo.lastName}`, bold: true, size: 36 })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 }
    }),
    new Paragraph({
      children: [new TextRun({ text: t.role, size: 24, italics: true })],
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `${personalInfo.email}  |  ${personalInfo.phone}  |  ${personalInfo.location}`, size: 20 })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: `${personalInfo.linkedin}  |  ${personalInfo.github}  |  ${personalInfo.portfolio}`, size: 20 })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 }
    }),

    // ── PROFIL ───────────────────────────────────────────────────────────────
    sectionHeading(t.summary),
    new Paragraph({
      text: personalInfo.summary[lang],
      spacing: { after: 200 }
    }),

    // ── RÉALISATIONS ─────────────────────────────────────────────────────────
    sectionHeading(t.realisations),
    ...realisations.flatMap((r) => [
      new Paragraph({
        children: [
          new TextRun({ text: `${r.client}`, bold: true }),
          new TextRun({ text: `  |  ${r.role[lang]}  |  ${r.periode}` }),
        ],
        spacing: { before: 160, after: 40 }
      }),
      new Paragraph({ children: [new TextRun({ text: r.domaine[lang], italics: true, size: 20 })], spacing: { after: 60 } }),
      new Paragraph({ text: r.description[lang], spacing: { after: 60 } }),
      new Paragraph({ children: [new TextRun({ text: t.tasks, bold: true })], spacing: { after: 40 } }),
      ...r.taches[lang].map(tache => bullet(tache)),
    ]),

    // ── EXPÉRIENCE ───────────────────────────────────────────────────────────
    sectionHeading(t.experience),
    ...experience
      .slice()
      .reverse()
      .flatMap((exp) => [
        new Paragraph({
          children: [
            new TextRun({ text: exp.entreprise, bold: true }),
            new TextRun({ text: `  |  ${exp.poste[lang]}  |  ${exp.periode}` }),
          ],
          spacing: { before: 160, after: 40 }
        }),
        new Paragraph({ children: [new TextRun({ text: exp.lieu, italics: true, size: 20 })], spacing: { after: 60 } }),
        new Paragraph({ text: exp.description_court[lang], spacing: { after: 80 } }),
      ]),

    // ── COMPÉTENCES ───────────────────────────────────────────────────────────
    sectionHeading(t.skills),
    ...skills.flatMap((cat) => [
      new Paragraph({ children: [new TextRun({ text: cat.categorie[lang], bold: true })], spacing: { before: 120, after: 40 } }),
      ...cat.items[lang].map(item => bullet(item)),
    ]),

    // ── FORMATION ────────────────────────────────────────────────────────────
    sectionHeading(t.education),
    ...education.map((edu) => new Paragraph({
      children: [
        new TextRun({ text: edu.titre[lang], bold: true }),
        new TextRun({ text: `  |  ${edu.ecole}  |  ${edu.annee}` }),
      ],
      spacing: { before: 120, after: 80 }
    })),

    // ── CERTIFICATIONS ───────────────────────────────────────────────────────
    sectionHeading(t.certifications),
    ...certifications.map((cert) => bullet(`${cert.nom}  –  ${cert.organisme}  (${cert.annee})`)),
  ];

  const doc = new Document({
    creator: `${personalInfo.firstName} ${personalInfo.lastName}`,
    title: `CV ATS - ${personalInfo.firstName} ${personalInfo.lastName}`,
    description: "Curriculum Vitae optimisé ATS",
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
// GÉNÉRATEUR PDF (ATS-compatible)
// ─────────────────────────────────────────────────────────────────────────────
export function generateAtsPdf(lang = "fr") {
  const { personalInfo, realisations, experience, skills, education, certifications } = atsResumeData;

  const isFr = lang === "fr";

  const t = {
    role:            isFr ? personalInfo.currentRole.fr     : personalInfo.currentRole.en,
    summary:         isFr ? "PROFIL PROFESSIONNEL"          : "PROFESSIONAL SUMMARY",
    realisations:    isFr ? "DERNIÈRES RÉALISATIONS"        : "LATEST ACHIEVEMENTS",
    experience:      isFr ? "EXPÉRIENCE PROFESSIONNELLE"    : "PROFESSIONAL EXPERIENCE",
    skills:          isFr ? "COMPÉTENCES TECHNIQUES"        : "TECHNICAL SKILLS",
    education:       isFr ? "FORMATION"                     : "EDUCATION",
    certifications:  isFr ? "CERTIFICATIONS"                : "CERTIFICATIONS",
    tasks:           isFr ? "Missions :"                    : "Tasks:",
  };

  const sectionHeader = (text) => ({
    text,
    style: "sectionHeader",
    margin: [0, 18, 0, 4]
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
      margin: [0, 0, 0, 14]
    },

    // ── PROFIL ───────────────────────────────────────────────────────────────
    sectionHeader(t.summary),
    { text: personalInfo.summary[lang], style: "body", margin: [0, 0, 0, 10] },

    // ── RÉALISATIONS ─────────────────────────────────────────────────────────
    sectionHeader(t.realisations),
    ...realisations.flatMap((r) => [
      {
        text: [
          { text: r.client, bold: true },
          { text: `  |  ${r.role[lang]}  |  ${r.periode}` }
        ],
        style: "jobTitle",
        margin: [0, 8, 0, 2]
      },
      { text: r.domaine[lang], italics: true, fontSize: 9, color: "#444444", margin: [0, 0, 0, 3] },
      { text: r.description[lang], style: "body", margin: [0, 0, 0, 3] },
      { text: t.tasks, bold: true, fontSize: 10, margin: [0, 2, 0, 2] },
      ...r.taches[lang].map(tache => bullet(tache)),
    ]),

    // ── EXPÉRIENCE ───────────────────────────────────────────────────────────
    sectionHeader(t.experience),
    ...experience
      .slice()
      .reverse()
      .flatMap((exp) => [
        {
          text: [
            { text: exp.entreprise, bold: true },
            { text: `  |  ${exp.poste[lang]}  |  ${exp.periode}` }
          ],
          style: "jobTitle",
          margin: [0, 8, 0, 2]
        },
        { text: exp.lieu, italics: true, fontSize: 9, color: "#444444", margin: [0, 0, 0, 3] },
        { text: exp.description_court[lang], style: "body", margin: [0, 0, 0, 6] },
      ]),

    // ── COMPÉTENCES ───────────────────────────────────────────────────────────
    sectionHeader(t.skills),
    ...skills.flatMap((cat) => [
      { text: cat.categorie[lang], bold: true, fontSize: 10, margin: [0, 6, 0, 2] },
      ...cat.items[lang].map(item => bullet(item)),
    ]),

    // ── FORMATION ────────────────────────────────────────────────────────────
    sectionHeader(t.education),
    ...education.map((edu) => ({
      text: [
        { text: edu.titre[lang], bold: true },
        { text: `  |  ${edu.ecole}  |  ${edu.annee}` }
      ],
      style: "jobTitle",
      margin: [0, 6, 0, 4]
    })),

    // ── CERTIFICATIONS ───────────────────────────────────────────────────────
    sectionHeader(t.certifications),
    ...certifications.map((cert) => bullet(`${cert.nom}  –  ${cert.organisme}  (${cert.annee})`)),
  ];

  const docDefinition = {
    content,
    styles: {
      name: {
        fontSize: 20,
        bold: true,
        alignment: "center",
        margin: [0, 0, 0, 4]
      },
      subName: {
        fontSize: 12,
        italics: true,
        alignment: "center",
        margin: [0, 0, 0, 4]
      },
      contact: {
        fontSize: 9,
        alignment: "center",
        margin: [0, 0, 0, 2]
      },
      sectionHeader: {
        fontSize: 11,
        bold: true,
        decoration: "underline",
        margin: [0, 14, 0, 4]
      },
      jobTitle: {
        fontSize: 10,
        bold: false
      },
      body: {
        fontSize: 9.5,
        lineHeight: 1.3
      },
      bullet: {
        fontSize: 9.5,
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
