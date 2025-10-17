const telas = document.querySelectorAll(".screen");
const botoesInsetos = document.querySelectorAll(".choose-insect-btn");
const botaoInicio = document.getElementById("start-btn");
const areaJogo = document.getElementById("game-container");
const tempoEl = document.getElementById("time");
const pontuacaoEl = document.getElementById("score");
const mensagem = document.getElementById("message");

let segundos = 0;
let pontuacao = 0;
let insetoSelecionado = {};

botaoInicio.addEventListener("click", () => telas[0].classList.add("up"));

botoesInsetos.forEach((btn) => {
    btn.addEventListener("click", () => {
        const img = btn.querySelector("img");
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt");
        insetoSelecionado = { src, alt };
        telas[1].classList.add("up");
        setTimeout(criarInseto, 1000);
        iniciarJogo();
    });
});

function iniciarJogo() {
    setInterval(aumentarTempo, 1000);
}

function aumentarTempo() {
    let m = Math.floor(segundos / 60);
    let s = segundos % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    tempoEl.innerHTML = `Tempo: ${m}:${s}`;
    segundos++;
}

function criarInseto() {
    const inseto = document.createElement("div");
    inseto.classList.add("insect");
    const { x, y } = getPosicaoAleatoria();
    inseto.style.top = `${y}px`;
    inseto.style.left = `${x}px`;
    inseto.innerHTML = `<img src="${insetoSelecionado.src}" alt="${
        insetoSelecionado.alt
    }" style="transform: rotate(${Math.random() * 360}deg)" />`;

    inseto.addEventListener("click", capturarInseto);
    areaJogo.appendChild(inseto);
}

function getPosicaoAleatoria() {
    const largura = window.innerWidth;
    const altura = window.innerHeight;
    const x = Math.random() * (largura - 200) + 100;
    const y = Math.random() * (altura - 200) + 100;
    return { x, y };
}

function capturarInseto() {
    aumentarPontuacao();
    this.classList.add("caught");
    setTimeout(() => this.remove(), 2000);
    adicionarInsetos();
}

function adicionarInsetos() {
    setTimeout(criarInseto, 1000);
    setTimeout(criarInseto, 1500);
}

function aumentarPontuacao() {
    pontuacao++;
    if (pontuacao > 19) {
        mensagem.classList.add("visible");
    }
    pontuacaoEl.innerHTML = `Pontuação: ${pontuacao}`;
}
