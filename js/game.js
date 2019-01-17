const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const finalScore = document.querySelector('.final-score');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const gameTime = document.querySelector('.time');

let lastHole;
let gameStarted = false;
let score = 0;
let time = 10;

const randTime = (min, max) => Math.round(Math.random() * (max - min) + min);

const randHole = holes => {
    const randIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randIndex];

    if (lastHole === hole) return randHole(holes);
    lastHole = hole;

    return hole;
};

const peek = () => {
    const time = randTime(500, 2000);
    const hole = randHole(holes);

    hole.classList.add('up');
    timer = setTimeout(() => {
        hole.classList.remove('up');
        if (gameStarted) peek();
    }, time);
};

const hit = e => {
    if (!e.isTrusted) return; // false click
    score++;
    e.target.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
};

const startGame = () => {
    time = 10;
    score = 0;
    scoreBoard.textContent = score;
    gameTime.textContent = time;
    gameStarted = true;

    peek();
    finalScore.classList.remove('show');
    startButton.classList.add('hidden');
    stopButton.classList.remove('hidden');

    gameTimerCountdown = setInterval(() => {
        time--;
        gameTime.textContent = time;
        if (!time || !gameStarted) stopGame();
    }, 1000);
};

const stopGame = () => {
    gameStarted = false;
    holes.forEach(hole => hole.classList.remove('up'));
    clearInterval(gameTimerCountdown);
    clearTimeout(timer);

    finalScore.classList.add('show');
    stopButton.classList.add('hidden');
    startButton.classList.remove('hidden');
    finalScore.querySelector('.score').textContent = score;
};

const closePopup = () => {
    finalScore.classList.remove('show');
}

moles.forEach(mole => mole.addEventListener('click', hit));