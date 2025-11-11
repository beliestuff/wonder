let cards = [];

async function loadCards() {
  const output = document.getElementById('output');
  output.innerHTML = '<p>Loading cards...</p>';

  try {
    const res = await fetch('https://api.pokemontcg.io/v2/cards?pageSize=50&q=set.id:base1');
    const data = await res.json();
    cards = data.data || [];
    output.innerHTML = '<p>Cards loaded! Click "Wonder Pick" to choose one.</p>';
  } catch (err) {
    output.innerHTML = '<p style="color:red;">Error loading cards.</p>';
    console.error(err);
  }
}

function pickCard() {
  const output = document.getElementById('output');
  if (!cards.length) {
    output.innerHTML = '<p>No cards loaded yet. Please reload.</p>';
    return;
  }
  const random = cards[Math.floor(Math.random() * cards.length)];
  output.innerHTML = `
    <h2>${random.name}</h2>
    <img src="${random.images.large || random.images.small}" alt="${random.name}" />
    <p><strong>Set:</strong> ${random.set.name}</p>
    <p><strong>Rarity:</strong> ${random.rarity || '—'}</p>
    <p><strong>HP:</strong> ${random.hp || '—'}</p>
  `;
}

document.getElementById('reload').addEventListener('click', loadCards);
document.getElementById('pick').addEventListener('click', pickCard);

// Cargar cartas al inicio
loadCards();