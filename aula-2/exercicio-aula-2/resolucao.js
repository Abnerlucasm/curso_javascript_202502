//Exercício 1 - Soma Valores
function SomaValor() {
  const valor1 = document.getElementById("valor1").value;
  const valor2 = document.getElementById("valor2").value;

  let soma = parseFloat(valor1) + parseFloat(valor2);

  console.log(soma);
}

//Exercício 2 - Acrescenta +1
let valorInicial = 0;
function Acrescenta() {
  valorInicial += 1;
  console.log(valorInicial);
}

//Exercício 3 - Par ou Ímpar

function ParOuImpar() {
  const valorParImpar = parseFloat(document.getElementById("valor3").value);

  if (valorParImpar % 2 == 0) {
    console.log(`O número ${valorParImpar} é Par!`);
  } else {
    console.log(`O número ${valorParImpar} é Ímpar!`);
  }
}

//Exercício 4 - Hello World
let cor;

function HelloWorld() {
  const texto = document.getElementById("HelloWorld");
  const valor = "Hello World!";

  texto.innerText = valor;

  //Lógica pra alterar cor do texto
  if (cor == 0) {
    texto.style.color = "red";
    cor = 1;
  } else {
    texto.style.color = "black";
    cor = 0;
  }
}
