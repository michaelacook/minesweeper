/* Handles game and display settings */

const controlsSelect = document.querySelector('.controls');


// Game difficulty settings
const beginner = { rows: 9, columns: 9, mines: 10 }
const intermediate = { rows: 16, columns: 16, mines: 40 }
const expert = { rows: 16, columns: 30, mines: 99 }



// Display settings event handler
controlsSelect.addEventListener('change', e => {
    e.target.blur();
    const selectValue = e.target.value;
    const targetID = e.target.id;
    const children = Array.from(document.querySelector('.controls').children);
    if (targetID === 'color-scheme') {
        if (selectValue == 'default') {
            setDefaultTheme(children);
            saveTheme();
        } else if (selectValue == 'night') {
            setNightTheme(children);
            saveTheme(selectValue);
        } else if (selectValue == 'win98') {
            setWin98Theme(children); 
            saveTheme(selectValue);
        }
    }
    if (targetID === 'difficulty') {
        gameStatus.className = 'smiley';
        game.stopTimer();
        timer.innerHTML = '000';
        if (selectValue == 'beginner') {
            game.start(beginner);
            setGameAreaSize("beginner");
        } else if (selectValue == 'intermediate') {
            game.start(intermediate);
            setGameAreaSize("intermediate");
        } else if (selectValue == 'expert') {
            game.start(expert);
            setGameAreaSize("expert");
        }
    }
    if (targetID === 'size') {
        zoom(selectValue);
    }
});
