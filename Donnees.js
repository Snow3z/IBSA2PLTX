/* ===== donnees.js : le seul fichier à modifier pour l'équipe et le Dev Log =====
   Textes : { fr: "...", en: "...", zh: "..." }  (si une langue manque, le français s'affiche) */

/* ---------- ÉQUIPE ----------
   groupe : "direction" | "prematernelle" | "maternelle" | "primaire" | "secondaire" | "admin"
   photo  : chemin de l'image (optionnel). Sans photo, les initiales s'affichent.
   Pour ajouter quelqu'un : copie un bloc { ... }, et remplace les infos. */
const EQUIPE = [
  {
    nom: "M. Mohamed Touré", groupe: "admin", photo: "images/equipe/prenom-nom.jpg", langues: "FR / EN",
    role: { fr: "Directeur de l'ecole", en: "School Director" },
    bio: { fr: "Commentaire", en: "Comment" }
  },
  {
    nom: "M. Mohamed Touré", groupe: "admin", photo: "images/equipe/prenom-nom.jpg", langues: "FR / EN",
    role: { fr: "Directeur de l'ecole", en: "School Director" },
    bio: { fr: "Commentaire", en: "Comment" }
  },


  // Modèle à copier-coller (enlève les // devant chaque ligne) :
  // {
  //   nom: "Prénom Nom", groupe: "primaire", photo: "images/equipe/prenom-nom.jpg", langues: "FR / EN",
  //   role: { fr: "Enseignant(e) de primaire", en: "Primary teacher" },
  //   bio: { fr: "Une phrase ou deux sur la personne.", en: "One or two sentences about the person." }
  // },
];

/* ---------- DEV LOG ----------
   Le plus récent EN PREMIER. Pour ajouter une mise à jour : copie un bloc au début de la liste.
   tags : "nouveau" | "ameliore" | "corrige" |"bug"  (un ou plusieurs)
   date : AAAA-MM-JJ    (dates ci-dessous : à corriger avec les vraies) */
const DEVLOG = [
  {
    version: "1.2", date: "2026-10-29", tags: ["bug"],
    titre: { fr: "Traduction", en: "Traductions" },
    points: [
      { fr: "Le site web ne traduit pas correctement les textes.", en: "The website is not translating well what is written." },
      ]
  },
  {
    version: "1.2", date: "2026-10-29", tags: ["nouveau", "ameliore"],
    titre: { fr: "Onglets, équipe et Dev Log", en: "Tabs, team and Dev Log" },
    points: [
      { fr: "Le site est organisé en onglets au lieu d'une seule longue page.", en: "The site is now organised in tabs instead of one long page." },
      { fr: "Nouvelle page Équipe avec filtres par cycle et fiche détaillée.", en: "New Team page with cycle filters and detail cards." },
      { fr: "Naissance du Dev Log que tu lis en ce moment.", en: "The Dev Log you are reading was born." }
    ]
  },
  {
    version: "1.1", date: "2026-10-15", tags: ["ameliore"],
    titre: { fr: "Carte et boutons animés", en: "Map and animated buttons" },
    points: [
      { fr: "Carte Google Maps intégrée dans la page Contact.", en: "Google Maps embedded in the Contact page." },
      { fr: "Nouveaux boutons avec effet de reflet au survol.", en: "New buttons with a shine effect on hover." }
    ]
  },
  {
    version: "1.0", date: "2026-10-07", tags: ["nouveau"],
    titre: { fr: "Lancement du site", en: "Website launch" },
    points: [
      { fr: "Site disponible en français, anglais et chinois.", en: "Site available in French, English and Chinese." },
      { fr: "Quatre thèmes : clair, sombre, nature et coucher de soleil.", en: "Four themes: light, dark, nature and sunset." }
    ]
  }
];
