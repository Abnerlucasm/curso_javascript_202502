const API_BASE_URL = 'http://187.102.36.3:8091/api';
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const apiUrlPerguntas = `${PROXY_URL}${API_BASE_URL}/perguntas`;
const apiUrlRespostas = `${PROXY_URL}${API_BASE_URL}/respostas`;

const inputNome = document.getElementById('input-nome');
const quizContainer = document.getElementById('quiz-container');
const spanAcertos = document.getElementById('pontos-acertos');
const spanErros = document.getElementById('pontos-erros');
const telaLogin = document.getElementById('login-container');
const telaQuiz = document.getElementById('tela-quiz');
const leaderboardDiv = document.getElementById('leaderboard');
const leaderboardLista = document.getElementById('leaderboard-lista');

let gabarito = {};
let acertos = 0;
let erros = 0;
let nomeJogadorGlobal = "";
let totalPerguntas = 0;

function pegaNomeJogador() {
    nomeJogadorGlobal = inputNome.value;

    if (!nomeJogadorGlobal.trim()) {
        alert("Por favor, digite seu nome para começar!");
        return;
    }

    console.log("Nome do Jogador:", nomeJogadorGlobal);
    inputNome.value = "";

    if (telaLogin) telaLogin.style.display = 'none';
    if (telaQuiz) telaQuiz.style.display = 'block';

    buscarPerguntas(5);
}

async function buscarPerguntas(numeroDePerguntas) {
    const url = `${apiUrlPerguntas}/${numeroDePerguntas}`;
    console.log(`Buscando ${numeroDePerguntas} perguntas da API...`);
    totalPerguntas = 0;
    acertos = 0;
    erros = 0;
    if (spanAcertos) spanAcertos.textContent = acertos;
    if (spanErros) spanErros.textContent = erros;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na API de Perguntas: ${response.status}`);
        }
        const data = await response.json();
        const listaDePerguntas = data.perguntas;
        totalPerguntas = listaDePerguntas.length;

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
    if (!listaDePerguntas || listaDePerguntas.length === 0) return;

    try {
        const promessasDeRespostas = listaDePerguntas.map(async (pergunta) => {
            const urlResposta = `${apiUrlRespostas}/${pergunta.id}`;
            try {
                const response = await fetch(urlResposta);
                if (!response.ok) {
                    console.error(`Erro Resposta ID ${pergunta.id}: ${response.status}`);
                    return;
                }
                const dataResposta = await response.json();
                if (dataResposta && dataResposta.respostas) {
                    gabarito[pergunta.id] = dataResposta.respostas;
                } else {
                    console.warn(`Resposta inesperada ID ${pergunta.id}:`, dataResposta);
                }
            } catch (errorIndividual) {
                console.error(`Fetch Resposta ID ${pergunta.id}:`, errorIndividual);
            }
        });
        await Promise.all(promessasDeRespostas);
        console.log("Gabarito carregado:", gabarito);
        if (Object.keys(gabarito).length === 0) {
            console.warn("Nenhuma resposta da API carregada.");
        }
    } catch (errorGeral) {
        console.error("Falha geral ao buscar gabarito:", errorGeral);
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
        console.warn(`Gabarito indisponível ID ${idPergunta}.`);
        alert(`Não foi possível verificar a resposta (ID: ${idPergunta}).`);
        if (blocoPergunta && !blocoPergunta.classList.contains('respondida')) {
            blocoPergunta.classList.add('respondida');
        }
        verificarFimDeJogo();
        return;
    }
    if (!blocoPergunta || blocoPergunta.classList.contains('respondida')) {
        return;
    }

    blocoPergunta.classList.add('respondida');
    const todasOpcoes = blocoPergunta.querySelectorAll('li');
    let acertou = false;

    if (idOpcaoSelecionada === respostaCorreta) {
        acertos++;
        if (spanAcertos) spanAcertos.textContent = acertos;
        acertou = true;
    } else {
        erros++;
        if (spanErros) spanErros.textContent = erros;
    }

    todasOpcoes.forEach(li => {
        li.style.cursor = 'default';
        li.onclick = null;
        const opcaoId = li.textContent.substring(0, li.textContent.indexOf(')'));

        if (opcaoId === idOpcaoSelecionada) {
            if (acertou) {
                li.style.backgroundColor = '#d4edda';
                li.style.borderColor = '#c3e6cb';
                li.style.fontWeight = 'bold';
            } else {
                li.style.backgroundColor = '#f8d7da';
                li.style.borderColor = '#f5c6cb';
            }
        } else if (opcaoId === respostaCorreta) {
            li.style.backgroundColor = '#d4edda';
            li.style.borderColor = '#c3e6cb';
            li.style.fontWeight = 'bold';
        } else {
            li.style.opacity = '0.6';
        }
    });

    verificarFimDeJogo();
}

function verificarFimDeJogo() {
    const perguntasRespondidas = document.querySelectorAll('.pergunta-bloco.respondida').length;
    console.log(`Perguntas respondidas: ${perguntasRespondidas} de ${totalPerguntas}`);

    if (perguntasRespondidas === totalPerguntas && totalPerguntas > 0) {
        console.log("Fim do Quiz!");
        alert(`Quiz finalizado! Você acertou ${acertos} de ${totalPerguntas} perguntas.`);
        salvarPontuacao(nomeJogadorGlobal, acertos);
        renderizarLeaderboard();
        if (leaderboardDiv) leaderboardDiv.style.display = 'block';
    }
}

function salvarPontuacao(nome, pontuacao) {
    if (!nome) {
        console.warn("Nome do jogador inválido, não salvando pontuação.");
        return;
    }
    const leaderboardKey = "quizLeaderboard";
    let scores = [];
    try {
        const scoresSalvos = localStorage.getItem(leaderboardKey);
        if (scoresSalvos) {
            scores = JSON.parse(scoresSalvos);
            if (!Array.isArray(scores)) scores = [];
        }
    } catch (e) {
        console.error("Erro ao ler leaderboard do localStorage:", e);
        scores = [];
    }

    scores.push({ nome: nome, pontuacao: pontuacao });

    try {
        localStorage.setItem(leaderboardKey, JSON.stringify(scores));
        console.log("Pontuação salva:", { nome, pontuacao });
    } catch (e) {
        console.error("Erro ao salvar leaderboard no localStorage:", e);
    }
}

function carregarLeaderboard() {
    const leaderboardKey = "quizLeaderboard";
    let scores = [];
    try {
        const scoresSalvos = localStorage.getItem(leaderboardKey);
        if (scoresSalvos) {
            scores = JSON.parse(scoresSalvos);
            if (!Array.isArray(scores)) scores = [];
        }
    } catch (e) {
        console.error("Erro ao carregar leaderboard:", e);
        scores = [];
    }
    return scores;
}

function renderizarLeaderboard() {
    if (!leaderboardLista || !leaderboardDiv) return;

    const scores = carregarLeaderboard();

    scores.sort((a, b) => b.pontuacao - a.pontuacao);

    leaderboardLista.innerHTML = '';

    if (scores.length === 0) {
        leaderboardLista.innerHTML = '<li>Nenhuma pontuação registrada ainda.</li>';
    } else {
        scores.forEach((score, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${index + 1}. ${score.nome} - <strong>${score.pontuacao} Acertos</strong>`;
            leaderboardLista.appendChild(li);
        });
    }
    leaderboardDiv.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', renderizarLeaderboard);