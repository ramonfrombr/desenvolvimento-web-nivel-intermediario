const container_pokedex = document.getElementById("container-pokedex");
const quantidade_pokemons = 1000;

const tiposTraduzidos = {
    fire: "fogo",
    grass: "planta",
    electric: "elétrico",
    water: "água",
    ground: "terrestre",
    rock: "rocha",
    fairy: "fada",
    poison: "veneno",
    bug: "inseto",
    dragon: "dragão",
    psychic: "psíquico",
    flying: "voador",
    fighting: "lutador",
    normal: "normal",
    steel: "metal",
    ghost: "fantasma",
    ice: "gelo",
    dark: "sombrio",
};

const cores = {
    fire: "#fddfdf",
    grass: "#defde0",
    electric: "#fcf7de",
    water: "#def3fd",
    ground: "#fae7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#f5f5f5",
    fighting: "#e6e0d4",
    normal: "#f5f5f5",
    steel: "#909090ff",
    ghost: "#d5d5d5ff",
    ice: "#d1e1feff",
    dark: "#9d9d9dff",
};

const tipos_principais = Object.keys(tiposTraduzidos);

const criarCartaPokemon = (pokemon) => {
    const pokemonElemento = document.createElement("div");
    pokemonElemento.classList.add("pokemon");

    const nome = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, "0");

    const tiposDoPokemon = pokemon.types.map((tipo) => tipo.type.name);

    const tipoPrincipal = tiposDoPokemon[0];
    const cor = cores[tipoPrincipal];

    const tiposDoPokemonTraduzidos = tiposDoPokemon
        .map((tipo) => tiposTraduzidos[tipo])
        .join(", ");

    pokemonElemento.style.backgroundColor = cor;

    const htmlPokemon = `
    <div class="container-imagem">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${nome}" />
    </div>
    <div class="informacao">
        <span class="numero">#${id}</span>
        <h3 class="nome">${nome}</h3>
        <small class="tipo">Tipo: <span>${tiposDoPokemonTraduzidos}</span></small>
    </div>
    `;

    pokemonElemento.innerHTML = htmlPokemon;
    container_pokedex.appendChild(pokemonElemento);
};

const buscarPokemon = async (id) => {
    const endereco = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const resposta = await fetch(endereco);
    const dados = await resposta.json();
    console.log(dados);
    criarCartaPokemon(dados);
};

async function buscarPokemons() {
    for (let i = 1; i <= quantidade_pokemons; i++) {
        await buscarPokemon(i);
    }
}

buscarPokemons();
