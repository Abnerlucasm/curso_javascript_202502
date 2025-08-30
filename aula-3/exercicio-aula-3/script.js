// exercicio 1
function calcularOperacao() {
    let v1 = parseFloat(document.getElementById("valor1").value);
    let v2 = parseFloat(document.getElementById("valor2").value);
    let operacao = document.getElementById("operacao").value;
    let resultado;

    if (operacao == "soma") {
        resultado = v1 + v2;
    } else if (operacao == "substracao") {
        resultado = v1 - v2;
    } else if (operacao == "multiplicacao") {
        resultado = v1 * v2;
    } else if (operacao == "divisao") {
        resultado = v1 / v2;
    }

    document.getElementById("resultado1").innerText = resultado;
}

// exercicio 2
const verificarPalindromo = () => {
    let palavra = document.getElementById("palavra").value;
    let invertida = palavra.split("").reverse().join("");

    if (palavra == invertida) {
        document.getElementById("resultado2").innerText = "É um palíndromo";
        document.getElementById("resultado2").style.color = "green";
    } else {
        document.getElementById("resultado2").innerText = "Não é um palíndromo";
        document.getElementById("resultado2").style.color = "red";
    }
}

// exercicio 3
function calcularMedia() {
    let n1 = parseFloat(document.getElementById("nota1").value);
    let n2 = parseFloat(document.getElementById("nota2").value);
    let n3 = parseFloat(document.getElementById("nota3").value);
    let media = (n1 + n2 + n3) / 3;

    if (media > 9) {
        document.getElementById("resultado3").innerText = "Aprovado com Excelência";
    } else if (media >= 6) {
        document.getElementById("resultado3").innerText = "Aprovado";
    } else if (media >= 4) {
        document.getElementById("resultado3").innerText = "Recuperação";
    } else {
        document.getElementById("resultado3").innerText = "Reprovado";
    }
}

// exercicio 4
function calcularNumero() {
    let valor = parseFloat(document.getElementById("valor3").value);
    let resultado = (valor % 2 == 0) ? valor + valor/2 : valor * valor * valor;
    document.getElementById("resultado4").innerText = resultado;
}
// acho que é isso