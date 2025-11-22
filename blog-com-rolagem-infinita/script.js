// Seleciona os elementos principais do HTML
const containerPostagens = document.getElementById("container-postagens"); // Onde as postagens serão exibidas
const carregando = document.querySelector(".carregando"); // Indicador de "carregando..."
const filtro = document.getElementById("filtro"); // Campo de busca/filtro

// Controle de paginação
let limite = 5; // Número de posts carregados por vez
let pagina = 1; // Página atual (começa na 1)

// ===============================
//  FUNÇÃO: Buscar postagens da API
// ===============================
async function obterPostagens() {
    // Faz uma requisição HTTP usando fetch, limitando e paginando os resultados
    const resposta = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limite}&_page=${pagina}`
    );

    // Converte a resposta para JSON
    const dados = await resposta.json();

    // Retorna o array de postagens
    return dados;
}

// =====================================
//  FUNÇÃO: Exibir postagens no documento
// =====================================
async function mostrarPostagens() {
    // Busca as postagens da API
    const postagens = await obterPostagens();

    // Para cada postagem retornada, cria um elemento HTML
    postagens.forEach((postagem) => {
        // Cria um div para a postagem
        const elementoPostagem = document.createElement("div");
        elementoPostagem.classList.add("postagem"); // Adiciona classe CSS

        // Define o conteúdo HTML interno da postagem
        elementoPostagem.innerHTML = `
      <div class="numero">${postagem.id}</div>
      <div class="info-postagem">
        <h2 class="titulo-postagem">${postagem.title}</h2>
        <p class="corpo-postagem">${postagem.body}</p>
      </div>
    `;

        // Adiciona a postagem dentro do container principal
        containerPostagens.appendChild(elementoPostagem);
    });
}

// ===================================
//  FUNÇÃO: Mostrar animação de loading
// ===================================
function mostrarCarregando() {
    // Adiciona a classe que mostra o indicador visual
    carregando.classList.add("mostrar");

    // Após 1 segundo, esconde o carregamento
    setTimeout(() => {
        carregando.classList.remove("mostrar");

        // Depois de mais 300 ms, carrega a próxima página
        setTimeout(() => {
            pagina++; // Incrementa o número da página
            mostrarPostagens(); // Carrega mais postagens
        }, 300);
    }, 1000);
}

// ============================================
//  FUNÇÃO: Filtrar postagens pelo texto digitado
// ============================================
function filtrarPostagens(e) {
    // Pega o texto digitado no campo de filtro e converte para maiúsculo
    const termo = e.target.value.toUpperCase();

    // Seleciona todas as postagens já exibidas
    const postagens = document.querySelectorAll(".postagem");

    // Verifica cada postagem individualmente
    postagens.forEach((postagem) => {
        // Obtém o título e o corpo da postagem (também em maiúsculo)
        const titulo = postagem
            .querySelector(".titulo-postagem")
            .innerText.toUpperCase();
        const corpo = postagem
            .querySelector(".corpo-postagem")
            .innerText.toUpperCase();

        // Se o termo digitado aparecer no título ou corpo, mostra a postagem
        if (titulo.indexOf(termo) > -1 || corpo.indexOf(termo) > -1) {
            postagem.style.display = "flex";
        }
        // Caso contrário, esconde
        else {
            postagem.style.display = "none";
        }
    });
}

// ==========================
//  INÍCIO: Carrega a primeira leva de postagens
// ==========================
mostrarPostagens();

// ========================================================
//  EVENTO: Detecta quando o usuário chega ao fim da página
// ========================================================
window.addEventListener("scroll", () => {
    // Pega informações de rolagem da página
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // Desestrutura o objeto document.documentElement (que representa o <html>)
    // e extrai três propriedades importantes sobre a rolagem da página:
    // - scrollTop: quantos pixels o usuário já rolou para baixo
    // - scrollHeight: altura total do conteúdo da página (incluindo a parte não visível)
    // - clientHeight: altura visível da janela (parte que o usuário vê na tela)
    if (scrollHeight - scrollTop === clientHeight) {
        // Mostra o "carregando..." e busca mais postagens
        mostrarCarregando();
    }
});

// ========================================
//  EVENTO: Filtra postagens enquanto digita
// ========================================
filtro.addEventListener("input", filtrarPostagens);
