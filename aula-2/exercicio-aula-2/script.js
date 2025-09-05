function Somar(){
    const number1 = document.getElementById('valor1').value;
    const number2 = document.getElementById('valor2').value;
    const soma = parseFloat(number1)+parseFloat(number2);
    console.log(soma);
    }
let numInicio = 0;

function ClickarCookie(){
    numInicio = numInicio + 1; 
    console.log(numInicio);
    document.getElementById("valor").innerText = numInicio; 
}

function GeraValorInicial(){
    const numeroInicio = document.getElementById('valor').innerText; 
    numInicio = parseFloat(numeroInicio);
}
function verificarParOuImpar(){
    const numero = document.getElementById("valor3").value;
    const num = parseInt(numero);
    if(num%2==0){
        console.log("O número é Par");
        document.getElementById("resultado").innerText= "O número é Par";
    }else{
        console.log("O número é Ímpar");
        document.getElementById("resultado").innerText="O número é Ímpar";
    }
}
let clicouUmaVez = false;
let corAtual = "red"; 

function imprimirHelloWorld(){
    const elemento = document.getElementById("HelloWorld");
    if(!clicouUmaVez){
        elemento.innerText = "Hello World";
        elemento.style.color = "black"; 
        clicouUmaVez = true;
    } else {
        elemento.innerText = "Hello World";
        if (corAtual === "red") {
            elemento.style.color = "purple";
            corAtual = "purple";
        } else {
            elemento.style.color = "red";
            corAtual = "red";
        }
    }
}
