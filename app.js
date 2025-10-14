const produtosEl = document.getElementById('produtos');
const itensCarrinho = document.getElementById('itensCarrinho');
const totalCarrinho = document.getElementById('totalCarrinho');

let produtos = [];
let carrinho = [];

async function carregarProdutos() {
  produtosEl.innerHTML = '<p>Carregando...</p>';
  const resposta = await fetch('https://fakestoreapi.com/products');
  produtos = await resposta.json();
  mostrarProdutos(produtos);
}

function mostrarProdutos(lista) {
  produtosEl.innerHTML = '';
  lista.forEach(p => {
    const div = document.createElement('div');
    div.classList.add('produto');
    div.innerHTML = `
      <img src="${p.image}" width="100">
      <h3>${p.title}</h3>
      <p>Preço: R$ ${p.price.toFixed(2)}</p>
      <button onclick="adicionar(${p.id})">Adicionar ao carrinho</button>
    `;
    produtosEl.appendChild(div);
  });
}

function adicionar(id) {
  const produto = produtos.find(p => p.id === id);
  const item = carrinho.find(i => i.id === id);
  if (item) item.qtd++;
  else carrinho.push({ ...produto, qtd: 1 });
  atualizarCarrinho();
}

function atualizarCarrinho() {
  itensCarrinho.innerHTML = '';
  let total = 0;

  carrinho.forEach(i => {
    total += i.price * i.qtd;
    const li = document.createElement('li');
    li.textContent = `${i.title} x${i.qtd} - R$ ${(i.price * i.qtd).toFixed(2)}`;
    itensCarrinho.appendChild(li);
  });

  totalCarrinho.textContent = `Total: R$ ${total.toFixed(2)}`;
}

document.getElementById('btnFiltro').onclick = () => {
  const nome = document.getElementById('search').value.toLowerCase();
  const min = parseFloat(document.getElementById('precoMinimo').value) || 0;
  const max = parseFloat(document.getElementById('precoMaximo').value) || Infinity;

  const filtrados = produtos.filter(p =>
    p.title.toLowerCase().includes(nome) &&
    p.price >= min && p.price <= max
  );

  mostrarProdutos(filtrados);
};

document.getElementById('finalizar').onclick = () => {
  if (carrinho.length === 0) return alert('Carrinho vazio!');
  alert('Compra finalizada!');
  carrinho = [];
  atualizarCarrinho();
};

carregarProdutos();
