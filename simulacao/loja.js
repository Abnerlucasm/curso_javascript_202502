let estoqueProdutos = {};
const estoqueSalvo = localStorage.getItem('estoqueProdutos');
if (estoqueSalvo) {
    estoqueProdutos = JSON.parse(estoqueSalvo);
}

// Carrega e exibe os produtos, separando disponíveis e indisponíveis
async function carregarProdutos() {
    const resposta = await fetch('https://fakestoreapi.com/products');
    const produtos = await resposta.json();
    const container = document.getElementById('produtos');
    container.innerHTML = '';

    const disponiveis = [];
    const indisponiveis = [];
    produtos.forEach(produto => {
        if (estoqueProdutos[produto.id] === undefined) {
            estoqueProdutos[produto.id] = Math.floor(Math.random() * 10) + 1;
        }
        const quantidade = estoqueProdutos[produto.id];
        if (quantidade > 0) {
            disponiveis.push(produto);
        } else {
            indisponiveis.push(produto);
        }
    });

    // Exibe disponíveis primeiro, depois indisponíveis
    [...disponiveis, ...indisponiveis].forEach(produto => {
        const quantidade = estoqueProdutos[produto.id];
        container.innerHTML += `
            <div class="card ${quantidade === 0 ? 'indisponivel' : ''}">
                <img src="${produto.image}" alt="${produto.title}">
                <h3>${produto.title}</h3>
                <p>${produto.description}</p>
                <strong>Preço: R$ ${produto.price.toFixed(2)}</strong>
                <span class="quantidade">Quantidade: ${quantidade}</span>
                <button onclick="adicionarAoCarrinho(${produto.id})" ${quantidade === 0 ? 'disabled' : ''}>
                    ${quantidade === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
                </button>
            </div>
        `;
    });
}

carregarProdutos();

let carrinho = [];

// Adiciona produto ao carrinho e atualiza estoque
function adicionarAoCarrinho(id) {
    if (estoqueProdutos[id] > 0) {
        fetch('https://fakestoreapi.com/products/' + id)
            .then(res => res.json())
            .then(produto => {
                const item = carrinho.find(p => p.id === id);
                if (item) {
                    item.qtd += 1;
                } else {
                    carrinho.push({
                        id: produto.id,
                        nome: produto.title,
                        preco: produto.price,
                        qtd: 1
                    });
                }
                estoqueProdutos[id] -= 1;
                localStorage.setItem('estoqueProdutos', JSON.stringify(estoqueProdutos));
                renderizarCarrinho();
                carregarProdutos();
            });
    }
}

// Exibe o carrinho na tela
function renderizarCarrinho() {
    const lista = document.getElementById('carrinho-lista');
    lista.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
        total += item.preco * item.qtd;
        lista.innerHTML += `
            <li>
                ${item.nome} — ${item.qtd} x R$ ${item.preco.toFixed(2)}
                <button onclick="removerDoCarrinho(${item.id})" style="margin-left:10px;">Remover</button>
            </li>
        `;
    });
    document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2)}`;
    if (carrinho.length === 0) {
        lista.innerHTML = '<li>Seu carrinho está vazio.</li>';
    }
}

// Remove item do carrinho e devolve ao estoque
function removerDoCarrinho(id) {
    const item = carrinho.find(p => p.id === id);
    if (item) {
        estoqueProdutos[id] += item.qtd;
        localStorage.setItem('estoqueProdutos', JSON.stringify(estoqueProdutos));
        carrinho = carrinho.filter(p => p.id !== id);
        renderizarCarrinho();
        carregarProdutos();
    }
}
window.removerDoCarrinho = removerDoCarrinho;

// Finaliza a compra
document.getElementById('finalizar-compra').onclick = function() {
    if (carrinho.length === 0) {
        mostrarMensagem('Seu carrinho está vazio.', false);
        return;
    }
    if (confirm('Tem certeza que deseja finalizar a compra?')) {
        carrinho = [];
        renderizarCarrinho();
        mostrarMensagem('Compra finalizada com sucesso! Obrigado pela preferência.', true);
    }
};

// Exibe mensagens de sucesso/erro
function mostrarMensagem(texto, sucesso = true) {
    const msg = document.getElementById('mensagem');
    msg.innerText = texto;
    msg.style.display = 'block';
    msg.style.background = sucesso ? '#d4edda' : '#f8d7da';
    msg.style.color = sucesso ? '#155724' : '#721c24';
    msg.style.borderColor = sucesso ? '#c3e6cb' : '#f5c6cb';
    setTimeout(() => {
        msg.style.display = 'none';
    }, 3000);
}