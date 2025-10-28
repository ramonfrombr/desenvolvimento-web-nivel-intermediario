const formulario = document.getElementById("formulario");
const entrada = document.getElementById("entrada");
const tarefasUL = document.getElementById("tarefas");

// Pega as tarefas salvas no localStorage
const tarefas = JSON.parse(localStorage.getItem("tarefas"));

if (tarefas) {
    tarefas.forEach((tarefa) => adicionarTarefa(tarefa));
}

// Evento de envio do formulário
formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    adicionarTarefa();
});

// Função para adicionar tarefas
function adicionarTarefa(tarefa) {
    let textoTarefa = entrada.value;

    if (tarefa) {
        textoTarefa = tarefa.texto;
    }

    if (textoTarefa) {
        const tarefaEl = document.createElement("li");
        if (tarefa && tarefa.concluida) {
            tarefaEl.classList.add("concluida");
        }

        tarefaEl.innerText = textoTarefa;

        // Alterna entre concluída e não concluída ao clicar
        tarefaEl.addEventListener("click", () => {
            tarefaEl.classList.toggle("concluida");
            atualizarLocalStorage();
        });

        // Remove a tarefa ao clicar com o botão direito
        tarefaEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            tarefaEl.remove();
            atualizarLocalStorage();
        });

        tarefasUL.appendChild(tarefaEl);
        entrada.value = "";
        atualizarLocalStorage();
    }
}

// Atualiza o localStorage com o estado atual das tarefas
function atualizarLocalStorage() {
    const tarefasEl = document.querySelectorAll("li");
    const tarefasArray = [];

    tarefasEl.forEach((tarefaEl) => {
        tarefasArray.push({
            texto: tarefaEl.innerText,
            concluida: tarefaEl.classList.contains("concluida"),
        });
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefasArray));
}
