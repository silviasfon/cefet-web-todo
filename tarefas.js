function Tarefa(nome, categoria, realizada) {
  this.nome = nome;
  this.categoria = categoria;
  this.realizada = realizada;
}

Tarefa.prototype.adicionaNaPagina = function (containerEl) {
  const tarefaHtml = document.createElement("li");
  tarefaHtml.innerHTML = this.nome;
  tarefaHtml.classList.add("item-tarefa", `categoria-${this.categoria}`);
  if (this.realizada) tarefaHtml.classList.add("marcado");
  containerEl.appendChild(tarefaHtml);
  tarefaHtml.addEventListener("click", marcarFeito);
};

let tarefas = [
  new Tarefa("Comprar leite", "compras", false),
  new Tarefa("Escutar kpop", "lazer", true),
];

const listaTarefas = document.querySelector("#lista-tarefas");
for (let tarefa of tarefas) {
  tarefa.adicionaNaPagina(listaTarefas);
}

function novaTarefa(event) {
  const nome = document.querySelector("#nova-tarefa-nome");
  if (nome.value) {
    const categoria = document.querySelector("#nova-tarefa-categoria");
    const tarefa = new Tarefa(nome.value, categoria.value, false);
    tarefas.push(tarefa);
    tarefa.adicionaNaPagina(listaTarefas);
    nome.value = "";
    categoria.value = "lazer";
    nome.focus();
  } else {
    alert("Sua tarefa precisa de um nome!");
  }
}

document
  .querySelector("#incluir-nova-tarefa")
  .addEventListener("click", novaTarefa);

function marcarFeito(event) {
  event.target.classList.toggle("marcado");
}

function filtrarTarefas(event) {
  let categoria = event.target.value;
  const listaTarefas = document.querySelectorAll("#lista-tarefas li");
  for (let tarefa of listaTarefas) {
    if (!categoria || tarefa.classList.contains(`categoria-${categoria}`)) {
      tarefa.classList.remove("retido-no-filtro");
    } else {
      tarefa.classList.add("retido-no-filtro");
    }
  }
}

document
  .querySelector("#filtro-de-categoria")
  .addEventListener("change", filtrarTarefas);
