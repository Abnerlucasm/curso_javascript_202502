//Exercício 1: Seu Nome
function exNome() {
    let nomeUsuario = document.getElementById("inputNome").value;
    document.getElementById("saidaNome").innerText = `Seu nome é ${nomeUsuario}`;
}

//Exercício 2: Operações Numéricas
function exOperacoesNumericas() {
    let numeroA = parseFloat (document.getElementById("inputNumeroA").value);
    let numeroB = parseFloat (document.getElementById("inputNumeroB").value);
    let resultado = `Soma: ${numeroA+numeroB}
    \nSubtração: ${numeroA-numeroB}
    \nMultiplicação: ${numeroA*numeroB}
    \nDivisão: ${numeroA/numeroB}`;
    document.getElementById("saidaOperacoes").innerText = resultado;
}

//Exercício 3: Par ou Ímpar
function exParOuImpar() {
    let numero = parseInt(document.getElementById("inputParImpar").value);
    let resultado = (numero % 2 === 0) ? "Par" : "Ímpar";
    document.getElementById("saidaParImpar").innerText = `O número ${numero} é ${resultado}`;
}

//Exercício 4: Verificar Idade
function exVerificaIdade() {
    let idade = parseInt(document.getElementById("inputIdade").value);
    let mensagem = idade >= 18
        ? `Você tem ${idade} anos, portanto é maior de idade.`
        : `Você tem ${idade} anos, portanto é menor de idade.`;
    document.getElementById("saidaIdade").innerText = mensagem;
}

//Exercício 5: Printar números de 1 a 10
function exNumeros1a10() {
    let numeros = [];
    for(let i=1; i<=10; i++) numeros.push(i);
    document.getElementById("saidaNumeros").innerText = numeros.join(", ");
}

//Exercício 6: Lista de Nomes
function exListaNomes() {
    let nomes = document.getElementById("inputNomes").value.split(",").map(n => n.trim());
    
    if (nomes.length > 5) {
        document.getElementById("saidaNomes").innerText = "Erro: Você digitou mais de 5 nomes.";
        return;
    }
    
    if (nomes.length < 5) {
        document.getElementById("saidaNomes").innerText = "Erro: Você digitou menos de 5 nomes.";
        return;
    }
    
    document.getElementById("saidaNomes").innerText = "Nomes: " + nomes.join(", ");
}

//Exercício 7: Função de Soma
function exSoma() {
    let numeroA = parseFloat(document.getElementById("inputSomaA").value);
    let numeroB = parseFloat(document.getElementById("inputSomaB").value);
    function soma(a,b){ return a+b; }
    document.getElementById("saidaSoma").innerText = 'Resultado da soma: ' + soma(numeroA, numeroB);
}

//Exercício 8: Verificar se é positivo ou negativo
function exPositivoOuNegativo() {
    let numero = parseFloat(document.getElementById("inputPosNeg").value);
    let resultado = numero>=0 ? "Positivo" : "Negativo";
    document.getElementById("saidaPosNeg").innerText = 'O número ' + numero + ' é ' + resultado;
}

//Exercício 9: Ver qual o maior número
function exMaiorNumero() {
    let numeroA = parseFloat(document.getElementById("inputMaiorA").value);
    let numeroB = parseFloat(document.getElementById("inputMaiorB").value);

    if (numeroA === numeroB) {
        document.getElementById("saidaMaior").innerText = 'Os números são iguais: ' + numeroA;
        return;
    }
    let maior = (x, y) => (x > y ? x : y);
    document.getElementById("saidaMaior").innerText = 'O maior número é ' + maior(numeroA, numeroB);
}

//Exercício 10: Printar nome, idade e profissão
function exObjetoPessoa() {
    let nome = document.getElementById("inputPessoaNome").value;
    let idade = parseInt(document.getElementById("inputPessoaIdade").value);
    let profissao = document.getElementById("inputPessoaProfissao").value;
    let pessoa = {nome, idade, profissao};
    document.getElementById("saidaPessoa").innerText =
        `Nome: ${pessoa.nome}
        \nIdade: ${pessoa.idade}
        \nProfissão: ${pessoa.profissao}`;
}

