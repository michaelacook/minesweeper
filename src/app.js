/* Game interaction layer */

const game = new Game();
const grid = document.getElementById('grid');
const gameArea = document.getElementById('gameArea');
const gameStatus = document.getElementById('game-status');


// Handle main game logic
grid.addEventListener('click', e => {
    game.handleClick(e);
});


// Prevent context menu from appearing on right click of grid space
grid.addEventListener('contextmenu', e => {
    e.preventDefault();
    game.handleClick(e);
});


// Animating smiley button
gameStatus.addEventListener('mousedown', e => {
    event.target.classList.remove('smiley');
    event.target.className = 'down-smiley';
});
gameStatus.addEventListener('mouseup', e => {
    event.target.classList.remove('down-smiley');
    event.target.className = 'smiley';
});
grid.addEventListener('mousedown', e => {
    if (game.active) {
        gameStatus.classList.remove('smiley');
        gameStatus.className = 'o-smiley';
    }
});
grid.addEventListener('mouseup', e => {
    if (game.active) {
        gameStatus.classList.remove('o-smiley');
        gameStatus.className = 'smiley';
    }
});


// Start game with desired difficulty
document.getElementById('game-status').addEventListener('click', e => {
    const difficulty = document.getElementById('difficulty').value;
    switch (difficulty) {
        case 'beginner':
            game.start(beginner);
            break;
        case 'intermediate':
            game.start(intermediate);
            break;
        case 'expert':
            game.start(expert);
            break;
        default:
            game.start(beginner);
    }
});
