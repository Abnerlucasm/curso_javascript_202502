// Exercício 01 — Lista de Produtos
let produtos = [];

const lista = document.getElementById('lista');
const contador = document.getElementById('contador');

const inputCod = document.getElementById('input-cod');
const inputNome = document.getElementById('input-nome');
const inputPreco = document.getElementById('input-preco');
const inputQtd = document.getElementById('input-qtd');
const btnAdd = document.getElementById('btn-add');

// Atualiza lista na tela
function atualizarLista() {
    lista.innerHTML = '';
    for (let i = 0; i < produtos.length; i++) {
        let p = produtos[i];
        let li = document.createElement('li');
        li.textContent = p.cod + ' - ' + p.nome + ' | R$ ' + p.preco.toFixed(2) + ' | Estoque: ' + p.estoque;

        // botão comprar
        let btn = document.createElement('button');
        btn.textContent = 'Comprar';
        btn.style.marginLeft = '10px';
        btn.onclick = function() {
            if (p.estoque > 0) {
                p.estoque = p.estoque - 1;
                alert('Comprou: ' + p.nome);
            } else {
                alert('Sem estoque!');
            }
            atualizarLista();
        };

        li.appendChild(btn);
        lista.appendChild(li);
    }

    // contador
    let total = 0;
    for (let i = 0; i < produtos.length; i++) {
        total += produtos[i].estoque;
    }
    contador.textContent = 'Total de produtos: ' + produtos.length + ' | Estoque total: ' + total;
}

// adiciona produto novo
btnAdd.onclick = function() {
    let cod = inputCod.value;
    let nome = inputNome.value;
    let preco = parseFloat(inputPreco.value);
    let qtd = parseInt(inputQtd.value);

    if (cod && nome && !isNaN(preco) && !isNaN(qtd)) {
        produtos.push({ cod: parseInt(cod), nome: nome, preco: preco, estoque: qtd });
        inputCod.value = '';
        inputNome.value = '';
        inputPreco.value = '';
        inputQtd.value = '';
        atualizarLista();
    }
};

// carrega produtos do JSON
fetch('dados.json')
    .then(resp => resp.json())
    .then(data => {
        produtos = data.produtos.map(p => ({
            cod: p.cod || p.id,
            nome: p.nome,
            preco: p.preco,
            estoque: p.estoque
        }));
        atualizarLista();
    })
    .catch(err => console.log('Erro:', err));


// Exercício 02 — Consulta API
const btnSearch = document.getElementById('btn-search');
const inputProd = document.getElementById('input-prod');
const out = document.getElementById('out');

btnSearch.onclick = function() {
    let id = parseInt(inputProd.value);
    if (!isNaN(id)) {
        fetch('https://fakestoreapi.com/products/' + id)
            .then(res => res.json())
            .then(produto => {
                out.textContent = JSON.stringify(produto, null, 2);
            })
            .catch(err => {
                out.textContent = 'Erro ao buscar produto';
            });
    }
};
