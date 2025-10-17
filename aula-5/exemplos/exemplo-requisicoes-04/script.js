let produtos = []; // aqui ficam os produtos carregados

// --- Carregar produtos do JSON para o array ---
function listarProdutos() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "dados.json", true);
    xhr.onload = function () {
        if (xhr.status === 200) {
            produtos = JSON.parse(xhr.responseText);  // guarda em variável
            renderizar();
        }
    };
    xhr.send();
}

// --- Renderizar lista na tela ---
function renderizar() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";
    produtos.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `ID: ${p.id} | ${p.nome} | R$${p.preco} | Estoque: ${p.estoque}`;
        lista.appendChild(li);
    });
}

// --- Adicionar novo produto ---
function adicionarProduto() {
    const novo = { id: 11, nome: "Webcam HD", preco: 200, estoque: 9 };
    produtos.push(novo);
    renderizar();
}