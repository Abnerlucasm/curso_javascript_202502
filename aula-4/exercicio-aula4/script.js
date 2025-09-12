const inputItem = document.getElementById("item");
const btnAdd = document.getElementById("add");
const listaUl = document.getElementById("lista");
const contadorP = document.getElementById("contador");

let lista = []; // array de objetos {id, nome, comprado}


function renderLista() {
  listaUl.innerHTML = "";

  lista.forEach((obj) => {
    const li = document.createElement("li");
    li.textContent = obj.nome + (obj.comprado ? " ✅" : "");

    const btnCheck = document.createElement("button");
    btnCheck.textContent = obj.comprado ? "Desmarcar" : "Comprar";
    btnCheck.onclick = () => {
      obj.comprado = !obj.comprado;
      renderLista();
    };

    const btnDel = document.createElement("button");
    btnDel.textContent = "Remover";
    btnDel.onclick = () => {
      lista = lista.filter((i) => i.id !== obj.id);
      renderLista();
    };

    li.append(" ", btnCheck, " ", btnDel);
    listaUl.appendChild(li);
  });


  const total = lista.length;
  const comprados = lista.filter((i) => i.comprado).length;
  contadorP.textContent = `${total} itens • ${comprados} comprados`;
}

btnAdd.addEventListener("click", () => {
  const nome = inputItem.value.trim();
  if (nome === "") return;
  const novo = { id: Date.now(), nome, comprado: false };
  lista.push(novo);
  inputItem.value = "";
  renderLista();
});


const inputNums = document.getElementById("nums");
const btnCalc = document.getElementById("calc");
const outPre = document.getElementById("out");

btnCalc.addEventListener("click", () => {
  const valores = inputNums.value
    .split(",")
    .map((x) => Number(x.trim()))
    .filter((n) => !isNaN(n));

  if (valores.length === 0) {
    outPre.textContent = "Digite ao menos um número válido!";
    return;
  }

  const pares = valores.filter((n) => n % 2 === 0);
  const quadrados = valores.map((n) => n * n);
  const maior = Math.max(...valores);
  const menor = Math.min(...valores);

  outPre.textContent = `
Array original: [${valores.join(", ")}]
Pares: [${pares.join(", ")}]
Quadrados: [${quadrados.join(", ")}]
Maior: ${maior}
Menor: ${menor}
  `;
});