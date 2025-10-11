const lista = document.getElementById('lista');
const btnApi = document.getElementById('btnApi');
const btnStorage = document.getElementById('btnStorage');
const cartItemsEl = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');
const btnClear = document.getElementById('btnClear');
const btnBuy = document.getElementById('btnBuy');
const btnRestock = document.getElementById('btnRestock');

let cart = {};

const STORAGE_KEY = 'produtos';
const DEFAULT_STOCK = 10; 

const format = v => `R$ ${Number(v).toFixed(2)}`;

function getProdutos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveProdutos(produtos) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

async function carregarAPI() {
  const res = await fetch('https://fakestoreapi.com/products');
  const produtos = await res.json();
  const stored = getProdutos();
  const qtyById = {};
  stored.forEach(p => qtyById[p.id] = p.quantity ?? DEFAULT_STOCK);
  produtos.forEach(p => p.quantity = qtyById[p.id] ?? DEFAULT_STOCK);
  saveProdutos(produtos);
  renderProducts(produtos);
}

function carregarStorage() {
  const produtos = getProdutos();
  if (!produtos.length) {
    lista.innerHTML = '<li style="padding:12px; background:white; border-radius:6px">Nenhum produto salvo no Storage!</li>';
    return;
  }
  renderProducts(produtos);
}

function renderProducts(produtos) {
  lista.innerHTML = produtos.map(p => (
    `<li style="background:white;padding:12px;border-radius:8px;display:flex;gap:12px;align-items:flex-start">
      <img src="${p.image}" alt="${p.title}" style="width:80px;height:80px;object-fit:contain"/>
      <div style="flex:1">
        <h3 style="margin:0 0 6px 0;font-size:16px">${p.title}</h3>
        <p style="margin:0 0 8px 0;font-size:13px;color:#555;max-height:40px;overflow:hidden">${p.description}</p>
        <div style="margin-bottom:6px"><strong>${format(p.price)}</strong></div>
        <div style="margin-bottom:6px">Quantidade: <span data-id="qty-${p.id}">${p.quantity ?? 0}</span></div>
        <div><button class="add" data-id="${p.id}" style="background:#2563eb;color:white;border:none;padding:8px;border-radius:6px;cursor:pointer">Adicionar ao Carrinho</button></div>
      </div>
    </li>`
  )).join('');
  renderCart();
}

function findProduto(id) {
  return getProdutos().find(p => p.id == id);
}

function addToCart(id) {
  const p = findProduto(id);
  if (!p) return alert('Produto não encontrado');
  if ((p.quantity ?? 0) <= 0) return alert('Produto sem estoque');
  cart[id] = (cart[id] || 0) + 1;
  renderCart();
}

function renderCart() {
  const produtos = getProdutos();
  const rows = Object.keys(cart).map(id => {
    const p = produtos.find(x => x.id == id) || { title: 'Produto', price: 0 };
    const qty = cart[id];
    return `<div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0">
      <div style="font-size:13px">${p.title}<div style="font-size:12px;color:#666">${format(p.price)} x ${qty}</div></div>
      <div style="display:flex;gap:6px">
        <button class="cart-minus" data-id="${id}">-</button>
        <button class="cart-plus" data-id="${id}">+</button>
        <button class="cart-remove" data-id="${id}" style="color:#ef4444">Remover</button>
      </div>
    </div>`;
  }).join('');
  cartItemsEl.innerHTML = rows || '<div style="color:#666">Carrinho vazio</div>';
  let total = 0;
  Object.keys(cart).forEach(id => {
    const p = produtos.find(x => x.id == id);
    if (p) total += Number(p.price) * cart[id];
  });
  cartTotalEl.textContent = format(total);
}

lista.addEventListener('click', e => {
  const btn = e.target.closest('button.add');
  if (!btn) return;
  const id = btn.dataset.id;
  addToCart(id);
});

cartItemsEl.addEventListener('click', e => {
  const minus = e.target.closest('button.cart-minus');
  const plus = e.target.closest('button.cart-plus');
  const rem = e.target.closest('button.cart-remove');
  if (minus) {
    const id = minus.dataset.id;
    cart[id] = (cart[id] || 0) - 1;
    if (cart[id] <= 0) delete cart[id];
    renderCart();
  } else if (plus) {
    const id = plus.dataset.id;
    const p = findProduto(id);
    const available = p ? p.quantity : 0;
    if ((cart[id] || 0) < available) cart[id] = (cart[id] || 0) + 1;
    else alert('Quantidade máxima em estoque atingida');
    renderCart();
  } else if (rem) {
    const id = rem.dataset.id;
    delete cart[id];
    renderCart();
  }
});

btnClear.addEventListener('click', () => { cart = {}; renderCart(); });

btnBuy.addEventListener('click', () => {
  if (!Object.keys(cart).length) return alert('Carrinho vazio');
  const produtos = getProdutos();
  for (const id of Object.keys(cart)) {
    const p = produtos.find(x => x.id == id);
    if (!p || (p.quantity ?? 0) < cart[id]) return alert('Estoque insuficiente para alguns itens');
  }
  produtos.forEach(p => {
    if (cart[p.id]) p.quantity = (p.quantity ?? 0) - cart[p.id];
  });
  saveProdutos(produtos);
  cart = {};
  renderProducts(produtos);
  alert('Compra realizada com sucesso!');
});

btnApi.addEventListener('click', carregarAPI);
btnStorage.addEventListener('click', carregarStorage);
btnRestock && btnRestock.addEventListener('click', () => {
  const n = parseInt(prompt('Quantidade de teste para todos os produtos:', String(DEFAULT_STOCK)), 10);
  if (Number.isNaN(n) || n < 0) return alert('Quantidade inválida');
  const produtos = getProdutos();
  produtos.forEach(p => p.quantity = n);
  saveProdutos(produtos);
  renderProducts(produtos);
});

window.addEventListener('DOMContentLoaded', () => {
  if (getProdutos().length) carregarStorage();
  else carregarAPI();
});