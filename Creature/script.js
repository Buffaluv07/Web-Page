
const creatures = {
    Pyrolynx: {
        id: 1,
        weight: 42,
        height: 32,
        types: ['FIRE'],
        stats: { hp: 65, attack: 80, defense: 50, specialAttack: 90, specialDefense: 55, speed: 100 }
    },
    Aquoroc: {
        id: 2,
        weight: 220,
        height: 53,
        types: ['WATER', 'ROCK'],
        stats: { hp: 85, attack: 90, defense: 120, specialAttack: 60, specialDefense: 70, speed: 40 }
    }
};


document.getElementById('search-button').addEventListener('click', () => {
const searchInput = document.getElementById('search-input').value.trim();
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

// Clear previous types
types.innerHTML = '';

// Check for "Red" input
if (searchInput.toLowerCase() === 'red') {
alert('Creature not found');
return;
}

// Find creature by name or ID
let creature;
if (isNaN(searchInput)) {
// If input is not a number, search by name
creature = creatures[searchInput];
} else {
// If input is a number, search by ID
const id = parseInt(searchInput);
creature = Object.values(creatures).find(c => c.id === id);
}

if (!creature) {
alert('Creature not found');
return;
}

// Update UI with creature data
creatureName.textContent = creature === creatures.Pyrolynx ? 'PYROLYNX' : 'AQUOROC';
creatureId.textContent = `#${creature.id}`;
weight.textContent = `Weight: ${creature.weight}`;
height.textContent = `Height: ${creature.height}`;
hp.textContent = creature.stats.hp;
attack.textContent = creature.stats.attack;
defense.textContent = creature.stats.defense;
specialAttack.textContent = creature.stats.specialAttack;
specialDefense.textContent = creature.stats.specialDefense;
speed.textContent = creature.stats.speed;

// Add types
creature.types.forEach(type => {
const typeElement = document.createElement('li'); // Use <li> instead of <p>
typeElement.textContent = type.trim(); // Ensure the text content is trimmed
types.appendChild(typeElement); // Append the <li> element to the #types element
});

// Debugging Logs
console.log('Creature Types:', creature.types);
console.log('Types Element Children:', types.children.length);
});