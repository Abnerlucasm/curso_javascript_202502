const API_URL = 'https://fakestoreapi.com/products';
const produtosContainer = document.getElementById('produtos-container');
const carrinhoLista = document.getElementById('carrinho-lista');
const totalEL = document.getElementById('total');
const comprarBtn = document.getElementById('comprar-btn');

let produtos = [];
let carrinho = [];

function carregarProdutos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(data => {
      produtos = data;
      renderizarProdutos();
    });
}

function renderizarProdutos(){
  produtosContainer.innerHTML = '';
  produtos.forEach(produto => {
    const card = document.createElement('div');
    card.className = 'produto-card';
    card.innerHTML = `
    <h3>${produto.title}</h3>
    <img src="${produto.image}" width="100"/>
    <p>${produto.description}</p>
    <p>Preço: R$ :${produto.price.toFixed(2)}</p>
    <p>Categoria: ${produto.category}</p>
    <button onclick="adicionarAoCarrinho(${produto.id})">Adicionar ao Carrinho</button>`;
    produtosContainer.appendChild(card)
  });
}

function adicionarAoCarrinho(id){
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;

  const itemExitente = carrinho.find(item => item.id === id);
  if (itemExitente)
    itemExitente.quantidade += 1;
  else
    carrinho.push({ ...produto, quantidade: 1});
  atualizarCarrinho();
  
}

function atualizarCarrinho(){
  carrinho.innerHTML = '';
  carrinhoLista.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const subtotal = item.price * item.quantidade
    total += subtotal;

    const li = document.createElement('li');
    li.textContent = `${item.title} - Quantidade: ${item.quantidade} - SubTotal R$ ${item.price}`;
    carrinhoLista.appendChild(li)
  });
  totalEL.textContent = `Total: R$ ${total.toFixed(2)}`;
}


function finalizarCompra(){
  if (carrinho.length === 0) return alert('Carrinho vazio!');
  
  carrinho = []
  atualizarCarrinho();
  renderizarProdutos();
  alert('Compra realizada com suscesso!')
}

carregarProdutos();