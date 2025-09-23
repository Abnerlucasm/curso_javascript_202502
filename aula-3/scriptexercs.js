function somaAula3(){
    const numero1 = parseFloat(document.getElementById('valor1').value);
    const numero2 = parseFloat(document.getElementById('valor2').value);
    const operacao = document.getElementById('operacao').value;

    let resultado;

    switch(operacao) {
        case "soma":
            resultado = numero1 + numero2;
            break;
        case "subtracao":
            resultado = numero1 - numero2;
            break;
        case "multiplicacao":
            resultado = numero1*numero2;
            break;
        case "divisao":
            resultado = numero2 !== 0 ? numero1 / numero2 : "Erro: divisão por zero";
            break;
        default:
            resultado = "Operação inválida"
    }

    document.getElementById('resultado1').innerText = "Resultado: " + resultado;

}



const verifPalavra = (palavra) => {
    for (let i = 0; i < palavra.length / 2; i++) {
    if (palavra[i] !== palavra[palavra.length - 1 - i]) {
      return false;
    }
  }
  return true;
};

function verifResultadoPalavra() {
    const palavra = document.getElementById('entrada').value;
    let resultado2 = document.getElementById("resultado2");

    if(verifPalavra(palavra)){
        resultado2.style.color = "green";
        resultado2.textContent = "É um palíndromo";
    } else {
        resultado2.textContent = "Não é um palíndromo";
        resultado2.style.color = "red";
    }

}


function verifNota(){
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);
    let resultado3 = document.getElementById("resultado3");

    let media = (nota1 + nota2 + nota3) / 3;

    if (media >= 9){
        resultado3.textContent = "Aprovado com Excelência";
    } else if(media >= 6 && media <=8.9){
        resultado3.textContent = "Aprovado";
    } else if(media >=4 && media <=5.9){
        resultado3.textContent = "Recuperação";
    } else{
        resultado3.textContent = "Reprovado";
    }
}


function Exerc4(){
    
    const numero = parseFloat(document.getElementById("valor3").value);

    let resultado4 = numero % 2 === 0 
    ? numero +numero /2
    : Math.pow(numero, 3);

    document.getElementById("resultado4").textContent = resultado4;

}






