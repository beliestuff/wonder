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

function rarityClass(rarity) {
  switch (rarity.toLowerCase()) {
    case "legendary": return "legendary";
    case "rare": return "rare";
    default: return "common";
  }
}

async function setup() {
  const cards = await loadCards();
  const drawOneBtn = document.getElementById("draw-one");
  const drawTenBtn = document.getElementById("draw-ten");
  const resultsDiv = document.getElementById("results");

  async function drawCards(amount) {
    resultsDiv.innerHTML = "";

    const drawn = [];
    for (let i = 0; i < amount; i++) {
      drawn.push(weightedRandom(cards));
    }

    drawn.forEach((card, index) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = `card ${rarityClass(card.rarity)}`;
      cardDiv.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">
            <img src="${card.image}" alt="${card.name}" />
            <h2>${card.name}</h2>
            <p>${card.rarity}</p>
          </div>
        </div>
      `;

      resultsDiv.appendChild(cardDiv);

      // Add delayed flip animation
      setTimeout(() => {
        cardDiv.classList.add("flipped");
      }, 200 + index * 200);
    });
  }

  drawOneBtn.addEventListener("click", () => drawCards(1));
  drawTenBtn.addEventListener("click", () => drawCards(10));
}

setup();
