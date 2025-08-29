// Exercício 1: Somar dois valores
function somarValores() {
    const v1 = parseFloat(document.getElementById("valor1").value);
    const v2 = parseFloat(document.getElementById("valor2").value);
    const resultado = v1 + v2;

    alert("Resultado da soma: " + resultado);
}

// Exercício 2: Contador crescente
let contador = 1;
function contarClique() {
    console.log(contador);
    alert("Clique número: " + contador);
    contador++;
}

// Exercício 3: Verifica se é par ou ímpar
function parOuImpar() {
    const valor = parseInt(document.getElementById("valor3").value);

    if (isNaN(valor)) {
        alert("Digite um número válido!");
        return;
    }

    if (valor % 2 === 0) {
        alert("O número é PAR");
    } else {
        alert("O número é ÍMPAR");
    }
}

// DESAFIO: Hello World com troca de cores
let clicado = false;
function mostrarHelloWorld() {
    const h1 = document.getElementById("HelloWorld");

    if (!clicado) {
        h1.textContent = "Hello World";
        h1.style.color = "blue";
        clicado = true;
    } else {
        h1.style.color = (h1.style.color === "blue") ? "green" : "blue";
    }
}
