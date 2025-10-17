const poke_container = document.getElementById("poke-container");
const quantidade_pokemons = 150;

const cores = {
    fire: "#FDDFDF",
    grass: "#DEFDE0",
    electric: "#FCF7DE",
    water: "#DEF3FD",
    ground: "#f4e7da",
    rock: "#d5d5d4",
    fairy: "#fceaff",
    poison: "#98d7a5",
    bug: "#f8d5a3",
    dragon: "#97b3e6",
    psychic: "#eaeda1",
    flying: "#F5F5F5",
    fighting: "#E6E0D4",
    normal: "#F5F5F5",
};

const tipos_principais = Object.keys(cores);

// Buscar todos os Pokémons
const buscarPokemons = async () => {
    for (let i = 1; i <= quantidade_pokemons; i++) {
        await buscarPokemon(i);
    }
};

// Buscar um Pokémon pelo ID
const buscarPokemon = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    criarCartaPokemon(data);
};

// Criar o cartão do Pokémon
const criarCartaPokemon = (pokemon) => {
    const pokemonEl = document.createElement("div");
    pokemonEl.classList.add("pokemon");

    const nome = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const id = pokemon.id.toString().padStart(3, "0");

    const tipos = pokemon.types.map((type) => type.type.name);
    const tipo = tipos_principais.find((t) => tipos.indexOf(t) > -1);
    const cor = cores[tipo];

    pokemonEl.style.backgroundColor = cor;

    const htmlPokemon = `
    <div class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" alt="${nome}">
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${nome}</h3>
        <small class="type">Tipo: <span>${tipo}</span></small>
    </div>
    `;

    pokemonEl.innerHTML = htmlPokemon;
    poke_container.appendChild(pokemonEl);
};

buscarPokemons();
