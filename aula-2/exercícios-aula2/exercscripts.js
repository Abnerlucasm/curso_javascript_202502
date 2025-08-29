//exerc 2
let number1 = 0;
function AcrescNumber(){
    // const number1 = document.getElementById('SomaBotao').value;
    const somaNumeros = number1++;
    console.log(somaNumeros);

}

//exerc 1
function Soma(){
    const number1 = document.getElementById('valor1').value;
    const number2 = document.getElementById('valor2').value;
    const soma = parseFloat(number1)+parseFloat(number2);

    console.log(soma);
    
}

//exerc 3
function VerifParOuImpar(){
    const number = parseInt(document.getElementById('valor').value);
    if (number % 2 == 0) {
        document.getElementById('Resultado: ').innerText = number + ' é PAR';
    } else {
        document.getElementById('Resultado: ').innerText = number + ' é IMPAR';
    }
}

let corAtual = 0;
let indice = 0;

function MudaACor(){
    const elemento = document.getElementById('HelloWorld')

    if (corAtual === 0){
         elemento.style.color = 'blueviolet'
         corAtual = 1
    } else {
        elemento.style.color = 'red'
         corAtual = 0
    }
}
