const apiURL = 'http://187.102.36.3:8091/api/perguntas';



let perguntas = [];
let indiceAtual = 0;
let pontuacao = 0;
let jogador = '';
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

// Elementos
const startScreen = document.getElementById('start-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressEl = document.getElementById('progress');
const leaderboardEl = document.getElementById('leaderboard');

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('restart-btn').addEventListener('click', restartGame);

async function startGame() {
  jogador = document.getElementById('player-name').value.trim();
  if (!jogador) return alert('Digite seu nome!');
  startScreen.classList.remove('active');
  welcomeScreen.classList.add('active');
  document.getElementById('welcome-message').textContent = `Boa sorte, ${jogador}! 🎉`;
  
  setTimeout(async () => {
    welcomeScreen.classList.remove('active');
    quizScreen.classList.add('active');
    await carregarPerguntas();
    mostrarPergunta();
  }, 1500);
}

async function carregarPerguntas() {
  try {
    const res = await fetch(apiURL, { headers: { Accept: 'application/json' } });
    const data = await res.json();
    console.log('Resposta da API:', data);
    console.log('Estrutura de uma pergunta:', data.perguntas[0]);


    // Agora pegamos o array correto dentro do objeto retornado
    perguntas = data.perguntas.sort(() => 0.5 - Math.random()).slice(0, 5);

  } catch (e) {
    alert('Erro ao carregar perguntas da API.');
    console.error(e);
  }
}


function mostrarPergunta() {
  if (indiceAtual >= perguntas.length) return finalizarQuiz();

  const atual = perguntas[indiceAtual];
  questionEl.textContent = atual.pergunta || atual.titulo || atual.texto;
  progressEl.textContent = `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;
  optionsEl.innerHTML = '';

  // detecta se é um array ou campos separados
  const alternativas =
    atual.opcoes || atual.alternativas || [
      atual.alternativaA,
      atual.alternativaB,
      atual.alternativaC,
      atual.alternativaD
    ];

  alternativas.forEach((alt, i) => {
    const btn = document.createElement('button');
    btn.textContent = alt;
    btn.onclick = () => verificarResposta(i, atual.respostaCorreta ?? atual.correta);
    optionsEl.appendChild(btn);
  });
}


function verificarResposta(indice, correta) {
  const botoes = optionsEl.querySelectorAll('button');
  botoes.forEach((b, i) => {
    if (i === correta) b.classList.add('correct');
    else if (i === indice) b.classList.add('wrong');
    b.disabled = true;
  });

  if (indice === correta) pontuacao++;

  setTimeout(() => {
    indiceAtual++;
    mostrarPergunta();
  }, 1000);
}

function finalizarQuiz() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');
  document.getElementById('score-text').textContent = `${jogador}, você acertou ${pontuacao} de ${perguntas.length}!`;

  leaderboard.push({ nome: jogador, pontos: pontuacao });
  leaderboard.sort((a, b) => b.pontos - a.pontos);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  atualizarLeaderboard();
}

function atualizarLeaderboard() {
  leaderboardEl.innerHTML = '';
  leaderboard.slice(0, 10).forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = `${i + 1}. ${item.nome} - ${item.pontos} pts`;
    leaderboardEl.appendChild(li);
  });
}

function restartGame() {
  indiceAtual = 0;
  pontuacao = 0;
  perguntas = [];
  resultScreen.classList.remove('active');
  startScreen.classList.add('active');
}
