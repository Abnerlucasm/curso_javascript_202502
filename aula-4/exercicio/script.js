<<<<<<< HEAD
let listaDeCompras = [];
let id =1;

const input = document.getElementById('item');
const btnAdd = document.getElementById('adicionar');
const ul = document.getElementById('lista-de-compras');
const contador = document.getElementById('contador'); 

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
        contador.textContent = `${total} itens • ${comprados} comprados`;

        //Enter adiciona item
        iput.addEventListener('keydown', e =>{
            if(e.key === 'Enter') btnAdd.click();
        });

        //Inicializa
        render();
        
    
    })
}
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
};
>>>>>>> 14dd61529e4f347775645cac9f47aaed5aec8764
