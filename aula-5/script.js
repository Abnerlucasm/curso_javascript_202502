// --- Lista de Produtos ---
// Já começamos com alguns produtos (sem precisar do dados.json)
let produtos = [
  { cod: "001", nome: "Cabo de Cobre", preco: 15.5, qtd: 10 },
  { cod: "002", nome: "Tomada", preco: 25.0, qtd: 5 },
  { cod: "003", nome: "Interruptor", preco: 10.0, qtd: 8 }
];

// Pegando os elementos do HTML
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");
const btnAdd = document.getElementById("btn-add");

// Função para mostrar os produtos na tela
function mostrarProdutos() {
  lista.innerHTML = ""; // limpa a lista

  let totalEstoque = 0;

  produtos.forEach((p) => {
    totalEstoque += p.qtd;

    let item = document.createElement("li");
    item.textContent = `${p.cod} — ${p.nome} — R$${p.preco} — Estoque: ${p.qtd}`;

    // botão de comprar
    let btn = document.createElement("button");
    btn.textContent = "Comprar";
    btn.style.marginLeft = "10px";
    btn.onclick = () => comprar(p.cod);

    item.appendChild(btn);
    lista.appendChild(item);
  });

  contador.textContent = `Produtos: ${produtos.length} | Total no estoque: ${totalEstoque}`;
}

// Adicionar novo produto
btnAdd.addEventListener("click", () => {
  let cod = document.getElementById("input-cod").value;
  let nome = document.getElementById("input-nome").value;
  let preco = Number(document.getElementById("input-preco").value);
  let qtd = Number(document.getElementById("input-qtd").value);

  if (!cod || !nome || !preco || !qtd) {
    alert("Preencha tudo certinho!");
    return;
  }

  produtos.push({ cod, nome, preco, qtd });
  mostrarProdutos();

  // limpar campos
  document.getElementById("input-cod").value = "";
  document.getElementById("input-nome").value = "";
  document.getElementById("input-preco").value = "";
  document.getElementById("input-qtd").value = "";
});

// Comprar produto (diminui o estoque)
function comprar(cod) {
  let p = produtos.find((x) => x.cod === cod);
  if (p && p.qtd > 0) {
    p.qtd--;
    mostrarProdutos();
  } else {
    alert("Acabou o estoque!");
  }
}

// --- Consulta API ---
// aqui usamos a API fakestore
const btnSearch = document.getElementById("btn-search");
const inputProd = document.getElementById("input-prod");
const out = document.getElementById("out");

btnSearch.addEventListener("click", async () => {
  let id = inputProd.value;
  if (!id) {
    alert("Digite o ID do produto!");
    return;
  }

  try {
    let resposta = await fetch(`https://fakestoreapi.com/products/${id}`);
    let produto = await resposta.json();
    out.textContent = JSON.stringify(produto, null, 2);
  } catch (e) {
    out.textContent = "Erro na consulta";
  }
});

// Mostrar os produtos iniciais
mostrarProdutos();
