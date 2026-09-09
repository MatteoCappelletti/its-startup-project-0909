import './style.css';

interface Character {
  id: number;
  name: string | { first?: string; middle?: string; last?: string };
  images?: { main?: string };
  gender?: string;
  species?: string;
  occupation?: string;
  homePlanet?: string;
  age?: string | number;
  sayings?: string[];
}

const detailContainer = document.querySelector<HTMLElement>('#character-detail');

function getCharacterIdFromUrl(): number | null {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  return id ? parseInt(id, 10) : null;
}

async function fetchCharacterDetail(): Promise<void> {
  if (!detailContainer) return;

  const charId = getCharacterIdFromUrl();

  if (charId === null || isNaN(charId)) {
    detailContainer.innerHTML = `
      <div class="error-message">
        ID personaggio mancante o non valido. <br><br>
        <a href="/characters.html" class="back-link">← Torna all'elenco personaggi</a>
      </div>
    `;
    return;
  }

  try {
    const response = await fetch('https://api.sampleapis.com/futurama/characters');
    if (!response.ok) {
      throw new Error(`Errore di rete: ${response.status}`);
    }

    const characters: Character[] = await response.json();
    const character = characters.find((c) => c.id === charId);

    if (!character) {
      detailContainer.innerHTML = `
        <div class="error-message">
          Personaggio non trovato! <br><br>
          <a href="/characters.html" class="back-link">← Torna all'elenco personaggi</a>
        </div>
      `;
      return;
    }

    renderDetail(character);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Errore sconosciuto';
    detailContainer.innerHTML = `
      <div class="error-message">
        Si è verificato un errore durante il recupero del personaggio: ${message} <br><br>
        <a href="/characters.html" class="back-link">← Torna all'elenco personaggi</a>
      </div>
    `;
  }
}

function renderDetail(char: Character): void {
  if (!detailContainer) return;

  const fullName =
    typeof char.name === 'object'
      ? `${char.name.first || ''} ${char.name.middle || ''} ${char.name.last || ''}`.trim()
      : char.name || 'Sconosciuto';

  const imgUrl = char.images?.main || 'https://via.placeholder.com/220';
  const age = char.age ? String(char.age) : 'Sconosciuta';
  const gender = char.gender || 'N/D';
  const species = char.species || 'Sconosciuta';
  const homePlanet = char.homePlanet || 'Sconosciuto';
  const occupation = char.occupation || 'Nessuna';

  const sayingsHtml =
    char.sayings && char.sayings.length > 0
      ? `
        <section class="detail-sayings">
          <h2>Citazioni Celebri</h2>
          <ul class="sayings-list">
            ${char.sayings.map((quote) => `<li>"${quote}"</li>`).join('')}
          </ul>
        </section>
      `
      : '';

  detailContainer.innerHTML = `
    <div class="detail-wrapper">
      <a href="/characters.html" class="back-link">← Torna all'elenco personaggi</a>

      <div class="detail-top">
        <img class="detail-img" src="${imgUrl}" alt="${fullName}" />

        <div class="detail-info">
          <h1>${fullName}</h1>

          <table class="detail-table">
            <tbody>
              <tr>
                <th>Specie:</th>
                <td>${species}</td>
              </tr>
              <tr>
                <th>Genere:</th>
                <td>${gender}</td>
              </tr>
              <tr>
                <th>Età:</th>
                <td>${age}</td>
              </tr>
              <tr>
                <th>Pianeta di origine:</th>
                <td>${homePlanet}</td>
              </tr>
              <tr>
                <th>Occupazione:</th>
                <td>${occupation}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      ${sayingsHtml}
    </div>
  `;
}

fetchCharacterDetail();