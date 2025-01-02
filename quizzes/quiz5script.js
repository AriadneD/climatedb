const questions = [
  {
    title: "1/5 How do you make a great first impression?",
    options: [
      {
        text: "Confidently sharing my big plans for the planet",
        value: "A",
        image: "https://i.ibb.co/xL9crdW/pexels-rdne-7648506.jpg",
      },
      {
        text: "Connecting with everyone in the room and making them feel included",
        value: "B",
        image: "https://i.ibb.co/x29v7FY/pexels-fauxels-3184433.jpg",
      },
      {
        text: "Talking about meaningful topics and sharing knowledge",
        value: "C",
        image: "https://i.ibb.co/b6wTcCs/pexels-lilartsy-1314410.jpg",
      },
      {
        text: "Listening attentively and offering thoughtful solutions",
        value: "D",
        image: "https://i.ibb.co/rsKS29p/pexels-canvastudio-3153199.jpg",
      },
    ],
  },
  {
    title: "2/5 What’s your idea of a perfect date?",
    options: [
      {
        text: "Attending a climate rally together",
        value: "A",
        image: "https://i.ibb.co/FK2HvnH/pexels-lara-jameson-8898890.jpg",
      },
      {
        text: "Volunteering at a local beach cleanup together",
        value: "B",
        image: "https://i.ibb.co/Jnt37rR/pexels-ron-lach-9037600.jpg",
      },
      {
        text: "Cooking a new sustainable recipe together!",
        value: "C",
        image: "https://i.ibb.co/VwpsqVj/pexels-pavel-danilyuk-7653653.jpg",
      },
      {
        text: "Going on a nature hike and admiring the scenery",
        value: "D",
        image: "https://i.ibb.co/DtmWWRV/pexels-ollivves-931007.jpg",
      },
    ],
  },
  {
    title: "3/5 What’s your favorite way to show love for the planet?",
    options: [
      {
        text: "Lobbying for impactful climate laws",
        value: "A",
        image: "https://i.ibb.co/FK2HvnH/pexels-lara-jameson-8898890.jpg",
      },
      {
        text: "Organizing community events to build awareness",
        value: "B",
        image: "https://i.ibb.co/pQGhfWQ/pexels-growthgal-3719037.jpg",
      },
      {
        text: "Hosting workshops and sharing sustainable hacks",
        value: "C",
        image: "https://i.ibb.co/x29v7FY/pexels-fauxels-3184433.jpg",
      },
      {
        text: "Innovating new ways to solve environmental challenges",
        value: "D",
        image: "https://i.ibb.co/2FNRXq6/pexels-ian-panelo-4502492.jpg",
      },
    ],
  },
  {
    title: "4/5 What do you look for in a climate-conscious partner?",
    options: [
      {
        text: "Ambition to drive real-world change",
        value: "A",
        image: "https://i.ibb.co/2FNRXq6/pexels-ian-panelo-4502492.jpg",
      },
      {
        text: "Empathy and the ability to unite others",
        value: "B",
        image: "https://i.ibb.co/x29v7FY/pexels-fauxels-3184433.jpg",
      },
      {
        text: "Passion for sharing knowledge and inspiring action",
        value: "C",
        image: "https://i.ibb.co/b6wTcCs/pexels-lilartsy-1314410.jpg",
      },
      {
        text: "Curiosity and a drive to solve big problems",
        value: "D",
        image: "https://i.ibb.co/BNMrgwZ/pexels-mkvisuals-2781195.jpg",
      },
    ],
  },
  {
    title: "5/5 Which eco-gesture wins your heart?",
    options: [
      {
        text: "Advocating for green policies with passion",
        value: "A",
        image: "https://i.ibb.co/9yBnZck/pexels-mikhail-nilov-8846994.jpg",
      },
      {
        text: "Leading a community composting initiative",
        value: "B",
        image: "https://i.ibb.co/1vkKP91/pexels-greta-hoffman-7728868.jpg",
      },
      {
        text: "Teaching a friend how to recycle correctly",
        value: "C",
        image: "https://i.ibb.co/xL9crdW/pexels-rdne-7648506.jpg",
      },
      {
        text: "Inventing a device that reduces water waste",
        value: "D",
        image: "https://i.ibb.co/b6wTcCs/pexels-lilartsy-1314410.jpg",
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
      resultTitle = "Policy Change Maker";
      resultDescription =
        "Your ideal eco-date is someone who dreams big and acts bigger. They thrive on systemic change and love influencing laws to protect the planet. Together, you’re unstoppable at tackling climate issues head-on.";
      resultImage = "https://i.ibb.co/9yBnZck/pexels-mikhail-nilov-8846994.jpg";
      break;
    case "B":
      resultTitle = "Climate Action Catalyst";
      resultDescription =
        "You need a partner who believes in the power of community. They rally people, lead beach cleanups, and thrive on collective action. Together, you’re building a greener, more connected future.";
      resultImage = "https://i.ibb.co/p30V1WF/pexels-lara-jameson-8899225.jpg";
      break;
    case "C":
      resultTitle = "Eco-Knowledge Sharer";
      resultDescription =
        "Your ideal partner loves sharing knowledge and empowering others. From hosting workshops to teaching sustainable living, they’re the kind of person who turns ideas into action.";
      resultImage = "https://i.ibb.co/bWy5yCs/pexels-canaros-2852737.jpg";
      break;
    case "D":
      resultTitle = "Green Tech Visionary";
      resultDescription =
        "You’re drawn to someone who’s endlessly curious and passionate about solutions. They’re always brainstorming the next big thing in climate tech, and together, you’ll invent the future.";
      resultImage = "https://i.ibb.co/BNMrgwZ/pexels-mkvisuals-2781195.jpg";
      break;
  }
  
  

  resultContainer.querySelector("h2").textContent = resultTitle;
  resultContainer.querySelector("#result-description").textContent =
    resultDescription;
  resultContainer.querySelector("img").src = resultImage;
}

// Start the quiz
renderQuestion();
