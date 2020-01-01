class Game
{

    constructor()
    {
        this.flaggedMines = 0; // whenever a bomb is flagged
        this.flags = 0; // whenever a flag is used
        this.start(); // automatically start game on page load
    }


    /**
     * Initialize game
     * @param {Object} difficulty - object containing difficulty settings
     * Default difficulty is beginner
     */
    start(difficulty = beginner)
    {
        const {rows, columns, mines} = difficulty;
        this.grid = new Grid(rows, columns, mines);
        this.active = true;
        this.flaggedMines = 0; // whenever a bomb is flagged
        this.flags = 0; // whenever a flag is used
        this.mines = mines;
    }


    /**
     * Checks game over, toggles smiley button classes
     * Highlights last clicked space red
     * @param {Object} space - last clicked space object
     */
    checkForGameOver(space)
    {
        if (space.hasMine) {
            this.active = false;
            this.grid.minestrike();
            this.grid.openAllMines(space);
            document.getElementById('game-status').classList.remove('smiley');
            document.getElementById('game-status').className = 'lose-smiley';
            document.getElementById(space.id).style.backgroundColor = '#FF0A00';
            return true;
        }
    }


    /**
     * Checks for a win, toggle class for smiley button
     */
    checkForWin()
    {
        if (this.flaggedMines === this.mines) {
            this.active = false;
            document.getElementById('game-status').classList.remove('smiley');
            document.getElementById('game-status').className = 'win-smiley';
        }
    }


    /**
     * Assign flagged or question mark status on right click
     * Calls checkForWin method
     * @param {String} id - DOM id of clicked space
     */
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


    /**
     * Calls appropriates methods on left and right clicks
     * @param {Object} event - browser event
     */
    handleClick(event)
    {
        if (this.active) {
            if (event.type === 'contextmenu') {
                this.handleRightClicks(event.target.id);
                this.checkForWin();
            } else if (event.type === 'click') {
               const space = this.grid.getSpaceById(event.target.id);
               if (space.status == null) {
                   this.grid.openSpace(space.id);
                   if (this.checkForGameOver(space)) {
                       return;
                   }
                   this.grid.openAdjoiningSpaces(space);
                }
            }
        }
    }
}
