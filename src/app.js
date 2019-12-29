const game = new Game();
const grid = document.getElementById('grid');
const gameArea = document.getElementById('gameArea');
const gameStatus = document.getElementById('game-status');


grid.addEventListener('click', e => {
    // handle game logic
    game.handleClick(e);
});



/**
 * Prevent context menu from appearing on right click of grid space
 */
grid.addEventListener('contextmenu', e => {
    e.preventDefault();
    game.handleClick(e);
});

// Animate smiley sprite on click
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

gameStatus.addEventListener('mousedown', e => {
    event.target.classList.remove('smiley');
    event.target.className = 'down-smiley';
});

gameStatus.addEventListener('mouseup', e => {
    event.target.classList.remove('down-smiley');
    event.target.className = 'smiley';
});

gameStatus.addEventListener('click', e => game.start());
