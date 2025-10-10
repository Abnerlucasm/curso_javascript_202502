
const API_BASE = 'https://fakestoreapi.com/products';


let estoqueProdutos = {};


const produtosCache = new Map();


let carrinho = [];


async function carregarProdutos() {
    try {
        const res = await fetch(API_BASE);
        const produtos = await res.json();

        
        produtos.forEach(p => {
            if (!produtosCache.has(p.id)) produtosCache.set(p.id, p);
            if (estoqueProdutos[p.id] === undefined) {
                estoqueProdutos[p.id] = Math.floor(Math.random() * 10) + 1;
            }
        });

        const container = document.getElementById('produtos');
        container.innerHTML = '';

        produtos.forEach(produto => {
            const quantidade = estoqueProdutos[produto.id];
            container.innerHTML += `
                <div class="card">
                    <img src="${produto.image}" alt="${escapeHtml(produto.title)}">
                    <h3>${escapeHtml(produto.title)}</h3>
                    <p>${escapeHtml(produto.description)}</p>
                    <strong>Preço: R$ ${produto.price.toFixed(2)}</strong><br>
                    <span>Quantidade: ${quantidade}</span><br>
                    <button onclick="adicionarAoCarrinho(${produto.id})" ${quantidade === 0 ? 'disabled' : ''}>
                        ${quantidade === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
                    </button>
                </div>
            `;
        });
    } catch (err) {
        console.error('Erro ao carregar produtos:', err);
    }
}


async function adicionarAoCarrinho(id) {
    try {
        if (!estoqueProdutos[id] || estoqueProdutos[id] <= 0) return;

      
        let produto = produtosCache.get(id);
        if (!produto) {
            const res = await fetch(`${API_BASE}/${id}`);
            produto = await res.json();
            produtosCache.set(produto.id, produto);
            if (estoqueProdutos[produto.id] === undefined) {
                estoqueProdutos[produto.id] = Math.floor(Math.random() * 10) + 1;
            }
        }

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
        renderizarCarrinho();
        carregarProdutos();
    } catch (err) {
        console.error('Erro ao adicionar ao carrinho:', err);
    }
}


function renderizarCarrinho() {
    const lista = document.getElementById('carrinho-lista');
    lista.innerHTML = '';
    let total = 0;
    if (carrinho.length === 0) {
        lista.innerHTML = '<li>Seu carrinho está vazio.</li>';
        document.getElementById('total').innerText = `Total: R$ 0,00`;
        return;
    }

    carrinho.forEach(item => {
        total += item.preco * item.qtd;
        lista.innerHTML += `<li>${escapeHtml(item.nome)} — ${item.qtd} x R$ ${item.preco.toFixed(2)}</li>`;
    });

    document.getElementById('total').innerText = `Total: R$ ${total.toFixed(2)}`;
}


document.getElementById('finalizar-compra').onclick = function () {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    if (confirm('Tem certeza que deseja finalizar a compra?')) {
        carrinho = [];
        renderizarCarrinho();
        alert('Compra finalizada com sucesso!');
    }
};


function removerDoCarrinho(id) {
    const item = carrinho.find(p => p.id === id);
    if (!item) return;
    
    estoqueProdutos[id] = (estoqueProdutos[id] || 0) + item.qtd;
    
    carrinho = carrinho.filter(p => p.id !== id);
    renderizarCarrinho();
    carregarProdutos();
}


function escapeHtml(text) {
    if (!text) return '';
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}


carregarProdutos();
