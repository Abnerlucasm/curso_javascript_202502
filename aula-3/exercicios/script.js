//EXERCICIO 01
function calcular() {
let valor1 = parseFloat(document.getElementById("valor1").value);
let valor2 = parseFloat(document.getElementById("valor2").value);
let operacao = document.getElementById("operacao").value;
let resultado;

if (operacao === "soma") {
    resultado = valor1 + valor2;
}
else if (operacao === "subtracao") {
    resultado = valor1 - valor2;
}
else if (operacao === "multiplicacao") {
    resultado = valor1 * valor2;
}
else if (operacao === "divisao") {
    if (valor2 !== 0) {
        resultado = valor1 / valor2;
    } else {
        resultado = "Erro: Divisão por zero não é permitida.";
    }
} else {
    resultado = "Operação inválida.";
}
console.log("Resultado: " + resultado);
alert("Resultado: " + resultado);
document.getElementById("resultado").innerText = "Resultado: " + resultado;
}

//EXERCICIO 02
const verificarPalindromo = () => {
    let palavra = document.getElementById("palavra").value.trim().toLowerCase().replace(/\s/g, '');
    let palavraOriginal = document.getElementById("palavra").value;
    let palavraInvertida = palavra.split('').reverse().join('');
    let resultadoElem = document.getElementById("resultado2");
    let resultado;

    if (palavra && palavra === palavraInvertida) {
        resultadoElem.innerText = `"${document.getElementById("palavra").value}" é um palíndromo.`;
        resultadoElem.style.color = "green";
        resultado = `"${palavraOriginal}" é um palíndromo.`;
    } else {
        resultadoElem.innerText = `"${document.getElementById("palavra").value}" não é um palíndromo.`;
        resultadoElem.style.color = "red";
        resultado = `"${palavraOriginal}" não é um palíndromo.`;    
    }
    console.log(resultado);
}

//EXERCICIO 03
function media() {
    const numero1 = parseFloat(document.getElementById("nota1").value);
    const numero2 = parseFloat(document.getElementById("nota2").value);
    const numero3 = parseFloat(document.getElementById("nota3").value);
    const mediaFinal = (numero1 + numero2 + numero3) / 3;
    
    if (mediaFinal >= 9) {
        console.log("Aprovado com Excelência: " + mediaFinal);
        alert("Aprovado com Excelência: " + mediaFinal);    
    } 
    else if (mediaFinal >= 6 && mediaFinal < 8.9) {
        console.log("Aprovado com a media: " + mediaFinal);
        alert("Aprovado com a media: " + mediaFinal);   
    } 
    else if (mediaFinal >= 4 && mediaFinal < 5.6) {
        console.log("Recuperação com a media: " + mediaFinal);
        alert("Recuperação com a media: " + mediaFinal);
    } 
    else {
        console.log("Reprovado com a media: " + mediaFinal);
        alert("Reprovado com a media: " + mediaFinal);
    }
}

//EXERCICIO 04
function operadorTernario() {
    const valor3 = parseFloat(document.getElementById("valor3").value);
    let resultado = (valor3 % 2 == 0) ? valor3 + (valor3/2) : valor3  * valor3 * valor3;
    console.log("O número é: " + resultado);
    alert("O número é: " + resultado);
    document.getElementById("resultado4").innerText = "O número é: " + resultado;
}