const containerMusica = document.getElementById("container-musica");
const btnTocar = document.getElementById("tocar");
const btnAnterior = document.getElementById("anterior");
const btnProximo = document.getElementById("proximo");

const audio = document.getElementById("audio");
const progresso = document.getElementById("progresso");
const containerProgresso = document.getElementById("container-progresso");
const titulo = document.getElementById("titulo");
const capa = document.getElementById("capa");
const tempoAtual = document.querySelector("#tempoAtual");
const tempoTotal = document.querySelector("#tempoTotal");

// Lista de músicas
const musicas = ["hey", "summer", "ukulele"];

// Índice atual da música
let indiceMusica = 2;

// Carrega a música inicial
carregarMusica(musicas[indiceMusica]);

// Atualiza detalhes da música
function carregarMusica(musica) {
    titulo.innerText = musica;
    audio.src = `musicas/${musica}.mp3`;
    capa.src = `imagens/${musica}.jpg`;
}

// Tocar música
function tocarMusica() {
    containerMusica.classList.add("tocando");
    btnTocar.querySelector("i.fas").classList.remove("fa-play");
    btnTocar.querySelector("i.fas").classList.add("fa-pause");
    audio.play();
}

// Pausar música
function pausarMusica() {
    containerMusica.classList.remove("tocando");
    btnTocar.querySelector("i.fas").classList.add("fa-play");
    btnTocar.querySelector("i.fas").classList.remove("fa-pause");
    audio.pause();
}

// Música anterior
function musicaAnterior() {
    indiceMusica--;
    if (indiceMusica < 0) {
        indiceMusica = musicas.length - 1;
    }
    carregarMusica(musicas[indiceMusica]);
    tocarMusica();
}

// Próxima música
function proximaMusica() {
    indiceMusica++;
    if (indiceMusica > musicas.length - 1) {
        indiceMusica = 0;
    }
    carregarMusica(musicas[indiceMusica]);
    tocarMusica();
}

// Atualiza barra de progresso
function atualizarProgresso(e) {
    const { duration, currentTime } = e.srcElement;
    const percentual = (currentTime / duration) * 100;
    progresso.style.width = `${percentual}%`;
}

// Ajusta tempo ao clicar na barra de progresso
function definirProgresso(e) {
    const largura = this.clientWidth;
    const cliqueX = e.offsetX;
    const duracao = audio.duration;
    audio.currentTime = (cliqueX / largura) * duracao;
}

// Atualiza tempo atual e duração
function atualizarTempo(e) {
    const { duration, currentTime } = e.srcElement;
    let minutos, segundos, minutosTotais, segundosTotais;

    // Tempo atual
    minutos = Math.floor(currentTime / 60) || 0;
    segundos = Math.floor(currentTime % 60) || 0;
    if (segundos < 10) segundos = "0" + segundos;

    // Tempo total
    minutosTotais = Math.floor(duration / 60) || 0;
    segundosTotais = Math.floor(duration % 60) || 0;
    if (segundosTotais < 10) segundosTotais = "0" + segundosTotais;

    if (tempoAtual && tempoTotal) {
        tempoAtual.innerHTML = `${minutos}:${segundos}`;
        tempoTotal.innerHTML = `${minutosTotais}:${segundosTotais}`;
    }
}

// Eventos
btnTocar.addEventListener("click", () => {
    const tocando = containerMusica.classList.contains("tocando");
    if (tocando) {
        pausarMusica();
    } else {
        tocarMusica();
    }
});

btnAnterior.addEventListener("click", musicaAnterior);
btnProximo.addEventListener("click", proximaMusica);

audio.addEventListener("timeupdate", atualizarProgresso);
containerProgresso.addEventListener("click", definirProgresso);
audio.addEventListener("ended", proximaMusica);
audio.addEventListener("timeupdate", atualizarTempo);
