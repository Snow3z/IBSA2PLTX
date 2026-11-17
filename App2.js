/* ===== app.js : langue, thème, onglets, équipe, Dev Log ===== */

const $ = (s) => document.querySelectorAll(s);
const lire = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const ecrire = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

let langue = "fr";
const tr = (k) => (TRAD[langue] && TRAD[langue][k]) || TRAD.fr[k] || k;   // texte d'interface
const t = (o) => (o && (o[langue] || o.fr)) || "";                        // texte d'une donnée (équipe, Dev Log)

function el(tag, classe, texte) {
  const e = document.createElement(tag);
  if (classe) e.className = classe;
  if (texte != null) e.textContent = texte;
  return e;
}

/* ---------- Langue et thème ---------- */
function setLangue(l) {
  langue = l;
  document.documentElement.lang = l;
  $("[data-i18n]").forEach((e) => {
    if (!("fr" in e.dataset)) e.dataset.fr = e.innerHTML;          // on garde le texte FR d'origine
    e.innerHTML = (l !== "fr" && TRAD[l][e.dataset.i18n]) || e.dataset.fr;
  });
  $("[data-i18n-ph]").forEach((e) => {
    if (!("fr" in e.dataset)) e.dataset.fr = e.placeholder;
    e.placeholder = (l !== "fr" && TRAD[l][e.dataset.i18nPh]) || e.dataset.fr;
  });
  document.getElementById("lang-select").value = l;
  ecrire("ibsa-langue", l);
  rendre();                                                         // équipe + Dev Log dans la nouvelle langue
}

function setTheme(th) {
  document.documentElement.dataset.theme = th;
  document.getElementById("theme-select").value = th;
  ecrire("ibsa-theme", th);
}

/* ---------- Filtres (puces) ---------- */
const GROUPES = [["tous", "g_all"], ["direction", "g_dir"], ["prematernelle", "g_pre"], ["maternelle", "g_mat"],
                 ["primaire", "g_pri"], ["secondaire", "g_sec"], ["admin", "g_adm"]];
const TAGS = [["tous", "g_all"], ["nouveau", "tag_nouveau"], ["ameliore", "tag_ameliore"], ["corrige", "tag_corrige"], ["bug", "tag_bug"]];
let filtreEq = "tous", filtreDev = "tous";

function puces(conteneur, liste, actif, choisir) {
  conteneur.replaceChildren(...liste.map(([id, cle]) => {
    const b = el("button", "puce", tr(cle));
    b.type = "button";
    b.setAttribute("aria-pressed", id === actif);
    b.onclick = () => { choisir(id); conteneur.querySelector("[aria-pressed=true]").focus(); };
    return b;
  }));
}

/* ---------- Équipe ---------- */
const initiales = (nom) => nom.split(/\s+/).map((m) => m[0]).slice(0, 2).join("").toUpperCase();

function avatar(p) {
  const a = el("div", "avatar", initiales(p.nom));
  if (p.photo) {
    const img = el("img");
    img.src = p.photo;
    img.alt = "";
    img.onerror = () => img.remove();                               // pas de photo → les initiales restent
    a.append(img);
  }
  return a;
}

function ouvrirFiche(p) {
  document.getElementById("fiche-contenu").replaceChildren(
    avatar(p), el("h3", null, p.nom), el("p", "staff__role", t(p.role)),
    el("p", null, t(p.bio)), el("p", "staff__langues", tr("m_lang") + " : " + p.langues)
  );
  document.getElementById("fiche").showModal();
}

function rendreEquipe() {
  const presents = GROUPES.filter(([id]) => id === "tous" || EQUIPE.some((p) => p.groupe === id));
  if (!presents.some(([id]) => id === filtreEq)) filtreEq = "tous";
  const filtres = document.getElementById("eq-filtres");
  if (EQUIPE.length) puces(filtres, presents, filtreEq, (id) => { filtreEq = id; rendreEquipe(); });
  else filtres.replaceChildren();                                   // personne : pas de filtres
  const liste = EQUIPE.filter((p) => filtreEq === "tous" || p.groupe === filtreEq);
  const grille = document.getElementById("eq-grille");
  if (!EQUIPE.length) { grille.replaceChildren(el("p", "centre sous-titre", tr("eq_vide"))); return; }
  grille.replaceChildren(...liste.map((p) => {
    const b = el("button", "staff");
    b.type = "button";
    b.append(avatar(p), el("h3", null, p.nom), el("span", "staff__role", t(p.role)));
    b.onclick = () => ouvrirFiche(p);
    return b;
  }));
}

