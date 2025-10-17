function salvarFavorito(evento) {
  evento.preventDefault();

  let nomeDoSite = document.getElementById("nomeDoSite").value;
  let enderecoDoSite = document.getElementById("enderecoDoSite").value;

  if (!validarFormulario(nomeDoSite, enderecoDoSite)) {
    return false;
  }

  let favorito = {
    nome: nomeDoSite,
    endereco: enderecoDoSite
  }

  /*
  localStorage.setItem("teste", "Olá mundo");
  console.log(localStorage.getItem("teste"));
  localStorage.removeItem("teste");
  console.log(localStorage.getitem("teste"));
  */

  if (localStorage.getItem("favoritos") === null) {
    let favoritos = [];
    favoritos.push(favorito);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  } else {
    let favoritos = JSON.parse(localStorage.getItem("favoritos"));
    favoritos.push(favorito);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }

  document.getElementById("meuFormulario").reset();

  listarFavoritos();
}

document.getElementById("meuFormulario").addEventListener("submit", salvarFavorito);

function listarFavoritos() {
  let favoritos = JSON.parse(localStorage.getItem("favoritos"));
  let listaDeFavoritos = document.getElementById("listaDeFavoritos");

  listaDeFavoritos.innerHTML = "";
  for (let i = 0; i < favoritos.length; i++) {
    let nome = favoritos[i].nome;
    let endereco = favoritos[i].endereco;

    listaDeFavoritos.innerHTML += '<div class="d-flex justify-content-between mb-2">'+
                                  '<h3>'+nome+'</h3>'+
                                  '<div>'+
                                  ' <a class="btn btn-primary" target="_blank" href="'+adicionarHTTP(endereco)+'">Visite</a>'+
                                  ' <a onclick="apagarFavorito(\''+endereco+'\')" class="btn btn-danger" href="#">Apagar</a> ' +
                                  '</div>'+
                                  '</div>';
  }
}

function apagarFavorito(endereco) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos"));
  
  for (let i = 0; i < favoritos.length; i++) {
    if (favoritos[i].endereco == endereco) {
      favoritos.splice(i, 1);
    }
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  listarFavoritos();
}

function validarFormulario(nomeDoSite, enderecoDoSite) {
  if (!nomeDoSite || !enderecoDoSite) {
    alert("Por favor, preencha o formulário");
    return false;
  }

  let expressao = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  let expressao_regular = new RegExp(expressao);

  if (!enderecoDoSite.match(expressao_regular)) {
    alert("Por favor, use um endereço válido");
    return false;
  }

  return true;
}

function adicionarHTTP(endereco) {
  if (!/^(?:f|ht)tps?\:\/\//.test(endereco)) {
    endereco = "http://" + endereco;
  }
  return endereco;
}

listarFavoritos();