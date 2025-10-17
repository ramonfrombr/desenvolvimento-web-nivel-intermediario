const cardapio = [
    {
        id: 1,
        titulo: "panquecas de leitelho",
        categoria: "café_da_manhã",
        preco: 15.99,
        img: "./imagens/item-1.jpeg",
        descricao:
            "Panquecas fofas com manteiga e mel, perfeitas para começar o dia",
    },
    {
        id: 2,
        titulo: "hambúrguer duplo",
        categoria: "almoço",
        preco: 13.99,
        img: "./imagens/item-2.jpeg",
        descricao:
            "Hambúrguer duplo com queijo derretido, alface e molho especial.",
    },
    {
        id: 3,
        titulo: "milkshake godzilla",
        categoria: "bebidas",
        preco: 6.99,
        img: "./imagens/item-3.jpeg",
        descricao:
            "Milkshake gigante com sorvete de baunilha, calda de chocolate e chantilly.",
    },
    {
        id: 4,
        titulo: "delícia caipira",
        categoria: "café_da_manhã",
        preco: 20.99,
        img: "./imagens/item-4.jpeg",
        descricao: "Ovos mexidos com bacon crocante, torradas e café fresco.",
    },
    {
        id: 5,
        titulo: "ataque do ovo",
        categoria: "almoço",
        preco: 22.99,
        img: "./imagens/item-5.jpeg",
        descricao:
            "Prato com ovos fritos, arroz, legumes e molho especial da casa.",
    },
    {
        id: 6,
        titulo: "sonho de oreo",
        categoria: "bebidas",
        preco: 18.99,
        img: "./imagens/item-6.jpeg",
        descricao:
            "Milkshake cremoso com pedaços de biscoito Oreo e cobertura de chantilly.",
    },
    {
        id: 7,
        titulo: "explosão de bacon",
        categoria: "café_da_manhã",
        preco: 8.99,
        img: "./imagens/item-7.jpeg",
        descricao:
            "Sanduíche de bacon artesanal com pão tostado e queijo cheddar.",
    },
    {
        id: 8,
        titulo: "clássico americano",
        categoria: "almoço",
        preco: 12.99,
        img: "./imagens/item-8.jpeg",
        descricao: "Hambúrguer tradicional com batatas fritas e refrigerante.",
    },
    {
        id: 9,
        titulo: "milkshake quarentena",
        categoria: "bebidas",
        preco: 16.99,
        img: "./imagens/item-9.jpeg",
        descricao:
            "Mistura divertida de chocolate, morango e baunilha para animar o dia.",
    },
    {
        id: 10,
        titulo: "bife de bisão",
        categoria: "jantar",
        preco: 22.99,
        img: "./imagens/item-10.jpeg",
        descricao: "Corte nobre grelhado com legumes e purê de batatas.",
    },
];

const containerBotoes = document.querySelector(".container-botoes");
const areaCentral = document.querySelector(".area-central");

window.addEventListener("DOMContentLoaded", function () {
    mostrarItens(cardapio);
    mostrarBotoes();
});

function mostrarBotoes() {
    const categorias = cardapio.reduce(
        function (valores, item) {
            if (!valores.includes(item.categoria)) {
                valores.push(item.categoria);
            }
            return valores;
        },
        ["todos"]
    );

    const botoes = categorias
        .map(function (categoria) {
            return `<button type="button" class="botao-filtro" data-id=${categoria}>
            ${categoria.replaceAll("_", " ")}
        </button>
        `;
        })
        .join("");

    containerBotoes.innerHTML = botoes;

    const botoesFiltro = containerBotoes.querySelectorAll(".botao-filtro");

    botoesFiltro.forEach(function (botao) {
        botao.addEventListener("click", function (evento) {
            const categoria = evento.currentTarget.dataset.id;
            const itensFiltrados = cardapio.filter(function (item) {
                if (item.categoria === categoria) {
                    return item;
                }
            });

            if (categoria === "todos") {
                mostrarItens(cardapio);
            } else {
                mostrarItens(itensFiltrados);
            }
        });
    });
}

function mostrarItens(itens) {
    let exibir = itens
        .map(function (item) {
            return `<article class="item-cardapio">
        <img src=${item.img} alt=${item.titulo} class="foto" />
        <div class="informacao-item">
            <header>
                <h4>${item.titulo}</h4>
                <h4 class="preco">${item.preco}</h4>
            </header>
            <p class="texto-item">${item.descricao}</p>
        </div>
        </article>`;
        })
        .join("");

    areaCentral.innerHTML = exibir;
}
