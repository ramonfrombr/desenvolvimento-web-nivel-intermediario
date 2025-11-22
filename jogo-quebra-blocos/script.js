const botaoRegras = document.getElementById("botao-regras");
const botaoFechar = document.getElementById("botao-fechar");
const regras = document.getElementById("regras");
const tela = document.getElementById("tela");
const contexto = tela.getContext("2d");

let pontuacao = 0;

const totalLinhas = 9;
const totalColunas = 5;
const atraso = 500; // atraso para reiniciar o jogo

// Propriedades da bola
const bola = {
    x: tela.width / 2,
    y: tela.height / 2,
    tamanho: 10,
    velocidade: 4,
    dx: 4,
    dy: -4,
    visivel: true,
};

// Propriedades da raquete
const raquete = {
    x: tela.width / 2 - 40,
    y: tela.height - 20,
    largura: 80,
    altura: 10,
    velocidade: 8,
    dx: 0,
    visivel: true,
};

// Propriedades dos blocos
const infoBloco = {
    largura: 70,
    altura: 20,
    espacamento: 10,
    deslocamentoX: 45,
    deslocamentoY: 60,
    visivel: true,
};

// Cria matriz de blocos
const blocos = [];
for (let i = 0; i < totalLinhas; i++) {
    blocos[i] = [];
    for (let j = 0; j < totalColunas; j++) {
        const x =
            i * (infoBloco.largura + infoBloco.espacamento) +
            infoBloco.deslocamentoX;
        const y =
            j * (infoBloco.altura + infoBloco.espacamento) +
            infoBloco.deslocamentoY;
        blocos[i][j] = { x, y, ...infoBloco };
    }
}

// Desenha bola
function desenharBola() {
    contexto.beginPath();
    contexto.arc(bola.x, bola.y, bola.tamanho, 0, Math.PI * 2);
    contexto.fillStyle = bola.visivel ? "#0095dd" : "transparent";
    contexto.fill();
    contexto.closePath();
}

// Desenha raquete
function desenharRaquete() {
    contexto.beginPath();
    contexto.rect(raquete.x, raquete.y, raquete.largura, raquete.altura);
    contexto.fillStyle = raquete.visivel ? "#0095dd" : "transparent";
    contexto.fill();
    contexto.closePath();
}

// Desenha pontuação
function desenharPontuacao() {
    contexto.font = "20px Arial";
    contexto.fillText(`Pontuação: ${pontuacao}`, tela.width - 150, 30);
}

// Desenha blocos
function desenharBlocos() {
    blocos.forEach((coluna) => {
        coluna.forEach((bloco) => {
            contexto.beginPath();
            contexto.rect(bloco.x, bloco.y, bloco.largura, bloco.altura);
            contexto.fillStyle = bloco.visivel ? "#0095dd" : "transparent";
            contexto.fill();
            contexto.closePath();
        });
    });
}

// Move a raquete
function moverRaquete() {
    raquete.x += raquete.dx;

    // Limites laterais
    if (raquete.x + raquete.largura > tela.width) {
        raquete.x = tela.width - raquete.largura;
    }

    if (raquete.x < 0) {
        raquete.x = 0;
    }
}

// Move a bola
function moverBola() {
    bola.x += bola.dx;
    bola.y += bola.dy;

    // Colisão lateral
    if (bola.x + bola.tamanho > tela.width || bola.x - bola.tamanho < 0) {
        bola.dx *= -1;
    }

    // Colisão superior/inferior
    if (bola.y + bola.tamanho > tela.height || bola.y - bola.tamanho < 0) {
        bola.dy *= -1;
    }

    // Colisão com a raquete
    if (
        bola.x - bola.tamanho > raquete.x &&
        bola.x + bola.tamanho < raquete.x + raquete.largura &&
        bola.y + bola.tamanho > raquete.y
    ) {
        bola.dy = -bola.velocidade;
    }

    // Colisão com blocos
    blocos.forEach((coluna) => {
        coluna.forEach((bloco) => {
            if (bloco.visivel) {
                if (
                    bola.x - bola.tamanho > bloco.x &&
                    bola.x + bola.tamanho < bloco.x + bloco.largura &&
                    bola.y + bola.tamanho > bloco.y &&
                    bola.y - bola.tamanho < bloco.y + bloco.altura
                ) {
                    bola.dy *= -1;
                    bloco.visivel = false;
                    aumentarPontuacao();
                }
            }
        });
    });

    // Bola caiu — reinicia jogo
    if (bola.y + bola.tamanho > tela.height) {
        mostrarTodosBlocos();
        pontuacao = 0;
    }
}

// Aumenta pontuação
function aumentarPontuacao() {
    pontuacao++;

    if (pontuacao % (totalLinhas * totalColunas) === 0) {
        bola.visivel = false;
        raquete.visivel = false;

        // Reinicia após 0.5s
        setTimeout(() => {
            mostrarTodosBlocos();
            pontuacao = 0;
            raquete.x = tela.width / 2 - 40;
            raquete.y = tela.height - 20;
            bola.x = tela.width / 2;
            bola.y = tela.height / 2;
            bola.visivel = true;
            raquete.visivel = true;
        }, atraso);
    }
}

// Mostra todos os blocos
function mostrarTodosBlocos() {
    blocos.forEach((coluna) => {
        coluna.forEach((bloco) => (bloco.visivel = true));
    });
}

// Desenha tudo
function desenhar() {
    contexto.clearRect(0, 0, tela.width, tela.height);

    desenharBola();
    desenharRaquete();
    desenharPontuacao();
    desenharBlocos();
}

// Atualiza animação
function atualizar() {
    moverRaquete();
    moverBola();
    desenhar();

    requestAnimationFrame(atualizar);
}

atualizar();

// Controles de teclado
function teclaPressionada(e) {
    if (e.key === "ArrowRight") {
        raquete.dx = raquete.velocidade;
    } else if (e.key === "ArrowLeft") {
        raquete.dx = -raquete.velocidade;
    }
}

function teclaSolta(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        raquete.dx = 0;
    }
}

document.addEventListener("keydown", teclaPressionada);
document.addEventListener("keyup", teclaSolta);

// Mostrar/ocultar regras
botaoRegras.addEventListener("click", () => regras.classList.add("mostrar"));
botaoFechar.addEventListener("click", () => regras.classList.remove("mostrar"));
