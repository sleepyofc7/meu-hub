// ===============================
// CONFIGURAÇÃO DAS OPÇÕES
// ===============================

// 👉 AQUI você adiciona novos links futuramente
// Basta copiar um bloco e alterar

const links = [
  {
    nome: "CONTADOR DE PARTIDAS",
    imagem: "foto1.png",
    url: "https://sleepyofc7.github.io/CONTADOR-DE-PARTIDAS-MM2/"
  },
  {
    nome: "MEU PORTFÓLIO",
    imagem: "foto2.png",
    url: "https://seusite2.com"
  }
];

// ===============================
// SOM DE CLIQUE
// ===============================

const clickSound = new Audio("click.mp3");

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play();
}

// ===============================
// GERAR CARDS
// ===============================

const grid = document.getElementById("grid");

function render() {
  grid.innerHTML = "";

  links.forEach(link => {

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${link.imagem}">
      <h3>${link.nome}</h3>
    `;

    card.onclick = () => {
      playSound();
      window.open(link.url, "_blank");
    };

    grid.appendChild(card);
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
// SALVAR PREFERÊNCIA
// ===============================

const modoSalvo = localStorage.getItem("modo");

if (modoSalvo === "lista") {
  grid.classList.add("list");
  btnLista.classList.add("active");
  btnCompleto.classList.remove("active");
}