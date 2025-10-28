const botao = document.getElementById("botao");
const notificacoes = document.getElementById("notificacoes");

// Mensagens de exemplo
const mensagens = [
    "Mensagem Um",
    "Mensagem Dois",
    "Mensagem Três",
    "Mensagem Quatro",
];

// Tipos de notificação
const tipos = ["info", "sucesso", "erro"];

botao.addEventListener("click", () => criarNotificacao());

// Função para criar a notificação
function criarNotificacao(mensagem = null, tipo = null) {
    const notificacao = document.createElement("div");
    notificacao.classList.add("toast");
    notificacao.classList.add(tipo ? tipo : pegarTipoAleatorio());

    notificacao.innerText = mensagem ? mensagem : pegarMensagemAleatoria();

    notificacoes.appendChild(notificacao);

    // Remove a notificação após 3 segundos
    setTimeout(() => {
        notificacao.remove();
    }, 3000);
}

// Retorna uma mensagem aleatória
function pegarMensagemAleatoria() {
    return mensagens[Math.floor(Math.random() * mensagens.length)];
}

// Retorna um tipo aleatório de notificação
function pegarTipoAleatorio() {
    return tipos[Math.floor(Math.random() * tipos.length)];
}
