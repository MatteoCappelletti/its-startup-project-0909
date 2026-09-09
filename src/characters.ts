import './style.css';

interface Character {
  id: number;
  name: string | { first?: string; middle?: string; last?: string };
  images?: { main?: string };
  gender?: string;
  species?: string;
  occupation?: string;
  homePlanet?: string;
}

const container = document.querySelector<HTMLElement>('#characters-container');

async function fetchCharacters(): Promise<void> {
  if (!container) return;

  try {
    const response = await fetch('https://api.sampleapis.com/futurama/characters');
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }

    const characters: Character[] = await response.json();
    renderCharacters(characters);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Errore sconosciuto';
    container.innerHTML = `
      <div class="error-message">
        Si è verificato un problema nel caricamento dei dati: ${message}
      </div>
    `;
  }
}

function renderCharacters(characters: Character[]): void {
  if (!container) return;

  container.innerHTML = characters
    .map((char) => {
      // Normalizzazione nome
      const fullName =
        typeof char.name === 'object'
          ? `${char.name.first || ''} ${char.name.middle || ''} ${char.name.last || ''}`.trim()
          : char.name || 'Sconosciuto';

      const imgUrl = char.images?.main || 'https://via.placeholder.com/100';
      const species = char.species || 'Sconosciuta';
      const gender = char.gender || 'N/D';
      const occupation = char.occupation || 'Nessuna professione';
      const planet = char.homePlanet || 'Pianeta sconosciuto';

      // Nel template literal di renderCharacters dentro characters.ts:
      return `
        <a href="/character-details.html?id=${char.id}" style="text-decoration: none; color: inherit; display: contents;">
          <article class="character-card clickable">
            <img src="${imgUrl}" alt="${fullName}" loading="lazy" />
            
            <div class="char-name">${fullName}</div>

            <div class="char-badges">
              <span class="char-badge">${species}</span>
              <span class="char-badge char-badge--gender">${gender}</span>
            </div>

            <ul class="char-icon-list">
              <li>
                <span class="char-icon">💼</span>
                <span>${occupation}</span>
              </li>
              <li>
                <span class="char-icon">🪐</span>
                <span>${planet}</span>
              </li>
            </ul>
          </article>
        </a>
      `;
    })
    .join('');
}

fetchCharacters();