// Este arquivo JavaScript contém a lógica principal para buscar e exibir resultados da Wikipedia.

// URL base da API da Wikipedia para realizar buscas. Inclui parâmetros como ação, lista de busca, limite de resultados, formato JSON e origem para resolver problemas de CORS.
const url_base_api =
    "https://pt.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

// Seleciona o elemento do formulário no DOM usando sua classe CSS.
const elementoFormulario = document.querySelector(".formulario");
// Seleciona o elemento de input dentro do formulário.
const elementoInput = document.querySelector(".input-formulario");
// Seleciona o elemento onde os resultados da busca serão exibidos.
const elementoResultados = document.querySelector(".resultados");

// Adiciona um ouvinte de evento para o envio do formulário.
elementoFormulario.addEventListener("submit", (evento) => {
    // Previne o comportamento padrão de recarregar a página ao enviar o formulário.
    evento.preventDefault();
    // Obtém o valor atual digitado no campo de input.
    const valorInput = elementoInput.value;
    // Verifica se o valor do input está vazio.
    if (!valorInput) {
        // Se estiver vazio, exibe uma mensagem de erro na área de resultados.
        elementoResultados.innerHTML =
            '<div class="erro">Por favor, digite um termo de busca válido</div>';
        // Interrompe a execução da função.
        return;
    }
    // Se o valor for válido, chama a função para buscar as páginas na Wikipedia.
    buscarPaginas(valorInput);
});

// Função assíncrona para buscar páginas na API da Wikipedia.
const buscarPaginas = async (termoBusca) => {
    // Exibe um indicador de carregamento na área de resultados enquanto a busca é realizada.
    elementoResultados.innerHTML = '<div class="carregando"></div>';
    try {
        // Realiza uma requisição fetch para a URL da API, concatenando o termo de busca.
        const resposta = await fetch(`${url_base_api}${termoBusca}`);
        // Converte a resposta da requisição para um objeto JSON.
        const dados = await resposta.json();
        // Extrai o array de resultados da busca da estrutura de dados JSON.
        const resultadosBusca = dados.query.search;
        // Verifica se nenhum resultado foi retornado pela API.
        if (resultadosBusca.length < 1) {
            // Se não houver resultados, exibe uma mensagem de erro específica.
            elementoResultados.innerHTML =
                '<div class="erro">Nenhum resultado correspondente. Por favor, tente novamente</div>';
            // Interrompe a execução da função.
            return;
        }
        // Se houver resultados, chama a função para renderizá-los na página.
        renderizarResultados(resultadosBusca);
    } catch (erro) {
        // Em caso de qualquer erro durante a requisição ou processamento, exibe uma mensagem de erro genérica.
        elementoResultados.innerHTML =
            '<div class="erro">Ocorreu um erro...</div>';
    }
};

// Função para renderizar os resultados da busca na interface do usuário.
const renderizarResultados = (listaResultados) => {
    // Mapeia cada item da lista de resultados para uma string HTML que representa um cartão de artigo.
    const listaCartoes = listaResultados
        .map((item) => {
            console.log(item);
            // Desestrutura o objeto 'item' para obter o título, um trecho e o ID da página.
            const { title, snippet, pageid } = item;
            // Retorna um link HTML que aponta para a página da Wikipedia, com o título e o trecho do artigo.
            return `<a href=http://pt.wikipedia.org/?curid=${pageid} target="_blank">
            <h4>${title}</h4>
            <p>
              ${snippet}
            </p>
          </a>`;
        })
        // Junta todas as strings HTML dos cartões em uma única string, sem separadores.
        .join("");
    // Atualiza o conteúdo HTML da área de resultados com a lista de cartões renderizados.
    elementoResultados.innerHTML = `<div class="artigos">
          ${listaCartoes}
        </div>`;
};
