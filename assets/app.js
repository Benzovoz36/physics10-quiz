/* ============================================================
   Физика 10 — викторина
   ============================================================ */

const TOPICS = {
  all: { name: "Все темы" },
  kinematics: { name: "Кинематика" },
  dynamics: { name: "Динамика и законы сохранения" },
  molecular: { name: "МКТ и термодинамика" },
  electricity: { name: "Электричество" },
};

const ICONS = {
  spark:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="M18.5 16.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18c5.5 0 6-12 12-12"/><path d="M11 6h4v4"/><path d="M3 18h3"/></svg>',
  cube:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2.8l8 4.6v9.2l-8 4.6-8-4.6V7.4z"/><path d="M12 12l8-4.6M12 12L4 7.4M12 12v9.2"/></svg>',
  molecule:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="7" cy="7" r="2.6"/><circle cx="17.5" cy="9" r="2.4"/><circle cx="9.5" cy="17.5" r="2.4"/><path d="M9.4 8.1l5.6.7M8.1 9.5l.9 5.3M15.9 11l-4.2 4.8"/></svg>',
  bolt:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 2.5L4.5 14H11l-1 7.5L19.5 10H13z"/></svg>',
};

const TOPIC_ICONS = {
  all: ICONS.spark,
  kinematics: ICONS.arrow,
  dynamics: ICONS.cube,
  molecular: ICONS.molecule,
  electricity: ICONS.bolt,
};

