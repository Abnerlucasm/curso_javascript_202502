function Operacoes() {
    let valor1 = parseFloat(document.getElementById('valor1').value);
    let valor2 = parseFloat(document.getElementById('valor2').value);
    let operacao = document.getElementById('operacao').value;
    let resultado; 

    if (operacao === "soma") {
        resultado = valor1 + valor2;
    } else if (operacao === "substracao") {
        resultado = valor1 - valor2;
    } else if (operacao === "multiplicacao") {
        resultado = valor1 * valor2;
    } else if (operacao === "divisao") {
        resultado = valor1 / valor2;
    } else {
        resultado = "Erro";
    }
    console.log("Resultado:", resultado);
    alert("Resultado da operação: " + resultado);
    document.getElementById('resultado1').innerText = "Resultado: " + resultado;
}


function Palindromo() {
    const palavra = document.getElementById('palavra').value;
    const palavraInvertida = palavra.split('').reverse().join('');
    const resultadoElemento = document.getElementById('resultado2');

    if (palavra.toLowerCase() === palavraInvertida.toLowerCase()) {
        console.log("a palavra " + palavra + " é um palíndromo");
        alert("a palavra " + palavra + " é um palíndromo");
        resultadoElemento.innerText = "a palavra " + palavra + " é um palíndromo";;
        resultadoElemento.style.color = "green";
    } else {
        console.log("a palavra " + palavra + " não é um palíndromo");
        alert("a palavra " + palavra + " não é um palíndromo");
        resultadoElemento.innerText = "a palavra " + palavra + " não é um palíndromo";
        resultadoElemento.style.color = "red";
    }
}

function Media() {
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    const media = (nota1 + nota2 + nota3) / 3;

    if (media > 9) {
        console.log("Aprovado com excelência");
        alert("Aprovado com excelência com a nota " + media);
    } else if (media >= 6) {
        console.log("Aprovado com a nota");
        alert("Aprovado com a nota" + media);
    } else if (media >= 4 ) {
        console.log("Recuperação");
        alert("Recuperação com a nota " + media);
    } else {    
        console.log("Reprovado");
        alert("Reprovado com a nota " + media);
    }
    document.getElementById('resultado3').innerText = "Média: " + media;
 
}

function OperadorTernario() {
    let valor3 = parseFloat(document.getElementById('valor3').value);
    let resultado = (valor3 % 2 == 0) ? valor3 + (valor3/2) : valor3  * valor3 * valor3;
    console.log("Resultado:", resultado);
    alert("Resultado: " + resultado);
    document.getElementById('resultado4').innerText = "Resultado: " + resultado;

  
}

