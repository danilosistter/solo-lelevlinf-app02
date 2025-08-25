let uid = null;
let data = { level: 1, xp: 0, xpMax: 100, habitantes: 0, missoes: 0 };

const $ = (id) => document.getElementById(id);
const userInfo = $("user-info");
const loginBtn = $("login-btn");
const logoutBtn = $("logout-btn");
const panel = $("panel");

const levelEl = $("level");
const xpEl = $("xp");
const xpMaxEl = $("xpMax");
const habEl = $("habitantes");
const misEl = $("missoes");
const btnMissao = $("btn-missao");
const btnHab = $("btn-hab");

function render() {
  levelEl.textContent = data.level;
  xpEl.textContent = data.xp;
  xpMaxEl.textContent = data.xpMax;
  habEl.textContent = data.habitantes;
  misEl.textContent = data.missoes;
}

async function save() {
  if (!uid) return;
  await db.collection("usuarios").doc(uid).set(data, { merge: true });
}

async function load() {
  const docRef = db.collection("usuarios").doc(uid);
  const snap = await docRef.get();
  if (snap.exists) {
    data = { ...data, ...snap.data() };
  } else {
    await save();
  }
  render();
}

loginBtn.addEventListener("click", async () => {
  try {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
  } catch (e) {
    // fallback: redirect se popup bloqueado
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithRedirect(provider);
  }
});

logoutBtn.addEventListener("click", () => auth.signOut());

auth.onAuthStateChanged(async (user) => {
  if (user) {
    uid = user.uid;
    userInfo.textContent = `Bem-vindo, ${user.displayName || "Hunter"}!`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    panel.style.display = "block";
    await load();
  } else {
    uid = null;
    userInfo.textContent = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    panel.style.display = "none";
  }
});

btnMissao.addEventListener("click", async () => {
  const ganho = Math.floor(Math.random() * 60) + 20; // 20–80 XP
  data.xp += ganho;
  data.missoes += 1;

  if (data.xp >= data.xpMax) {
    data.xp -= data.xpMax;
    data.level += 1;
    data.xpMax = Math.round(data.xpMax * 1.15); // escala próximo nível
  }
  render();
  await save();
});

btnHab.addEventListener("click", async () => {
  data.habitantes += 1;
  render();
  await save();
});