const QUESTIONS = [
  {
    id: 1,
    topic: "kinematics",
    image: "assets/images/q01.svg",
    alt: "Схема: брусок на наклонной плоскости, отмечены скорость, высота и угол наклона",
    text: "Брусок начинает равноускоренное движение из состояния покоя и за 4 с проходит 8 м. Чему равно ускорение бруска?",
    options: ["0,5 м/с²", "1 м/с²", "2 м/с²", "4 м/с²"],
    correct: 1,
    explanation:
      "При равноускоренном движении без начальной скорости путь равен s = at²/2. Отсюда a = 2s/t² = 2 · 8 / 4² = 1 м/с².",
  },
  {
    id: 2,
    topic: "kinematics",
    image: "assets/images/q02.svg",
    alt: "Схема: тело свободно падает с высоты, показано ускорение свободного падения",
    text: "Тело свободно падает с высоты 20 м без начальной скорости. Сколько времени длится падение? g = 10 м/с².",
    options: ["1 с", "2 с", "4 с", "20 с"],
    correct: 1,
    explanation:
      "Путь при свободном падении: h = gt²/2. Тогда t = √(2h/g) = √(2 · 20 / 10) = √4 = 2 с.",
  },
  {
    id: 3,
    topic: "dynamics",
    image: "assets/images/q03.svg",
    alt: "Схема: брусок массы m, к которому приложена сила F, и ускорение a",
    text: "На тело массой 2 кг действует равнодействующая сила 6 Н. С каким ускорением движется тело?",
    options: ["12 м/с²", "8 м/с²", "3 м/с²", "0,33 м/с²"],
    correct: 2,
    explanation:
      "По второму закону Ньютона a = F/m = 6 / 2 = 3 м/с². Направление ускорения совпадает с направлением равнодействующей силы.",
  },
  {
    id: 4,
    topic: "dynamics",
    image: "assets/images/q04.svg",
    alt: "Схема: два шара сближаются перед столкновением, показаны скорости",
    text: "Шар массой 0,5 кг движется со скоростью 4 м/с. Чему равен модуль импульса шара?",
    options: ["0,125 кг·м/с", "2 кг·м/с", "4,5 кг·м/с", "8 кг·м/с"],
    correct: 1,
    explanation: "Импульс тела равен произведению массы на скорость: p = mv = 0,5 · 4 = 2 кг·м/с.",
  },
  {
    id: 5,
    topic: "dynamics",
    image: "assets/images/q05.svg",
    alt: "Схема: ящик тянут за верёвку под углом к горизонту",
    text: "Ящик тянут по горизонтали за верёвку, направленную под углом α к горизонту, с силой F. Какая формула выражает работу этой силы при перемещении ящика на s?",
    options: ["A = F · s", "A = F · s · cos α", "A = F · s · sin α", "A = F · s / 2"],
    correct: 1,
    explanation:
      "Работа силы A = F · s · cos α, где α — угол между вектором силы и направлением перемещения. В работу входит проекция силы на направление движения.",
  },
  {
    id: 6,
    topic: "dynamics",
    image: "assets/images/q06.svg",
    alt: "Схема: математический маятник, показаны крайнее и нижнее положения и высота h",
    text: "Мяч бросили вертикально вверх со скоростью 10 м/с. На какую максимальную высоту он поднимется? Сопротивлением воздуха пренебречь, g = 10 м/с².",
    options: ["2,5 м", "5 м", "10 м", "20 м"],
    correct: 1,
    explanation:
      "В верхней точке вся кинетическая энергия переходит в потенциальную: mv²/2 = mgh. Отсюда h = v²/(2g) = 100 / 20 = 5 м.",
  },
  {
    id: 7,
    topic: "molecular",
    image: "assets/images/q07.svg",
    alt: "Схема: сосуд с молекулами идеального газа",
    text: "Как изменится давление идеального газа, если концентрацию молекул увеличить в 2 раза, а среднюю кинетическую энергию их теплового движения оставить прежней?",
    options: ["Уменьшится в 2 раза", "Не изменится", "Увеличится в 2 раза", "Увеличится в 4 раза"],
    correct: 2,
    explanation:
      "Давление идеального газа p = (2/3) · n · Ēк, где n — концентрация молекул. При неизменной средней кинетической энергии давление пропорционально концентрации, поэтому оно увеличится в 2 раза.",
  },
  {
    id: 8,
    topic: "molecular",
    image: "assets/images/q08.svg",
    alt: "Схема: цилиндр с поршнем, газ сжимают",
    text: "В сосуде объёмом 20 л находится 1 моль идеального газа при температуре 300 К. Чему примерно равно давление газа? R = 8,31 Дж/(моль·К).",
    options: ["12,5 кПа", "50 кПа", "125 кПа", "250 кПа"],
    correct: 2,
    explanation:
      "Уравнение Менделеева — Клапейрона: pV = νRT. Объём 20 л = 0,020 м³. Тогда p = νRT/V = 1 · 8,31 · 300 / 0,020 ≈ 1,25 · 10⁵ Па ≈ 125 кПа.",
  },
  {
    id: 9,
    topic: "molecular",
    image: "assets/images/q09.svg",
    alt: "Схема: газу передают количество теплоты Q, газ совершает работу A",
    text: "Газу передали 300 Дж теплоты, и он совершил работу 100 Дж. Как изменилась внутренняя энергия газа?",
    options: ["Уменьшилась на 400 Дж", "Увеличилась на 200 Дж", "Увеличилась на 400 Дж", "Не изменилась"],
    correct: 1,
    explanation:
      "Первый закон термодинамики: ΔU = Q − A. Газ получил Q = 300 Дж и совершил работу A = 100 Дж, значит ΔU = 300 − 100 = 200 Дж — внутренняя энергия увеличилась.",
  },
  {
    id: 10,
    topic: "electricity",
    image: "assets/images/q10.svg",
    alt: "Схема: два разноимённых заряда притягиваются, показано расстояние r",
    text: "Как изменится сила кулоновского взаимодействия двух точечных зарядов, если расстояние между ними увеличить в 3 раза?",
    options: ["Уменьшится в 3 раза", "Увеличится в 3 раза", "Уменьшится в 9 раз", "Увеличится в 9 раз"],
    correct: 2,
    explanation:
      "Сила Кулона обратно пропорциональна квадрату расстояния: F = k · |q₁q₂| / r². При увеличении r в 3 раза сила уменьшится в 3² = 9 раз.",
  },
  {
    id: 11,
    topic: "electricity",
    image: "assets/images/q11.svg",
    alt: "Схема электрической цепи с резистором R, источником тока и током I",
    text: "Через проводник сопротивлением 10 Ом течёт ток силой 0,5 А. Какое напряжение на концах проводника?",
    options: ["0,05 В", "5 В", "20 В", "50 В"],
    correct: 1,
    explanation: "Закон Ома для участка цепи: U = I · R = 0,5 · 10 = 5 В.",
  },
  {
    id: 12,
    topic: "electricity",
    image: "assets/images/q12.svg",
    alt: "Схема: линии напряжённости электрического поля между заряженными пластинами",
    text: "На заряд 2 мкКл, помещённый в электрическое поле, действует сила 0,4 Н. Чему равна напряжённость поля?",
    options: ["0,2 кВ/м", "5 кВ/м", "200 кВ/м", "800 кВ/м"],
    correct: 2,
    explanation:
      "Напряжённость поля равна силе, действующей на единичный заряд: E = F/q = 0,4 / (2 · 10⁻⁶) = 2 · 10⁵ В/м = 200 кВ/м.",
  },
];

