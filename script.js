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
  
  // Cached elements
  const messageEl = document.querySelector('#message');
  const playAgainEl = document.querySelector('#play-again');
  const restartEl = document.querySelector('#restart-game');
  const buttonEls = document.querySelectorAll('.btn-letter');
  const guessEl = document.querySelector('#guess-btn');
  const guessInputEl = document.querySelector('#guess');
  const hintEl = document.querySelector('#hint-btn');
  const hintDescriptionEl = document.querySelector('#hint-description');
  const wrongGuessesEl = document.querySelector('#wrong-guesses'); // Add this line to track wrong guesses
  
  // Event listeners
  playAgainEl.addEventListener('click', initializeGame);
  restartEl.addEventListener('click', initializeGame);
  buttonEls.forEach(button => button.addEventListener('click', handleLetterGuess));
  guessEl.addEventListener('click', handleWordGuess);
  hintEl.addEventListener('click', provideHint);
  
  // Initialize the game
  initializeGame();
  
  function initializeGame() {
    const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
    currentWord = randomWord.word.toUpperCase();
    displayedWord = '_'.repeat(currentWord.length);
    incorrectGuesses = [];
    correctGuesses = [];
    winner = false;
    hintUsed = false;
    hintDescriptionEl.textContent = '';
    restartEl.style.display = 'none';
    hintEl.style.display = 'block';
  
    resetKeyboard(); // Reset keyboard styles and state
    render();
  }
  
  function resetKeyboard() {
    buttonEls.forEach(button => {
      button.disabled = false; // Enable all buttons
      button.classList.remove('correct-guess', 'wrong-guess'); // Remove any added styles
    });
  }
  
  function render() {
    messageEl.textContent = `Current word: ${formatDisplayedWord(displayedWord)}`;
    // Show wrong guesses
    wrongGuessesEl.textContent = `Wrong guesses: ${incorrectGuesses.join(', ')}`;
  }
  
  function formatDisplayedWord(word) {
    return word.split('').join(' ');
  }
  
  function checkGameOver() {
    if (displayedWord === currentWord) {
      winner = true;
      messageEl.textContent = `Congrats! You guessed the word "${currentWord}"!`;
      restartEl.style.display = 'block';
      hintEl.style.display = 'none';
    } else if (incorrectGuesses.length >= 6) {
      messageEl.textContent = `Game over! The word was "${currentWord}".`;
      restartEl.style.display = 'block';
      hintEl.style.display = 'none';
    }
  }
  
  function handleLetterGuess(event) {
    const button = event.target;
    const letter = button.textContent.toUpperCase();
  
    if (correctGuesses.includes(letter) || incorrectGuesses.includes(letter)) {
      messageEl.textContent = 'You already guessed that letter!';
      return;
    }
  
    if (currentWord.includes(letter)) {
      correctGuesses.push(letter);
      button.classList.add('correct-guess'); // Highlight correct guess
      updateDisplayedWord();
    } else {
      incorrectGuesses.push(letter);
      button.classList.add('wrong-guess'); // Highlight wrong guess
    }
  
    button.disabled = true; // Disable the button
    checkGameOver();
  }
  
  function handleWordGuess() {
    const guessedWord = guessInputEl.value.toUpperCase();
  
    if (guessedWord === currentWord) {
      winner = true;
      messageEl.textContent = `Correct! The word was "${currentWord}"!`;
    } else {
      incorrectGuesses.push('WORD-GUESS');
      messageEl.textContent = `Incorrect guess! The word was "${currentWord}".`;
    }
  
    guessInputEl.value = '';
    checkGameOver();
  }
  
  function updateDisplayedWord() {
    displayedWord = currentWord.split('')
      .map(letter => (correctGuesses.includes(letter) ? letter : '_'))
      .join('');
    render();
  }
  
  function provideHint() {
    if (hintUsed) {
      messageEl.textContent = "You have already used the hint!";
      return;
    }
  
    const currentWordObject = wordBank.find(wordObj => wordObj.word.toUpperCase() === currentWord);
  
    if (currentWordObject) {
      hintDescriptionEl.textContent = `Hint: ${currentWordObject.description}`;
    }
  
    hintUsed = true;
  }
  