const questions = [
  {
    title: "За каким спортом следишь?",
    hint: "Выбери то, что включаешь чаще всего.",
    options: ["⚽ Футбол", "🏒 Хоккей", "🎾 Теннис", "🏀 Баскетбол", "🥊 Единоборства", "◎ Другое"]
  },
  {
    title: "Как тебе интереснее смотреть?",
    hint: "Здесь нет правильного ответа.",
    options: ["Большие турниры", "Матчи любимой команды", "Яркие отдельные игры", "Пока просто изучаю"]
  },
  {
    title: "Что важнее в спортивной площадке?",
    hint: "Учтём это в подборке.",
    options: ["Понятный интерфейс", "Нужные мне виды спорта", "Условия и правила", "Сначала хочу разобраться"]
  }
];

const answers = [];
let currentStep = 0;
const questionArea = document.querySelector("#question-area");
const nextButton = document.querySelector("#next-button");
const backButton = document.querySelector("#back-button");
const partnerGrid = document.querySelector("#partner-grid");
const partnerCards = document.querySelectorAll(".partner-card");
const partnerSelection = document.querySelector("#partner-selection");
const selectionLabel = document.querySelector("#selection-label");
const selectedBrand = document.querySelector("#selected-brand");
const selectedCopy = document.querySelector("#selected-copy");
const partnerLink = document.querySelector("#partner-link");

const partners = {
  betboom: {
    name: "BETBOOM",
    copy: "Карточка BETBOOM выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  fonbet: {
    name: "FONBET",
    copy: "Карточка FONBET выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  winline: {
    name: "WINLINE",
    copy: "Карточка Winline выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  pari: {
    name: "PARI",
    copy: "Карточка PARI выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  betcity: {
    name: "БЕТСИТИ",
    copy: "Карточка БЕТСИТИ выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  leon: {
    name: "LEON",
    copy: "Карточка LEON выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  marathonbet: {
    name: "MARATHONBET",
    copy: "Карточка MARATHONBET выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  ligastavok: {
    name: "ЛИГА СТАВОК",
    copy: "Карточка ЛИГА СТАВОК выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  bettery: {
    name: "BETTERY",
    copy: "Карточка BETTERY выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  olimpbet: {
    name: "OLIMPBET",
    copy: "Карточка OLIMPBET выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  zenitbet: {
    name: "ZENITBET",
    copy: "Карточка ZENITBET выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  },
  baltbet: {
    name: "БАЛТБЕТ",
    copy: "Карточка БАЛТБЕТ выбрана. Перед подключением перехода добавьте актуальные условия предложения, обязательную маркировку рекламы и реферальную ссылку.",
    refUrl: ""
  }
};

function renderQuestion() {
  const question = questions[currentStep];
  document.querySelector("#step-caption").textContent = `ШАГ 0${currentStep + 1} / 03`;
  document.querySelector("#progress-fill").style.width = `${((currentStep + 1) / questions.length) * 100}%`;
  backButton.hidden = currentStep === 0;
  nextButton.disabled = !answers[currentStep];
  nextButton.innerHTML = currentStep === questions.length - 1 ? "Показать подборку <span>→</span>" : "Дальше <span>→</span>";
  questionArea.innerHTML = `<h3 class="question-title">${question.title}</h3><p class="question-hint">${question.hint}</p><div class="options">${question.options.map((option) => `<button class="option${answers[currentStep] === option ? " selected" : ""}" type="button" aria-pressed="${answers[currentStep] === option}">${option}</button>`).join("")}</div>`;
  questionArea.querySelectorAll(".option").forEach((button) => {
    button.addEventListener("click", () => {
      answers[currentStep] = button.textContent.trim();
      questionArea.querySelectorAll(".option").forEach((option) => {
        const selected = option === button;
        option.classList.toggle("selected", selected);
        option.setAttribute("aria-pressed", String(selected));
      });
      nextButton.disabled = false;
    });
  });
}

document.querySelector("#start-button").addEventListener("click", () => {
  document.querySelector("#quiz-section").scrollIntoView({ behavior: "smooth" });
});

nextButton.addEventListener("click", () => {
  if (!answers[currentStep]) return;
  if (currentStep < questions.length - 1) {
    currentStep += 1;
    renderQuestion();
    return;
  }
  const sport = answers[0].replace(/^\S+\s/, "");
  const style = answers[1].toLowerCase();
  const priority = answers[2].toLowerCase();
  document.querySelector("#result-summary").textContent = `Тебе интересен ${sport.toLowerCase()}, особенно ${style}. При выборе площадки для тебя важно: ${priority}. Ниже — место для прозрачного и актуального предложения спортивного партнёра.`;
  document.querySelector("#result-section").hidden = false;
  document.querySelector("#result-section").scrollIntoView({ behavior: "smooth" });
});

backButton.addEventListener("click", () => {
  if (currentStep === 0) return;
  currentStep -= 1;
  renderQuestion();
});

document.querySelector("#restart-button").addEventListener("click", () => {
  answers.length = 0;
  currentStep = 0;
  document.querySelector("#result-section").hidden = true;
  renderQuestion();
  document.querySelector("#quiz-section").scrollIntoView({ behavior: "smooth" });
});

partnerCards.forEach((card) => {
  card.addEventListener("click", () => {
    const partner = partners[card.dataset.partner];
    if (!partner) return;

    partnerCards.forEach((item) => {
      const isSelected = item === card;
      item.classList.toggle("is-selected", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    partnerGrid.classList.add("has-selection");
    partnerSelection.classList.add("has-selection");
    selectionLabel.textContent = `ВЫБРАНА КАРТОЧКА — ${partner.name}`;
    selectedBrand.textContent = partner.name;
    selectedCopy.textContent = partner.copy;
    partnerLink.disabled = !partner.refUrl;
    partnerLink.innerHTML = partner.refUrl ? `Перейти на сайт ${partner.name} <span>↗</span>` : `Ссылка ${partner.name} не подключена <span>↗</span>`;
  });
});

partnerLink.addEventListener("click", () => {
  const selectedCard = document.querySelector(".partner-card.is-selected");
  const partner = selectedCard && partners[selectedCard.dataset.partner];
  if (partner?.refUrl) window.location.assign(partner.refUrl);
});

renderQuestion();
