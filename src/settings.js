/* Handles game and display settings */


// Game difficulty settings
const beginner = {rows: 9, columns: 9, mines: 10}
const intermediate = {rows: 16, columns: 16, mines: 40}
const expert = {rows: 16, columns: 30, mines: 99}


// Display settings event handler
document.querySelector('.controls').addEventListener('change', e => {
    e.target.blur();
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
        game.stopTimer();
        timer.innerHTML = '000';
        const gameArea = document.getElementById('gameArea');
        if (e.target.value == 'beginner') {
            game.start(beginner);
            gameArea.style.width = '287px';
            gameArea.style.height = '';
        } else if (e.target.value == 'intermediate') {
            game.start(intermediate);
            gameArea.style.width = '502.25px';
            gameArea.style.height = '578.75px';
        } else if (e.target.value == 'expert') {
            game.start(expert);
            gameArea.style.width = '932.75px';
        }
    }
    if (e.target.id == 'size') {
        if (e.target.value == '75') {
            document.body.style.zoom=0.75;
            // document.body.style.transform = 'scale(.75)';
        } else if (e.target.value == '100') {
            document.body.style.zoom=1.0;
        } else if (e.target.value == '125') {
            document.body.style.zoom=1.25;
        } else if (e.target.value == '150') {
            document.body.style.zoom=1.50;
        }
    }
});
