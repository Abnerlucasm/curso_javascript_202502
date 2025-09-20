const lista = [];

function adicionaItem(){
    const item = document.getElementById("item").value;
    if (item) {
        const newItem = {
            id: lista.length,
            nome: item,
            comprado: false,
        };
        lista.push(newItem);
        renderizarLista();
    }
    else{
        alert("Preencha os campos")
    }
}

const listaHtml = document.getElementById("lista");

function renderizarLista() {
    listaHtml.innerHTML = "";

    let comprados = 0;

    lista.forEach((item, index) => {
        if (item.comprado) comprados ++;
        const li = document.createElement("li");
        const texto = document.createTextNode(`Id: ${item.id} Nome: ${item.nome}, Comprado: ${item.comprado ? "Sim" : "Não"} `);
        li.appendChild(texto);

        const btnComprar = document.createElement("button");
        btnComprar.textContent = "Comprar";
        btnComprar.addEventListener("click", () => {
            item.comprado = true;
            renderizarLista();
        });
        li.appendChild(btnComprar);

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.addEventListener("click", () => {
            lista.splice(index, 1);
            renderizarLista();
        });
        li.appendChild(btnRemover);

        listaHtml.appendChild(li);

        const contador = document.getElementById("contador");
        contador.textContent = `${lista.length} itens • ${comprados} comprados`;
    });
}

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
};
