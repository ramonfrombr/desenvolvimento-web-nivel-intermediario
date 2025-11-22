// Este arquivo contém URLs e parâmetros de API relevantes para a Wikipedia, servindo como referência.

// URL base da API da Wikipedia para realizar buscas. É um exemplo completo com um placeholder para o termo de busca.
// list=search: Parâmetro para indicar que a operação é uma busca de texto completo.
// srsearch="inputValue": Parâmetro onde o termo de busca real seria inserido para pesquisar títulos de páginas ou conteúdo.
// srlimit=20: Parâmetro para limitar o número total de páginas retornadas a 20.
// format=json: Parâmetro para especificar que a resposta da API deve ser no formato JSON.
// "origin=*": Parâmetro essencial para resolver erros de CORS (Cross-Origin Resource Sharing), permitindo requisições de diferentes origens.
const url_api_busca =
    "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=termoBusca";

// Abaixo, comentários detalhados sobre os parâmetros da URL de busca da API:
// list=search - realiza uma busca de texto completo.
// srsearch="inputValue" - busca por títulos de página ou conteúdo que corresponda a este valor.
// srlimit=20 - quantos resultados de página retornar no total.
// format=json - resposta em formato json.
// "origin=*" - corrige erros de CORS.

// Template de URL para acessar uma página específica da Wikipedia, usando o 'idPagina' (pageid) como identificador.
const url_pagina = "href=http://en.wikipedia.org/?curid=${idPagina}";
