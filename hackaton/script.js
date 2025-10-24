document.addEventListener('DOMContentLoaded', () => {
    let QUESTIONS = [];
    let playerName = '';
    let index = 0;
    let answers = [];
  
    // --- Elementos da DOM
    const screenName = document.getElementById('screen-name');
    const screenQuiz = document.getElementById('screen-quiz');
    const screenResult = document.getElementById('screen-result');
    const btnStart = document.getElementById('btn-start');
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
  
    // --- Função para trocar telas
    function showScreen(el) {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      el.classList.add('active');
    }
  
    // --- Buscar perguntas da API 
    async function fetchQuestions() {
      try {
        const res = await fetch('http://187.102.36.3:8091/api-docs/');
        const data = await res.json();
  
        // Ajuste aqui conforme os nomes das propriedades da API
        QUESTIONS = data
          .sort(() => 0.5 - Math.random())
          .slice(0, 5)
          .map(item => ({
            q: item.pergunta,
            choices: [item.opcaoA, item.opcaoB, item.opcaoC, item.opcaoD],
            a: item.respostaCorreta
          }));
  
        answers = new Array(QUESTIONS.length).fill(null);
        totalEl.textContent = QUESTIONS.length;
        renderQuestion(index);
      } catch (err) {
        console.error(err);
        alert('Erro ao buscar perguntas da API.');
      }
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
      let acertos = 0;
      let erros = 0;
  
      QUESTIONS.forEach((q, i) => {
        if (answers[i] === q.a) acertos++;
        else erros++;
      });
  
      return { acertos, erros };
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
  
    // --- Botão começar
    btnStart.addEventListener('click', async () => {
      const val = nameInput.value.trim();
      if (!val) return alert('Digite seu nome para continuar.');
      playerName = val;
      showName.textContent = playerName;
      index = 0;
      await fetchQuestions();
      showScreen(screenQuiz);
    });
  
    btnNext.addEventListener('click', () => {
      if (index === QUESTIONS.length - 1) {
        const { acertos, erros } = calcScore();
        resultTitle.textContent = `Parabéns, ${playerName}!`;
        resultText.textContent = `Acertos: ${acertos} | Erros: ${erros}`;
        saveScore(playerName, acertos);
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
      if (index < QUESTIONS.length - 1) {
        index++;
        renderQuestion(index);
      } else {
        const { acertos, erros } = calcScore();
        resultTitle.textContent = `Fim do quiz, ${playerName}!`;
        resultText.textContent = `Acertos: ${acertos} | Erros: ${erros}`;
        saveScore(playerName, acertos);
        loadLeaderboard();
        showScreen(screenResult);
      }
    });
  
    btnRestart.addEventListener('click', async () => {
      index = 0;
      await fetchQuestions();
      showScreen(screenQuiz);
    });
  
    btnBack.addEventListener('click', () => {
      nameInput.value = '';
      playerName = '';
      showScreen(screenName);
    });
  
    loadLeaderboard();
  });
  