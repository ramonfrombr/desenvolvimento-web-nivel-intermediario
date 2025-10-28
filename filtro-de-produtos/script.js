const produtos = [
    {
        nome: "Sony Playstation 5",
        imagem: "imagens/playstation_5.png",
        tipo: "games",
        preco: 499.99,
    },
    {
        nome: "Samsung Galaxy",
        imagem: "imagens/samsung_galaxy.png",
        tipo: "celulares",
        preco: 399.99,
    },
    {
        nome: "Câmera Canon EOS",
        imagem: "imagens/canon_eos_camera.png",
        tipo: "cameras",
        preco: 749.99,
    },
    {
        nome: "Câmera Sony A7",
        imagem: "imagens/sony_a7_camera.png",
        tipo: "cameras",
        preco: 1999.99,
    },
    {
        nome: "TV LG",
        imagem: "imagens/lg_tv.png",
        tipo: "televisores",
        preco: 799.99,
    },
    {
        nome: "Nintendo Switch",
        imagem: "imagens/nintendo_switch.png",
        tipo: "games",
        preco: 299.99,
    },
    {
        nome: "Xbox Series X",
        imagem: "imagens/xbox_series_x.png",
        tipo: "games",
        preco: 499.99,
    },
    {
        nome: "TV Samsung",
        imagem: "imagens/samsung_tv.png",
        tipo: "televisores",
        preco: 1099.99,
    },
    {
        nome: "Google Pixel",
        imagem: "imagens/google_pixel.png",
        tipo: "celulares",
        preco: 499.99,
    },
    {
        nome: "Câmera Sony ZV1F",
        imagem: "imagens/sony_zv1f_camera.png",
        tipo: "cameras",
        preco: 799.99,
    },
    {
        nome: "TV Toshiba",
        imagem: "imagens/toshiba_tv.png",
        tipo: "televisores",
        preco: 499.99,
    },
    {
        nome: "iPhone 14",
        imagem: "imagens/iphone_14.png",
        tipo: "celulares",
        preco: 999.99,
    },
];

// Seleciona elementos do DOM
const areaProdutos = document.getElementById("area-produtos");
const checkboxes = document.querySelectorAll(".check");
const filtrosContainer = document.getElementById("filtros-container");
const campoBusca = document.getElementById("busca");
const botaoCarrinho = document.getElementById("botaoCarrinho");
const contadorCarrinho = document.getElementById("contadorCarrinho");

// Inicializa contagem do carrinho
let itensNoCarrinho = 0;

// Cria elementos dos produtos
const elementosProduto = [];

produtos.forEach((produto) => {
    const elemento = criarElementoProduto(produto);
    elementosProduto.push(elemento);
    areaProdutos.appendChild(elemento);
});

// Eventos
filtrosContainer.addEventListener("change", filtrarProdutos);
campoBusca.addEventListener("input", filtrarProdutos);

// Função para criar o card do produto
function criarElementoProduto(produto) {
    const divProduto = document.createElement("div");
    divProduto.className = "item space-y-2";

    divProduto.innerHTML = `
  <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border">
    <img src="${produto.imagem}" alt="${
        produto.nome
    }" class="w-full h-full object-cover" />
    <span class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
      Adicionar ao carrinho
    </span>
  </div>
  <p class="text-xl">${produto.nome}</p>
  <strong>R$ ${produto.preco.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
  })}</strong>
  `;

    divProduto
        .querySelector(".status")
        .addEventListener("click", alternarCarrinho);

    return divProduto;
}

// Adiciona ou remove do carrinho
function alternarCarrinho(e) {
    const status = e.target;

    if (status.classList.contains("adicionado")) {
        // Remover
        status.classList.remove("adicionado");
        status.innerText = "Adicionar ao carrinho";
        status.classList.remove("bg-red-600");
        status.classList.add("bg-gray-800");
        itensNoCarrinho--;
    } else {
        // Adicionar
        status.classList.add("adicionado");
        status.innerText = "Remover do carrinho";
        status.classList.remove("bg-gray-800");
        status.classList.add("bg-red-600");
        itensNoCarrinho++;
    }

    contadorCarrinho.innerText = itensNoCarrinho.toString();
}

// Filtragem por texto e categorias
function filtrarProdutos() {
    const termoBusca = campoBusca.value.trim().toLowerCase();

    const categoriasMarcadas = Array.from(checkboxes)
        .filter((check) => check.checked)
        .map((check) => check.id);

    elementosProduto.forEach((elemento, index) => {
        const produto = produtos[index];

        const correspondeBusca = produto.nome
            .toLowerCase()
            .includes(termoBusca);
        const correspondeCategoria =
            categoriasMarcadas.length === 0 ||
            categoriasMarcadas.includes(produto.tipo);

        if (correspondeBusca && correspondeCategoria) {
            elemento.classList.remove("hidden");
        } else {
            elemento.classList.add("hidden");
        }
    });
}
