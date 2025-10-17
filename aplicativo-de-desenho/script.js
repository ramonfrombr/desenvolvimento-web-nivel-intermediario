// Seleção dos elementos HTML
const tela = document.getElementById("tela");
const botaoAumentar = document.getElementById("aumentar");
const botaoDiminuir = document.getElementById("diminuir");
const tamanhoElemento = document.getElementById("tamanho");
const corElemento = document.getElementById("cor");
const botaoLimpar = document.getElementById("limpar");

// Obtém o contexto 2D do canvas (onde os desenhos acontecem)
const contexto = tela.getContext("2d");

// Variáveis de controle do desenho
let tamanho = 10;
let pressionado = false;
corElemento.value = "black";
let cor = corElemento.value;
let x;
let y;

// Atualiza o tamanho mostrado na tela
function atualizarTamanhoNaTela() {
    tamanhoElemento.innerText = tamanho;
}

// Aumentar espessura do pincel
botaoAumentar.addEventListener("click", () => {
    tamanho += 5;
    if (tamanho > 50) tamanho = 50;
    atualizarTamanhoNaTela();
});

// Diminuir espessura do pincel
botaoDiminuir.addEventListener("click", () => {
    tamanho -= 5;
    if (tamanho < 5) tamanho = 5;
    atualizarTamanhoNaTela();
});

// Alterar cor do pincel
corElemento.addEventListener("change", (e) => (cor = e.target.value));

// Início do desenho (quando o mouse é pressionado)
tela.addEventListener("mousedown", (e) => {
    pressionado = true;
    x = e.offsetX;
    y = e.offsetY;
});

// Fim do desenho (quando o mouse é solto)
document.addEventListener("mouseup", () => {
    pressionado = false;
    x = undefined;
    y = undefined;
});

// Desenhar enquanto o mouse se move
tela.addEventListener("mousemove", (e) => {
    if (pressionado) {
        const x2 = e.offsetX;
        const y2 = e.offsetY;

        desenharCirculo(x2, y2);
        desenharLinha(x, y, x2, y2);

        x = x2;
        y = y2;
    }
});

// Função para desenhar um círculo (pincel)
function desenharCirculo(x, y) {
    // Inicia um novo caminho de desenho
    contexto.beginPath();

    // Desenha um arco (círculo completo)
    // Argumentos:
    // x, y → coordenadas do centro do círculo
    // tamanho → raio do círculo
    // 0 → ângulo inicial em radianos (0 = início no eixo X)
    // Math.PI * 2 → ângulo final (2π = círculo completo)
    contexto.arc(x, y, tamanho, 0, Math.PI * 2);

    // Define a cor usada para preencher o círculo
    contexto.fillStyle = cor;

    // Preenche a área interna do círculo com a cor definida
    contexto.fill();
}

// Função para desenhar uma linha conectando os círculos
function desenharLinha(x1, y1, x2, y2) {
    // Inicia um novo caminho de desenho
    contexto.beginPath();

    // Define o ponto inicial da linha (x1, y1)
    contexto.moveTo(x1, y1);

    // Define o ponto final da linha (x2, y2)
    contexto.lineTo(x2, y2);

    // Define a cor da linha
    contexto.strokeStyle = cor;

    // Define a espessura da linha (em pixels)
    // Aqui é o dobro do tamanho do pincel para suavizar o traçado
    contexto.lineWidth = tamanho * 2;

    // Desenha (renderiza) a linha na tela
    contexto.stroke();
}

// Limpar tela
botaoLimpar.addEventListener("click", () =>
    // Limpa toda a área do canvas, removendo todos os desenhos
    // Argumentos:
    // 0, 0 → coordenadas do canto superior esquerdo
    // tela.width, tela.height → largura e altura totais do canvas
    contexto.clearRect(0, 0, tela.width, tela.height)
);
