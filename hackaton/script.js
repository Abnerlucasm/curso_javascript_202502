let QUESTIONS = [];
let playerName = '';
let index = 0;
let answers = [];

const screenName = document.getElementById('screen-name');
const screenQuiz = document.getElementById('screen-quiz');
const screenResult = document.getElementById('screen-result');
const btnStart = document.getElementById('btn-start');
const btnSample = document.getElementById('btn-sample');
const nameInput = document.getElementById('player-name');
const showName = document.getElementById('show-name');
const questionArea = document.getElementById('question-area');
const currentEl = document.getElementById('current');
const totalEl = document.getElementById('total');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnSkip = document.getElementById('btn-skip');
const btnRestart = document.getElementById('btn-restart');
const btnBack = document.getElementById('btn-back');
const leaderboardList = document.getElementById('leaderboard-list');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');

// 🔹 Busca 5 perguntas aleatórias da API
async function fetchQuestions() {
  try {
    const response = await fetch('http://187.102.36.3:8091/api-docs');
    const data = await response.json();

    // Embaralha e pega apenas 5
    const shuffled = data.sort(() => Math.random() - 0.5).slice(0, 5);

    // Ajusta para o formato usado no resto do código
    QUESTIONS = shuffled.map(item => ({
      q: item.pergunta || item.question,
      choices: [item.opcaoA, item.opcaoB, item.opcaoC, item.opcaoD],
      a: item.respostaCorreta - 1 // API deve indicar a resposta com número 1-4
    }));

    answers = new Array(QUESTIONS.length).fill(null);
    totalEl.textContent = QUESTIONS.length;
  } catch (err) {
    alert('Erro ao carregar perguntas da API. Verifique a conexão.');
    console.error(err);
  }
}

function showScreen(el) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

function renderQuestion(i) {
  const item = QUESTIONS[i];
  if (!item) return;

  currentEl.textContent = i + 1;
  questionArea.innerHTML = '';

  const qEl = document.createElement('div');
  qEl.className = 'question';
  qEl.textContent = item.q;

  const answersWrap = document.createElement('div');
  answersWrap.className = 'answers';

  item.choices.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.className = 'answer';
    btn.textContent = c;
    if (answers[i] === idx) btn.classList.add('selected');
    btn.addEventListener('click', () => {
      answers[i] = idx;
      answersWrap.querySelectorAll('.answer').forEach(x => x.classList.remove('selected'));
      btn.classList.add('selected');
    });
    answersWrap.appendChild(btn);
  });

  questionArea.appendChild(qEl);
  questionArea.appendChild(answersWrap);
}

function calcScore() {
  return QUESTIONS.reduce((acc, q, i) => acc + (answers[i] === q.a ? 1 : 0), 0);
}

function saveScore(name, score) {
  const key = 'quiz_leaderboard_v1';
  const raw = localStorage.getItem(key);
  const list = raw ? JSON.parse(raw) : [];
  list.push({ name, score, date: new Date().toISOString() });
  list.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));
  localStorage.setItem(key, JSON.stringify(list.slice(0, 10)));
}

function loadLeaderboard() {
  const raw = localStorage.getItem('quiz_leaderboard_v1');
  const list = raw ? JSON.parse(raw) : [];
  leaderboardList.innerHTML = list.length
    ? list.map(i => `<li><span>${i.name}</span><strong>${i.score}</strong></li>`).join('')
    : '<li style="opacity:.6">Sem pontuações ainda.</li>';
}

btnStart.addEventListener('click', async () => {
  const val = nameInput.value.trim();
  if (!val) return alert('Digite seu nome para continuar.');
  playerName = val;
  showName.textContent = playerName;

  await fetchQuestions(); // Carrega da API
  renderQuestion(0);
  showScreen(screenQuiz);
});

btnSample.addEventListener('click', () => { nameInput.value = 'Jogador Exemplo'; });

btnNext.addEventListener('click', () => {
  if (index === QUESTIONS.length - 1) {
    const score = calcScore();
    resultTitle.textContent = `Parabéns, ${playerName}!`;
    resultText.textContent = `Você acertou ${score} de ${QUESTIONS.length} perguntas.`;
    saveScore(playerName, score);
    loadLeaderboard();
    showScreen(screenResult);
    return;
  }
  index++;
  renderQuestion(index);
});

btnPrev.addEventListener('click', () => {
  if (index > 0) {
    index--;
    renderQuestion(index);
  }
});

btnSkip.addEventListener('click', () => {
  if (index === QUESTIONS.length - 1) {
    const score = calcScore();
    resultTitle.textContent = `Parabéns, ${playerName}!`;
    resultText.textContent = `Você acertou ${score} de ${QUESTIONS.length} perguntas.`;
    saveScore(playerName, score);
    loadLeaderboard();
    showScreen(screenResult);
    return;
  }
  index++;
  renderQuestion(index);
});

btnRestart.addEventListener('click', async () => {
  index = 0;
  answers.fill(null);
  showName.textContent = playerName;
  await fetchQuestions(); // Recarrega novas perguntas
  renderQuestion(index);
  showScreen(screenQuiz);
});

btnBack.addEventListener('click', () => {
  nameInput.value = '';
  playerName = '';
  showScreen(screenName);
});

loadLeaderboard();

document.addEventListener('keydown', e => {
  if (!screenQuiz.classList.contains('active')) return;
  if (e.key === 'ArrowRight') btnNext.click();
  if (e.key === 'ArrowLeft') btnPrev.click();
});