const LETTERS = ["А", "Б", "В", "Г"];
const RING_LENGTH = 2 * Math.PI * 52;

const TAB_TITLES = {
  course: "Физика 10 класс — обзор курса",
  quiz: "Викторина по физике — 10 класс",
  author: "Об авторе — Физика 10",
};

/* ---------- элементы ---------- */

const $ = (id) => document.getElementById(id);

const els = {
  screens: document.querySelectorAll(".screen"),
  start: $("screen-start"),
  quiz: $("screen-quiz"),
  result: $("screen-result"),
  tabButtons: document.querySelectorAll(".tab"),
  tabPanels: document.querySelectorAll(".tab-panel"),
  quizPanel: $("tab-quiz"),
  tabsNav: document.querySelector(".tabs"),
  topicGrid: $("topicGrid"),
  bestPill: $("bestPill"),
  bestPillValue: $("bestPillValue"),
  quizTopic: $("quizTopic"),
  quizCounter: $("quizCounter"),
  quizScore: $("quizScore"),
  progress: $("progress"),
  progressFill: $("progressFill"),
  image: $("questionImage"),
  questionText: $("questionText"),
  options: $("options"),
  feedback: $("feedback"),
  feedbackBadge: $("feedbackBadge"),
  feedbackTitle: $("feedbackTitle"),
  feedbackText: $("feedbackText"),
  btnNext: $("btnNext"),
  btnQuit: $("btnQuit"),
  btnRetry: $("btnRetry"),
  btnTopics: $("btnTopics"),
  questionActions: document.querySelector(".question-actions"),
  resultPercent: $("resultPercent"),
  resultTopic: $("resultTopic"),
  resultTitle: $("resultTitle"),
  resultText: $("resultText"),
  ringFill: $("ringFill"),
  statCorrect: $("statCorrect"),
  statWrong: $("statWrong"),
  statBest: $("statBest"),
  review: $("review"),
  reviewList: $("reviewList"),
  reviewPerfect: $("reviewPerfect"),
};

const state = {
  topic: "all",
  queue: [],
  index: 0,
  score: 0,
  answered: null,
  answers: [],
};

/* ---------- утилиты ---------- */

function plural(n, one, few, many) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

function shuffle(items) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function bestKey(topic) {
  return `physics10:best:${topic}`;
}

function readBest(topic) {
  try {
    const raw = localStorage.getItem(bestKey(topic));
    if (raw === null) return null;
    const value = Number(raw);
    return Number.isFinite(value) ? value : null;
  } catch {
    return null;
  }
}

function saveBest(topic, value) {
  try {
    localStorage.setItem(bestKey(topic), String(value));
  } catch {
    /* хранилище недоступно — просто не сохраняем рекорд */
  }
}

function scrollTop() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
}

function showScreen(screen) {
  els.screens.forEach((node) => node.classList.toggle("is-active", node === screen));
  scrollTop();
}

/* ---------- вкладки ---------- */

