// Exercício 1

// Array de objetos { id, nome, comprado }
let lista = [];

const inputItem = document.getElementById("item");
const btnAdd = document.getElementById("add");
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
btnAdd.onclick = () => {
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

btnCalc.onclick = () => {
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
};
