const formulario = document.getElementById("formulario");
const usuario = document.getElementById("usuario");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

// Mostra mensagem de erro no campo
function mostrarErro(input, mensagem) {
    const controleFormulario = input.parentElement;
    controleFormulario.className = "controle-formulario erro";
    const pequeno = controleFormulario.querySelector("small");
    pequeno.innerText = mensagem;
}

// Mostra estado de sucesso
function mostrarSucesso(input) {
    const controleFormulario = input.parentElement;
    controleFormulario.className = "controle-formulario sucesso";
}

// Verifica se o e-mail é válido
function verificarEmail(input) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        mostrarSucesso(input);
    } else {
        mostrarErro(input, "E-mail inválido");
    }
}

// Verifica se os campos obrigatórios foram preenchidos
function verificarObrigatorios(arrayInputs) {
    let obrigatorio = false;
    arrayInputs.forEach(function (input) {
        if (input.value.trim() === "") {
            mostrarErro(input, `${obterNomeCampo(input)} é obrigatório`);
            obrigatorio = true;
        } else {
            mostrarSucesso(input);
        }
    });
    return obrigatorio;
}

// Verifica o tamanho do campo
function verificarTamanho(input, min, max) {
    if (input.value.length < min) {
        mostrarErro(
            input,
            `${obterNomeCampo(input)} deve ter pelo menos ${min} caracteres`
        );
    } else if (input.value.length > max) {
        mostrarErro(
            input,
            `${obterNomeCampo(input)} deve ter menos de ${max} caracteres`
        );
    } else {
        mostrarSucesso(input);
    }
}

// Verifica se as senhas são iguais
function verificarSenhasIguais(input1, input2) {
    console.log(input1.value);
    console.log(input2.value);

    if (input1.value !== input2.value) {
        console.log(input1.value !== input2.value);
        mostrarErro(input2, "As senhas não coincidem");
    }
}

// Retorna o nome do campo com a primeira letra maiúscula
function obterNomeCampo(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Evento de envio do formulário
formulario.addEventListener("submit", function (e) {
    e.preventDefault();

    console.log(senha.value);
    console.log(confirmarSenha.value);

    if (verificarObrigatorios([usuario, email, senha, confirmarSenha])) {
        verificarTamanho(usuario, 3, 15);
        verificarTamanho(senha, 6, 25);
        verificarEmail(email);
        verificarSenhasIguais(senha, confirmarSenha);
    }
});
