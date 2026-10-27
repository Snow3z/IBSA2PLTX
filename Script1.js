/* ===== script.js : langue + thème ===== */

/* Traductions. Le français = le texte déjà écrit dans le HTML.
   Pour ajouter une langue : copie le bloc "en", renomme-le (ex: "es"),
   et ajoute <option value="es"> dans #lang-select. */
const TRAD = {
  en: {
    title: "IBSA 2 Plateaux | Home",
    t1: "Light", t2: "Dark", t3: "Nature", t4: "Sunset",
    n1: "Home", n2: "About", n3: "Our cycles", n4: "Why us?", n5: "News", n6: "Contact",
    h1: "Opening every horizon,<br>moving forward with confidence",
    hp: "A bilingual school where every child is unique and can reach their full potential.",
    hb1: "Enroll my child", hb2: "Learn more", hb3: "Contact us",
    s1: "Nationalities", s2: "From age 2", s2l: "Entry age", s3l: "Bilingual immersion",
    a_h: "Welcome to IBSA 2 Plateaux",
    a_s: "A school with innovative teaching",
    a_p1: "Our school was born from the desire of parents and educators to create a demanding yet caring place, where every child grows up safely and develops their talents.",
    a_p2: "Our students learn to think for themselves, respect differences and open up to the world. Their journey is supported on every level: academic, social, creative, scientific, linguistic and sports.",
    a_b: "Discover what sets us apart",
    cy_s: "From early childhood to high school",
    cy1: "Pre-nursery", cy1p: "Awakening, play and discovering first words in both languages.",
    cy2: "Nursery", cy2p: "First learning, language, motor skills and group life.",
    cy3: "Primary", cy3p: "Solid foundations in reading, writing, maths and science.",
    cy4: "Secondary", cy4p: "Exam preparation, guidance and personal project.",
    r_h: "Why choose IBSA 2 Plateaux?", r_s: "Six reasons to trust us",
    r1: "Active learning", r1p: "Students learn by doing, through concrete projects.",
    r2: "Personal follow-up", r2p: "Each child moves at their own pace, with attentive support.",
    r3: "Languages", r3p: "French and English immersion in a multicultural setting.",
    r4: "Assessments", r4p: "Regular assessments to international standards.",
    r5: "Environment", r5p: "A safe, calm and stimulating setting to learn peacefully.",
    r6: "Prospects", r6p: "A path that opens the doors to the best studies.",
    ad_h: "Admissions open",
    ad_p: "Enrollment is open for the 2026-2027 school year. Our team is here to help.",
    ac_s: "What's happening at school",
    ac1d: "October 1, 2026", ac1: "A successful back to school", ac1p: "A look back at a start of term full of energy and smiles.",
    ac2d: "October 12, 2026", ac2: "Sports day", ac2p: "Students competed in a great mood.",
    ac3d: "October 20, 2026", ac3: "Bilingual reading workshop", ac3p: "A time to share around books in French and English.",
    more: "Read more »", map_l: "📍 Open in Google Maps",
    nl_h: "Subscribe to our newsletter", nl_p: "Get school news and events.",
    nl_l: "Your e-mail", nl_ph: "Your e-mail address", send: "Send",
    pa_h: "Our partners",
    ct_h: "Contact us", ct_p: "Any questions? Write to us and we will reply quickly.",
    ct_adr: "📍 II Plateaux, Cocody, Abidjan (Ivory Coast)<br>📞 +225 00 00 00 00<br>✉️ contact@monecole.ci",
    ct_n: "Full name", ct_b: "Send message",
    f_p: "A bilingual, caring and ambitious school.",
    f_a1: "Admissions office", f_a2: "Fees", f_a3: "Form",
    f_vie: "School life", f_v2: "Gallery", f_v3: "Calendar", f_suiv: "Follow us",
    f_copy: "&copy; 2026 IBSA 2 Plateaux. All rights reserved."
  },
  zh: {
    title: "IBSA 2 Plateaux | 首页",
    t1: "浅色", t2: "深色", t3: "自然", t4: "日落",
    n1: "首页", n2: "关于我们", n3: "我们的学段", n4: "为什么选择我们？", n5: "新闻动态", n6: "联系我们",
    h1: "开启所有视野，<br>自信向前",
    hp: "一所双语学校，每个孩子都是独一无二的，都能充分发挥自己的潜力。",
    hb1: "为孩子报名", hb2: "了解更多", hb3: "联系我们",
    s1: "个国籍", s2: "2岁起", s2l: "入学年龄", s3l: "双语沉浸",
    a_h: "欢迎来到 IBSA 2 Plateaux",
    a_s: "一所教学理念创新的学校",
    a_p1: "我们的学校源于家长和教育工作者的共同心愿：打造一个严格而充满关爱的地方，让每个孩子在安全的环境中成长，并发展自己的才能。",
    a_p2: "我们的学生学会独立思考、尊重差异、拥抱世界。我们在学业、社交、创造、科学、语言和体育等各方面陪伴他们成长。",
    a_b: "了解我们的与众不同",
    cy_s: "从幼儿时期到高中",
    cy1: "学前班", cy1p: "在两种语言中启蒙、游戏并认识最初的词语。",
    cy2: "幼儿园", cy2p: "初步学习、语言、运动能力和集体生活。",
    cy3: "小学", cy3p: "扎实掌握阅读、写作、数学和科学基础。",
    cy4: "中学", cy4p: "备考、升学指导和个人项目。",
    r_h: "为什么选择 IBSA 2 Plateaux？", r_s: "值得信赖的六个理由",
    r1: "主动式教学", r1p: "学生通过具体项目，在实践中学习。",
    r2: "个性化跟进", r2p: "每个孩子按自己的节奏前进，并得到细心的陪伴。",
    r3: "语言", r3p: "在多元文化环境中沉浸式学习法语和英语。",
    r4: "学业评估", r4p: "定期进行符合国际标准的评估。",
    r5: "校园环境", r5p: "安全、宁静又富有启发的学习环境。",
    r6: "升学前景", r6p: "为进入优秀的高等院校打开大门。",
    ad_h: "现正招生",
    ad_p: "2026-2027 学年的报名已开始。我们的团队随时为您服务。",
    ac_s: "学校里的最新动态",
    ac1d: "2026年10月1日", ac1: "开学季圆满成功", ac1p: "回顾充满活力与笑容的开学时光。",
    ac2d: "2026年10月12日", ac2: "运动日", ac2p: "同学们在欢乐的气氛中展开比拼。",
    ac3d: "2026年10月20日", ac3: "双语阅读工坊", ac3p: "围绕法语和英语书籍的交流时刻。",
    more: "阅读更多 »", map_l: "📍 在 Google 地图中打开",
    nl_h: "订阅我们的通讯", nl_p: "获取学校的最新消息和活动。",
    nl_l: "您的电子邮箱", nl_ph: "您的电子邮箱地址", send: "发送",
    pa_h: "我们的合作伙伴",
    ct_h: "联系我们", ct_p: "有疑问吗？请给我们留言，我们会尽快回复。",
    ct_adr: "📍 II Plateaux, Cocody, 阿比让（科特迪瓦）<br>📞 +225 00 00 00 00<br>✉️ contact@monecole.ci",
    ct_n: "姓名", ct_b: "发送留言",
    f_p: "一所双语、关爱且充满抱负的学校。",
    f_a1: "招生办公室", f_a2: "学费", f_a3: "报名表",
    f_vie: "校园生活", f_v2: "相册", f_v3: "校历", f_suiv: "关注我们",
    f_copy: "&copy; 2026 IBSA 2 Plateaux。保留所有权利。"
  }
};

