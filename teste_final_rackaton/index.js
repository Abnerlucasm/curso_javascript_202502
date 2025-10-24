const API_URL = 'http://187.102.36.3:8091/quiz/5'; 

const DADOS_DE_BACKUP = [
    {
        id: 1,
        enunciado: "Qual é a principal função do JavaScript no desenvolvimento web?",
        resposta_correta: "Adicionar interatividade e lógica à página.",
        respostas_incorretas: ["Definir a estrutura do conteúdo.", "Estilizar o visual da página.", "Gerenciar o servidor do banco de dados."]
    },
    {
        id: 2,
        enunciado: "Qual método do DOM é usado para selecionar um elemento por seu ID?",
        resposta_correta: "getElementById()",
        respostas_incorretas: ["querySelector()", "getElementByTag()", "findByID()"]
    },
    {
        id: 3,
        enunciado: "O que significa a sigla API?",
        resposta_correta: "Interface de Programação de Aplicações",
        respostas_incorretas: ["Aplicação de Processamento de Internet", "Programa de Interface Avançada", "Protocolo de Integração de Aplicativos"]
    },
    {
        id: 4,
        enunciado: "Em JavaScript, qual é o tipo de dado de `[1, 2, 3]`?",
        resposta_correta: "Object (Array)",
        respostas_incorretas: ["Integer", "String", "Number"]
    },
    {
        id: 5,
        enunciado: "Como você declara uma constante em JavaScript?",
        resposta_correta: "const nome = 'valor';",
        respostas_incorretas: ["var nome = 'valor';", "let nome = 'valor';", "constant nome = 'valor';"]
    }
];

const gameState = {
    currentPlayer: '',
    score: { acertos: 0, erros: 0 },
    questions: [],
    currentQuestionIndex: 0,
    leaderboard: JSON.parse(localStorage.getItem('quizLeaderboard')) || [],
};


function mudarTela(id) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}


function iniciarQuiz() {
    const nomeInput = document.getElementById('nome-jogador');
    const nome = nomeInput.value.trim();

    if (nome.length < 1) {
        alert("Por favor, digite um nome válido.");
        return;
    }

    gameState.currentPlayer = nome;
    document.getElementById('jogador-nome-display').textContent = nome;
    
    gameState.score = { acertos: 0, erros: 0 };
    gameState.currentQuestionIndex = 0;
    
    alert(` Boa sorte, ${nome}! Preparando o quiz...`); 

    mudarTela('quiz-screen');
    buscarPerguntas();
}

function reiniciarQuiz() {

    document.getElementById('nome-jogador').value = gameState.currentPlayer;
    mudarTela('start-screen');
}


async function buscarPerguntas() {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP! Status: ${response.status}. Usando dados de backup.`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length < 5) {
            throw new Error("Resposta da API inválida ou incompleta. Usando dados de backup.");
        }
        
        gameState.questions = data.slice(0, 5); 
        console.log("✅ Perguntas carregadas da API.");

    } catch (error) {
        console.error("⚠️ Falha ao buscar perguntas da API:", error.message);
        
        gameState.questions = DADOS_DE_BACKUP;
        document.getElementById('pergunta-texto').textContent = '⚠️ Erro ao conectar com a API. Carregando quiz de backup.';
        console.log("✅ Usando perguntas de backup.");
    }
    
    exibirPergunta();
}


function exibirPergunta() {
    if (gameState.currentQuestionIndex >= gameState.questions.length) {
        finalizarQuiz();
        return;
    }

    const perguntaAtual = gameState.questions[gameState.currentQuestionIndex];
    
    const totalPerguntas = gameState.questions.length;
    document.getElementById('progresso-quiz').textContent = 
        `Pergunta ${gameState.currentQuestionIndex + 1} de ${totalPerguntas}`;

    document.getElementById('pergunta-texto').textContent = perguntaAtual.enunciado;

    const container = document.getElementById('alternativas-container');
    container.innerHTML = '';

    const alternativas = [
        ...perguntaAtual.respostas_incorretas, 
        perguntaAtual.resposta_correta
    ].sort(() => Math.random() - 0.5); 

    alternativas.forEach(alternativa => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-alternativa';
        btn.textContent = alternativa;
        
        btn.addEventListener('click', () => verificarResposta(btn, alternativa, perguntaAtual.resposta_correta));
        container.appendChild(btn);
    });
    
    document.getElementById('feedback-animado').textContent = '';
}

function verificarResposta(btnClicado, respostaSelecionada, respostaCorreta) {

    document.querySelectorAll('.btn-alternativa').forEach(btn => btn.disabled = true);

    const feedbackElement = document.getElementById('feedback-animado');
    
    if (respostaSelecionada === respostaCorreta) {
        gameState.score.acertos++;
        feedbackElement.textContent = '✅ Correto! Você acertou.';
        feedbackElement.className = 'feedback correct';
        btnClicado.style.backgroundColor = '#baffba'; 
    } else {
        gameState.score.erros++;
        feedbackElement.textContent = `❌ Errado! A resposta correta era: "${respostaCorreta}"`;
        feedbackElement.className = 'feedback wrong';
        btnClicado.style.backgroundColor = '#ffbaba'; 
       
        document.querySelectorAll('.btn-alternativa').forEach(btn => {
            if (btn.textContent === respostaCorreta) {
                btn.style.border = '2px solid green';
            }
        });
    }

    
    document.getElementById('placar-acertos').textContent = gameState.score.acertos;
    document.getElementById('placar-erros').textContent = gameState.score.erros;
    
    setTimeout(() => {
        gameState.currentQuestionIndex++;
        exibirPergunta();
    }, 2000); 
}

function salvarResultado() {
    const novoResultado = {
        nome: gameState.currentPlayer,
        pontos: gameState.score.acertos,
        data: new Date().toLocaleDateString('pt-BR'),
    };

    gameState.leaderboard.push(novoResultado);
    gameState.leaderboard.sort((a, b) => b.pontos - a.pontos); 

    localStorage.setItem('quizLeaderboard', JSON.stringify(gameState.leaderboard));
}

function exibirLeaderboard() {
    salvarResultado(); 

    const topJogadores = gameState.leaderboard;
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = ''; 

    const top3 = topJogadores.slice(0, 3);

    top3.forEach((jogador, index) => { 
        const listItem = document.createElement('li');
        
        let classeDestaque = '';
        if (index === 0) classeDestaque = 'top-1';
        else if (index === 1) classeDestaque = 'top-2';
        else if (index === 2) classeDestaque = 'top-3';

        listItem.className = classeDestaque;
        
        listItem.innerHTML = `
            <span>#${index + 1} - <strong>${jogador.nome}</strong></span>
            <span>${jogador.pontos} acerto(s)</span>
        `;
        leaderboardList.appendChild(listItem);
    });
}

function finalizarQuiz() {
    document.getElementById('score-final').textContent = gameState.score.acertos;
    exibirLeaderboard();
    mudarTela('final-screen');
}

document.addEventListener('DOMContentLoaded', () => {
    mudarTela('start-screen');
});