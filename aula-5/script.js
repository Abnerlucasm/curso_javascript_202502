// Exercício 01

let produtos = [];
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");


function atualizarLista() {
  lista.innerHTML = "";
  let totalEstoque = 0;

  for (let i = 0; i < produtos.length; i++) {
    const p = produtos[i];
    const item = document.createElement("li");
    item.textContent =
      p.cod + " - " + p.nome + " | R$ " + p.preco.toFixed(2) + " | Estoque: " + p.estoque;

    const btnComprar = document.createElement("button");
    btnComprar.textContent = "Comprar";
    btnComprar.style.marginLeft = "10px";
    btnComprar.style.backgroundColor = "#2e7d32";
    btnComprar.style.color = "white";
    btnComprar.style.border = "none";
    btnComprar.style.padding = "4px 10px";
    btnComprar.style.borderRadius = "5px";
    btnComprar.style.cursor = "pointer";

    btnComprar.onclick = function () {
      comprarProduto(p.cod);
    };

    item.appendChild(btnComprar);
    lista.appendChild(item);

    totalEstoque += p.estoque;
  }

  contador.textContent =
    "Total de produtos: " + produtos.length + " | Total em estoque: " + totalEstoque;
}


fetch("dados.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    produtos = data.produtos; 
    atualizarLista();
  })
  .catch(function (err) {
    console.error("Erro ao carregar JSON:", err);
  });


function adicionarProduto() {
  const cod = document.getElementById("input-cod").value;
  const nome = document.getElementById("input-nome").value;
  const preco = parseFloat(document.getElementById("input-preco").value);
  const estoque = parseInt(document.getElementById("input-qtd").value);

  if (cod && nome && !isNaN(preco) && !isNaN(estoque)) {
    produtos.push({ cod: parseInt(cod), nome: nome, preco: preco, estoque: estoque });
    atualizarLista();

    document.getElementById("input-cod").value = "";
    document.getElementById("input-nome").value = "";
    document.getElementById("input-preco").value = "";
    document.getElementById("input-qtd").value = "";
  } else {
    alert("Preencha todos os campos corretamente!");
  }
}

document.getElementById("btn-add").addEventListener("click", adicionarProduto);


function comprarProduto(cod) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].cod == cod) {
      if (produtos[i].estoque > 0) {
        produtos[i].estoque--;
        alert("Compra realizada: " + produtos[i].nome);
      } else {
        alert("Produto esgotado!");
      }
    }
  }
  atualizarLista();
}




//Exercício 02
const entradaProduto = document.getElementById("input-prod");
const botaoBuscar = document.getElementById("btn-search");
const saida = document.getElementById("out");

botaoBuscar.addEventListener("click", function () {
  const valorDigitado = entradaProduto.value.trim();

  if (!valorDigitado) {
    saida.textContent = "Digite um ID válido!";
    return;
  }

  const id = Number(valorDigitado);
  if (!Number.isInteger(id) || id <= 0) {
    saida.textContent = "Digite um ID inteiro maior que zero.";
    return;
  }


  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(function (resposta) {
      if (!resposta.ok) throw new Error("Produto não encontrado (status " + resposta.status + ")");
      return resposta.json();
    })
    .then(function (produto) {
      // Mostra apenas texto, sem imagem
      saida.textContent =
        "Título: " + produto.title + "\n" +
        "Preço: " + produto.price + "\n" +
        "Categoria: " + produto.category + "\n" +
        "Descrição: " + produto.description;
    })
    .catch(function (erro) {
      saida.textContent = "Erro: " + erro.message;
    });
});
