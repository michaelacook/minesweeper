const game = new Game();
const grid = document.getElementById('grid');
const gameArea = document.getElementById('gameArea');
const gameStatus = document.getElementById('game-status');


// Handle game logic
grid.addEventListener('click', e => {
    game.handleClick(e);
});


// Prevent context menu from appearing on right click of grid space
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


// Event handlers for animating smiley button
gameStatus.addEventListener('mousedown', e => {
    event.target.classList.remove('smiley');
    event.target.className = 'down-smiley';
});
gameStatus.addEventListener('mouseup', e => {
    event.target.classList.remove('down-smiley');
    event.target.className = 'smiley';
});


// Click handler for smiley button
gameStatus.addEventListener('click', e => {
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


// Controls event handler
document.querySelector('.controls').addEventListener('change', e => {
    const children = document.querySelector('.controls').children;
    if (e.target.id == 'color-scheme') {
        if (e.target.value == 'bright') {
            document.body.style.backgroundColor = "";
            for (let child of children) {
                child.style.color = 'black';
                child.style.backgroundColor = '';
                child.style.fontWeight = '';
                child.style.border = '';
            }
        } else if (e.target.value == 'night') {
            document.body.style.backgroundColor = "black";
            for (let child of children) {
                child.style.color = '#3CB371';
                child.style.backgroundColor = 'black';
                child.style.borderColor = 'black';
                child.style.fontWeight = 'bold';
            }
        } else if (e.target.value == 'win98') {
            for (let child of children) {
                document.body.style.backgroundColor = '#007D7E';
                child.style.color = 'white';
                child.style.backgroundColor = '#007D7E';
                child.style.borderColor = '#007D7E';
                child.style.fontWeight = 'bold';
            }
        }
    }
    if (e.target.id == 'difficulty') {
        gameStatus.className = 'smiley';
        const gameArea = document.getElementById('gameArea');
        if (e.target.value == 'beginner') {
            game.start(beginner);
            gameArea.style.width = '300px';
            gameArea.style.height = '350px';
        } else if (e.target.value == 'intermediate') {
            game.start(intermediate);
            gameArea.style.width = '515.25px';
            gameArea.style.height = '565.75px';
        } else if (e.target.value == 'expert') {
            game.start(expert);
            gameArea.style.width = '945.75px';
            gameArea.style.height = '565.75px';
        }
    }
});
