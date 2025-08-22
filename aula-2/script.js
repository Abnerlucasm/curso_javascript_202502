function MostrarNome(){
    const element = document.getElementById('nome')
    const nome = element.value;
    const texto = document.getElementById('caixa')
    texto.innerHTML = '';
    texto.innerHTML = `
    Olá ${nome}, Como está?
    ` 
    const botao = document.getElementById('botao')
    const resposta = document.getElementById('resposta')
    botao.style = 'display : auto'
    resposta.style = 'display : auto'
}

function MudarCor(){
    const element = document.getElementById('caixa')
    element.style.color = 'red'
    const element1 = document.getElementById('cor')
    element1.onclick = VoltarCor;
}

function VoltarCor(){
    const element = document.getElementById('caixa')
    element.style.color = 'black'
    const element1 = document.getElementById('cor')
    element1.onclick = MudarCor;
}

function Responder(){
    const texto = document.getElementById('caixa')
    //texto.innerHTML = '';
    texto.innerHTML = `
    Qual o seu peso e altura? 
    <input id="peso" placeholder="Peso">
    <input id="altura" placeholder="Altura">
    `
    const botao = document.getElementById('botao')

    botao.onclick = Responder2;
}

function Responder2(){
    const peso = document.getElementById('peso').value;
    const altura = document.getElementById('altura').value;
    const resultado = peso / (altura**2)
}