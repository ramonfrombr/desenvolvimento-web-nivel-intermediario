const formulario = document.getElementById("formulario");
const pesquisa = document.getElementById("pesquisa");
const resultado = document.getElementById("resultado");
const mais = document.getElementById("mais");

const urlAPI = "https://api.lyrics.ovh";

/**
 * Busca músicas por nome ou artista
 */
async function buscarMusicas(termo) {
    const resposta = await fetch(`${urlAPI}/suggest/${termo}`);
    const dados = await resposta.json();

    mostrarDados(dados);
}

/**
 * Exibe músicas e artistas no DOM
 */
function mostrarDados(dados) {
    resultado.innerHTML = `
    <ul class="musicas">
      ${dados.data
          .map(
              (musica) => `<li>
      <span><strong>${musica.artist.name}</strong> - ${musica.title}</span>
      <button class="botao" data-artista="${musica.artist.name}" data-musica="${musica.title}">Ver Letra</button>
    </li>`
          )
          .join("")}
    </ul>
  `;

    if (dados.prev || dados.next) {
        mais.innerHTML = `
      ${
          dados.prev
              ? `<button class="botao" onclick="carregarMaisMusicas('${dados.prev}')">Anterior</button>`
              : ""
      }
      ${
          dados.next
              ? `<button class="botao" onclick="carregarMaisMusicas('${dados.next}')">Próxima</button>`
              : ""
      }
    `;
    } else {
        mais.innerHTML = "";
    }
}

/**
 * Busca músicas anteriores ou próximas
 */
async function carregarMaisMusicas(url) {
    const proxy = "https://cors-anywhere.com/";
    const urlAPI = `${proxy}${url}`;
    const resposta = await fetch(urlAPI);
    const dados = await resposta.json();

    mostrarDados(dados);
}

/**
 * Obtém a letra da música
 */
async function obterLetra(artista, tituloMusica) {
    const resposta = await fetch(`${urlAPI}/v1/${artista}/${tituloMusica}`);
    const dados = await resposta.json();

    if (dados.error) {
        resultado.innerHTML = dados.error;
    } else {
        const letra = dados.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

        resultado.innerHTML = `
      <h2><strong>${artista}</strong> - ${tituloMusica}</h2>
      <span>${letra}</span>
    `;
    }

    mais.innerHTML = "";
}

/**
 * Eventos
 */
formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const termoPesquisa = pesquisa.value.trim();

    if (!termoPesquisa) {
        alert("Por favor, digite um termo de pesquisa.");
    } else {
        buscarMusicas(termoPesquisa);
    }
});

// Clique no botão "Ver Letra"
resultado.addEventListener("click", (e) => {
    const elementoClicado = e.target;

    if (elementoClicado.tagName === "BUTTON") {
        const artista = elementoClicado.getAttribute("data-artista");
        const tituloMusica = elementoClicado.getAttribute("data-musica");

        obterLetra(artista, tituloMusica);
    }
});
