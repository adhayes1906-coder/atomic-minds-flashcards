const cards = [
  {
    name: "Democritus",
    role: "Philosopher",
    year: "450 B.C.",
    model: "The idea of “atomos”",
    discovery: "Matter is made of indivisible pieces",
    theory:
      "Matter could not be divided into smaller pieces forever. Democritus called the smallest pieces “atomos,” meaning indivisible.",
    details: [],
    art: "democritus",
    accent: "coral",
  },
  {
    name: "John Dalton",
    role: "Scientist",
    year: "1803 A.D.",
    model: "Billiard Ball Model",
    discovery: "Created the first atomic theory",
    theory: "Atoms are uniform, solid spheres.",
    details: [],
    art: "solid",
    accent: "gold",
  },
  {
    name: "J. J. Thomson",
    role: "Scientist",
    year: "1897 A.D.",
    model: "Plum Pudding Model",
    discovery: "Discovered the electron",
    theory:
      "Tiny, negatively charged electrons are spread throughout a positively charged sphere.",
    details: ["Used the cathode ray tube experiment."],
    art: "plum",
    accent: "sky",
  },
  {
    name: "Ernest Rutherford",
    role: "Scientist",
    year: "1911 A.D.",
    model: "Nuclear Model",
    discovery: "Discovered the nucleus",
    theory:
      "Atoms have a dense, positively charged nucleus surrounded by electrons. The atom is mostly empty space.",
    details: ["Used the gold foil experiment."],
    art: "nuclear",
    accent: "coral",
  },
  {
    name: "Niels Bohr",
    role: "Scientist",
    year: "1913 A.D.",
    model: "Planetary / Bohr Model",
    discovery: "Developed the Bohr model",
    theory: "Electrons travel in specific orbits around the nucleus.",
    details: [],
    art: "bohr",
    accent: "gold",
  },
  {
    name: "James Chadwick",
    role: "Scientist",
    year: "1917",
    model: "Neutron Model",
    discovery: "Discovered the neutron",
    theory: "The neutron is a neutral particle found in the nucleus.",
    details: [],
    art: "neutron",
    accent: "sky",
  },
  {
    name: "Erwin Schrödinger",
    role: "Scientist",
    year: "1926",
    model: "Electron Cloud Model",
    discovery: "Developed the electron cloud model",
    theory:
      "Electrons travel randomly around the nucleus, forming an electron cloud.",
    details: [],
    art: "cloud",
    accent: "coral",
  },
  {
    name: "John Dalton’s Atomic Theory",
    role: "Atomic Theory",
    year: "1803 A.D.",
    model: "Four main ideas",
    discovery: "The foundation of modern atomic theory",
    theory: "Dalton’s atomic theory explains matter with four central ideas:",
    details: [
      "Atoms are tiny, indivisible particles.",
      "Atoms of one element are all the same.",
      "Atoms of different elements are different.",
      "Compounds form by combining atoms.",
    ],
    art: "theory",
    accent: "gold",
  },
];

const cardButton = document.querySelector("#study-card");
const cardCount = document.querySelector("#card-count");
const sideLabel = document.querySelector("#side-label");
const cardRole = document.querySelector("#card-role");
const cardYear = document.querySelector("#card-year");
const cardName = document.querySelector("#card-name");
const cardModel = document.querySelector("#card-model");
const cardDiscovery = document.querySelector("#card-discovery");
const cardTheory = document.querySelector("#card-theory");
const cardDetails = document.querySelector("#card-details");
const atomicArt = document.querySelector(".atomic-art");
const dotsContainer = document.querySelector("#progress-dots");
const keyboardTip = document.querySelector("#keyboard-tip");

let current = 0;
let isFlipped = false;

function setStarted() {
  keyboardTip.classList.add("is-muted");
}

function renderDetails(details) {
  cardDetails.innerHTML = "";
  cardDetails.classList.toggle("detail-list--numbered", details.length > 1);

  details.forEach((detail, index) => {
    const item = document.createElement("span");
    item.className = "detail-item";

    if (details.length > 1) {
      const number = document.createElement("span");
      number.className = "detail-number";
      number.textContent = String(index + 1);
      item.appendChild(number);
    }

    const text = document.createElement("span");
    text.textContent = detail;
    item.appendChild(text);
    cardDetails.appendChild(item);
  });
}

function renderCard() {
  const card = cards[current];
  cardButton.className = `flashcard flashcard--${card.accent}`;
  cardButton.setAttribute("aria-pressed", "false");
  cardButton.setAttribute("aria-label", `Show answer for ${card.name}`);
  cardCount.textContent = `Card ${String(current + 1).padStart(2, "0")} / ${String(
    cards.length,
  ).padStart(2, "0")}`;
  sideLabel.textContent = "Question";
  sideLabel.classList.remove("is-answer");
  cardRole.textContent = card.role;
  cardYear.textContent = card.year;
  cardName.textContent = card.name;
  cardModel.textContent = card.model;
  cardDiscovery.textContent = card.discovery;
  cardTheory.textContent = card.theory;
  atomicArt.className = `atomic-art atomic-art--${card.art}`;
  renderDetails(card.details);
  isFlipped = false;

  document.querySelectorAll(".progress-dot").forEach((dot, index) => {
    dot.classList.toggle("is-current", index === current);
    dot.toggleAttribute("aria-current", index === current);
  });
}

function flipCard() {
  isFlipped = !isFlipped;
  cardButton.classList.toggle("is-flipped", isFlipped);
  cardButton.setAttribute("aria-pressed", String(isFlipped));
  cardButton.setAttribute(
    "aria-label",
    `${isFlipped ? "Showing answer for" : "Show answer for"} ${cards[current].name}`,
  );
  sideLabel.textContent = isFlipped ? "Answer" : "Question";
  sideLabel.classList.toggle("is-answer", isFlipped);
  setStarted();
}

function goTo(index) {
  current = (index + cards.length) % cards.length;
  renderCard();
  setStarted();
}

cards.forEach((card, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.className = `progress-dot${index === 0 ? " is-current" : ""}`;
  dot.setAttribute("aria-label", `Go to card ${index + 1}: ${card.name}`);
  if (index === 0) dot.setAttribute("aria-current", "step");
  dot.addEventListener("click", () => goTo(index));
  dotsContainer.appendChild(dot);
});

cardButton.addEventListener("click", flipCard);
document.querySelector("#previous-card").addEventListener("click", () => goTo(current - 1));
document.querySelector("#next-card").addEventListener("click", () => goTo(current + 1));

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") goTo(current + 1);
  if (event.key === "ArrowLeft") goTo(current - 1);
  if ((event.key === " " || event.key === "Enter") && document.activeElement !== cardButton) {
    event.preventDefault();
    flipCard();
  }
});
