// Exercício 1: Some os valores dos dois campos abaixo
// Dica: Use "parseFloat" para converter os valores de string para número.

function somarNumeros() {
    const campo1 = document.getElementById('valor1').value;
    
    const campo2 = document.getElementById('valor2').value;

    const numero1 = parseFloat(campo1);
    const numero2 = parseFloat(campo2);

    const soma = numero1 + numero2;

    console.log('A soma dos números é: ' + soma);
}

//Exemplo 2: Faça uma função que logue um número crescente 
// a cada vez que o botão abaixo for apertado (1,2,3,4,5...)

let numero = 0;

function numerosCrescentes() {

    let valor = numero++;

    console.log(valor);
}

//Exemplo 3(Extra): Iprima no console (ou na tela) se o número 
// é par ou ímpar ao apaertar o botão

function parOuImpar() {

    const numero = document.getElementById('valor3').value;

    if (numero %2 === 0) {
        console.log('O número ' + numero + ' é par!');
    } else {
        console.log('O número ' + numero + ' é ímpar!');
    }

}

//DESAFIO: Imprima "Hello World" na tela, 
// e a cada vez que ele for clicado a partir da primeira, 
// alterar entre duas cores a sua escolha

let corAtual = false;

function mostrarHelloWorld() {

    const mensagem = document.getElementById('HelloWorld');

    mensagem.innerText = 'Hello world!';

    if(corAtual) {
        mensagem.style.color = 'blue';
    } else {
        mensagem.style.color = 'green';
    }

    corAtual = !corAtual;
}