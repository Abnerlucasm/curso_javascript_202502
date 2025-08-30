// Exercício 1 - Função para operações matemáticas
function calcularOperacao() {
    let valor1 = parseFloat(document.getElementById("valor1").value);
    let valor2 = parseFloat(document.getElementById("valor2").value);
    let operacao = document.getElementById("operacao").value;
    let resultado;

    switch (operacao) {
        case "soma":
            resultado = valor1 + valor2;
            break;
        case "substracao":
            resultado = valor1 - valor2;
            break;
        case "multiplicacao":
            resultado = valor1 * valor2;
            break;
        case "divisao":
            resultado = valor2 !== 0 ? valor1 / valor2 : "Erro: divisão por zero!";
            break;
        default:
            resultado = "Operação inválida!";
    }

    document.getElementById("resultado1").innerText = "Resultado: " + resultado;
}

// Exercício 2 - Arrow Function para verificar palíndromo
const verificarPalindromo = () => {
    let palavra = document.getElementById("palavra").value.toLowerCase();
    let invertida = palavra.split("").reverse().join("");
    let resultado = document.getElementById("resultado2");

    if (palavra === invertida && palavra !== "") {
        resultado.innerText = "É um palíndromo!";
        resultado.style.color = "green";
    } else {
        resultado.innerText = "Não é um palíndromo!";
        resultado.style.color = "red";
    }
};

// Exercício 3 - Função para calcular média
function calcularMedia() {
    let n1 = parseFloat(document.getElementById("nota1").value);
    let n2 = parseFloat(document.getElementById("nota2").value);
    let n3 = parseFloat(document.getElementById("nota3").value);

    let media = (n1 + n2 + n3) / 3;
    let mensagem;

    if (media > 9) {
        mensagem = "Aprovado com Excelência";
    } else if (media >= 6) {
        mensagem = "Aprovado";
    } else if (media >= 4) {
        mensagem = "Recuperação";
    } else {
        mensagem = "Reprovado";
    }

    document.getElementById("resultado3").innerText = "Resultado: " + mensagem;
}

// Exercício 4 - Função com operador ternário
function verificarNumero() {
    let valor = parseFloat(document.getElementById("valor3").value);
    let resultado = (valor % 2 === 0) ? ((valor == 4) ? valor * 100 : valor + (valor / 2)): valor * valor * valor;

    document.getElementById("resultado4").innerText = "Resultado: " + resultado;
}
