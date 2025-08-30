/* atividade 1 

function calcular (){
    const numero = document.getElementById('valor1').value
    const numero1 = document.getElementById('valor2').value
    const operacao = document.getElementById('operacao').value
    let resultado

    switch(operacao){
        case'soma':
        resultado = numero + numero1
        break

        case'substracao':
        resultado = numero - numero1
        break

        case'multiplicacao':
        resultado = numero * numero1
        break

        case'divisao':
        resultado = numero / numero1
        break

        default:
            resultado = 'operação invalida'
        }    

            const final = document.getElementById('resultado1').innerText = `resultado ${resultado}`
            
}
*/

/* atividade 3 */

function media(){
    const nota = document.getElementById('nota1').value
    const nota1 = document.getElementById('nota2').value
    const nota2 = document.getElementById('nota3').value

    let calcular = (parseFloat(nota) + parseFloat(nota1) + parseFloat(nota2)) / 3

    const resultado = document.getElementById('resultado3')

    if(calcular >= 9){
        resultado.innerText = `aprovado com excelencia ${calcular}`
    }else if(calcular >= 6){
        resultado.innerText = `aprovado ${calcular}`
    }else if(calcular >= 4){
        resultado.innerText = `recuperação ${calcular}`
    }else{
        resultado.innerText = `reprovado ${calcular}`
    }


}