/* ---------- Dev Log ---------- */
function formaterDate(iso) {
  return new Date(iso + "T00:00:00").toLocaleDateString(langue === "zh" ? "zh-CN" : langue,
    { day: "numeric", month: "long", year: "numeric" });
}

function rendreDevlog() {
  puces(document.getElementById("dev-filtres"), TAGS, filtreDev, (id) => { filtreDev = id; rendreDevlog(); });
  const liste = DEVLOG.filter((v) => filtreDev === "tous" || v.tags.includes(filtreDev));
  document.getElementById("dev-liste").replaceChildren(...liste.map((v) => {
    const tete = el("div", "version__tete");
    const date = el("time", "version__date", formaterDate(v.date));
    date.dateTime = v.date;
    tete.append(el("span", "version__num", "v" + v.version), date,
                ...v.tags.map((x) => el("span", "tag tag--" + x, tr("tag_" + x))));
    const ul = el("ul");
    v.points.forEach((p) => ul.append(el("li", null, t(p))));
    const li = el("li", "version");
    li.append(tete, el("h3", null, t(v.titre)), ul);
    return li;
  }));
  document.getElementById("version-site").textContent = tr("version") + " v" + DEVLOG[0].version;
}

function rendre() {
  rendreEquipe();
  rendreDevlog();
  document.getElementById("fiche-fermer").setAttribute("aria-label", tr("close"));
}

/* La fiche se ferme aussi en cliquant à côté */
document.getElementById("fiche").addEventListener("click", (e) => { if (e.target.id === "fiche") e.target.close(); });

/* ---------- Onglets ----------
   L'adresse (#equipe, #devlog...) choisit l'onglet. Un lien vers une section précise
   (#cycles, #raisons...) ouvre le bon onglet puis descend jusqu'à la section. */
const NOMS = [...$(".onglet")].map((o) => o.dataset.onglet);

/* Sous-onglets de "L'école" : une seule section visible à la fois */
const SOUS = [...$(".sous-onglet")].map((s) => s.id);
function afficherSous(id) {
  $(".sous-onglet").forEach((s) => s.classList.toggle("actif", s.id === id));
  $("[data-sous]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.sous === id));
}
$("[data-sous]").forEach((b) => { b.onclick = () => afficherSous(b.dataset.sous); });

function afficherOnglet() {
  const h = decodeURIComponent(location.hash.slice(1));
  let nom = "accueil", cible = null;
  if (NOMS.includes(h)) nom = h;
  else if (h) {
    cible = document.getElementById(h);
    const o = cible && cible.closest(".onglet");
    if (o) nom = o.dataset.onglet;
  }
  $(".onglet").forEach((o) => o.classList.toggle("actif", o.dataset.onglet === nom));
  $("[data-onglet-lien]").forEach((a) => {
    if (a.dataset.ongletLien === nom) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
  const sous = cible && SOUS.includes(cible.id) ? cible.id : null;
  afficherSous(sous || (document.querySelector(".sous-onglet.actif") || {}).id || "apropos");
  document.getElementById("menu-toggle").checked = false;           // referme le menu mobile
  if (cible && !sous) cible.scrollIntoView(); else window.scrollTo(0, 0);
}

window.addEventListener("hashchange", afficherOnglet);

/* ---------- Signalement de bug ---------- */
const formBug = document.getElementById("bug-form");
formBug.addEventListener("submit", async (e) => {
  e.preventDefault();
  const etat = document.getElementById("bug-etat");
  document.getElementById("bug-infos").value = [      // infos utiles envoyées automatiquement
    "Page : " + (location.hash || "#accueil"),
    "Langue : " + langue,
    "Thème : " + document.documentElement.dataset.theme,
    "Écran : " + innerWidth + "x" + innerHeight,
    "Navigateur : " + navigator.userAgent
  ].join(" | ");
  etat.textContent = tr("bug_envoi");
  try {
    const r = await fetch(formBug.action, {
      method: "POST", body: new FormData(formBug), headers: { Accept: "application/json" }
    });
    if (!r.ok) throw new Error();
    formBug.reset();
    etat.textContent = tr("bug_ok");
  } catch (err) {
    etat.textContent = tr("bug_err");
  }
});

/* ---------- Démarrage ---------- */
document.getElementById("lang-select").addEventListener("change", (e) => setLangue(e.target.value));
document.getElementById("theme-select").addEventListener("change", (e) => setTheme(e.target.value));

const navLangue = navigator.language.slice(0, 2);
const saved = lire("ibsa-langue");
setLangue(saved === "fr" || TRAD[saved] ? saved : (TRAD[navLangue] ? navLangue : "fr"));
setTheme(lire("ibsa-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "sombre" : "clair"));
afficherOnglet();
