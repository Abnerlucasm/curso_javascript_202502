function pegaNomeJogador() {
    const inputNome = document.getElementById('input-nome');
    const nomeJogador = inputNome.value;

    console.log("Nome do Jogador:", nomeJogador);

    inputNome.value = "";

    buscarPerguntas(5);
}

async function buscarPerguntas(numeroDePerguntas) {

    const url = `https://cors-anywhere.herokuapp.com/http://187.102.36.3:8091/api/perguntas/${numeroDePerguntas}`;
    console.log(`Buscando ${numeroDePerguntas} perguntas da API...`);
    const quizContainer = document.getElementById('quiz-container');

    try {
        await buscarRespostas(numeroDePerguntas);

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na API de Perguntas: ${response.status}`);
        }

        const data = await response.json();
        const listaDePerguntas = data.perguntas;

        console.log("Perguntas recebidas com sucesso:", listaDePerguntas);

        if (listaDePerguntas.length > 0) {
            console.log("Exemplo (Primeira Pergunta):", listaDePerguntas[0].pergunta);
            console.log("Opções:", listaDePerguntas[0].opcoes);
        }

        quizContainer.innerHTML = '';
        listaDePerguntas.forEach(pergunta => {
            const blocoPergunta = document.createElement('div');
            blocoPergunta.id = `pergunta-${pergunta.id}`;
            const textoPergunta = document.createElement('h3');
            textoPergunta.textContent = pergunta.pergunta;
            const listaOpcoes = document.createElement('ul');

            pergunta.opcoes.forEach(opcao => {
                const itemOpcao = document.createElement('li');
                itemOpcao.textContent = `${opcao.id}) ${opcao.texto}`;
                itemOpcao.style.cursor = 'pointer';
                itemOpcao.onclick = () => checarResposta(pergunta.id, opcao.id);
                listaOpcoes.appendChild(itemOpcao);
            });

            blocoPergunta.appendChild(textoPergunta);
            blocoPergunta.appendChild(listaOpcoes);
            quizContainer.appendChild(blocoPergunta);
        });

    } catch (error) {
        console.error("Falha ao carregar o quiz:", error);
        if (quizContainer) {
            quizContainer.innerHTML = `<p style="color: red;"><b>Falha ao carregar o quiz.</b><br>Verifique o console (F12) e lembre-se de ATIVAR sua extensão de CORS no navegador para continuar.</p>`;
        }
        alert("Não foi possível carregar o quiz. Verifique o console para mais detalhes.");
    }
}

let gabarito = {};
let acertos = 0;
let erros = 0;
const spanAcertos = document.getElementById('pontos-acertos');
const spanErros = document.getElementById('pontos-erros');

async function buscarRespostas(numeroDePerguntas) {
    console.log("Buscando gabarito (MODO SIMULADO)...");

    try {
        gabarito = {
            1: "c",
            2: "a",
        };

        console.log("Gabarito (simulado) carregado:", gabarito);

        await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
        console.error("Falha ao carregar gabarito (simulado):", error);
        alert("Não foi possível carregar o gabarito das respostas.");
        throw error;
    }
}

function checarResposta(idPergunta, idOpcaoSelecionada) {
    const respostaCorreta = gabarito[idPergunta];

    if (!respostaCorreta) {
        console.warn(`Não foi encontrada resposta no gabarito para a pergunta ID: ${idPergunta}`);
        return;
    }

    const blocoPergunta = document.getElementById(`pergunta-${idPergunta}`);
    if (!blocoPergunta || blocoPergunta.classList.contains('respondida')) {
        return;
    }
    blocoPergunta.classList.add('respondida');

    const todasOpcoes = blocoPergunta.querySelectorAll('li');

    if (idOpcaoSelecionada === respostaCorreta) {
        acertos++;
        spanAcertos.textContent = acertos;
        todasOpcoes.forEach(li => {
            if (li.textContent.startsWith(idOpcaoSelecionada)) {
                li.style.backgroundColor = '#d4edda';
                li.style.borderColor = '#c3e6cb';
            }
            li.style.cursor = 'not-allowed';
        });
    } else {
        erros++;
        spanErros.textContent = erros;
        todasOpcoes.forEach(li => {
            if (li.textContent.startsWith(idOpcaoSelecionada)) {
                li.style.backgroundColor = '#f8d7da';
                li.style.borderColor = '#f5c6cb';
            } else if (li.textContent.startsWith(respostaCorreta)) {
                li.style.backgroundColor = '#d4edda';
                li.style.borderColor = '#c3e6cb';
            }
            li.style.cursor = 'not-allowed';
        });
    }
}