async function loadCards() {
  const res = await fetch("cards.json");
  return await res.json();
}

function weightedRandom(cards) {
  const totalWeight = cards.reduce((sum, c) => sum + c.weight, 0);
  let random = Math.random() * totalWeight;

  for (let card of cards) {
    random -= card.weight;
    if (random <= 0) return card;
  }
}

async function setup() {
  const cards = await loadCards();
  const drawBtn = document.getElementById("draw-btn");
  const resultDiv = document.getElementById("result");

  drawBtn.addEventListener("click", () => {
    const card = weightedRandom(cards);
    resultDiv.innerHTML = `
      <img src="${card.image}" alt="${card.name}">
      <h2>${card.name}</h2>
      <p>${card.rarity}</p>
    `;
  });
}

setup();

