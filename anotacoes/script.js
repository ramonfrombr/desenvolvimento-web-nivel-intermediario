const botaoAdicionar = document.getElementById("botaoAdicionar");

// Recupera anotacoes salvas no localStorage (caso existam)
const anotacoesSalvas = JSON.parse(localStorage.getItem("anotacoes"));

if (anotacoesSalvas) {
    anotacoesSalvas.forEach((textoAnotacao) =>
        adicionarAnotacao(textoAnotacao)
    );
}

// Evento para criar nova anotacao
botaoAdicionar.addEventListener("click", () => adicionarAnotacao());

function adicionarAnotacao(texto = "") {
    const elementoAnotacao = document.createElement("div");
    elementoAnotacao.classList.add("anotacao");

    elementoAnotacao.innerHTML = `
        <div class="ferramentas">
            <button class="editar" title="Editar"><i class="fas fa-edit"></i></button>
            <button class="excluir" title="Excluir"><i class="fas fa-trash-alt"></i></button>
        </div>

        <div class="principal ${texto ? "" : "oculto"}"></div>
        <textarea class="${texto ? "oculto" : ""}"></textarea>
    `;

    const botaoEditar = elementoAnotacao.querySelector(".editar");
    const botaoExcluir = elementoAnotacao.querySelector(".excluir");
    const areaPrincipal = elementoAnotacao.querySelector(".principal");
    const areaTexto = elementoAnotacao.querySelector("textarea");

    areaTexto.value = texto;
    areaPrincipal.innerHTML = marked(texto);

    // Excluir anotacao
    botaoExcluir.addEventListener("click", () => {
        elementoAnotacao.remove();
        atualizarLocalStorage();
    });

    // Alternar entre modo de edição e visualização
    botaoEditar.addEventListener("click", () => {
        areaPrincipal.classList.toggle("oculto");
        areaTexto.classList.toggle("oculto");
    });

    // Atualizar texto e salvar
    areaTexto.addEventListener("input", (e) => {
        const { value } = e.target;
        areaPrincipal.innerHTML = marked(value);
        atualizarLocalStorage();
    });

    document.body.appendChild(elementoAnotacao);
}

// Atualiza o armazenamento local
function atualizarLocalStorage() {
    const textosAnotacoes = document.querySelectorAll("textarea");
    const anotacoes = [];

    textosAnotacoes.forEach((anotacao) => anotacoes.push(anotacao.value));

    localStorage.setItem("anotacoes", JSON.stringify(anotacoes));
}
