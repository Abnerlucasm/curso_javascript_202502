const lista = document.getElementById("lista");

    async function carregarAPI() {
      let resposta = await fetch("https://fakestoreapi.com/products");
      let produtos = await resposta.json();

      localStorage.setItem("produtos", JSON.stringify(produtos));

      mostrar(produtos);
    }

    function carregarStorage() {
      let dados = localStorage.getItem("produtos");
      if (dados) {
        mostrar(JSON.parse(dados));
      } else {
        lista.innerHTML = "<li>Nenhum produto salvo no Storage!</li>";
      }
    }

    function mostrar(produtos) {
      lista.innerHTML = "";
      produtos.forEach(p => {
        let li = document.createElement("li");
        li.textContent = `${p.title} - $${p.price}`;
        lista.appendChild(li);
      });
    }