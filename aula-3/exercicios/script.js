// // Exercicio 1
// function exercicio_1() {
//     const valor1 = parseFloat(document.getElementById('valor1').value);
//     const valor2 = parseFloat(document.getElementById('valor2').value);
//     const op = document.getElementById('operacao').value;
//     document.getElementById('resultado1').innerHTML = '';
//     switch (op) {
//         case "soma":
//             const soma = valor1 + valor2;
//             document.getElementById('resultado1').innerHTML = `O resultado da soma é ${soma}`;
//             break;
//         case "substracao":
//             const substracao = valor1 - valor2;
//             document.getElementById('resultado1').innerHTML = `O resultado da subtração é ${substracao}`;
//             break;
//         case "multiplicacao":
//             const multiplicacao = valor1 * valor2;
//             document.getElementById('resultado1').innerHTML = `O resultado da multiplicação é ${multiplicacao}`;
//             break;
//         case "divisao":
//             const divisao = valor1 / valor2;
//             document.getElementById('resultado1').innerHTML = `O resultado da Divisão é ${divisao}`
//             break;
//     }
//     document.getElementById('resultado1').style.fontSize = '20px';
//     document.getElementById('resultado1').style.color = 'red';
// }
// //----------------------------------------------------------------------//

// // Exercicio 2
// const palindromo = (palavra) => {
//     const palavraoriginal = palavra;
//     const palvrainvertida = palavra.split('').reverse().join('');
//     if (palavraoriginal == palvrainvertida) {
//         return true;
//     }
//     return false;
// }
// function exercicio_2() {
//     const palavra = document.getElementById('palavra').value;
//     document.getElementById('resultado2').innerHTML = '';
//     if (palindromo(palavra)) {
//         document.getElementById('resultado2').innerHTML = 'A palavra é um Palindromo';
//     } else {
//         document.getElementById('resultado2').innerHTML = 'A palavra não é um Palindromo';
//     }
//     document.getElementById('resultado2').style.fontSize = '20px';
//     document.getElementById('resultado2').style.color = 'red';
// }
// //----------------------------------------------------------------------//

// // Exercicio 3
// function exercicio_3() {
//     const nota1 = parseFloat(document.getElementById('nota1').value);
//     const nota2 = parseFloat(document.getElementById('nota2').value);
//     const nota3 = parseFloat(document.getElementById('nota3').value);
//     document.getElementById('resultado3').innerHTML = '';
//     const media = (nota1 + nota2 + nota3) / 3;
//     if (media >= 9) {
//         document.getElementById('resultado3').innerHTML = 'Aprovado com Excelência';
//     }
//     if (media >= 6 && media <= 8.9) {
//         document.getElementById('resultado3').innerHTML = 'Aprovado';
//     }
//     if (media >= 4 && media <= 5.9) {
//         document.getElementById('resultado3').innerHTML = 'Recuperação';
//     }
//     if (media <= 3.9) {
//         document.getElementById('resultado3').innerHTML = 'Reprovado';
//     }
//     document.getElementById('resultado3').style.fontSize = '20px';
//     document.getElementById('resultado3').style.color = 'red';
// }
// //----------------------------------------------------------------------//

// // Exercicio 4
// function exercicio_4() {
//     const valor = parseFloat(document.getElementById('valor3').value);
//     document.getElementById('resultado4').innerHTML = '';
//     const resultado = ((valor % 2) == 0) ? (valor + (valor / 2)) : (valor ** 3);
//     document.getElementById('resultado4').innerHTML = `O resultado é ${resultado}`;
//     document.getElementById('resultado4').style.fontSize = '20px';
//     document.getElementById('resultado4').style.color = 'red';
// }
// //----------------------------------------------------------------------//
