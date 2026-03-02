const username = "sleepyofc7";
const repoIgnorado = "meu-hub";

const clickSound = new Audio("click.mp3");

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

const grid = document.getElementById("grid");

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
// BUSCAR REPOS
// ===============================

async function getRepos() {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await res.json();

  return data.filter(repo => repo.name !== repoIgnorado);
}

// ===============================
// CRIAR CARD
// ===============================

function createCard(repo) {

  const card = document.createElement("div");
  card.className = "card";

  const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/foto1.png`;

  card.innerHTML = `
    <img src="${imageUrl}" onerror="this.style.display='none'">
    <h3>${repo.name.toUpperCase()}</h3>
  `;

  // PRIORIDADE DE LINK
  let link = null;

  if (repo.homepage && repo.homepage.startsWith("http")) {
    link = repo.homepage; // 👈 MELHOR OPÇÃO
  } else {
    link = extractLink(repo.description);
  }

  if (!link) {
    link = repo.html_url; // fallback
  }

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