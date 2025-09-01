function realizarOperacao() {
    const valor1 = parseFloat(document.getElementById('valor1').value)
    const valor2 = parseFloat(document.getElementById('valor2').value)
    const operacao = document.getElementById('operacao').value;
    let resultado1;

    switch (operacao) {
        case 'soma':
            resultado1 = valor1 + valor2
            break
        case 'substracao':
            resultado1 = valor1 - valor2
            break
        case 'multiplicacao':
            resultado1 = valor1 * valor2
            break
        case 'divisao':
            resultado1 = valor2 !== 0 ? valor1 / valor2 : 'Erro: Divisão por zero'
            break
        default:
            resultado1 = 'Operação inválida'
    }

    document.getElementById('resultado1').innerText = `Resultado: ${resultado1}`
}

function verificarPalindromo() {
    const palavra = document.getElementById('palavra').value;
    const palavraInvertida = palavra.split('').reverse().join('');

    const resultado2 = palavra === palavraInvertida ? 'É um palíndromo' : 'Não é um palíndromo';
    
    document.getElementById('resultado2').innerText = `Resultado: ${resultado2}`;
}
function statusAluno() {
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);
    let media;

    if (nota1 >= 0 && nota2 >= 0 && nota3 >= 0) {
        media = (nota1 + nota2 + nota3) / 3;

        if (media > 9) {
            document.getElementById('resultado3').innerText = 'Média: Aprovado com Excelência';
        } else if (media >= 6 && media < 9) {
            document.getElementById('resultado3').innerText = 'Média: Aprovado';
        } else if (media >= 4 && media < 6) {
            document.getElementById('resultado3').innerText = 'Média: Recuperação';
        } else {
            document.getElementById('resultado3').innerText = 'Média: Reprovado';
        }
    } else {
        document.getElementById('resultado3').innerText = 'Notas devem ser iguais ou maiores que zero.';
    }
}
function peradorTernario() {
    const valor3 = parseFloat(document.getElementById('valor3').value);

    const resultado3 = (valor3 % 2 !== 0) ? Math.pow(valor3, 3) : valor3 + (valor3 / 2);

    document.getElementById('resultado4').innerText = `Resultado: ${resultado3}`;
}
