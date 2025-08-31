function calcula() {
    const opcao = document.getElementById('operacao').value;
    const valor1 = parseFloat(document.getElementById('valor1').value);
    const valor2 = parseFloat(document.getElementById('valor2').value);

    let texto = document.getElementById('resultado1')

    switch (opcao) {
        case "soma":
            texto.innerText = `Resultado = ` + (valor1 + valor2);
            break;
        case "multiplicacao":
            texto.innerText = `Resultado = ` + (valor1 * valor2);
            break;
        case "substracao":
            texto.innerText = `Resultado = ` + (valor1 - valor2);
            break;
        case "divisao":
            texto.innerText = `Resultado = ` + (valor1 / valor2);
            break
        default:
            texto.innerText = `Resultado = ` + ("Opção inválida")
            break;
    }
}

function verificaPalindromo() {
    const palavra = (document.getElementById('palavra').value).split('').join("");

    const palavraReversa = (document.getElementById('palavra').value).split('').reverse().join("");

    const texto = document.getElementById('resultado2');

    let verifica = (textoNormal, textoReverso) => textoNormal === textoReverso;

    if (verifica(palavra, palavraReversa)) {
        texto.innerText = "É um palindromo";
        texto.style.color = "green";
    } else {
        texto.innerText = "Não é um palindromo";
        texto.style.color = "red";
    }

}

function calculaMedia() {
    const valor1 = parseFloat(document.getElementById('nota1').value);
    const valor2 = parseFloat(document.getElementById('nota2').value);
    const valor3 = parseFloat(document.getElementById('nota3').value);

    const resultado = (valor1 + valor2 + valor3) / 3;

    const texto = document.getElementById('resultado3');

    if (resultado > 9) {
        texto.innerText = "Aprovado com Excelência";
    } else if (resultado >= 6 && resultado <= 8.9) {
        texto.innerText = "Aprovado";
    } else if (resultado >= 4 && resultado <= 5.6) {
        texto.innerText = "Recuperação";
    } else {
        texto.innerText = "Reprovado";
    }

}

function verificaParImpar() {

    const valor = parseInt(document.getElementById('valor3').value);

    let valorConvertido = valor % 2 == 0;

    const texto = document.getElementById('resultado4');

    if (valorConvertido) {
        texto.innerText = 'Resultado =' + ((valor / 2) + valor);
    } else {
        texto.innerText = 'Resultado =' + Math.pow(valor, 3);
    }

}