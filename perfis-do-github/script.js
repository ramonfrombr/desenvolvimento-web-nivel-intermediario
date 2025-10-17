const principal = document.getElementById("principal");
const formulario = document.getElementById("formulario");
const pesquisa = document.getElementById("pesquisa");

const ENDERECO_DA_API = "https://api.github.com/users/";

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const usuario = pesquisa.value.trim();

    if (usuario) {
        obterUsuario(usuario);
        pesquisa.value = "";
    }
});

async function obterUsuario(usuario) {
    try {
        const { data: dados } = await axios(ENDERECO_DA_API + usuario);

        criarCartaoUsuario(dados);
        obterRepositorios(usuario);
    } catch (erro) {
        if (erro.response.status == 404) {
            criarCartaoErro(
                "Nenhum perfil foi encontrado com esse nome de usuário."
            );
        }
    }
}

function criarCartaoErro(mensagem) {
    const cartaoHTML = `
        <div class="cartao">
            <h1>${mensagem}</h1>
        </div>
    `;
    principal.innerHTML = cartaoHTML;
}

function criarCartaoUsuario(usuario) {
    const nomeUsuario = usuario.name || usuario.login;
    const bioUsuario = usuario.bio ? `<p>${usuario.bio}</p>` : "";

    const cartaoHTML = `
        <div class="cartao">
            <div>
                <img src="${usuario.avatar_url}" alt="${usuario.name}" class="avatar" />
            </div>
            <div class="informacao-usuario">
                <h2>${nomeUsuario}</h2>
                <h3>@${usuario.login}</h3>
                ${bioUsuario}
                <ul>
                    <li>${usuario.followers} <strong>Seguidores</strong></li>
                    <li>${usuario.following} <strong>Seguindo</strong></li>
                    <li>${usuario.public_repos} <strong>Respositórios</strong></li>
                </ul>

                <div id="repositorios"></div>
            </div>
        </div>
    `;

    principal.innerHTML = cartaoHTML;
}

async function obterRepositorios(usuario) {
    try {
        const { data: dados } = await axios(
            ENDERECO_DA_API + usuario + "/repos?sort=created"
        );
        adicionarRepositoriosAoCartao(dados);
    } catch (erro) {
        criarCartaoErro("Ocorreu um problema ao buscar os repositórios.");
    }
}

function adicionarRepositoriosAoCartao(repositorios) {
    const repositoriosContainer = document.getElementById("repositorios");

    repositorios.slice(0, 5).forEach((repositorio) => {
        const repositorioElemento = document.createElement("a");
        repositorioElemento.classList.add("repositorio");
        repositorioElemento.href = repositorio.html_url;
        repositorioElemento.target = "_blank";
        repositorioElemento.innerText = repositorio.name;

        repositoriosContainer.appendChild(repositorioElemento);
    });
}
