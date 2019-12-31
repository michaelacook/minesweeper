class Grid
{

    constructor(rows, cols, mines)
    {
        this.rows = rows;
        this.columns = cols;
        this.spaces = this.createSpaces(this.columns, this.rows);
        this.drawGrid();
        this.addMines(mines);
        this.addBorderingSpacesProperty();
        this.addHasBorderingMinesProperty();
    }


    createSpaces(cols, rows)
    {
        const spaces = new Array();
        for (let i = 0; i < rows; i++) {
            const row = new Array();
            for (let j = 0; j < cols; j++) {
                row.push(new Space(j, i));
            }
            spaces.push(row);
        }
        return spaces;
    }


    openAdjoiningSpaces(space)
    {
        if (space.isEmpty) {
            let loop = true;
            var toOpen = [ ...this.getBorderingSpaces(space).filter(space => !space.hasMine)];
            while (loop) {
                const next = new Array();
                toOpen.forEach(space => {
                    if (!space.hasMine && space.status !== 'open' && space.isEmpty) {
                        const neighbouring = this.getBorderingSpaces(space);
                        next.push( ...neighbouring);
                    }
                    this.openSpace(space.id);
                });
                if (next.length > 0) {
                    toOpen = next;
                } else {
                    loop = false;
                }
            }
        }
    }


    /**
     * Called when a space is left-clicked
     * Open the space on the grid, set the Space's status property to 'open'
     * @param {String} id - DOM id for target space on grid
     */
    openSpace(id)
    {
        const el = document.getElementById(id);
        const space = this.getSpaceById(id);
        if (space.status === 'flagged' || space.status === 'questionmark') {
            return;
        }
        el.style.backgroundColor = "#C0C0C0";
        el.style.border = "1.5px solid #7B7B7B";
        this.drawMine(space);
        this.drawBorderingMinesCount(space);
        space.status = 'open';
    }


    /**
     * Open all spaces containing mines
     * Run on game over
     */
    openAllMines()
    {
        this.flattenedSpaces.forEach(space => {
            if (space.hasMine) {
                this.openSpace(space.id);
            }
        });
    }


    drawGrid()
    {
        let grid = "<tbody>";
        this.spaces.forEach(row => {
            grid += "<tr>";
            row.forEach(space => grid += `<td id=${space.id}></td>`);
            grid += "</tr>";
        });
        grid += "</tbody>";
        document.getElementById('grid').innerHTML = grid;
    }


    getSpaceById(id)
    {
        let space;
        for (let item of this.flattenedSpaces) {
            if (item.id === id) {
                space = item;
                break;
            }
        }
        if (space !== undefined) {
            return space;
        } else {
            return false;
        }
    }


    getBorderingSpaces(space)
    {
        const bordering = new Array();
        const items = [
        this.getSpaceById(`col-${space.x}-row-${space.y - 1}`),
        this.getSpaceById(`col-${space.x + 1}-row-${space.y - 1}`),
        this.getSpaceById(`col-${space.x + 1}-row-${space.y}`),
        this.getSpaceById(`col-${space.x + 1}-row-${space.y + 1}`),
        this.getSpaceById(`col-${space.x}-row-${space.y + 1}`),
        this.getSpaceById(`col-${space.x - 1}-row-${space.y + 1}`),
        this.getSpaceById(`col-${space.x - 1}-row-${space.y}`),
        this.getSpaceById(`col-${space.x - 1}-row-${space.y - 1}`)];
        items.forEach(item => {
            if (item) {
                bordering.push(item);
            }
        });
        return bordering;
    }


    addBorderingSpacesProperty()
    {
        this.flattenedSpaces.forEach(space => {
            const bordering = this.getBorderingSpaces(space);
            space.borderingSpaces = bordering;
        });
    }


    addHasBorderingMinesProperty()
    {
        this.flattenedSpaces.forEach(space => {
            this.getBorderingMineCount(space);
        });
    }


    getBorderingMineCount(space)
    {
        if (space.hasMine) {
            return;
        } else {
            let mineCount = 0;
            space.borderingSpaces.forEach(space => {
                if (space.hasMine) {
                    mineCount++;
                }
            });
            if (mineCount === 0) {
                space.isEmpty = true;
            } else {
                space.isEmpty = false;
                space.borderingMinesCount = mineCount;
            }
        }
    }


    drawBorderingMinesCount(space)
    {
        const mineCount = space.borderingMinesCount;
        if (mineCount > 0) {
            const el = document.getElementById(space.id);
            if (mineCount == 8) {
                el.style.color = '#808080';
            } else if (mineCount == 7) {
                el.style.color = 'black';
            } else if (mineCount == 6) {
                el.style.color = '#00807F';
            } else if (mineCount == 5) {
                el.style.color = '#810202';
            } else if (mineCount == 4) {
                el.style.color = '#040280';
            } else if (mineCount == 3) {
                el.style.color = '#FD0A00';
            } else if (mineCount == 2) {
                el.style.color = '#037E00';
            } else if (mineCount == 1) {
                el.style.color = '#0E00FB';
            }
            el.innerHTML = `<span class="mineCount">${mineCount}</span>`;
        }
    }


    drawMine(space)
    {
        if (space.hasMine) {
            document.getElementById(space.id).className = "mine";
        }
    }


    flagSpace(id)
    {
        const space = this.getSpaceById(id);
        document.getElementById(id).className = "flagged";
        space.status = 'flagged';
    }


    questionMarkSpace(id)
    {
        const space = this.getSpaceById(id);
        document.getElementById(id).classList.remove("flagged")
        document.getElementById(id).className = "questionmark";
        space.status = 'questionmark';
    }


    clearSpace(id)
    {
        const space = this.getSpaceById(id);
        document.getElementById(id).classList.remove("questionmark");
        space.status = null;
        space.rightClicks = 0;
    }


    addMines(numberOfMines)
    {
        const copyOfSpaces = this.flattenedSpaces;
        for (let i = 0; i < numberOfMines; i++) {
            const randomSpace = copyOfSpaces[Math.floor(Math.random() * copyOfSpaces.length)]
            const space = this.getSpaceById(randomSpace.id);
            space.hasMine = true;
            copyOfSpaces.splice(copyOfSpaces.indexOf(randomSpace), 1);
        }
    }


    get flattenedSpaces()
    {
        const flattened = new Array();
        for (let i = 0; i < this.rows; i++) {
            flattened.push(...this.spaces[i]);
        }
        return flattened;
    }
}
