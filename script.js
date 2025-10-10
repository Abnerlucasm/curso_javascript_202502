function listarProdutos() {
    const containerProdutos = document.querySelector('.produto');

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {

            containerProdutos.innerHTML = '';

            data.forEach(produto => {

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

                const botaoCompra = document.createElement('button');

                card.appendChild(imagem);
                card.appendChild(titulo);
                card.appendChild(preco);
                card.appendChild(categoria);

                containerProdutos.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar produtos:', error);
            containerProdutos.innerHTML = '<p>Não foi possível carregar os produtos. Tente novamente mais tarde.</p>';
        });
}