//Exercício 11: Lista de Produtos
function exListaProdutos() {
    let texto = document.getElementById("inputProdutos").value;
    let produtos = texto.split(",").map(p=>{
        let [nome, preco] = p.split("-");
        return {nome: nome.trim(), preco: parseFloat(preco)};
    });
    let resultado = "Produtos:\n";
    produtos.forEach(prod => {
        resultado += `Nome: ${prod.nome}, Preço: R$ ${prod.preco.toFixed(2)}\n`;
    });
    document.getElementById("saidaProdutos").innerText = resultado;
}

//Exercício 12: Saudação de Pessoa
function exSaudacaoPessoa() {
    let nome = document.getElementById("inputSaudacaoNome").value;
    let pessoa = {nome, cumprimentar: function(){ return `Bom dia, boa tarde, boa noite.
        \nO meu nome é ${this.nome}`; }};
    document.getElementById("saidaSaudacao").innerText = pessoa.cumprimentar();
}

//Exercício 13: Manipulação de Evento de Botão
function exBotaoClicado() {
    document.getElementById("saidaBotao").innerText = "O botão foi clicado";
}

//Exercício 14: Fetch API
function exFetchAPI() {
       fetch('https://fakestoreapi.com/products')
       .then (res => res.json())
       .then (data => document.getElementById("saidaFetch").innerText = JSON.stringify(data, null, 2))
}

//Exercício 15: Promise com Atraso
  function exPromiseAtraso() {
            new Promise(resolve=>{
                setTimeout(()=>resolve("Hello World 2 segundos atrasado"),2000);
            }).then(msg=>document.getElementById("saidaPromise").textContent = msg);
        }

//Exercício 16: Mostrar Títulos da API
 function exMostrarTitulosAPI() {
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                let titulos = data.map(p=>p.title).join("\n");
                document.getElementById("saidaTitulos").textContent = titulos;
            });
        }

//Exercício 17: Lista de Produtos da API em HTML
    function exListaProdutosHTML() {
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                let html = "<ul>";
                data.forEach(p => html += `<li>${p.title} - R$ ${p.price}</li>`);
                html += "</ul>";
                document.getElementById("saidaListaHTML").innerHTML = html;
            });
        }

//Exercício 18: Atualizar Lista
    function exAtualizarLista() {
        let lista = ["Item 1","Item 2"];
        lista.push("Novo item");
        document.getElementById("saidaAtualizarLista").innerText = "Lista atualizada: " + lista.join(", ");
    }

//Exercício 19: Adicionar Produtos ao Array
 let produtosCarrinho = [];
    function exAdicionarProdutoArray() {
        let nome = document.getElementById("inputProdutoNome").value;            let preco = parseFloat(document.getElementById("inputProdutoPreco").value);
        produtosCarrinho.push({nome, preco});
        let resultado = produtosCarrinho.map(p=>`${p.nome} - R$ ${p.preco.toFixed(2)}`).join("\n");
        document.getElementById("saidaAdicionarProduto").textContent = resultado;
        }

    let carrinho = {produtos: [],
        adicionarProduto: function(produto){ this.produtos.push(produto); this.atualizar(); },
        removerProduto: function(nome){ this.produtos = this.produtos.filter(p=>p.nome!==nome); this.atualizar(); },
        calcularTotal: function(){ return this.produtos.reduce((acc,p)=>acc+p.preco,0); },
        atualizar: function(){ 
            let txt = this.produtos.map(p=>`${p.nome} - R$ ${p.preco.toFixed(2)}`).join("\n");
            txt += `\nTotal: R$ ${this.calcularTotal().toFixed(2)}`;
            document.getElementById("saidaCarrinho").textContent = txt;
        }
    };

//Exercício 20: Carrinho de Compras
    function exCarrinho() {
        let acao = document.getElementById("inputCarrinhoAcao").value.toLowerCase();
        let nome = document.getElementById("inputCarrinhoNome").value;
        let preco = parseFloat(document.getElementById("inputCarrinhoPreco").value);
        if(acao==="adicionar") carrinho.adicionarProduto({nome, preco});
        else if(acao==="remover") carrinho.removerProduto(nome);
        else document.getElementById("saidaCarrinho").textContent = "Ação inválida! Use 'adicionar' ou 'remover'";
    }