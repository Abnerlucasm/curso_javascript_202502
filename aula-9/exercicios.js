//-----------------------------------------------------------------------------

        function exNome() {
            let nomeUsuario = document.getElementById("inputNome").value;
            document.getElementById("saidaNome").textContent = `Olá, ${nomeUsuario}!`;
        }

        function exOperacoesNumericas() {
            let numeroA = parseFloat(document.getElementById("inputNumeroA").value);
            let numeroB = parseFloat(document.getElementById("inputNumeroB").value);
            let resultado = `Soma: ${numeroA+numeroB}\nSubtração: ${numeroA-numeroB}\nMultiplicação: ${numeroA*numeroB}\nDivisão: ${numeroA/numeroB}`;
            document.getElementById("saidaOperacoes").textContent = resultado;
        }

        function exParOuImpar() {
            let numero = parseInt(document.getElementById("inputParImpar").value);
            let resultado = (numero % 2 === 0) ? "Par" : "Ímpar";
            document.getElementById("saidaParImpar").textContent = `O número ${numero} é ${resultado}`;
        }

//-----------------------------------------------------------------------------

        function exVerificaIdade() {
            let idade = parseInt(document.getElementById("inputIdade").value);
            let mensagem = idade >= 18 ? "Maior de idade" : "Menor de idade";
            document.getElementById("saidaIdade").textContent = mensagem;
        }

        function exNumeros1a10() {
            let numeros = [];
            for(let i=1; i<=10; i++) numeros.push(i);
            document.getElementById("saidaNumeros").textContent = numeros.join(", ");
        }

        function exListaNomes() {
            let nomes = document.getElementById("inputNomes").value.split(",");
            document.getElementById("saidaNomes").textContent = nomes.map(n => n.trim()).join(", ");
        }

//-----------------------------------------------------------------------------

        function exSoma() {
            let numeroA = parseFloat(document.getElementById("inputSomaA").value);
            let numeroB = parseFloat(document.getElementById("inputSomaB").value);
            function soma(a,b){ return a+b; }
            document.getElementById("saidaSoma").textContent = `Resultado: ${soma(numeroA, numeroB)}`;
        }

        function exPositivoOuNegativo() {
            let numero = parseFloat(document.getElementById("inputPosNeg").value);
            let resultado = numero >=0 ? "Positivo" : "Negativo";
            document.getElementById("saidaPosNeg").textContent = `O número ${numero} é ${resultado}`;
        }

        function exMaiorNumero() {
            let numeroA = parseFloat(document.getElementById("inputMaiorA").value);
            let numeroB = parseFloat(document.getElementById("inputMaiorB").value);
            const maior = (x,y) => (x>y)?x:y;
            document.getElementById("saidaMaior").textContent = `O maior número é ${maior(numeroA, numeroB)}`;
        }

//-----------------------------------------------------------------------------

        function exObjetoPessoa() {
            let nome = document.getElementById("inputPessoaNome").value;
            let idade = parseInt(document.getElementById("inputPessoaIdade").value);
            let profissao = document.getElementById("inputPessoaProfissao").value;
            let pessoa = {nome, idade, profissao};
            document.getElementById("saidaPessoa").textContent =
                `Nome: ${pessoa.nome}\nIdade: ${pessoa.idade}\nProfissão: ${pessoa.profissao}`;
        }

        function exListaProdutos() {
            let texto = document.getElementById("inputProdutos").value;
            let produtos = texto.split(",").map(p=>{
                let [nome, preco] = p.split("-");
                return {nome: nome.trim(), preco: parseFloat(preco)};
            });
            let resultado = produtos.map(p => `${p.nome} - R$ ${p.preco.toFixed(2)}`).join("\n");
            document.getElementById("saidaProdutos").textContent = resultado;
        }

        function exSaudacaoPessoa() {
            let nome = document.getElementById("inputSaudacaoNome").value;
            let pessoa = {nome, cumprimentar: function(){ return `Olá, meu nome é ${this.nome}`; }};
            document.getElementById("saidaSaudacao").textContent = pessoa.cumprimentar();
        }

//-----------------------------------------------------------------------------

        function exBotaoClicado() {
            document.getElementById("saidaBotao").textContent = "Botão clicado!";
        }

        function exFetchAPI() {
            fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(data => document.getElementById("saidaFetch").textContent = JSON.stringify(data,null,2));
        }

        function exPromiseAtraso() {
            new Promise(resolve=>{
                setTimeout(()=>resolve("Olá mundo após 2 segundos!"),2000);
            }).then(msg=>document.getElementById("saidaPromise").textContent = msg);
        }

//-----------------------------------------------------------------------------

        function exMostrarTitulosAPI() {
            fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
                let titulos = data.map(p=>p.title).join("\n");
                document.getElementById("saidaTitulos").textContent = titulos;
            });
        }

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

        function exAtualizarLista() {
            let lista = ["Item 1","Item 2"];
            lista.push("Novo item");
            document.getElementById("saidaAtualizarLista").textContent = "Lista atualizada: " + lista.join(", ");
        }


//-----------------------------------------------------------------------------


        let produtosCarrinho = [];
        function exAdicionarProdutoArray() {
            let nome = document.getElementById("inputProdutoNome").value;
            let preco = parseFloat(document.getElementById("inputProdutoPreco").value);
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

        function exCarrinho() {
            let acao = document.getElementById("inputCarrinhoAcao").value.toLowerCase();
            let nome = document.getElementById("inputCarrinhoNome").value;
            let preco = parseFloat(document.getElementById("inputCarrinhoPreco").value);

            if(acao==="adicionar") carrinho.adicionarProduto({nome, preco});
            else if(acao==="remover") carrinho.removerProduto(nome);
            else document.getElementById("saidaCarrinho").textContent = "Ação inválida! Use 'adicionar' ou 'remover'";
        }