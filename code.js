// script.js
document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'http://187.102.36.3:8091/quiz/5';
    let questions = [];
    let currentQuestionIndex = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let points = 0;
    let playerName = '';
    let timer;
    let timeLeft = 10;
    let helpUses = 0;
    let doubleQuestionIndex = Math.floor(Math.random() * 5); // Tudo ou Nada: pergunta aleatória dobra pontos
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

    const screens = {
        welcome: document.getElementById('welcome'),
        luckMessage: document.getElementById('luckMessage'),
        quiz: document.getElementById('quiz'),
        end: document.getElementById('end'),
        leaderboard: document.getElementById('leaderboard')
    };

    const elements = {
        playerName: document.getElementById('playerName'),
        startBtn: document.getElementById('startBtn'),
        luckText: document.getElementById('luckText'),
        progress: document.getElementById('currentQuestion'),
        timer: document.getElementById('timeLeft'),
        question: document.getElementById('question'),
        options: document.getElementById('options'),
        helpBtn: document.getElementById('helpBtn'),
        feedback: document.getElementById('feedback'),
        correctCount: document.getElementById('correctCount'),
        wrongCount: document.getElementById('wrongCount'),
        points: document.getElementById('points'),
        finalPoints: document.getElementById('finalPoints'),
        playAgainBtn: document.getElementById('playAgainBtn'),
        leaderList: document.getElementById('leaderList')
    };

    elements.startBtn.addEventListener('click', startQuiz);
    elements.helpBtn.addEventListener('click', useHelp);
    elements.playAgainBtn.addEventListener('click', playAgain);

    function showScreen(screen) {
        Object.values(screens).forEach(s => s.classList.add('hidden'));
        screens[screen].classList.remove('hidden');
    }

    async function fetchQuestions() {
        try {
            const response = await fetch(API_URL);
            questions = await response.json();
        } catch (error) {
            console.error('Erro ao buscar perguntas:', error);
            // Fallback: perguntas mockadas se API falhar
            questions = [
                { question: 'Qual é a capital do Brasil?', options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Belo Horizonte'], answer: 'Brasília' },
                { question: '2 + 2 = ?', options: ['3', '4', '5', '6'], answer: '4' },
                { question: 'Qual é o maior planeta?', options: ['Terra', 'Marte', 'Júpiter', 'Saturno'], answer: 'Júpiter' },
                { question: 'Quem escreveu Dom Quixote?', options: ['Shakespeare', 'Cervantes', 'Dante', 'Goethe'], answer: 'Cervantes' },
                { question: 'Qual é o símbolo químico do ouro?', options: ['Au', 'Ag', 'Fe', 'Cu'], answer: 'Au' }
            ];
        }
    }

    function startQuiz() {
        playerName = elements.playerName.value.trim();
        if (!playerName) {
            alert('Digite seu nome!');
            return;
        }
        showScreen('luckMessage');
        elements.luckText.textContent = `Boa sorte, ${playerName}!`;
        setTimeout(async () => {
            await fetchQuestions();
            showScreen('quiz');
            loadQuestion();
        }, 2000);
    }

    function loadQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
            return;
        }
        const q = questions[currentQuestionIndex];
        elements.question.textContent = q.question;
        elements.progress.textContent = currentQuestionIndex + 1;
        elements.options.innerHTML = '';
        q.options.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'option';
            btn.textContent = option;
            btn.addEventListener('click', () => selectAnswer(option));
            elements.options.appendChild(btn);
        });
        elements.feedback.classList.add('hidden');
        startTimer();
    }

    function startTimer() {
        timeLeft = 10;
        elements.timer.textContent = timeLeft;
        timer = setInterval(() => {
            timeLeft--;
            elements.timer.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                selectAnswer(null); // Tempo esgotado
            }
        }, 1000);
    }

    function selectAnswer(selected) {
        clearInterval(timer);
        const q = questions[currentQuestionIndex];
        const isCorrect = selected === q.answer;
        let questionPoints = timeLeft; // Pontos baseados no tempo restante
        if (currentQuestionIndex === doubleQuestionIndex) {
            questionPoints *= 2; // Tudo ou Nada
        }
        if (isCorrect) {
            correctCount++;
            points += questionPoints;
            elements.feedback.textContent = 'Correto!';
            elements.feedback.className = 'correct';
        } else {
            wrongCount++;
            points -= questionPoints; // Perda de pontos
            elements.feedback.textContent = `Errado! Resposta correta: ${q.answer}`;
            elements.feedback.className = 'wrong';
        }
        elements.feedback.classList.remove('hidden');
        updateScore();
        setTimeout(() => {
            currentQuestionIndex++;
            loadQuestion();
        }, 2000);
    }

    function useHelp() {
        if (helpUses >= 2) {
            alert('Você já usou a ajuda 2 vezes!');
            return;
        }
        helpUses++;
        const q = questions[currentQuestionIndex];
        const incorrectOptions = q.options.filter(opt => opt !== q.answer);
        const toRemove = incorrectOptions.slice(0, 2);
        const optionBtns = elements.options.querySelectorAll('.option');
        optionBtns.forEach(btn => {
            if (toRemove.includes(btn.textContent)) {
                btn.style.display = 'none';
            }
        });
        points = Math.floor(points / 2); // Reduz pontos pela metade
        updateScore();
    }

    function updateScore() {
        elements.correctCount.textContent = correctCount;
        elements.wrongCount.textContent = wrongCount;
        elements.points.textContent = points;
    }

    function endQuiz() {
        showScreen('end');
        elements.finalPoints.textContent = points;
        leaderboard.push({ name: playerName, score: points });
        leaderboard.sort((a, b) => b.score - a.score);
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
        updateLeaderboard();
    }

    function updateLeaderboard() {
        elements.leaderList.innerHTML = '';
        leaderboard.forEach((entry, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. ${entry.name}: ${entry.score}`;
            if (index < 3) li.classList.add('top3');
            elements.leaderList.appendChild(li);
        });
    }

    function playAgain() {
        currentQuestionIndex = 0;
        correctCount = 0;
        wrongCount = 0;
        points = 0;
        helpUses = 0;
        doubleQuestionIndex = Math.floor(Math.random() * 5);
        updateScore();
        showScreen('welcome');
    }

    updateLeaderboard(); // Mostra leaderboard inicial
});
