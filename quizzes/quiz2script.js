const questions = [
  {
    title: "1/5 What's your go-to outfit for a sunny day?",
    options: [
      {
        text: "A flowy dress, straw hat, and vintage basket bag",
        value: "A",
        image:
          "https://i.ibb.co/9rgS552/pexels-zayceva-tatiana-135444866-11971763.jpg",
      },
      {
        text: "Neutral tones, sleek sneakers, and a minimalist tote bag",
        value: "B",
        image: "https://i.ibb.co/khwyqRj/pexels-artempodrez-6786904.jpg",
      },
      {
        text: "High-waisted jeans, retro band tee, and thrifted sunnies",
        value: "C",
        image: "https://i.ibb.co/x3LMhr0/pexels-muhammad-dzaki-zaidan-23516854-6905586.jpg",
      },
      {
        text: "Cargo pants, oversized hoodie, and eco-friendly sneakers",
        value: "D",
        image: "https://i.ibb.co/pwF3Whw/pexels-cottonbro-6635985.jpg",
      },
    ],
  },
  {
    title: "2/5 What's your favorite weekend activity?",
    options: [
      {
        text: "Foraging for wildflowers or baking sourdough bread",
        value: "A",
        image: "https://i.ibb.co/SRw8YwC/pexels-cottonbro-5615921.jpg",
      },
      {
        text: "Exploring urban farmer’s markets or reorganizing your capsule wardrobe",
        value: "B",
        image: "https://i.ibb.co/nRRfpsh/pexels-alwaysontheroad-2977435.jpg",
      },
      {
        text: "Thrifting vintage finds or DIYing old furniture",
        value: "C",
        image: "https://i.ibb.co/02nbf4b/pexels-cottonbro-6068971.jpg",
      },
      {
        text: "Visiting botanical gardens or adding plants to your indoor jungle",
        value: "D",
        image: "https://i.ibb.co/H72D3Rc/pexels-stijn-dijkstra-1306815-2583853.jpg",
      },
    ],
  },
  {
    title: "3/5 What’s your dream sustainable home feature?",
    options: [
      {
        text: "A charming cottage surrounded by a thriving garden",
        value: "A",
        image: "https://i.ibb.co/cL5KsTJ/pexels-maximilian-orlowsky-515733-30008019.jpg",
      },
      {
        text: "A sleek, energy-efficient apartment with solar panels",
        value: "B",
        image: "https://i.ibb.co/6X08QJN/pexels-pixabay-533157.jpg",
      },
      {
        text: "A funky upcycled furniture setup with bold colors",
        value: "C",
        image: "https://i.ibb.co/5cq9FQf/pexels-erikanuor-11892594.jpg",
      },
      {
        text: "A green wall filled with thriving, lush plants",
        value: "D",
        image: "https://i.ibb.co/7XyvL3t/pexels-huy-phan-316220-2826787.jpg",
      },
    ],
  },
  {
    title: "4/5 How do you (sustainably) carry your groceries?",
    options: [
      {
        text: "A woven basket or a vintage-inspired tote",
        value: "A",
        image: "https://i.ibb.co/TqmXTg9/pexels-rachel-claire-4819387.jpg",
      },
      {
        text: "A simple, foldable reusable bag in neutral tones",
        value: "B",
        image: "https://i.ibb.co/92zJ8RB/pexels-vie-studio-8148587.jpg",
      },
      {
        text: "A bold patterned thrifted bag with lots of character",
        value: "C",
        image: "https://i.ibb.co/3R48Ggf/pexels-oleratomotshebe-16663996.jpg",
      },
      {
        text: "A plant-printed canvas bag that matches your vibe",
        value: "D",
        image: "https://i.ibb.co/0KTpBcy/pexels-i-rem-313369423-18088542.jpg",
      },
    ],
  },
  {
    title: "5/5 What’s your ultimate dream vacation?",
    options: [
      {
        text: "A countryside retreat with wildflower meadows and rustic vibes",
        value: "A",
        image: "https://i.ibb.co/pXyV6xZ/pexels-pixabay-358532.jpg",
      },
      {
        text: "A chic urban city known for its sustainability efforts",
        value: "B",
        image: "https://i.ibb.co/x1Tq305/pexels-willianjusten-29366211.jpg",
      },
      {
        text: "A road trip in a vintage van, stopping at quirky spots",
        value: "C",
        image: "https://i.ibb.co/QCbDWnN/pexels-alfonso-escalante-1319242-2832251.jpg",
      },
      {
        text: "A tropical rainforest adventure surrounded by greenery",
        value: "D",
        image: "https://i.ibb.co/DtmWWRV/pexels-ollivves-931007.jpg",
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
      resultTitle = "Cottagecore";
      resultDescription =
        "Your Vibe: Cozy, rustic, and nature-inspired.\n" +
        "Lifestyle: You thrive in idyllic countryside settings, surrounded by gardens and baking pies. Your love for sustainability blends perfectly with vintage aesthetics and slow living.\n" +
        "Sustainable Strength: DIY projects, growing your own food, and supporting local artisans.\n" +
        "Tip for You: Start a backyard garden or try composting to reduce food waste!";
      resultImage = "https://i.ibb.co/zQLVSsX/pexels-ozanculha-12189041.jpg";
      break;
    case "B":
      resultTitle = "Urban Minimalist";
      resultDescription =
        "Your Vibe: Sleek, modern, and effortlessly chic.\n" +
        "Lifestyle: You’re drawn to streamlined spaces, neutral tones, and practical solutions. Living sustainably for you means choosing quality over quantity and embracing small-space living.\n" +
        "Sustainable Strength: Capsule wardrobes, energy efficiency, and zero-waste practices.\n" +
        "Tip for You: Invest in energy-efficient appliances or join a local urban recycling initiative.";
      resultImage = "https://i.ibb.co/k2k3CFm/pexels-meike-664865296-20230624.jpg";
      break;
    case "C":
      resultTitle = "Retro Upcycler";
      resultDescription =
        "Your Vibe: Bold, colorful, and nostalgia-loving.\n" +
        "Lifestyle: You adore everything vintage and quirky, from old-school fashion to funky decor. Sustainability for you means finding treasures in thrift stores and giving old items new life.\n" +
        "Sustainable Strength: Upcycling, thrifting, and inspiring others to reduce and reuse.\n" +
        "Tip for You: Host a clothing swap with friends or get creative with DIY home projects!";
      resultImage = "https://i.ibb.co/3R48Ggf/pexels-oleratomotshebe-16663996.jpg";
      break;
    case "D":
      resultTitle = "Botanical Chic";
      resultDescription =
        "Your Vibe: Fresh, vibrant, and plant-obsessed.\n" +
        "Lifestyle: You’re at home wherever there’s greenery, and you love incorporating nature into every aspect of your life. For you, sustainability means creating harmony with the natural world.\n" +
        "Sustainable Strength: Urban gardening, eco-friendly decor, and advocating for biodiversity.\n" +
        "Tip for You: Try building a vertical garden or joining a local plant club.";
      resultImage = "https://i.ibb.co/gJWb5TK/pexels-nina-hill-76946523-13211893.jpg";
      break;
  }

  resultContainer.querySelector("h2").textContent = resultTitle;
  resultContainer.querySelector("#result-description").textContent =
    resultDescription;
  resultContainer.querySelector("img").src = resultImage;
}

// Start the quiz
renderQuestion();
