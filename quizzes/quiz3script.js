const questions = [
  {
    title: "1/5 What's your go-to weekday breakfast?",
    options: [
      {
        text: "Homemade avocado toast and oat milk latte",
        value: "A",
        image: "https://i.ibb.co/56r4fS0/pexels-fotios-photos-1321942.jpg",
      },
      {
        text: "Black coffee and a pastry",
        value: "B",
        image: "https://i.ibb.co/ZL08zJP/pexels-viktoria-alipatova-1083711-2130166.jpg",
      },
      {
        text: "Cereal with milk",
        value: "C",
        image: "https://i.ibb.co/H421ffN/pexels-karolina-grabowska-4964560.jpg",
      },
      {
        text: "Full breakfast, lots of meat & dairy",
        value: "D",
        image: "https://i.ibb.co/wN1NJBs/pexels-snapwire-6863.jpg",
      },
    ],
  },
  {
    title: "2/5 How do you commute to school or work?",
    options: [
      {
        text: "Bike or walk",
        value: "A",
        image: "https://i.ibb.co/hX9YGTL/pexels-elina-sazonova-1850629.jpg",
      },
      {
        text: "Public transport",
        value: "B",
        image: "https://i.ibb.co/pRkjhY9/pexels-mart-production-7252581.jpg",
      },
      {
        text: "Carpool with friends",
        value: "C",
        image: "https://i.ibb.co/rGpnvmD/pexels-olly-3989923.jpg",
      },
      {
        text: "Drive solo in my car",
        value: "D",
        image: "https://i.ibb.co/qNFjxzc/pexels-mart-production-8869261.jpg",
      },
    ],
  },
  {
    title: "3/5 What’s your favorite snack?",
    options: [
      {
        text: "Fresh fruit or veggie sticks",
        value: "A",
        image: "https://i.ibb.co/F3HdnKt/pexels-cocarinne-11631581.jpg",
      },
      {
        text: "Granola bar or trail mix",
        value: "B",
        image: "https://i.ibb.co/rtZxFd7/pexels-annelies-brouw-976954-3065512.jpg",
      },
      {
        text: "Anything with cheese 🧀",
        value: "C",
        image: "https://i.ibb.co/dgjTKYX/pexels-pixabay-302457.jpg",
      },
      {
        text: "Packaged chips or cookies",
        value: "D",
        image: "https://i.ibb.co/tm9mCGT/pexels-pavel-danilyuk-8111369.jpg",
      },
    ],
  },
  {
    title: "4/5 How do you handle your shopping habits?",
    options: [
      {
        text: "Thrift everything or DIY my clothes",
        value: "A",
        image: "https://i.ibb.co/02nbf4b/pexels-cottonbro-6068971.jpg",
      },
      {
        text: "Some sustainable brands, some fast fashion",
        value: "B",
        image: "https://i.ibb.co/khwyqRj/pexels-artempodrez-6786904.jpg",
      },
      {
        text: "Fast fashion is my jam, but I reuse a lot",
        value: "C",
        image: "https://i.ibb.co/x3LMhr0/pexels-muhammad-dzaki-zaidan-23516854-6905586.jpg",
      },
      {
        text: "New wardrobe every season. YOLO!",
        value: "D",
        image: "https://i.ibb.co/k9D42pT/pexels-kish-1488463.jpg",
      },
    ],
  },
  {
    title: "5/5 What's your dinner vibe?",
    options: [
      {
        text: "Vegan or vegetarian meals",
        value: "A",
        image: "https://i.ibb.co/F3HdnKt/pexels-cocarinne-11631581.jpg",
      },
      {
        text: "Chicken, fish, or plant-based meat",
        value: "B",
        image: "https://i.ibb.co/TH9g173/pexels-aldenhoff-6354370.jpg",
      },
      {
        text: "Beef or lamb dishes",
        value: "C",
        image: "https://i.ibb.co/wN1NJBs/pexels-snapwire-6863.jpg",
      },
      {
        text: "Whatever's in the freezer",
        value: "D",
        image: "https://i.ibb.co/R41SZpq/pexels-cottonbro-4003794.jpg",
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
      resultTitle = "Low-Impact Legend 🌍";
      resultDescription =
        "Your carbon footprint is as light as a feather! From plant-based meals to eco-friendly habits, you’re walking the sustainability talk. Keep inspiring your friends to live greener too!";
      resultImage = "https://i.ibb.co/gJWb5TK/pexels-nina-hill-76946523-13211893.jpg";
      break;
    case "B":
      resultTitle = "Conscious Consumer ♻️";
      resultDescription =
        "You’re doing a great job balancing convenience and sustainability. Small tweaks, like eating less meat or biking more, could take your eco-game to the next level!";
      resultImage = "https://i.ibb.co/02nbf4b/pexels-cottonbro-6068971.jpg";
      break;
    case "C":
      resultTitle = "Carbon Middle Ground 🌤️";
      resultDescription =
        "You’re making an effort, but there’s room to grow. Try cutting back on meat, carpooling, or shopping secondhand to reduce your footprint even more!";
      resultImage = "https://i.postimg.cc/Pr5jYZ34/pexels-olly-3767397.jpg";
      break;
    case "D":
      resultTitle = "High-Impact 🌋";
      resultDescription =
        "Your lifestyle could use a little green makeover. Start small—swap your beef burger for a veggie one, or carpool instead of driving solo. Every step counts!";
      resultImage = "https://i.ibb.co/qNFjxzc/pexels-mart-production-8869261.jpg";
      break;
  }
  

  resultContainer.querySelector("h2").textContent = resultTitle;
  resultContainer.querySelector("#result-description").textContent =
    resultDescription;
  resultContainer.querySelector("img").src = resultImage;
}

// Start the quiz
renderQuestion();
