// Seleciona os elementos principais do HTML
const botaoReiniciar = document.querySelector("#reiniciar"); // botão que reinicia o temporizador
const botaoIniciar = document.querySelector("#iniciar"); // botão que inicia/pausa o temporizador
const elementoTempo = document.querySelector("#tempo"); // elemento de texto que exibe o tempo (mm:ss)
const raiz = document.querySelector(":root"); // referência ao elemento raiz (para alterar variáveis CSS)

// ===========================
// 🔧 CONFIGURAÇÃO INICIAL
// ===========================

// Define o tempo total do cronômetro (em segundos)
const tempoTotal = 60;

// Controla se o cronômetro está rodando ou pausado
let rodando = false;

// Guarda o valor atual do contador
let segundosAtuais = tempoTotal;

// Mostra o tempo inicial formatado na tela
elementoTempo.innerText = formatarTempo(tempoTotal);

// Cria um intervalo que chama a função `executar()` a cada 1 segundo (1000 ms)
const intervalo = setInterval(executar, 1000);

// ===========================
// ▶️ EVENTOS DOS BOTÕES
// ===========================

// Quando o botão "Iniciar" é clicado, alterna entre rodar e pausar
botaoIniciar.addEventListener("click", () => {
    // Inverte o estado: se estava rodando, pausa; se estava pausado, roda
    rodando = !rodando;

    // Alterna a cor de fundo do botão (ativa/desativa classe CSS)
    botaoIniciar.classList.toggle("bg-green-500");

    // Seleciona o ícone dentro do botão
    const icone = botaoIniciar.querySelector("i");

    // Alterna o ícone entre "play" ▶️ e "pause" ⏸️
    icone.classList.toggle("fa-play");
    icone.classList.toggle("fa-pause");
});

// Quando o botão "Reiniciar" é clicado, reseta o temporizador
botaoReiniciar.addEventListener("click", reiniciarTudo);

// ===========================
// 🕒 FUNÇÃO PRINCIPAL
// ===========================

// Função chamada a cada segundo pelo `setInterval`
function executar() {
    if (rodando) {
        // só executa se o cronômetro estiver ativo
        segundosAtuais -= 1; // diminui um segundo

        // Quando o tempo chega a zero, para o cronômetro e reinicia
        if (segundosAtuais <= 0) {
            clearInterval(intervalo); // interrompe o intervalo
            reiniciarTudo(); // reseta tudo
        }

        // Atualiza o texto do tempo na tela
        elementoTempo.innerText = formatarTempo(segundosAtuais);

        // Atualiza o ângulo da barra circular no CSS (efeito visual)
        raiz.style.setProperty("--graus", calcularGraus());
    }
}

// ===========================
// ⏱️ FUNÇÕES AUXILIARES
// ===========================

// Converte os segundos em formato "mm:ss"
function formatarTempo(segundos) {
    const minutos = Math.floor(segundos / 60); // converte para minutos
    const novosSegundos = segundos % 60; // pega o resto (segundos)

    // Garante que sempre tenha 2 dígitos (ex: "05:09")
    return `${minutos.toString().padStart(2, "0")}:${novosSegundos
        .toString()
        .padStart(2, "0")}`;
}

// Calcula o valor em graus para a rotação do marcador circular
function calcularGraus() {
    // Diminui proporcionalmente conforme o tempo passa
    return `${360 - (segundosAtuais / tempoTotal) * 360}deg`;
}

// ===========================
// 🔁 FUNÇÃO DE REINÍCIO
// ===========================

// Restaura todos os valores e o visual do cronômetro
function reiniciarTudo() {
    rodando = false; // pausa o cronômetro

    // Remove a cor de "ativo" do botão iniciar
    botaoIniciar.classList.remove("bg-green-500");

    // Volta o ícone para "play"
    const icone = botaoIniciar.querySelector("i");
    icone.classList.remove("fa-pause");
    icone.classList.add("fa-play");

    // Restaura o tempo inicial
    segundosAtuais = tempoTotal;
    elementoTempo.innerText = formatarTempo(tempoTotal);

    // Reseta o ângulo do marcador circular no CSS
    raiz.style.setProperty("--graus", "0deg");
}
