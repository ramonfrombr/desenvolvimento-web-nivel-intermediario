const dadosQuiz = [
    {
        pergunta: "Qual linguagem roda em um navegador da web?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correta: "d",
    },
    {
        pergunta: "O que significa CSS?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correta: "b",
    },
    {
        pergunta: "O que significa HTML?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborghinis",
        correta: "a",
    },
    {
        pergunta: "Em que ano o JavaScript foi lançado?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "Nenhuma das alternativas",
        correta: "b",
    },
];

const quiz = document.getElementById("quiz");
const elementosResposta = document.querySelectorAll(".resposta");
const elementoPergunta = document.getElementById("pergunta");
const textoA = document.getElementById("a_texto");
const textoB = document.getElementById("b_texto");
const textoC = document.getElementById("c_texto");
const textoD = document.getElementById("d_texto");
const botaoEnviar = document.getElementById("enviar");

let perguntaAtual = 0;
let pontuacao = 0;

function carregarQuiz() {
    desmarcarRespostas();
    const dadosAtuais = dadosQuiz[perguntaAtual];
    elementoPergunta.innerText = dadosAtuais.pergunta;
    textoA.innerText = dadosAtuais.a;
    textoB.innerText = dadosAtuais.b;
    textoC.innerText = dadosAtuais.c;
    textoD.innerText = dadosAtuais.d;
}

function desmarcarRespostas() {
    elementosResposta.forEach((resposta) => (resposta.checked = false));
}

carregarQuiz();

botaoEnviar.addEventListener("click", () => {
    const resposta = selecionarRespostaMarcada();

    if (resposta) {
        if (resposta === dadosQuiz[perguntaAtual].correta) {
            pontuacao++;
        }

        perguntaAtual++;

        if (perguntaAtual < dadosQuiz.length) {
            carregarQuiz();
        } else {
            quiz.innerHTML = `
            <h2>Você acertou ${pontuacao}/${dadosQuiz.length} perguntas.</h2>
            <button onclick="location.reload()">Reiniciar</button>
            `;
        }
    }
});

function selecionarRespostaMarcada() {
    let respostaMarcada;

    elementosResposta.forEach((resposta) => {
        if (resposta.checked) {
            respostaMarcada = resposta.id;
        }
    });

    return respostaMarcada;
}
