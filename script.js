const produtosContainer = document.getElementById("produtos");
const carrinhoContainer = document.getElementById("carrinho");
const comprarBtn = document.getElementById("comprarBtn");

let produtos = [];
let carrinho = [];

// Buscar produtos da API
async function carregarProdutos() {
  const resposta = await fetch("https://fakestoreapi.com/products");
  const dados = await resposta.json();

  produtos = dados.map(p => ({ ...p, quantidade: 10 }));

  mostrarProdutos();
}

function mostrarProdutos() {
  produtosContainer.innerHTML = "";

  produtos.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h3>${p.title}</h3>
      <p><strong>Preço:</strong> R$ ${p.price.toFixed(2)}</p>
      <p><strong>Qtd:</strong> ${p.quantidade}</p>
      <button ${p.quantidade === 0 ? "disabled" : ""}>
        ${p.quantidade === 0 ? "Indisponível" : "Adicionar ao Carrinho"}
      </button>
    `;

    const btn = card.querySelector("button");
    btn.addEventListener("click", () => adicionarAoCarrinho(p.id));

    produtosContainer.appendChild(card);
  });
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto || produto.quantidade <= 0) return;

  const item = carrinho.find(i => i.id === id);
  if (item) {
    item.qtd += 1;
  } else {
    carrinho.push({ id: produto.id, nome: produto.title, preco: produto.price, qtd: 1 });
  }

  atualizarCarrinho();
}

// Atualizar lista do carrinho
function atualizarCarrinho() {
  carrinhoContainer.innerHTML = "";

  if (carrinho.length === 0) {
    carrinhoContainer.innerHTML = "<p>O carrinho está vazio.</p>";
    return;
  }

  carrinho.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.nome} — ${item.qtd}x (R$ ${(item.preco * item.qtd).toFixed(2)})`;
    carrinhoContainer.appendChild(li);
  });
}

// Comprar e reduzir quantidades
comprarBtn.addEventListener("click", () => {
  carrinho.forEach(item => {
    const produto = produtos.find(p => p.id === item.id);
    if (produto) {
      produto.quantidade = Math.max(produto.quantidade - item.qtd, 0);
    }
  });

  carrinho = [];
  atualizarCarrinho();
  mostrarProdutos();

  alert("Compra realizada com sucesso!");
});

// Iniciar
carregarProdutos();
