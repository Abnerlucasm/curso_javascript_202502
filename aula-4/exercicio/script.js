
let listaDeCompras = [];
let id =1;

const input = document.getElementById('item');
const btnAdd = document.getElementById('adicionar');
const ul = document.getElementById('lista-de-compras');
const contador1 = document.getElementById('contador'); 

btnAdd.addEventListener('click', () =>{
    const nome = input.value.trim();
    if(nome){
        lista.push({id: id++, nome, comprado: false});
        input.value = '';
        render();
    } 
})

//renderizar lista
function render(){
    ul.innerHTML = '';
    lista.forEach(item =>{
        const li = document.createElement('li');
        li.style.textDecoration = item.comprado ? 'line-through' : '';
        li.textContent = item.nome + '';

        const btnCheck = document.createElement('button');
        btnCheck.textContent = item.comprado ? 'Desmarcar': 'Comprar';
        btnCheck.onClick = () => {
            item.comprado = !item.comprado;
            render();
        };
        li.appendChild(btnCheck);

        //botão remover
        const btnDel = document.createElement('button');
        btnDel.onClick = () => {
            lista = lista.filter(i => i.id !== item.id);
            render
        };
        li.appendChild(btnDel);

        ul.appendChild(li);

        //Atuliza contador 
        const total = lista.length
        const comprado = lista.filter(i => i.comprado).length
        contador1.textContent = `${total} itens • ${comprados} comprados`;

        //Enter adiciona item
        iput.addEventListener('keydown', e =>{
            if(e.key === 'Enter') btnAdd.click();
        });

        //Inicializa
        render();
        
    
    })
}
// Exercício 1

// Array de objetos { id, nome, comprado }
let lista = [];

const inputItem = document.getElementById("item");
const ulLista = document.getElementById("lista");
const contador = document.getElementById("contador");

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
