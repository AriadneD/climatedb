const questions = [
  {
    title: "1/5 How do you prefer to make an impact?",
    options: [
      {
        text: "Creating and advocating for new climate policies",
        value: "A",
        image: "https://i.ibb.co/ZXZJbZk/pexels-aaron-kittredge-35519-129112.jpg",
      },
      {
        text: "Rallying people for collective action about climate issues",
        value: "B",
        image: "https://i.ibb.co/bWy5yCs/pexels-canaros-2852737.jpg",
      },
      {
        text: "Teaching and spreading awareness about climate issues",
        value: "C",
        image: "https://i.ibb.co/9Zvh0k1/pexels-pixabay-159844.jpg",
      },
      {
        text: "Conducting research and gathering data to inform climate tech solutions",
        value: "D",
        image: "https://i.ibb.co/FWL5xkM/pexels-olly-941555.jpg",
      },
    ],
  },
  {
    title: "2/5 What's your ideal way to spend a Saturday?",
    options: [
      {
        text: "Meeting lawmakers to discuss climate policies",
        value: "A",
        image: "https://i.ibb.co/QJ9yLD1/pexels-sora-shimazaki-5673488.jpg",
      },
      {
        text: "Leading a protest or organizing a community cleanup event",
        value: "B",
        image: "https://i.ibb.co/FK2HvnH/pexels-lara-jameson-8898890.jpg",
      },
      {
        text: "Hosting a workshop or giving a presentation on environmental issues",
        value: "C",
        image: "https://i.ibb.co/8bMFgR1/pexels-zhuhehuai-716276.jpg",
      },
      {
        text: "Working on a project analyzing the impact of renewable energy sources",
        value: "D",
        image: "https://i.ibb.co/xL9crdW/pexels-rdne-7648506.jpg",
      },
    ],
  },
  {
    title: "3/5 What motivates you the most?",
    options: [
      {
        text: "Seeing real, systemic change through new laws and policies",
        value: "A",
        image: "https://i.ibb.co/2FNRXq6/pexels-ian-panelo-4502492.jpg",
      },
      {
        text: "Building relationships and empowering people to take action",
        value: "B",
        image: "https://i.ibb.co/x29v7FY/pexels-fauxels-3184433.jpg",
      },
      {
        text: "Watching others gain knowledge and take steps toward sustainable practices",
        value: "C",
        image: "https://i.ibb.co/BNMrgwZ/pexels-mkvisuals-2781195.jpg",
      },
      {
        text: "Uncovering data that can drive evidence-based decisions",
        value: "D",
        image: "https://i.ibb.co/JQHr0hW/pexels-thisisengineering-3861958.jpg",
      },
    ],
  },
  {
    title: "4/5 Which activity excites you the most?",
    options: [
      {
        text: "Drafting a policy proposal to present to decision-makers",
        value: "A",
        image: "https://i.ibb.co/rsKS29p/pexels-canvastudio-3153199.jpg",
      },
      {
        text: "Organizing a community town hall to address local climate concerns",
        value: "B",
        image: "https://i.ibb.co/pQGhfWQ/pexels-growthgal-3719037.jpg",
      },
      {
        text: "Designing a curriculum to teach students about climate science",
        value: "C",
        image: "https://i.ibb.co/9Zvh0k1/pexels-pixabay-159844.jpg",
      },
      {
        text: "Running experiments to test the effectiveness of a new eco-friendly technology",
        value: "D",
        image: "https://i.ibb.co/T1sjbJG/pexels-cottonbro-6636339.jpg",
      },
    ],
  },
  {
    title:
      "5/5 If you could pick one superpower to address climate change, what would it be?",
    options: [
      {
        text: "The ability to pass legislation instantly",
        value: "A",
        image: "https://i.ibb.co/QJ9yLD1/pexels-sora-shimazaki-5673488.jpg",
      },
      {
        text: "The power to unite every community into action",
        value: "B",
        image: "https://i.ibb.co/x29v7FY/pexels-fauxels-3184433.jpg",
      },
      {
        text: "The skill to educate and inspire everyone to care about the planet",
        value: "C",
        image: "https://i.ibb.co/BNMrgwZ/pexels-mkvisuals-2781195.jpg",
      },
      {
        text: "The capacity to discover groundbreaking innovations",
        value: "D",
        image: "https://i.ibb.co/b6wTcCs/pexels-lilartsy-1314410.jpg",
      },
    ],
  },
  // Add more questions in the same format...
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
      resultTitle = "Policy Advocate";
      resultDescription =
        "You thrive on influencing laws and policies for systemic change.";
      resultImage = "https://i.ibb.co/9yBnZck/pexels-mikhail-nilov-8846994.jpg";
      break;
    case "B":
      resultTitle = "Grassroots Organizer";
      resultDescription =
        "You excel at rallying communities for collective action.";
      resultImage = "https://i.ibb.co/p30V1WF/pexels-lara-jameson-8899225.jpg";
      break;
    case "C":
      resultTitle = "Educator";
      resultDescription = "You love spreading knowledge and empowering others.";
      resultImage = "https://i.ibb.co/wMNmFpJ/pexels-artempodrez-6990475.jpg";
      break;
    case "D":
      resultTitle = "Researcher";
      resultDescription =
        "You are driven by data and evidence-based solutions.";
      resultImage = "https://i.ibb.co/JQHr0hW/pexels-thisisengineering-3861958.jpg";
      break;
  }

  resultContainer.querySelector("h2").textContent = resultTitle;
  resultContainer.querySelector("#result-description").textContent =
    resultDescription;
  resultContainer.querySelector("img").src = resultImage;
}

// Start the quiz
renderQuestion();
