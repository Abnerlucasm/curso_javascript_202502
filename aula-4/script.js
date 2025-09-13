// script.js

// --------------------------
// Exercício 1 — Lista de Compras
// --------------------------

let lista = []
let id = 1

const inputItem = document.getElementById("item")
const btnAdd = document.getElementById("add")
const ulLista = document.getElementById("lista")
const contador = document.getElementById("contador")

function renderizarLista() {
  ulLista.innerHTML = "";

  lista.forEach((obj) => {
    const li = document.createElement("li");

    // span para o nome do item
    const spanNome = document.createElement("span");
    spanNome.textContent = obj.nome;
    if (obj.comprado) {
      spanNome.style.textDecoration = "line-through";
      spanNome.style.color = "gray";
    }
    li.appendChild(spanNome);

    // div para os botões
    const divBotoes = document.createElement("div");
    divBotoes.classList.add("botoes");

    // botão "✔️"
    const btnCheck = document.createElement("button");
    btnCheck.textContent = "✔️";
    btnCheck.disabled = obj.comprado;
    btnCheck.onclick = () => {
      obj.comprado = true;
      renderizarLista();
    };
    divBotoes.appendChild(btnCheck);

    // botão "❌"
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "❌";
    btnRemove.onclick = () => {
      lista = lista.filter((el) => el.id !== obj.id);
      renderizarLista();
    };
    divBotoes.appendChild(btnRemove);

    li.appendChild(divBotoes);
    ulLista.appendChild(li);
  });

  atualizarContador();
}

function atualizarContador() {
  const total = lista.length
  const comprados = lista.filter((el) => el.comprado).length
  contador.textContent = `${total} itens • ${comprados} comprados`
}

btnAdd.onclick = () => {
  const nome = inputItem.value.trim()
  if (nome) {
    lista.push({ id: id++, nome, comprado: false })
    inputItem.value = ""
    renderizarLista()
  }
}

// --------------------------
// Exercício 2 — Laboratório de Arrays
// --------------------------

const inputNums = document.getElementById("nums")
const btnCalc = document.getElementById("calc")
const out = document.getElementById("out")

btnCalc.onclick = () => {
  const str = inputNums.value.trim()
  if (!str) {
    out.textContent = "Digite números separados por vírgula."
    return
  }

  const arr = str.split(",").map((n) => Number(n.trim())).filter(n => !isNaN(n))

  const pares = arr.filter((n) => n % 2 === 0)
  const quadrados = arr.map((n) => n * n)
  const maior = Math.max(...arr)
  const menor = Math.min(...arr)

  out.textContent = `
Original: [${arr}]
Somente pares: [${pares}]
Quadrados: [${quadrados}]
Maior: ${maior}
Menor: ${menor}
  `
}
