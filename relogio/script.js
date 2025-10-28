const ponteiroHora = document.querySelector(".hora");
const ponteiroMinuto = document.querySelector(".minuto");
const ponteiroSegundo = document.querySelector(".segundo");
const elementoHora = document.querySelector(".hora-atual");
const elementoData = document.querySelector(".data-atual");
const botaoAlternar = document.querySelector(".alternar");

const dias = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
];
const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
];

botaoAlternar.addEventListener("click", (e) => {
    const html = document.querySelector("html");
    if (html.classList.contains("escuro")) {
        html.classList.remove("escuro");
        e.target.innerHTML = "Modo escuro";
    } else {
        html.classList.add("escuro");
        e.target.innerHTML = "Modo claro";
    }
});

function definirHora() {
    const agora = new Date();
    const mes = agora.getMonth();
    const diaSemana = agora.getDay();
    const dia = agora.getDate();
    const horas = agora.getHours();
    const horasRelogio = horas >= 13 ? horas % 12 : horas;
    const minutos = agora.getMinutes();
    const segundos = agora.getSeconds();
    const periodo = horas >= 12 ? "PM" : "AM";

    ponteiroHora.style.transform = `translate(-50%, -100%) rotate(${mapear(
        horasRelogio,
        0,
        12,
        0,
        360
    )}deg)`;
    ponteiroMinuto.style.transform = `translate(-50%, -100%) rotate(${mapear(
        minutos,
        0,
        60,
        0,
        360
    )}deg)`;
    ponteiroSegundo.style.transform = `translate(-50%, -100%) rotate(${mapear(
        segundos,
        0,
        60,
        0,
        360
    )}deg)`;

    elementoHora.innerHTML = `${horasRelogio}:${
        minutos < 10 ? `0${minutos}` : minutos
    } ${periodo}`;
    elementoData.innerHTML = `${dias[diaSemana]}, ${meses[mes]} <span class="circulo">${dia}</span>`;
}

// Função para mapear um intervalo numérico em outro (StackOverflow)
const mapear = (num, entradaMin, entradaMax, saidaMin, saidaMax) => {
    return (
        ((num - entradaMin) * (saidaMax - saidaMin)) /
            (entradaMax - entradaMin) +
        saidaMin
    );
};

definirHora();
setInterval(definirHora, 1000);
