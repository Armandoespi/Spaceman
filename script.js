const wordBank = [
    { word: 'ECLIPSE', description: 'A celestial event where one object in the sky passes in front of another, blocking its light.' },
    { word: 'ASTEROID', description: 'A small rocky body orbiting the sun, typically found in the asteroid belt between Mars and Jupiter.' },
    { word: 'METEOR', description: 'A space rock that burns up upon entering Earth’s atmosphere, creating a streak of light in the sky.' },
    { word: 'GALAXY', description: 'A system of stars, planets, and other celestial bodies, bound together by gravity.' },
    { word: 'COSMOS', description: 'The universe seen as a well-ordered whole, encompassing space and time.' },
    { word: 'COMET', description: 'A small icy body that orbits the sun, often exhibiting a visible tail when it gets close to the sun.' },
    { word: 'ASTRONAUT', description: 'A person trained to travel and work in space.' }
  ];
  
  let winner, incorrectGuesses, correctGuesses, currentWord, displayedWord, hintUsed;

    //cached elements
const messageEl = document.querySelector('#message');
const playAgainEl = document.querySelector('#play-again');
const restartEl = document.querySelector('#restart-game');
const buttonEls = document.querySelectorAll('.btn-letter');
const guessEl = document.querySelector('#guess-btn');
const guessInputEl = document.querySelector('#guess');
const hintEl = document.querySelector('#hint-btn');
const hintDescriptionEl = document.querySelector('#hint-description');

// event listners
playAgainEl.addEventListener('click', initializeGame);
restartEl.addEventListener('click', initializeGame);
buttonEls.forEach(button => button.addEventListener('click', handleLetterGuess));
guessEl.addEventListener('click', handleWordGuess);
hintEl.addEventListener('click', provideHint);
