<<<<<<< HEAD
// Exercício 1 — Lista de Compras

let lista = [];
let id = 1;

function renderizarLista() {
    const ul  = document.getElementById("lista");
    ul.innerHTML = "";
    lista.forEach(item => {
        const li = document.createElement("li");
        li.style.textDecoration = item.comprado ? "line-through" : "none";
        li.innerHTML = `
            ${item.nome}
            <button onclick="marcarComprado(${item.id})">${item.comprado ? 'Desmarcar' : 'Comprar'}</button>
            <button onclick="removerItem(${item.id})">Remover</button>
        `;
        ul.appendChild(li);
    });
    atualizarContador();
}
function atualizarContador() {
    const total = lista.length;
    const comprados = lista.filter(item => item.comprado).length;
    document.getElementById("contador").innerText = `Total: ${total} | Comprados: ${comprados}`;
}

document.getElementById('add').onclick = () => {
    const nome = document.getElementById('item').value.trim(); 
    if (nome) {
        lista.push({ id: id++, nome, comprado: false });
        document.getElementById('item').value = '';
        renderizarLista();
    }
};

window.marcarComprado = function(id) {
    const item = lista.find(i => i.id === id);
    if (item) {
        item.comprado = !item.comprado;
        renderizarLista();
    }
};
window.removerItem = function(id) {
    lista = lista.filter(i => i.id !== id);
    renderizarLista();
}

// Exercício 2 — Laboratorio de Arrays

document.getElementById('calc').onclick = () => {
    const nums = document.getElementById('nums').value
        .split(',')
        .map(n => parseFloat(n.trim()))
        .filter(n => !isNaN(n));
    if (nums.length === 0) {
        document.getElementById('out').innerText = "Por favor, insira números válidos.";
        return;
    }   
    const pares = nums.filter(n => n % 2 === 0);
    const quadrados = nums.map(n => n * n);
    const maior = Math.max(...nums);
    const menor = Math.min(...nums);

    document.getElementById('out').innerText =
        `Números: [${nums.join(', ')}]\n` +
        `Pares: [${pares.join(', ')}]\n` +
        `Quadrados: [${quadrados.join(', ')}]\n` +
        `Maior: ${maior}\n` +
        `Menor: ${menor}`;
=======
// Exercício 1

// Array de objetos { id, nome, comprado }
let lista = [];

const inputItem = document.getElementById("item");
const ulLista = document.getElementById("lista");
const contador = document.getElementById("contador");

// Função para renderizar
function render() {
  ulLista.innerHTML = "";
  lista.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.nome + (item.comprado ? " - Comprado" : "");

    // Botão marcar
    const btnCheck = document.createElement("button");
    btnCheck.textContent = "Marcar";
    btnCheck.onclick = () => {
      item.comprado = !item.comprado;
      render();
    };

    // Botão remover
    const btnRemove = document.createElement("button");
    btnRemove.textContent = "Remover";
    btnRemove.onclick = () => {
      lista = lista.filter((i) => i.id !== item.id);
      render();
    };

    li.append(" ", btnCheck, " ", btnRemove);
    ulLista.appendChild(li);
  });

  // Atualizar contador
  const total = lista.length;
  const comprados = lista.filter((i) => i.comprado).length;
  contador.textContent = `${total} itens • ${comprados} comprados`;
}

// Adicionar item
function adicionarItem() {
  const nome = inputItem.value.trim();
  if (!nome) return;
  lista.push({ id: lista.length, nome, comprado: false });
  inputItem.value = "";
  render();
};
 // -------------------------------------------------------------------------------- //

 // Exercício 2

const inputNums = document.getElementById("nums");
const btnCalc = document.getElementById("calc");
const out = document.getElementById("out");

function calcular() {
  const valores = inputNums.value
    .split(",")
    .map((n) => Number(n.trim()))
    .filter((n) => !isNaN(n));

  if (valores.length === 0) {
    out.textContent = "Digite números válidos!";
    return;
  }

  const pares = valores.filter((n) => n % 2 === 0);
  const quadrados = valores.map((n) => n * n);
  const maior = Math.max(...valores);
  const menor = Math.min(...valores);

  out.textContent = `
Array original: [${valores.join(", ")}]
Pares: [${pares.join(", ")}]
Quadrados: [${quadrados.join(", ")}]
Maior valor: ${maior}
Menor valor: ${menor}
  `;
>>>>>>> 0c58d71fb28543c0a14a8eb7bf21556a85819a06
};
