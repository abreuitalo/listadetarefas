const form = document.querySelector(".form");
const ul = document.querySelector(".tarefas");

// salvar tarefas
function salvarTarefas() {
  const tarefas = document.querySelectorAll("li");
  const listaTarefas = [];

  for (let tarefa of tarefas) {
    listaTarefas.push(tarefa.innerText);
  }

  const tarefasJSON = JSON.stringify(listaTarefas);
  localStorage.setItem("tarefas", tarefasJSON);
}

// apagar tarefas
ul.addEventListener("click", (e) => {
  const elemento = e.target;

  if (elemento.classList.contains("trash")) {
    elemento.parentElement.parentElement.remove();
    salvarTarefas();
  }
});
// cria botao apagar
function btnApagar(li) {
  const btnApagar = document.createElement("button");
  btnApagar.innerHTML = '<i class="fa-solid fa-trash trash"></i>';
  btnApagar.classList.add("delete");
  li.appendChild(btnApagar);
}

// cria li
function criaLi() {
  const li = document.createElement("li");
  return li;
}

// limpa input
function limpaInput() {
  document.querySelector(".tarefa").value = "";
}

function criaTarefa(tarefa) {
  if (!tarefa) return;
  salvarTarefas()

  // validar tarefas
  const tarefas = localStorage.getItem('tarefas')
  const listaTarefas = JSON.parse(tarefas)

  for (let trf of listaTarefas) {
    if (trf === tarefa) {
      swal("A tarefa já existe na lista!", "Tente adicionar uma nova tarefa.", "error", {
        button: "Entendi"
      } )
      return
    }
  }

  const li = criaLi();
  li.innerText = tarefa;
  btnApagar(li);
  ul.appendChild(li);
  salvarTarefas();
}

// envio da tarefa
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const tarefa = form.querySelector(".tarefa").value;

  criaTarefa(tarefa);
  limpaInput();
});

// carregar tarefas salvas
(function carregarTarefasSalvas() {
  const tarefas = localStorage.getItem("tarefas");
  const listaTarefas = JSON.parse(tarefas);

  for (let tarefa of listaTarefas) {
    criaTarefa(tarefa);
  }
})();
