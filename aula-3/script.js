// EXEMPLOS DE FUNCOES DENTRO DE FUNCOES

function soma1 (number1,number2){
    const numberSoma = number1+number2;
    return numberSoma;

}

function somaNoHTML () {
    const valor1 = document.getElementById('valor1').value;
    const valor2 = document.getElementById('valor2').value;

    const number1 = parseFloat(valor1);
    const number2 = parseFloat(valor2);

    const soma = soma1(number1,number2);

    console.log("Resultado: " + soma);
}



// EXEMPLOS DE FUNCOES ANONIMAS
const soma = function(a,b) {
    return a*b;
}

console.log(soma(3,2));

const dobrar = function(x) {
    return x*2;
}

console.log(dobrar(5));

const soma2 = (a,b) => a+b; 
console.log(soma2(5,6))

const HelloWorld = () => "HellloWorld";

console.log(HelloWorld());

// TERNARIOS:

let idade = 20;

let podeBeber = idade >= 18 ?"Pode beber" : "Não pode beber";

console.log(podeBeber)