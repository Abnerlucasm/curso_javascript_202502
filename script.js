const API_BASE_URL = 'http://187.102.36.3:8091/api';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const apiUrlPerguntas = `${PROXY_URL}${API_BASE_URL}/perguntas`;
const apiUrlRespostas = `${PROXY_URL}${API_BASE_URL}/respostas`;

const inputNome = document.getElementById('input-nome');
const quizContainer = document.getElementById('quiz-container');
const spanAcertos = document.getElementById('pontos-acertos');
const spanErros = document.getElementById('pontos-erros');

let gabarito = {};
let acertos = 0;
let erros = 0;

function pegaNomeJogador() {
    const nomeJogador = inputNome.value;

    if (!nomeJogador.trim()) {
        alert("Por favor, digite seu nome para começar!");
        return;
    }

    console.log("Nome do Jogador:", nomeJogador);
    inputNome.value = "";

    inputNome.style.display = 'none';
    document.querySelector('button[onclick="pegaNomeJogador()"]').style.display = 'none';

    buscarPerguntas(5);
}

async function buscarPerguntas(numeroDePerguntas) {
    const url = `${apiUrlPerguntas}/${numeroDePerguntas}`;
    console.log(`Buscando ${numeroDePerguntas} perguntas da API...`);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na API de Perguntas: ${response.status}`);
        }

        const data = await response.json();
        const listaDePerguntas = data.perguntas;

        console.log("Perguntas recebidas com sucesso:", listaDePerguntas);

        await buscarRespostas(listaDePerguntas);

        renderizarQuiz(listaDePerguntas);

    } catch (error) {
        console.error("Falha ao carregar o quiz (perguntas):", error);
        if (quizContainer) {
            quizContainer.innerHTML = `<p style="color: red;"><b>Falha ao carregar as perguntas.</b><br>Verifique o console (F12) e a ativação do proxy CORS.</p>`;
        }
        alert("Não foi possível carregar as perguntas. Verifique o console.");
    }
}

async function buscarRespostas(listaDePerguntas) {
    console.log("Buscando gabarito da API...");
    gabarito = {};

    if (!listaDePerguntas || listaDePerguntas.length === 0) {
        console.warn("Nenhuma pergunta fornecida para buscar respostas.");
        return;
    }

    try {
        const promessasDeRespostas = listaDePerguntas.map(async (pergunta) => {
            const urlResposta = `${apiUrlRespostas}/${pergunta.id}`;
            try {
                const response = await fetch(urlResposta);
                if (!response.ok) {
                    console.error(`Erro ao buscar resposta para ID ${pergunta.id}: ${response.status}`);
                    return null;
                }
                const dataResposta = await response.json();
                if (dataResposta && dataResposta.respostas) { // Corrigido para 'respostas'
                    gabarito[pergunta.id] = dataResposta.respostas;
                } else {
                    console.warn(`Resposta inesperada (chave 'respostas' não encontrada) para ID ${pergunta.id}:`, dataResposta);
                }
            } catch (errorIndividual) {
                console.error(`Falha no fetch da resposta para ID ${pergunta.id}:`, errorIndividual);
            }
        });

        await Promise.all(promessasDeRespostas);

        console.log("Gabarito carregado da API:", gabarito);

        if (Object.keys(gabarito).length === 0) {
            console.warn("Nenhuma resposta foi carregada da API. Verifique as URLs e o formato JSON.");
        }

    } catch (errorGeral) {
        console.error("Falha geral ao buscar gabarito da API:", errorGeral);
        alert("Não foi possível carregar o gabarito das respostas da API. Verifique o console.");
    }
}

function renderizarQuiz(listaDePerguntas) {
    if (!quizContainer) return;
    quizContainer.innerHTML = '';

    if (listaDePerguntas.length === 0) {
        quizContainer.innerHTML = '<p>Nenhuma pergunta foi carregada.</p>';
        return;
    }

    listaDePerguntas.forEach(pergunta => {
        const blocoPergunta = document.createElement('div');
        blocoPergunta.id = `pergunta-${pergunta.id}`;
        blocoPergunta.className = 'pergunta-bloco';

        const textoPergunta = document.createElement('h3');
        textoPergunta.textContent = pergunta.pergunta;

        const listaOpcoes = document.createElement('ul');
        listaOpcoes.className = 'opcoes-lista';

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
}

function checarResposta(idPergunta, idOpcaoSelecionada) {
    const respostaCorreta = gabarito[idPergunta];
    const blocoPergunta = document.getElementById(`pergunta-${idPergunta}`);

    if (!respostaCorreta) {
        console.warn(`Gabarito não disponível para a pergunta ID: ${idPergunta}. Não foi possível pontuar.`);
        alert(`Não foi possível verificar a resposta para esta pergunta (ID: ${idPergunta}).`);
        return;
    }
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
                li.style.fontWeight = 'bold';
            }
            li.style.cursor = 'default';
            li.onclick = null;
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
                li.style.fontWeight = 'bold';
            }
            li.style.cursor = 'default';
            li.onclick = null;
        });
    }
}