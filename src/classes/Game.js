class Game
{

    constructor(difficulty = 'beginner', mines = 10)
    {
        this.difficulty = difficulty;
        this.active = false;
        this.mines = mines;
        this.flaggedMines = 0; // whenever a bomb is flagged
        this.flags = 0; // whenever a flag is used
    }


    start()
    {
        this.grid = new Grid(10, 8);
        this.active = true;
        this.flaggedMines = 0; // whenever a bomb is flagged
        this.flags = 0; // whenever a flag is used
    }


    checkForGameOver(space)
    {
        if (space.hasMine) {
            this.active = false;
            this.grid.openAllMines(space);
            document.getElementById('game-status').classList.remove('smiley');
            document.getElementById('game-status').className = 'lose-smiley';
            return true;
        }
    }


    checkForWin()
    {
        if (this.flaggedMines === this.mines) {
            this.active = false;
            document.getElementById('game-status').classList.remove('smiley');
            document.getElementById('game-status').className = 'win-smiley';
        }
    }


    handleRightClicks(id)
    {
        const space = this.grid.getSpaceById(id);
        if (space.status === 'open') {
            return;
        } else {
            space.rightClicks++;
            if (space.rightClicks === 1) {
                this.grid.flagSpace(id);
                this.flags++;
                if (space.hasMine) {
                    this.flaggedMines++;
                }
            } else if (space.rightClicks === 2) {
                this.grid.questionMarkSpace(id);
            } else if (space.rightClicks === 3) {
                this.grid.clearSpace(id);
            }
        }
    }


    // write a method to toggle the smiley class


    handleClick(event)
    {
        if (this.active) {
            if (event.type === 'contextmenu') {
                this.handleRightClicks(event.target.id);
                this.checkForWin();
            } else if (event.type === 'click' &&
                       event.target.tagName === 'TD') {
                       const space = this.grid.getSpaceById(event.target.id);
                       if (space.status == null) {
                           this.grid.openSpace(space.id);
                           if (this.checkForGameOver(space)) {
                               return;
                           }
                           if (space.borderingMinesCount === 0) {
                               const connected = this.grid.getConnectedSpaces(space);
                               connected.forEach(space => this.grid.openSpace(space.id));
                           }
                       }

            }
        }
    }
}
