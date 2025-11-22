// Seleciona os elementos
const video = document.getElementById("video");
const reproduzir = document.getElementById("reproduzir");
const pausar = document.getElementById("pausar");
const progresso = document.getElementById("progresso");
const tempo = document.getElementById("tempo");

// Reproduzir e pausar o vídeo
function alternarStatusDoVideo() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Alterna entre ícones de pausa e reprodução dependendo do status do vídeo
function atualizarIconeDeReproducao() {
  if (video.paused) {
    reproduzir.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    reproduzir.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
}

// Atualiza tempo de progresso do vídeo
function atualizarProgresso() {
  // Calcula a porcentagem de vídeo que foi reproduzido
  progresso.value = (video.currentTime / video.duration) * 100;

  // Seleciona os minutos
  let minutos = Math.floor(video.currentTime / 60);
  if (minutos >= 10) {
    minutos = String(minutos);
  } else if (minutos < video.duration) {
    minutos = "0" + String(minutos);
  }

  // Seleciona os segundos
  let segundos = Math.floor(video.currentTime % 60);
  if (segundos >= 10) {
    segundos = String(segundos);
  } else if (segundos < video.duration) {
    segundos = "0" + String(segundos);
  }

  tempo.innerHTML = `${minutos}:${segundos}`;
}

// Redefine progresso do vídeo quando usuário clica na barra de progresso
function definirProgressoDoVideo() {
  video.currentTime = (+progresso.value * video.duration) / 100;
}

// Pausa o vídeo
function pausarVideo() {
  video.currentTime = 0;
  video.pause();
}

// Detectores de eventos
reproduzir.addEventListener("click", alternarStatusDoVideo);
video.addEventListener("click", alternarStatusDoVideo);
video.addEventListener("pause", atualizarIconeDeReproducao);
video.addEventListener("play", atualizarIconeDeReproducao);
video.addEventListener("timeupdate", atualizarProgresso);
progresso.addEventListener("change", definirProgressoDoVideo);
pausar.addEventListener("click", pausarVideo);