function tabFromHash() {
  const id = window.location.hash.replace("#", "");
  return Object.prototype.hasOwnProperty.call(TAB_TITLES, id) ? id : null;
}

function activateTab(id, { updateHash = false, focus = false } = {}) {
  const target = Object.prototype.hasOwnProperty.call(TAB_TITLES, id) ? id : "course";

  els.tabButtons.forEach((button) => {
    const active = button.dataset.tab === target;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
    if (active && focus) button.focus({ preventScroll: true });
  });

  els.tabPanels.forEach((panel) => {
    const active = panel.id === `tab-${target}`;
    panel.classList.toggle("is-active", active);
    panel.hidden = !active;
  });

  document.title = TAB_TITLES[target];
  if (updateHash) history.replaceState(null, "", `#${target}`);
  scrollTop();
}

function showQuizStart() {
  renderTopics();
  showScreen(els.start);
}

/* ---------- стартовый экран ---------- */

function renderTopics() {
  const allBest = readBest("all");
  const total = QUESTIONS.length;

  const cards = [
    `<button class="topic-card topic-all" type="button" data-topic="all">
      ${allBest !== null && allBest > 0 ? `<span class="topic-best">рекорд ${allBest}%</span>` : ""}
      <span class="topic-icon" aria-hidden="true">${TOPIC_ICONS.all}</span>
      <span class="topic-text">
        <b>Все темы</b>
        <span>${total} ${plural(total, "вопрос", "вопроса", "вопросов")} · вся программа подряд</span>
      </span>
      <span class="topic-go" aria-hidden="true">→</span>
    </button>`,
  ];

  Object.keys(TOPICS)
    .filter((id) => id !== "all")
    .forEach((id) => {
      const count = QUESTIONS.filter((q) => q.topic === id).length;
      const best = readBest(id);
      cards.push(`
        <button class="topic-card" type="button" data-topic="${id}">
          <span class="topic-icon" aria-hidden="true">${TOPIC_ICONS[id]}</span>
          <span class="topic-text">
            <b>${TOPICS[id].name}</b>
            <span>${count} ${plural(count, "вопрос", "вопроса", "вопросов")}${
              best !== null && best > 0 ? ` · <i class="topic-best-inline">рекорд ${best}%</i>` : ""
            }</span>
          </span>
          <span class="topic-go" aria-hidden="true">→</span>
        </button>`);
    });

  els.topicGrid.innerHTML = cards.join("");

  const bestAll = readBest("all");
  if (bestAll !== null && bestAll > 0) {
    els.bestPillValue.textContent = `${bestAll}%`;
    els.bestPill.hidden = false;
  } else {
    els.bestPill.hidden = true;
  }
}

/* ---------- викторина ---------- */

function startQuiz(topic) {
  state.topic = topic;
  state.queue =
    topic === "all"
      ? QUESTIONS.map(prepareQuestion)
      : QUESTIONS.filter((q) => q.topic === topic).map(prepareQuestion);
  state.index = 0;
  state.score = 0;
  state.answered = null;
  state.answers = [];

  els.quizTopic.textContent = TOPICS[topic].name;
  showScreen(els.quiz);
  renderQuestion();
}

function prepareQuestion(question) {
  const options = shuffle(question.options);
  return {
    ...question,
    options,
    correct: options.indexOf(question.options[question.correct]),
  };
}

function renderQuestion() {
  const question = state.queue[state.index];
  state.answered = null;

  els.image.src = question.image;
  els.image.alt = question.alt;
  els.questionText.textContent = question.text;
  els.quizCounter.textContent = `Вопрос ${state.index + 1} из ${state.queue.length}`;
  updateScore();
  setProgress(state.index / state.queue.length);

  els.options.innerHTML = question.options
    .map(
      (text, i) => `
        <button class="option" type="button" data-index="${i}">
          <span class="option-key" aria-hidden="true">${LETTERS[i]}</span>
          <span class="option-text">${text}</span>
          <span class="option-mark" aria-hidden="true"></span>
        </button>`
    )
    .join("");

  els.feedback.hidden = true;
  els.feedback.classList.remove("is-wrong");
  els.feedbackText.innerHTML = "";
  els.btnNext.disabled = true;
  els.btnNext.textContent = state.index === state.queue.length - 1 ? "Показать результат" : "Далее →";

  els.questionText.tabIndex = -1;
  els.questionText.focus({ preventScroll: true });
  window.scrollTo({ top: 0, behavior: "auto" });
}

