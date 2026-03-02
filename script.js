// ===============================
// CONFIGURAÇÃO
// ===============================

const username = "sleepyofc7"; // SEU USER
const repoIgnorado = "meu-hub";

// ===============================
// SOM
// ===============================

const clickSound = new Audio("click.mp3");

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// ===============================
// ELEMENTOS
// ===============================

const grid = document.getElementById("grid");

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

  // Tenta pegar a imagem do repo
  const imageUrl = `https://raw.githubusercontent.com/${username}/${repo.name}/main/foto1.png`;

  card.innerHTML = `
    <img src="${imageUrl}" onerror="this.style.display='none'">
    <h3>${repo.name.toUpperCase()}</h3>
  `;

  card.onclick = () => {
    playSound();
    window.open(repo.html_url, "_blank");
  };

  grid.appendChild(card);
}

// ===============================
// RENDERIZAR
// ===============================

async function render() {
  grid.innerHTML = "";

  const repos = await getRepos();

  repos.forEach(repo => {
    createCard(repo);
  });
}

render();

// ===============================
// TOGGLE LISTA / COMPLETO
// ===============================

const btnCompleto = document.getElementById("btnCompleto");
const btnLista = document.getElementById("btnLista");

btnCompleto.onclick = () => {
  playSound();
  grid.classList.remove("list");
  btnCompleto.classList.add("active");
  btnLista.classList.remove("active");
  localStorage.setItem("modo", "completo");
};

btnLista.onclick = () => {
  playSound();
  grid.classList.add("list");
  btnLista.classList.add("active");
  btnCompleto.classList.remove("active");
  localStorage.setItem("modo", "lista");
};

// ===============================
// CARREGAR PREFERÊNCIA
// ===============================

const modoSalvo = localStorage.getItem("modo");

if (modoSalvo === "lista") {
  grid.classList.add("list");
  btnLista.classList.add("active");
  btnCompleto.classList.remove("active");
}