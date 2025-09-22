// EXERCICIO 01

function exercicio_1() {
  let val1 = parseFloat(document.getElementById("valor1").value);
  let val2 = parseFloat(document.getElementById("valor2").value);

  let operacao = document.getElementById("operacao").value;

  let resultado;

  //Operação
  switch (operacao) {
    case "soma":
      resultado = val1 + val2;
      break;
    case "substracao":
      resultado = val1 - val2;
      break;
    case "multiplicacao":
      resultado = val1 * val2;
      break;
    case "divisao":
      if (val1 === 0) {
        resultado = "Não é possível dividir por zero!";
      }
      if (val2 === 0) {
        resultado = "Não é possível dividir por zero!";
      } else {
        resultado = val1 / val2;
      }
      break;
    default:
      resultado = "Operação Inválida!!";
  }
  //Resultado na tela
  document.getElementById("resultado1").textContent = "Resultado: " + resultado;
}

function exercicio_2() {}

function exercicio_3() {
  let primeiraNota = parseFloat(document.getElementById("nota1").value);
  let segundaNota = parseFloat(document.getElementById("nota2").value);
  let terceiraNota = parseFloat(document.getElementById("nota3").value);

  let media = (primeiraNota + segundaNota + terceiraNota) / 3;

  let resultadoMsg; // mensagem

  if (media > 9.0) {
    resultadoMsg = "Aprovado com Exelência - média: " + media.toFixed(2);
  } else if (media >= 6 && media <= 8.9) {
    resultadoMsg = "Aprovado - média: " + media.toFixed(2);
  } else if (media >= 4 && media <= 5.9) {
    resultadoMsg = "Em recuperação - média: " + media.toFixed(2);
  } else {
    resultadoMsg = "Reprovado - média: " + media.toFixed(2);
  }
  console.log(resultadoMsg);
  document.getElementById("resultado3").textContent =
    "Resultado: " + resultadoMsg;
}

function exercicio_4() {
    let val3 = parseFloat(document.getElementById("valor3").value);
    
    let resultado = (val3 % 2 === 0)
        ? val3 + val3 / 2
        : (val3 ** 3).toFixed(2);


    const valorMsg = (val3 % 2 === 0)
        ? `Número é par, então tome ele somado à metade: ${resultado}`
        : `Número é ímpar, então tome ele ao cubo: ${resultado}`;

    document.getElementById("resultado4").textContent = "Resultado: " + valorMsg;
}
