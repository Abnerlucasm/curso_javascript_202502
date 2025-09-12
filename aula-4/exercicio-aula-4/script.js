/* --- EXERCÍCIO 1 — LISTA DE COMPRAS --- */
const itemInput = document.getElementById('item');
const addButton = document.getElementById('add');
const listaUl = document.getElementById('lista');
const contadorP = document.getElementById('contador');

const listaDeCompras = [];

function renderizarLista() {
  listaUl.innerHTML = '';

  listaDeCompras.forEach(item => {
    const li = document.createElement('li');
    li.style.textDecoration = item.comprado ? 'line-through' : 'none';

    const span = document.createElement('span');
    span.textContent = item.nome;

    const comprarButton = document.createElement('button');
    comprarButton.textContent = item.comprado ? 'Desmarcar' : 'Comprar';
    comprarButton.onclick = () => marcarComprado(item.id);

    const removerButton = document.createElement('button');
    removerButton.textContent = 'Remover';
    removerButton.onclick = () => removerItem(item.id);

    li.appendChild(span);
    li.appendChild(comprarButton);
    li.appendChild(removerButton);
    listaUl.appendChild(li);
  });

  const totalItens = listaDeCompras.length;
  const itensComprados = listaDeCompras.filter(item => item.comprado).length;
  contadorP.textContent = `${totalItens} itens • ${itensComprados} comprados.`;
}

function adicionarItem() {
  const nomeItem = itemInput.value.trim();
  if (nomeItem !== '') {
    const novoItem = {
      id: Date.now(),
      nome: nomeItem,
      comprado: false
    };
    listaDeCompras.push(novoItem);
    itemInput.value = '';
    renderizarLista();
  }
}

function marcarComprado(id) {
  const item = listaDeCompras.find(i => i.id === id);
  if (item) {
    item.comprado = !item.comprado;
    renderizarLista();
  }
}

function removerItem(id) {
  const index = listaDeCompras.findIndex(i => i.id === id);
  if (index !== -1) {
    listaDeCompras.splice(index, 1);
    renderizarLista();
  }
}

addButton.addEventListener('click', adicionarItem);
itemInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    adicionarItem();
  }
});


/* --- EXERCÍCIO 2 — LABORATÓRIO DE ARRAYS --- */
const numsInput = document.getElementById('nums');
const calcButton = document.getElementById('calc');
const outPre = document.getElementById('out');

function calcularEstatisticas() {
  const numerosTexto = numsInput.value.trim();
  const numerosArray = numerosTexto.split(',').map(num => Number(num.trim()));

  if (numerosArray.some(isNaN) || numerosTexto === '') {
    outPre.textContent = 'Por favor, insira apenas números separados por vírgula.';
    return;
  }
  
  const pares = numerosArray.filter(num => num % 2 === 0);
  const quadrados = numerosArray.map(num => num * num);
  const maior = Math.max(...numerosArray);
  const menor = Math.min(...numerosArray);

  outPre.textContent = `
    Array Original: [${numerosArray.join(', ')}]
    Somente Pares: [${pares.join(', ')}]
    Números ao Quadrado: [${quadrados.join(', ')}]
    Maior Valor: ${maior}
    Menor Valor: ${menor}
  `;
}

calcButton.addEventListener('click', calcularEstatisticas);