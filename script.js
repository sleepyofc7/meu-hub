const repoIgnorado = "meu-hub";
const grid = document.getElementById("grid");

// ===============================
// SOM
// ===============================
let clickSound;
try {
  clickSound = new Audio("click.mp3");
} catch {
  clickSound = null;
}

function playSound() {
  if (!clickSound) return;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

// ===============================
// EXTRAIR LINK DA DESCRIÇÃO
// ===============================
function extractLink(text) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const matches = text.match(urlRegex);
  return matches ? matches[0] : null;
}

// ===============================
// BUSCAR REPOS (JSON LOCAL)
// ===============================
async function getRepos() {
  try {
    const res = await fetch("repos.json"); // <-- Aqui usamos o JSON local
    const data = await res.json();

    return data.filter(repo => repo.name !== repoIgnorado);
  } catch (err) {
    console.error("Erro ao carregar JSON:", err);
    return [];
  }
}

// ===============================
// CRIAR CARD
// ===============================
function createCard(repo) {
  const card = document.createElement("div");
  card.className = "card";

  const imageUrl = repo.image || ""; // Se não houver imagem, fica vazio

  card.innerHTML = `
    ${imageUrl ? `<img src="${imageUrl}" onerror="this.style.display='none'">` : ""}
    <h3>${repo.name.toUpperCase()}</h3>
  `;

  // PRIORIDADE DE LINK
  let link = repo.homepage || extractLink(repo.description) || repo.html_url;

  card.onclick = () => {
    playSound();
    window.open(link, "_blank");
  };

  grid.appendChild(card);
}

// ===============================
// RENDER
// ===============================
async function render() {
  grid.innerHTML = "";

  const repos = await getRepos();

  if (repos.length === 0) {
    grid.innerHTML = "<p>Nenhum projeto encontrado.</p>";
    return;
  }

  repos.forEach(createCard);
}

render();

// ===============================
// TOGGLE LISTA
// ===============================
const btnCompleto = document.getElementById("btnCompleto");
const btnLista = document.getElementById("btnLista");

btnCompleto.onclick = () => {
  playSound();
  grid.classList.remove("list");
  btnCompleto.classList.add("active");
  btnLista.classList.remove("active");
};

btnLista.onclick = () => {
  playSound();
  grid.classList.add("list");
  btnLista.classList.add("active");
  btnCompleto.classList.remove("active");
};

// ===============================
// MENU
// ===============================
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

menuBtn.onclick = () => {
  playSound();
  sidebar.classList.add("active");
  overlay.classList.add("active");
};

overlay.onclick = () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
};