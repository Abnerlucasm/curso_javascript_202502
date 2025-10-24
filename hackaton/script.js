const QUESTIONS = [
    {q: 'Qual é a capital do Brasil?', choices:['São Paulo','Brasília','Rio de Janeiro','Salvador'], a:1},
    {q: 'Quantos estados tem o Brasil?', choices:['26','24','27','25'], a:2},
    {q: 'Qual é o maior planeta do sistema solar?', choices:['Terra','Marte','Júpiter','Saturno'], a:2},
    {q: 'Em que ano o homem pisou na Lua pela primeira vez?', choices:['1965','1969','1972','1959'], a:1},
    {q: 'Qual linguagem é usada para estilizar páginas web?', choices:['HTML','Python','CSS','C++'], a:2}
  ];
  
  let playerName = '';
  let index = 0;
  const answers = new Array(QUESTIONS.length).fill(null);
  
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
  
  totalEl.textContent = QUESTIONS.length;
  
  function showScreen(el) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
  }
  
  function renderQuestion(i) {
    const item = QUESTIONS[i];
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
  
  btnStart.addEventListener('click', () => {
    const val = nameInput.value.trim();
    if (!val) return alert('Digite seu nome para continuar.');
    playerName = val;
    showName.textContent = playerName;
    index = 0;
    answers.fill(null);
    renderQuestion(index);
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
  
  btnRestart.addEventListener('click', () => {
    index = 0;
    answers.fill(null);
    showName.textContent = playerName;
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
  