function updateScore() {
  const n = state.score;
  els.quizScore.innerHTML = `<b>${n}</b> ${plural(n, "балл", "балла", "баллов")}`;
}

function setProgress(fraction) {
  const percent = Math.round(fraction * 100);
  els.progressFill.style.width = `${percent}%`;
  els.progress.setAttribute("aria-valuenow", String(percent));
}

function choose(index) {
  if (state.answered !== null) return;
  const question = state.queue[state.index];
  if (index < 0 || index >= question.options.length) return;

  state.answered = index;
  const isCorrect = index === question.correct;

  [...els.options.children].forEach((button, i) => {
    button.disabled = true;
    const mark = button.querySelector(".option-mark");
    if (i === question.correct) {
      button.classList.add("is-correct");
      mark.textContent = "✓";
    } else if (i === index) {
      button.classList.add("is-wrong");
      mark.textContent = "✕";
    } else {
      button.classList.add("is-muted");
    }
  });

  if (isCorrect) state.score += 1;
  state.answers.push({ question, picked: index });
  updateScore();
  setProgress((state.index + 1) / state.queue.length);
  showFeedback(isCorrect, question);
  els.btnNext.disabled = false;

  const actionsRect = els.questionActions.getBoundingClientRect();
  if (actionsRect.bottom > window.innerHeight - 8) {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    els.questionActions.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }
}

function showFeedback(isCorrect, question) {
  els.feedback.hidden = false;
  els.feedback.classList.toggle("is-wrong", !isCorrect);
  els.feedbackBadge.textContent = isCorrect ? "✓" : "✕";
  els.feedbackTitle.textContent = isCorrect ? "Верно!" : "Не совсем";

  const prefix = isCorrect
    ? ""
    : `Правильный ответ: <strong>${question.options[question.correct]}</strong>. `;
  els.feedbackText.innerHTML = prefix + question.explanation;
}

function nextQuestion() {
  if (state.answered === null) return;
  state.index += 1;
  if (state.index >= state.queue.length) {
    showResult();
  } else {
    renderQuestion();
  }
}

/* ---------- результат ---------- */

function showResult() {
  const total = state.queue.length;
  const correct = state.score;
  const wrong = total - correct;
  const percent = Math.round((correct / total) * 100);

  const previousBest = readBest(state.topic);
  let best = previousBest;
  if (percent > 0 && (previousBest === null || percent > previousBest)) {
    best = percent;
    saveBest(state.topic, percent);
  }

  els.resultTopic.textContent = TOPICS[state.topic].name;
  els.resultPercent.textContent = `${percent}%`;
  els.statCorrect.textContent = `${correct} / ${total}`;
  els.statWrong.textContent = String(wrong);
  els.statBest.textContent = best !== null && best > 0 ? `${best}%` : "—";

  const verdict = getVerdict(percent, correct, total);
  els.resultTitle.textContent = verdict.title;
  els.resultText.textContent = verdict.text;

  els.ringFill.style.transition = "none";
  els.ringFill.style.strokeDashoffset = String(RING_LENGTH);
  void els.ringFill.getBoundingClientRect();
  els.ringFill.style.transition = "";
  requestAnimationFrame(() => {
    els.ringFill.style.strokeDashoffset = String(RING_LENGTH * (1 - percent / 100));
  });

  const mistakes = state.answers.filter(({ question, picked }) => picked !== question.correct);
  els.review.hidden = mistakes.length === 0;
  els.reviewPerfect.hidden = mistakes.length !== 0;
  els.reviewList.innerHTML = mistakes
    .map(
      ({ question, picked }) => `
        <li class="review-item">
          <p class="review-q">${question.text}</p>
          <p class="review-a">
            Ваш ответ: <em>${question.options[picked]}</em><br>
            Верно: <strong>${question.options[question.correct]}</strong>
          </p>
        </li>`
    )
    .join("");

  renderTopics();
  showScreen(els.result);
  els.resultTitle.tabIndex = -1;
  els.resultTitle.focus({ preventScroll: true });
}

