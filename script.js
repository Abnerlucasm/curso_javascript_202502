let listaDeProdutos = [];


function listarProdutos() {
    const containerProdutos = document.querySelector('.produto');

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {

            listaDeProdutos = data;

            containerProdutos.innerHTML = '';

            data.forEach(produto => {

                const chaveEstoque = `estoque_${produto.id}`;
                let estoqueDisponivel = localStorage.getItem(chaveEstoque);

                if (estoqueDisponivel === null) {
                    estoqueDisponivel = 20;
                    localStorage.setItem(chaveEstoque, estoqueDisponivel);
                }

                const card = document.createElement('div');
                card.classList.add('card-produto');

                const imagem = document.createElement('img');
                imagem.src = produto.image;
                imagem.alt = produto.title;

                const titulo = document.createElement('h3');
                titulo.textContent = produto.title;

                const preco = document.createElement('p');
                preco.classList.add('preco');
                preco.textContent = `R$ ${produto.price.toFixed(2)}`;

                const categoria = document.createElement('p');
                categoria.classList.add('categoria');
                categoria.textContent = produto.category;

                const estoqueTexto = document.createElement('p');
                estoqueTexto.id = `estoque-texto_${produto.id}`;
                estoqueTexto.textContent = `Estoque: ${estoqueDisponivel}`;

                const botaoCompra = document.createElement('button');
                botaoCompra.textContent = "Adicionar ao carrinho";

                card.appendChild(imagem);
                card.appendChild(titulo);
                card.appendChild(preco);
                card.appendChild(categoria);
                card.appendChild(botaoCompra);

                containerProdutos.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar produtos:', error);
            containerProdutos.innerHTML = '<p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>';
        });
}

function adicionaCarrinho(produtoId) {
    const chaveEstoque = `estoque_${produtoId}`;
    let estoqueAtual = parseInt(localStorage.getItem(chaveEstoque));

    if (estoqueAtual > 0) {
        estoqueAtual--;
        localStorage.setItem(chaveEstoque, estoqueAtual);

        const estoqueTexto = document.getElementById(`estoque-texto_${produtoId}`);
        if (estoqueTexto) {
            estoqueTexto.textContent = `Estoque: ${estoqueAtual}`;
        }

        const itemNoCarrinho = carrinho.find(item => item.id === produtoId);

        if (itemNoCarrinho) {

            itemNoCarrinho.quantidade++;
        } else {
            const produtoParaAdd = listaDeProdutos.find(p => p.id === produtoId);
            if (produtoParaAdd) {
                carrinho.push({ ...produtoParaAdd, quantidade: 1 });
            }
        }

        atualizarVisualizacaoCarrinho();

    } else {
        alert('Produto esgotado!');
    }

    function atualizarVisualizacaoCarrinho() {
        const containerCarrinho = document.getElementById('carrinho-itens');
        containerCarrinho.innerHTML = '';

        if (carrinho.length === 0) {
            containerCarrinho.innerHTML = '<p>O carrinho está vazio.</p>';
            return;
        }

        carrinho.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'item-carrinho';
            itemDiv.innerHTML = `
            <span>${item.title} (x${item.quantidade})</span>
            <span>R$ ${(item.price * item.quantidade).toFixed(2)}</span>
        `;
            containerCarrinho.appendChild(itemDiv);
        });
    }
}
