class Grid
{

    constructor(rows, cols)
    {
        this.rows = rows;
        this.columns = cols;
        this.spaces = this.createSpaces(this.columns, this.rows);
        this.drawGrid();
        this.addMines(10);
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


    getHorizontalConnected(space)
    {
        if (space.borderingMinesCount === 0) {
            const output = new Array();
            if (space.x !== 7) {
                for (let i = space.x + 1; i < 8; i++) {
                    let id = `col-${i}-row-${space.y}`;
                    const item = this.getSpaceById(id);
                    if (item.status !== 'open') {
                        if (item.borderingMinesCount === 0) {
                            output.push(item);
                        } else if (item.borderingMinesCount > 0) {
                            output.push(item);
                            break;
                        }
                    }
                }
            }
            if (space.x !== 0) {
                for (let i = space.x - 1; i >= 0; i--) {
                    let id = `col-${i}-row-${space.y}`;
                    const item = this.getSpaceById(id);
                    if (item.status !== 'open') {
                        if (item.borderingMinesCount === 0) {
                            output.push(item);
                        } else if (item.borderingMinesCount > 0) {
                            output.push(item);
                            break;
                        }
                    }
                }
            }
            return output;
        }
    }


    getVerticalConnected(space)
    {
        if (space.borderingMinesCount === 0) {
            const output = new Array();
            if (space.y !== 9) {
                for (let i = space.y + 1; i < 9; i++) {
                    const id = `col-${space.x}-row-${i}`;
                    const item = this.getSpaceById(id);
                    if (item.status !== 'open') {
                        if (item.borderingMinesCount === 0) {
                            output.push(item);
                        } else if (item.borderingMinesCount > 0) {
                            output.push(item);
                            break;
                        }
                    }
                }
            }
            if (space.y !== 0) {
                for (let i = space.y - 1; i >= 0; i--) {
                    const id = `col-${space.x}-row-${i}`;
                    console.log(id)
                    const item = this.getSpaceById(id);
                    if (item.status !== 'open') {
                        if (item.borderingMinesCount === 0) {
                            output.push(item);
                        } else if (item.borderingMinesCount > 0) {
                            output.push(item);
                            break;
                        }
                    }
                }
            }
            return output;
        }
    }


    getRightDiagonalConnected(space)
    {
        if (space.borderingMinesCount === 0) {
            /*
            get all right diagonal spaces starting at target coordinates that are:
            1. not open;
            2. don't have a bomb;

            if reach a space that has a bomb: stop before adding;
            if reach a space that borders a bomb: add it, then stop;
            */
        }
    }


    getLeftDiagonalConnected(space)
    {
        if (space.borderingMinesCount === 0) {
            /*
            get all left diagonal spaces starting at target coordinates that are:
            1. not open;
            2. don't have a bomb;

            if reach a space that has a bomb: stop before adding;
            if reach a space that borders a bomb: add it, then stop;
            */
        }
    }


    // starting from target space iterate over diagonals calling this method
    getConnectedSpaces(space)
    {
        return [
            ...this.getVerticalConnected(space),
            ...this.getHorizontalConnected(space)
        ];
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
            space.borderingMinesCount = mineCount;
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


    handleRightClicks(id)
    {
        const space = this.getSpaceById(id);
        if (space.status === 'open') {
            return;
        } else {
            space.rightClicks++;
            if (space.rightClicks === 1) {
                this.flagSpace(id);
            } else if (space.rightClicks === 2) {
                this.questionMarkSpace(id);
            } else if (space.rightClicks === 3) {
                this.clearSpace(id);
            }
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