function getVerdict(percent, correct, total) {
  if (percent === 100) {
    return {
      title: "Идеальный результат!",
      text: `${correct} из ${total}. Все ответы верные — можно переходить к задачам посложнее.`,
    };
  }
  if (percent >= 85) {
    return {
      title: "Отличная работа!",
      text: `${correct} из ${total}. Совсем немного не хватило до максимума — загляните в разбор.`,
    };
  }
  if (percent >= 70) {
    return {
      title: "Хороший результат",
      text: `${correct} из ${total}. Основное вы знаете, осталось закрыть несколько пробелов.`,
    };
  }
  if (percent >= 50) {
    return {
      title: "Есть над чем поработать",
      text: `${correct} из ${total}. Половина пути пройдена — разберите ошибки и попробуйте снова.`,
    };
  }
  return {
    title: "Стоит повторить теорию",
    text: `${correct} из ${total}. Не расстраивайтесь: прочитайте разбор и пройдите викторину ещё раз.`,
  };
}

/* ---------- события ---------- */

els.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activateTab(button.dataset.tab, { updateHash: true });
  });
});

els.tabsNav.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  const buttons = [...els.tabButtons];
  const index = buttons.indexOf(document.activeElement);
  if (index < 0) return;
  event.preventDefault();
  const step = event.key === "ArrowRight" ? 1 : -1;
  const next = buttons[(index + step + buttons.length) % buttons.length];
  activateTab(next.dataset.tab, { updateHash: true, focus: true });
});

const brandLink = document.querySelector("[data-tab-link]");
if (brandLink) {
  brandLink.addEventListener("click", (event) => {
    event.preventDefault();
    activateTab(brandLink.dataset.tabLink, { updateHash: true });
  });
}

document.querySelectorAll("[data-go='quiz']").forEach((button) => {
  button.addEventListener("click", () => {
    activateTab("quiz", { updateHash: true });
    showQuizStart();
  });
});

document.querySelectorAll("[data-quiz-topic]").forEach((button) => {
  button.addEventListener("click", () => {
    activateTab("quiz", { updateHash: true });
    startQuiz(button.dataset.quizTopic);
  });
});

els.topicGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-topic]");
  if (card) startQuiz(card.dataset.topic);
});

els.options.addEventListener("click", (event) => {
  const button = event.target.closest(".option");
  if (button) choose(Number(button.dataset.index));
});

els.btnNext.addEventListener("click", nextQuestion);
els.btnQuit.addEventListener("click", () => {
  renderTopics();
  showScreen(els.start);
});
els.btnTopics.addEventListener("click", () => {
  renderTopics();
  showScreen(els.start);
});
els.btnRetry.addEventListener("click", () => startQuiz(state.topic));

document.addEventListener("keydown", (event) => {
  if (!els.quiz.classList.contains("is-active")) return;
  if (!els.quizPanel.classList.contains("is-active")) return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;

  if (event.key >= "1" && event.key <= "4") {
    event.preventDefault();
    choose(Number(event.key) - 1);
    return;
  }
  if (event.key === "Enter" && !els.btnNext.disabled) {
    event.preventDefault();
    nextQuestion();
  }
});

/* ---------- запуск ---------- */

renderTopics();
activateTab(tabFromHash() || "course");

window.addEventListener("hashchange", () => {
  const id = tabFromHash();
  if (id) activateTab(id);
});

// подгружаем иллюстрации заранее, чтобы вопросы не «мигали»
window.addEventListener("load", () => {
  QUESTIONS.forEach((question) => {
    const img = new Image();
    img.src = question.image;
  });
});
