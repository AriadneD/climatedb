const questions = [
  {
    title: "1/5 How do you start your morning?",
    options: [
      {
        text: "Meditating or journaling while sipping herbal tea",
        value: "A",
        image: "https://i.ibb.co/p0SzjP8/pexels-viktoria-alipatova-1083711-2130166.jpg",
      },
      {
        text: "Quick workout and a protein shake",
        value: "B",
        image: "https://i.ibb.co/pj5GK2q/pexels-zakaria-2827392.jpg",
      },
      {
        text: "Scrolling social media while downing an iced coffee",
        value: "C",
        image: "https://i.ibb.co/XsX6cts/pexels-cottonbro-5081915.jpg",
      },
      {
        text: "Sleeping in and grabbing breakfast on the go",
        value: "D",
        image: "https://i.ibb.co/WxCwd5K/pexels-olly-914910.jpg",
      },
    ],
  },
  {
    title: "2/5 What’s your dream lunch plan?",
    options: [
      {
        text: "A locally-sourced vegan meal at a cute café",
        value: "A",
        image: "https://i.ibb.co/56r4fS0/pexels-fotios-photos-1321942.jpg",
      },
      {
        text: "Grabbing a salad bowl at a trendy spot with friends",
        value: "B",
        image: "https://i.ibb.co/TH9g173/pexels-aldenhoff-6354370.jpg",
      },
      {
        text: "Leftovers from last night’s dinner",
        value: "C",
        image: "https://i.ibb.co/R41SZpq/pexels-cottonbro-4003794.jpg",
      },
      {
        text: "Ordering takeout from your favorite burger joint",
        value: "D",
        image: "https://i.ibb.co/BtyZxnF/pexels-valeriya-1199957.jpg",
      },
    ],
  },
  {
    title: "3/5 How do you spend your afternoon?",
    options: [
      {
        text: "Gardening or volunteering at a local climate organization",
        value: "A",
        image: "https://i.ibb.co/SRw8YwC/pexels-cottonbro-5615921.jpg",
      },
      {
        text: "Exploring the city or hitting up a farmer's market",
        value: "B",
        image: "https://i.ibb.co/nRRfpsh/pexels-alwaysontheroad-2977435.jpg",
      },
      {
        text: "Binge-watching your favorite show",
        value: "C",
        image: "https://i.ibb.co/PNv36gL/pexels-cottonbro-4009407.jpg",
      },
      {
        text: "Enjoying a walk outdoors",
        value: "D",
        image: "https://i.ibb.co/gJWb5TK/pexels-nina-hill-76946523-13211893.jpg",
      },
    ],
  },
  {
    title: "4/5 What’s your evening vibe?",
    options: [
      {
        text: "Cooking a sustainable dinner with friends",
        value: "A",
        image: "https://i.ibb.co/F3HdnKt/pexels-cocarinne-11631581.jpg",
      },
      {
        text: "Attending a workout class or doing yoga",
        value: "B",
        image: "https://i.ibb.co/7tL8pvh/pexels-zakaria-2827392.jpg",
      },
      {
        text: "Catching up on social media or gaming",
        value: "C",
        image: "https://i.ibb.co/XsX6cts/pexels-cottonbro-5081915.jpg",
      },
      {
        text: "Ordering pizza and watching a movie",
        value: "D",
        image: "https://i.ibb.co/PNv36gL/pexels-cottonbro-4009407.jpg",
      },
    ],
  },
  {
    title: "5/5 How do you wind down before bed?",
    options: [
      {
        text: "Reading a book or practicing mindfulness",
        value: "A",
        image: "https://i.ibb.co/BNMrgwZ/pexels-mkvisuals-2781195.jpg",
      },
      {
        text: "Catching up on texts and planning tomorrow",
        value: "B",
        image: "https://i.ibb.co/XsX6cts/pexels-cottonbro-5081915.jpg",
      },
      {
        text: "Watching YouTube or scrolling TikTok",
        value: "C",
        image: "https://i.ibb.co/PNv36gL/pexels-cottonbro-4009407.jpg",
      },
      {
        text: "Nothing, just falling asleep",
        value: "D",
        image: "https://i.ibb.co/WxCwd5K/pexels-olly-914910.jpg",
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
      resultTitle = "Greta Thunberg 🌍";
      resultDescription =
        "You’re all about action and standing up for what’s right. Like Greta, you lead by example and inspire others to make a change. Keep channeling that eco-energy!";
      resultImage = "https://i.ibb.co/5xfFYQ6/132521278-37b07b233ee1cd443fffd5967930d43284a067a6-1.jpg";
      break;
    case "B":
      resultTitle = "Leonardo DiCaprio 🐾";
      resultDescription =
        "You’re passionate and proactive, using your influence to raise awareness for big environmental issues. Like Leo, you’re all about meaningful impact—one planet at a time.";
      resultImage = "https://i.ibb.co/j3FTJJj/Leonardo-Di-Caprio-Hair-Wave.webp";
      break;
    case "C":
      resultTitle = "Billie Eilish 🌱";
      resultDescription =
        "You’re all about creativity and connecting with others through your sustainable lifestyle. Like Billie, you use your platform to promote change and challenge norms.";
      resultImage = "https://i.ibb.co/gw36Yrm/billie-eilish-vinyl-variants.webp";
      break;
    case "D":
      resultTitle = "David Attenborough 🦋";
      resultDescription =
        "You’re a storyteller at heart, passionate about showing others the beauty of the planet. Like Sir David, you’re all about educating people on why Earth is worth saving.";
      resultImage = "https://i.ibb.co/M2Z0gHM/p0g58ss5.jpg";
      break;
  }
  

  resultContainer.querySelector("h2").textContent = resultTitle;
  resultContainer.querySelector("#result-description").textContent =
    resultDescription;
  resultContainer.querySelector("img").src = resultImage;
}

// Start the quiz
renderQuestion();