const $ = (s) => document.querySelectorAll(s);
const lire = (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } };
const ecrire = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

function setLangue(l) {
  document.documentElement.lang = l;
  $("[data-i18n]").forEach((el) => {
    if (!("fr" in el.dataset)) el.dataset.fr = el.innerHTML;       // on garde le texte FR d'origine
    el.innerHTML = (l !== "fr" && TRAD[l][el.dataset.i18n]) || el.dataset.fr;
  });
  $("[data-i18n-ph]").forEach((el) => {
    if (!("fr" in el.dataset)) el.dataset.fr = el.placeholder;
    el.placeholder = (l !== "fr" && TRAD[l][el.dataset.i18nPh]) || el.dataset.fr;
  });
  document.getElementById("lang-select").value = l;
  ecrire("ibsa-langue", l);
}

function setTheme(t) {
  document.documentElement.dataset.theme = t;
  document.getElementById("theme-select").value = t;
  ecrire("ibsa-theme", t);
}

document.getElementById("lang-select").addEventListener("change", (e) => setLangue(e.target.value));
document.getElementById("theme-select").addEventListener("change", (e) => setTheme(e.target.value));

// Au chargement : choix mémorisé, sinon langue/thème du navigateur
const navLangue = navigator.language.slice(0, 2);
const saved = lire("ibsa-langue");
setLangue(saved === "fr" || TRAD[saved] ? saved : (TRAD[navLangue] ? navLangue : "fr"));
setTheme(lire("ibsa-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "sombre" : "clair"));