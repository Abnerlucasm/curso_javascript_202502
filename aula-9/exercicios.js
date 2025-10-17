// aula 1
function exNome() {
    let nomeUsuario = document.getElementById("inputNome").value;
    document.getElementById("saidaNome").textContent = `Olá, ${nomeUsuario}!`;
}

function exOperacoesNumericas() {
    let numeroA = parseFloat(document.getElementById("inputNumeroA").value);
    let numeroB = parseFloat(document.getElementById("inputNumeroB").value);
    let resultado = `Soma: ${numeroA + numeroB}, \nSubtração: ${numeroA - numeroB}, \nMultiplicação: ${numeroA * numeroB}, \nDivisão: ${numeroA / numeroB}`;
    document.getElementById("saidaOperacoes").textContent = resultado;
}

function exParOuImpar() {
    let numero = parseInt(document.getElementById("inputParImpar").value);
    let resultado = (numero % 2 === 0) ? "Par." : "Ímpar.";
    document.getElementById("saidaParImpar").textContent = `O numero ${numero} e: ${resultado}`;
}

// aula 2
function exVerificaIdade() {
    let idade = document.getElementById("inputIdade").value;
    let resultado = (idade >= 18) ? "Maior de idade." : "Menor de idade.";
    document.getElementById("saidaIdade").textContent = `A pessoa e: ${resultado}`;
}

function exNumeros1a10() {
    let numeros = [];
    for (let i = 1; i <= 10; i++) numeros.push(i);
    document.getElementById("saidaNumeros").textContent = `Números de 1 a 10: ${numeros.join(", ")}`;       
}

function exListaNomes() {
    let nomes = document.getElementById("inputNomes").value.split(",");
    document.getElementById("saidaNomes").textContent = `Nomes informados: ${nomes.map(nome => nome.trim()).join(", ")}`;
}

//aula 3
function exSoma() {
    let numeroA = parseFloat(document.getElementById("inputSomaA").value);
    let numeroB = parseFloat(document.getElementById("inputSomaB").value);
    let resultado = numeroA + numeroB;
    document.getElementById("saidaSoma").textContent = `A soma de ${numeroA} e ${numeroB} é: ${resultado}`;
}

function exPositivoOuNegativo() {
    let numero = parseFloat(document.getElementById("inputPosNeg").value);
    let resultado = (numero >= 0) ? "Positivo." : "Negativo.";
    document.getElementById("saidaPosNeg").textContent = `O numero ${numero} e: ${resultado}`;
}

function exMaiorNumero() {
    let numeroA = parseFloat(document.getElementById("inputMaiorA").value);
    let numeroB = parseFloat(document.getElementById("inputMaiorB").value);
    let maior = (numeroA > numeroB) ? numeroA : numeroB;
    document.getElementById("saidaMaior").textContent = `O maior numero entre ${numeroA} e ${numeroB} e: ${maior}`;
}

// aula 4
function exObjetoPessoa() {
    let nome = document.getElementById("inputPessoaNome").value;
    let idade = parseInt(document.getElementById("inputPessoaIdade").value);
    let profissao = document.getElementById("inputPessoaProfissao").value;
    let pessoa = { nome, idade, profissao };
    document.getElementById("saidaPessoa").textContent =
                `Nome: ${pessoa.nome}\nIdade: ${pessoa.idade}\nProfissão: ${pessoa.profissao}`;
    }

