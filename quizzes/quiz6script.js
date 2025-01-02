const questions = [
  {
    title: "1/5 What’s your first reaction to hearing about a new climate crisis?",
    options: [
      {
        text: "Drafting a passionate email to your local government",
        value: "A",
        image: "https://i.ibb.co/ZXZJbZk/pexels-aaron-kittredge-35519-129112.jpg",
      },
      {
        text: "Sharing a list of sustainability tips with your social media followers",
        value: "B",
        image: "https://i.ibb.co/bWy5yCs/pexels-canaros-2852737.jpg",
      },
      {
        text: "Reading research articles and gathering data for solutions",
        value: "C",
        image: "https://i.ibb.co/9Zvh0k1/pexels-pixabay-159844.jpg",
      },
      {
        text: "Checking in on your friends and family, offering emotional support",
        value: "D",
        image: "https://i.ibb.co/FWL5xkM/pexels-olly-941555.jpg",
      },
    ],
  },
  {
    title: "2/5 How do you celebrate Earth Day?",
    options: [
      {
        text: "Organizing a letter-writing campaign for policy change",
        value: "A",
        image: "https://i.ibb.co/QJ9yLD1/pexels-sora-shimazaki-5673488.jpg",
      },
      {
        text: "Joining a community cleanup or planting trees",
        value: "B",
        image: "https://i.ibb.co/FK2HvnH/pexels-lara-jameson-8898890.jpg",
      },
      {
        text: "Designing educational curriculum on sustainable living",
        value: "C",
        image: "https://i.ibb.co/8bMFgR1/pexels-zhuhehuai-716276.jpg",
      },
      {
        text: "Analyzing your carbon footprint and setting new goals",
        value: "D",
        image: "https://i.ibb.co/xL9crdW/pexels-rdne-7648506.jpg",
      },
    ],
  },
  {
    title: "3/5 Which climate-related hobby sounds most appealing?",
    options: [
      {
        text: "Attending protests, rallies, and town hall meetings to push for policy change",
        value: "A",
        image: "https://i.ibb.co/2FNRXq6/pexels-ian-panelo-4502492.jpg",
      },
      {
        text: "Consulting small businesses on how to implement more sustainable practices",
        value: "B",
        image: "https://i.ibb.co/x29v7FY/pexels-fauxels-3184433.jpg",
      },
      {
        text: "Reading new climate science breakthroughs in research journals",
        value: "C",
        image: "https://i.ibb.co/BNMrgwZ/pexels-mkvisuals-2781195.jpg",
      },
      {
        text: "Building DIY renewable energy projects with friends",
        value: "D",
        image: "https://i.ibb.co/JQHr0hW/pexels-thisisengineering-3861958.jpg",
      },
    ],
  },
  {
    title: "4/5 How do you handle someone questioning climate science?",
    options: [
      {
        text: "Engaging them in a respectful yet fiery debate",
        value: "A",
        image: "https://i.ibb.co/rsKS29p/pexels-canvastudio-3153199.jpg",
      },
      {
        text: "Referring them to official policy recommendations",
        value: "B",
        image: "https://i.ibb.co/pQGhfWQ/pexels-growthgal-3719037.jpg",
      },
      {
        text: "Sharing a detailed infographic or article",
        value: "C",
        image: "https://i.ibb.co/9Zvh0k1/pexels-pixabay-159844.jpg",
      },
      {
        text: "Sharing real-world examples of how people's lives are being impacted",
        value: "D",
        image: "https://i.ibb.co/T1sjbJG/pexels-cottonbro-6636339.jpg",
      },
    ],
  },
  {
    title: "5/5 What's your ultimate climate meme mood?",
    options: [
      {
        text: "That exhausted feeling when you've been arguing with climate-deniers for so long...",
        value: "A",
        image: "https://i.ibb.co/64Rw0yt/meme1.jpg",
      },
      {
        text: "The Lorax is judging us all",
        value: "B",
        image: "https://i.ibb.co/x6GPNtj/meme2.jpg",
      },
      {
        text: "Just one more inspirational quote, maybe they'll believe the science now!",
        value: "C",
        image: "https://i.ibb.co/zS514yH/quote-earth.webp",
      },
      {
        text: "We can fix this everyone! Just be positive!",
        value: "D",
        image: "https://i.ibb.co/XVDVnWQ/meme4.jpg",
      },
    ],
  },
];




let currentQuestionIndex = 0;
let scores = { A: 0, B: 0, C: 0, D: 0 };

function renderQuestion() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = "";

  const question = questions[currentQuestionIndex];
  const shuffledOptions = question.options.sort(() => Math.random() - 0.5);

  const questionElement = document.createElement("div");
  questionElement.className = "question";
  questionElement.innerHTML = `<div class="question-title">${question.title}</div>`;

  const cardContainer = document.createElement("div");
  cardContainer.className = "card-container";

  shuffledOptions.forEach((option, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${option.image}" alt="${option.text}">
        <p>${option.text}</p>
      `;
    card.addEventListener("click", () => selectOption(option.value, card));
    cardContainer.appendChild(card);
  });

  questionElement.appendChild(cardContainer);
  quizContainer.appendChild(questionElement);
}

function selectOption(value, selectedCard) {
  // Update scores
  scores[value]++;

  // Highlight selected card
  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => card.classList.remove("selected"));
  selectedCard.classList.add("selected");

  // Move to the next question
  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }, 500);
}

function showResult() {
  const quizContainer = document.getElementById("quiz");
  const resultContainer = document.getElementById("result");

  quizContainer.classList.add("hidden");
  //resultContainer.classList.remove("hidden");

  // Find the highest score, breaking ties alphabetically
  const highestScore = Object.keys(scores)
    .sort() // Alphabetical order: ['A', 'B', 'C', 'D']
    .reduce((a, b) => (scores[a] >= scores[b] ? a : b)); // Prefer earlier alphabetical if tied

  let resultTitle, resultDescription, resultImage;
  switch (highestScore) {
    case "A":
      resultTitle = "The Climate Accountability Advocate";
      resultDescription = "You point out the hypocrisy, hold people accountable, and make others think twice about who’s really to blame. You're sharp and always on point.";
      resultImage = "https://i.ibb.co/pfQbzpC/Edgy-Climate-Meme.jpg"; // Replace with your correct file path or URL
      break;
    case "B":
      resultTitle = "The Renewable Energy Defender";
      resultDescription = "You’re all about solutions and can’t stand the haters. You believe in clean energy and won't let the doubters bring you down.";
      resultImage = "https://i.ibb.co/RgJQZrn/Renewable-Meme.webp"; // Replace with your correct file path or URL
      break;
    case "C":
      resultTitle = "The Data-Driven Warrior";
      resultDescription = "Numbers don’t lie, and neither do you. You’re the fact-checker of the climate world, and you back every claim with solid evidence.";
      resultImage = "https://i.ibb.co/QczWpmW/Data-Driven-Meme.jpg"; // Replace with your correct file path or URL
      break;
    case "D":
      resultTitle = "The Wholesome Earth Protector";
      resultDescription = "You and your friends are the epitome of teamwork and hope. You’re making a difference, one tree (or action) at a time.";
      resultImage = "https://i.ibb.co/MNXgwf9/Wholesome-Meme.webp"; // Replace with your correct file path or URL
      break;
  }
  
  
  

  resultContainer.querySelector("h2").textContent = resultTitle;
  resultContainer.querySelector("#result-description").textContent =
    resultDescription;
  resultContainer.querySelector("img").src = resultImage;
}

// Start the quiz
renderQuestion();
