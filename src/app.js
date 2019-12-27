const game = new Game();
const grid = document.getElementById('grid');
const gameArea = document.getElementById('gameArea');


document.getElementById('start').addEventListener('click', e => {
    game.start()
    gameArea.style.display = 'flex';
});


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
