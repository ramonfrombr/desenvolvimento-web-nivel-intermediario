// Seleciona os elementos do DOM que serão usados
const principal = document.getElementById("principal"); // Área principal onde os usuários e a riqueza serão exibidos
const btnAdicionarUsuario = document.getElementById("adicionar-usuario"); // Botão para adicionar novo usuário
const btnDobrarDinheiro = document.getElementById("dobrar-dinheiro"); // Botão para dobrar o dinheiro dos usuários
const btnMostrarMilionarios = document.getElementById("mostrar-milionarios"); // Botão para mostrar apenas milionários
const btnOrdenarRicos = document.getElementById("ordenar-ricos"); // Botão para ordenar usuários do mais rico ao mais pobre
const btnCalcularRiqueza = document.getElementById("calcular-riqueza"); // Botão para calcular a riqueza total

// Array principal onde todos os usuários e seus dados são armazenados
let dados = [];

// Adiciona 3 usuários aleatórios automaticamente ao iniciar
obterUsuarioAleatorio();
obterUsuarioAleatorio();
obterUsuarioAleatorio();

/**
 * Função assíncrona que busca um usuário aleatório de uma API
 * e o adiciona à lista com uma quantia de dinheiro gerada aleatoriamente.
 */
async function obterUsuarioAleatorio() {
    // Faz a requisição à API RandomUser
    const resposta = await fetch("https://randomuser.me/api");
    const dadosAPI = await resposta.json();

    // Pega o primeiro usuário retornado pela API
    const usuario = dadosAPI.results[0];

    // Cria um novo objeto com nome completo e valor de dinheiro aleatório
    const novoUsuario = {
        nome: `${usuario.name.first} ${usuario.name.last}`,
        dinheiro: Math.floor(Math.random() * 1000000), // valor entre 0 e 1 milhão
    };

    // Adiciona o novo usuário ao array de dados
    adicionarDados(novoUsuario);
}

/**
 * Dobra o dinheiro de todos os usuários existentes
 */
function dobrarDinheiro() {
    // Cria um novo array com os valores de dinheiro dobrados
    dados = dados.map((usuario) => {
        return { ...usuario, dinheiro: usuario.dinheiro * 2 };
    });

    // Atualiza a exibição no DOM
    atualizarDOM();
}

/**
 * Ordena os usuários do mais rico para o mais pobre
 */
function ordenarPorMaisRicos() {
    dados.sort((a, b) => b.dinheiro - a.dinheiro); // Ordenação decrescente
    atualizarDOM();
}

/**
 * Mostra apenas os usuários com dinheiro acima de 1 milhão
 */
function mostrarMilionarios() {
    dados = dados.filter((usuario) => usuario.dinheiro > 1000000);
    atualizarDOM();
}

/**
 * Calcula a soma total de todo o dinheiro dos usuários
 */
function calcularRiqueza() {
    // Soma o valor de dinheiro de todos os usuários
    const riqueza = dados.reduce(
        (acumulado, usuario) => (acumulado += usuario.dinheiro),
        0
    );

    // Cria um novo elemento no DOM para mostrar o total
    const elementoRiqueza = document.createElement("div");
    elementoRiqueza.innerHTML = `<h3>Riqueza Total: <strong>${formatarDinheiro(
        riqueza
    )}</strong></h3>`;

    // Adiciona o elemento ao final da área principal
    principal.appendChild(elementoRiqueza);
}

/**
 * Adiciona um novo objeto (usuário) ao array de dados
 */
function adicionarDados(obj) {
    dados.push(obj);
    atualizarDOM();
}

/**
 * Atualiza a área principal do DOM com os dados atuais
 */
function atualizarDOM(dadosFornecidos = dados) {
    // Limpa o conteúdo anterior antes de renderizar novamente
    principal.innerHTML = "<h2><strong>Pessoa</strong> Riqueza</h2>";

    // Para cada usuário, cria um elemento na tela
    dadosFornecidos.forEach((item) => {
        const elemento = document.createElement("div");
        elemento.classList.add("pessoa");
        elemento.innerHTML = `<strong>${item.nome}</strong> ${formatarDinheiro(
            item.dinheiro
        )}`;
        principal.appendChild(elemento);
    });
}

/**
 * Formata número para o formato monetário em reais (R$)
 */
function formatarDinheiro(numero) {
    return numero.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

// Adiciona os ouvintes de eventos para cada botão
btnAdicionarUsuario.addEventListener("click", obterUsuarioAleatorio);
btnDobrarDinheiro.addEventListener("click", dobrarDinheiro);
btnOrdenarRicos.addEventListener("click", ordenarPorMaisRicos);
btnMostrarMilionarios.addEventListener("click", mostrarMilionarios);
btnCalcularRiqueza.addEventListener("click", calcularRiqueza);
