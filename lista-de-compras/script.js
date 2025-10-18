const formulario = document.querySelector(".formulario-compras");
const alerta = document.querySelector(".alerta");
const inputElemento = document.getElementById("item-compra");
const botaoEnviar = document.querySelector(".botao-enviar");
const containerCompras = document.querySelector(".container-compras");
const listaCompras = document.querySelector(".lista-compras");
const botaoLimpar = document.querySelector(".botao-limpar");

let elementoEditar;
let editando = false;
let idEditar = "";

formulario.addEventListener("submit", adicionarItem);
window.addEventListener("DOMContentLoaded", configurarItens);
botaoLimpar.addEventListener("click", limparItens);

function adicionarItem(evento) {
    evento.preventDefault();
    const valor = inputElemento.value.trim();
    const id = new Date().getTime().toString();

    if (valor === "") {
        mostrarAlerta("Por favor, digite um valor", "perigo");
        return;
    }

    if (!editando) {
        criarItemLista(id, valor);
        mostrarAlerta("Item adicionado à lista", "sucesso");
        containerCompras.classList.add("mostrar-container");
        adicionarArmazemLocal(id, valor);
    } else {
        elementoEditar.textContent = valor;
        mostrarAlerta("Item editado com sucesso", "sucesso");
        editarArmazemLocal(idEditar, valor);
    }

    resetarFormulario();
}

function mostrarAlerta(texto, tipo) {
    alerta.textContent = texto;
    alerta.classList.add(`alerta-${tipo}`);
    setTimeout(() => {
        alerta.textContent = "";
        alerta.classList.remove(`alerta-${tipo}`);
    }, 2000);
}

function criarItemLista(id, valor) {
    const elemento = document.createElement("article");
    elemento.setAttribute("data-id", id);
    elemento.classList.add("item-compra");
    elemento.innerHTML = `
    <p class="titulo-item">${valor}</p>
    <div class="botoes-item">
        <button type="button" class="botao-editar">
            <i class="fas fa-edit"></i>
        </button>
        <button type="button" class="botao-excluir">
            <i class="fas fa-trash"></i>
        </button>
    </div>
    `;

    const botaoExcluir = elemento.querySelector(".botao-excluir");
    botaoExcluir.addEventListener("click", excluirItem);

    const botaoEditar = elemento.querySelector(".botao-editar");
    botaoEditar.addEventListener("click", editarItem);

    listaCompras.appendChild(elemento);
}

function adicionarArmazemLocal(id, valor) {
    const item = { id, valor };
    let itens = selecionarArmazemLocal();
    itens.push(item);
    localStorage.setItem("lista", JSON.stringify(itens));
}

function selecionarArmazemLocal() {
    return localStorage.getItem("lista")
        ? JSON.parse(localStorage.getItem("lista"))
        : [];
}

function configurarItens() {
    let itens = selecionarArmazemLocal();
    if (itens.length > 0) {
        itens.forEach((item) => criarItemLista(item.id, item.valor));
        containerCompras.classList.add("mostrar-container");
    }
}

function excluirItem(evento) {
    const elemento = evento.currentTarget.parentElement.parentElement;
    const id = elemento.dataset.id;
    listaCompras.removeChild(elemento);

    if (listaCompras.children.length === 0) {
        containerCompras.classList.remove("mostrar-container");
    }

    mostrarAlerta("Item removido", "perigo");
    resetarFormulario();
    removerArmazemLocal(id);
}

function resetarFormulario() {
    inputElemento.value = "";
    editando = false;
    idEditar = "";
    botaoEnviar.textContent = "adicionar";
}

function removerArmazemLocal(id) {
    let itens = selecionarArmazemLocal();
    itens = itens.filter((item) => item.id !== id);
    localStorage.setItem("lista", JSON.stringify(itens));
}

function editarItem(evento) {
    const elemento = evento.currentTarget.parentElement.parentElement;
    elementoEditar = evento.currentTarget.parentElement.previousElementSibling;
    inputElemento.value = elementoEditar.textContent;
    editando = true;
    idEditar = elemento.dataset.id;
    botaoEnviar.textContent = "editar";
}

function editarArmazemLocal(id, valor) {
    let itens = selecionarArmazemLocal();
    itens = itens.map((item) => {
        if (item.id === id) {
            item.valor = valor;
        }
        return item;
    });
    localStorage.setItem("lista", JSON.stringify(itens));
}

function limparItens() {
    const itens = document.querySelectorAll(".item-compra");
    if (itens.length > 0) {
        itens.forEach((item) => listaCompras.removeChild(item));
    }
    containerCompras.classList.remove("mostrar-container");
    mostrarAlerta("Lista vazia", "perigo");
    resetarFormulario();
    localStorage.removeItem("lista");
}
