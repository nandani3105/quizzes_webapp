const quizData = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "Home Tool Markup Language",
        "Hyperlinks and Text Markup Language",
        "Hyperlinking Text Markup Language"
      ],
      answer: 0
    },
    {
      question: "What does CSS stand for?",
      options: [
        "Colorful Style Sheets",
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Sheets"
      ],
      answer: 2
    },
    {
      question: "Which language runs in a web browser?",
      options: [
        "Java",
        "C",
        "Python",
        "JavaScript"
      ],
      answer: 3
    },
    {
      question: "What year was JavaScript launched?",
      options: [
        "1996",
        "1995",
        "1994",
        "None of the above"
      ],
      answer: 1
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timeLeft = 10;
  let timerId;
  
  const quizBox = document.getElementById('quiz');
  const resultBox = document.getElementById('result');
  const questionEl = document.getElementById('question');
  const scoreEl = document.getElementById('score');
  const buttons = [
    document.getElementById('btn0'),
    document.getElementById('btn1'),
    document.getElementById('btn2'),
    document.getElementById('btn3')
  ];
  const timerEl = document.getElementById('timer');
  const progressBar = document.getElementById('progress-bar');
  
  function startQuiz() {
    quizBox.classList.add('active');
    resultBox.classList.remove('active');
    currentQuestion = 0;
    score = 0;
    showQuestion();
  }
  
  function showQuestion() {
    const question = quizData[currentQuestion];
  
    questionEl.textContent = question.question;
    questionEl.classList.add('fade-in');
  
    question.options.forEach((option, index) => {
      buttons[index].textContent = option;
      buttons[index].className = 'option-btn';
      buttons[index].disabled = false;
    });
  
    updateProgress();
    startTimer();
  }
  
  function selectOption(selectedIndex) {
    clearInterval(timerId);
  
    const question = quizData[currentQuestion];
    buttons.forEach(btn => btn.disabled = true);
  
    if (selectedIndex === question.answer) {
      buttons[selectedIndex].classList.add('correct');
      score++;
    } else {
      buttons[selectedIndex].classList.add('wrong');
      buttons[question.answer].classList.add('correct');
    }
  }
  
  function nextQuestion() {
    clearInterval(timerId);
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showResult();
    }
  }
  
  function showResult() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');
    scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
  }
  
  function restartQuiz() {
    startQuiz();
  }
  
  function updateProgress() {
    const progress = ((currentQuestion) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  function startTimer() {
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    timerId = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
  
      if (timeLeft === 0) {
        clearInterval(timerId);
        autoSelect();
      }
    }, 1000);
  }
  
  function autoSelect() {
    buttons.forEach(btn => btn.disabled = true);
    const question = quizData[currentQuestion];
    buttons[question.answer].classList.add('correct');
  }
  
  startQuiz();
  