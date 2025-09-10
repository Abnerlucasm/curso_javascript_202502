//Exercício 1 - Operações Matemáticas
function exercicio_1() {
  const valor1 = parseFloat(document.getElementById("valor1").value);
  const valor2 = parseFloat(document.getElementById("valor2").value);
  const operacao = document.getElementById("operacao").value;
  const resultado = document.getElementById("resultado1");

  switch (operacao) {
    case "soma":
      const soma = valor1 + valor2;
      resultado.innerText = `O resultado da soma é: ${soma}`;
      break;
    case "subtracao":
      const subtracao = valor1 - valor2;
      resultado.innerText = `O resultado da subtração é: ${subtracao}`;
      break;
    case "multiplicacao":
      const multiplicacao = valor1 * valor2;
      resultado.innerText = `O resultado da multiplicação é: ${multiplicacao}`;
      break;

    case "divisao":
      const divisao = valor1 / valor2;
      resultado.innerText = `O resultado da divisão é: ${divisao}`;
      break;
  }
  document.getElementById("resultado1").style.fontSize = "20px";
  document.getElementById("resultado1").style.color = "blue";
}

//Exercício 2 - Palíndromo
const verificaPalindromo = (palavra) => {
  const palindromo = palavra.split("").reverse().join("");
  const resultado = document.getElementById("resultado2");

  if (palavra == palindromo) {
    resultado.style.color = "green";
    resultado.style.fontSize = "20px";
    resultado.innerText = `A palavra ${palavra} é um palíndromo!`;
  } else {
    resultado.style.color = "red";
    resultado.style.fontSize = "20px";
    resultado.innerText = `A palavra ${palavra} não é um palíndromo!`;
  }
};

function exercicio_2() {
  let palavra = document.getElementById("palavra").value;
  verificaPalindromo(palavra);
}

//Exercício 3 - Média
function exercicio_3() {
  const nota1 = parseFloat(document.getElementById("nota1").value);
  const nota2 = parseFloat(document.getElementById("nota2").value);
  const nota3 = parseFloat(document.getElementById("nota3").value);
  const resultado = document.getElementById("resultado3");

  const media = (nota1 + nota2 + nota3) / 3;

  if (media > 9) {
    resultado.style.color = "green";
    resultado.style.fontSize = "20px";
    resultado.innerText = `Aprovado com Excelência!`;
  } else if (media >= 6 && media < 9) {
    resultado.style.color = "green";
    resultado.style.fontSize = "20px";
    resultado.innerText = `Aprovado!`;
  } else if (media >= 4 && media <= 5.6) {
    resultado.style.color = "orange";
    resultado.style.fontSize = "20px";
    resultado.innerText = `Recuperação...`;
  } else {
    resultado.style.color = "red";
    resultado.style.fontSize = "20px";
    resultado.innerText = `Reprovado.`;
  }
}

//Exercício 4 - Operador Ternário
function exercicio_4() {
  const valor = parseFloat(document.getElementById("valor3").value);
  const resultado = document.getElementById("resultado4");

  const calculo = valor % 2 == 0 ? valor + valor / 2 : valor ** 3;

  resultado.style.fontSize = "20px";
  resultado.innerText = calculo;
}
