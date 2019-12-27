class Game
{

    constructor(difficulty = 'beginner')
    {
        this.difficulty = difficulty;
        this.active = false;
    }


    start()
    {
        this.grid = new Grid(10, 8);
        this.active = true;
    }


    checkForGameOver(space)
    {
        if (space.hasMine) {
            this.active = false;
            this.grid.openAllMines(space);
            return true;
        }
    }


    handleClick(event)
    {
        if (this.active) {
            if (event.type === 'contextmenu') {
                this.grid.handleRightClicks(event.target.id);
            } else if (event.type === 'click' &&
                       event.target.tagName === 'TD') {
                       this.grid.openSpace(event.target.id);
                       const space = this.grid.getSpaceById(event.target.id);
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
