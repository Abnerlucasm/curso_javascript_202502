// quiz.js — versão enxuta

const QUESTIONS_QTY = 5;
const QUESTIONS_ENDPOINT = `http://localhost:3000/perguntas/${QUESTIONS_QTY}`;
const ANSWER_ENDPOINT = id => `http://localhost:3000/respostas/${id}`;
const TIME_PER_QUESTION = 20;

const startSection = document.getElementById('start-section'),
      btnStart = document.getElementById('btn-start'),
      startMsg = document.getElementById('start-msg'),
      playerInput = document.getElementById('player-name'),
      quizContainer = document.getElementById('quiz-container'),
      progressText = document.getElementById('progress'),
      timerText = document.getElementById('timer'),
      questionText = document.getElementById('question-text'),
      answersDiv = document.getElementById('answers'),
      btnNext = document.getElementById('btn-next'),
      resultSection = document.getElementById('result-section'),
      scoreTitle = document.getElementById('score-title'),
      scoreText = document.getElementById('score'),
      btnReplay = document.getElementById('btn-replay'),
      leaderboardList = document.getElementById('leaderboard');

let playerName = '', questions = [], current = 0, score = 0, timerId = null;

const show = el => el.classList.remove('hidden'),
      hide = el => el.classList.add('hidden'),
      getOptionText = o => typeof o === 'string' ? o : o?.texto ?? o?.text ?? o?.label ?? o?.value ?? '',
      normalize = str => String(str||'').replace(/\u00A0/g,' ').trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

async function fetchJson(url){
  const res = await fetch(url);
  if (!res.ok) throw new Error('fetch status ' + res.status);
  return res.json();
}

async function loadQuestionsAndAnswers(){
  const data = await fetchJson(QUESTIONS_ENDPOINT);
  const baseQuestions = (data.perguntas||[]).slice(0, QUESTIONS_QTY).map(p=>({
    id: p.id, question: p.pergunta||'', options: Array.isArray(p.opcoes)?p.opcoes:[]
  }));

  return await Promise.all(baseQuestions.map(async q => {
    const resp = await fetchJson(ANSWER_ENDPOINT(q.id));
    let answerText = null;

    if (resp.respostas) {
      answerText = Array.isArray(resp.respostas) ? resp.respostas[0]?.resposta ?? resp.respostas[0]?.texto : resp.respostas;
    }

    const letterMap = {a:0,b:1,c:2,d:3};
    let correctIndex = null;
    if (answerText) {
      const norm = normalize(answerText);
      correctIndex = letterMap.hasOwnProperty(norm) ? letterMap[norm] : q.options.findIndex(o => normalize(getOptionText(o)) === norm);
      if (correctIndex<0) { console.warn('Não casou resposta', answerText, q.options.map(getOptionText)); correctIndex=null; }
    } else console.warn('Resposta null para pergunta', q.id);

    return {...q, correctIndex};
  }));
}

async function startQuiz(){
  playerName = playerInput.value.trim();
  if (!playerName) { startMsg.textContent='Digite seu nome'; return; }
  startMsg.textContent='Carregando perguntas...';
  try {
    questions = await loadQuestionsAndAnswers();
    current=score=0;
    startMsg.textContent='';
    hide(startSection); show(quizContainer); showLeaderboard();
    showQuestion();
  } catch(e){ console.error(e); startMsg.textContent='Erro ao carregar perguntas.'; }
}

function showQuestion(){
  if(current>=questions.length) return endQuiz();
  const q=questions[current];
  questionText.textContent=q.question;
  answersDiv.innerHTML='';
  q.options.forEach((opt,idx)=>{
    const btn=document.createElement('button');
    btn.className='btn-answer';
    btn.textContent=getOptionText(opt);
    btn.disabled=false;
    btn.onclick=()=>handleAnswer(idx,btn);
    answersDiv.appendChild(btn);
  });
  progressText.textContent=`Pergunta ${current+1} de ${questions.length}`;
  btnNext.classList.add('hidden');
  startTimer();
}

function handleAnswer(selectedIdx, btnEl){
  stopTimer();
  const q=questions[current], correctIdx=q.correctIndex;
  [...answersDiv.children].forEach((b,idx)=>{b.disabled=true; if(correctIdx!==null&&idx===correctIdx)b.style.outline='2px solid #16a34a'; else if(idx===selectedIdx&&selectedIdx!==correctIdx)b.style.outline='2px solid #ef4444';});
  if(correctIdx!==null&&selectedIdx===correctIdx) score++;
  btnNext.classList.remove('hidden');
}

function startTimer(){
  let t=TIME_PER_QUESTION; timerText.textContent=`Tempo: ${t}s`;
  clearInterval(timerId);
  timerId=setInterval(()=>{ t--; timerText.textContent=`Tempo: ${t}s`; if(t<=0){ clearInterval(timerId); timeUp(); } },1000);
}

function stopTimer(){ if(timerId) clearInterval(timerId); timerId=null; }

function timeUp(){
  [...answersDiv.children].forEach(b=>b.disabled=true);
  const q=questions[current];
  if(q.correctIndex!==null) answersDiv.children[q.correctIndex].style.outline='2px solid #16a34a';
  btnNext.classList.remove('hidden');
}

btnNext.addEventListener('click',()=>{ current++; showQuestion(); });

function endQuiz(){
  stopTimer(); hide(quizContainer); show(resultSection);
  scoreTitle.textContent=`Parabéns, ${playerName}!`;
  scoreText.textContent=`Você acertou ${score} de ${questions.length} perguntas.`;
  saveLeaderboard(); showLeaderboard();
}

function saveLeaderboard(){
  const key='hackathon_leaderboard_v1';
  const arr=JSON.parse(localStorage.getItem(key)||'[]');
  arr.push({name:playerName,score,date:new Date().toISOString()});
  arr.sort((a,b)=>b.score-a.score || (new Date(a.date)-new Date(b.date)));
  localStorage.setItem(key,JSON.stringify(arr));
}

function showLeaderboard(){
  const arr=JSON.parse(localStorage.getItem('hackathon_leaderboard_v1')||'[]');
  leaderboardList.innerHTML='';
  if(!arr.length) leaderboardList.innerHTML='<li>Nenhum resultado ainda</li>';
  else arr.forEach((p,i)=>{const li=document.createElement('li'); li.textContent=`${i+1}. ${p.name} - ${p.score}`; if(i===0) li.style.fontWeight='700'; leaderboardList.appendChild(li);});
}

btnReplay.addEventListener('click',()=>{ hide(resultSection); hide(quizContainer); show(startSection); playerInput.value=''; });
btnStart.addEventListener('click',startQuiz);
showLeaderboard();  