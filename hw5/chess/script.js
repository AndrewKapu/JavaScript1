'use strict';

/**
 * Settings object
 * @property {string} tableId id of HTML-element that represents our chess table
 */
const settings = {
    tableId: 'table',
};

/**
 * Chess object
 * @property {HTML-element} table stores HTML-element of chess table
 * @property {Array} columnSigns contains symbols of columns
 * @property {Array} rowSigns contains symbols of rows
 * @property {Array} cellsStorage Storage for chess table cells
 * @property {Array} figuresStorage Stores figure data
 */
const chess = {
    settings,
    table: null,
    columnSigns: ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''],
    rowSigns: ['', 1, 2, 3, 4, 5, 6, 7, 8, ''],
    cellsStorage: [],
    figuresStorage: [{
            name: 'whiteKing',
            code: '&#9812;',
            position: {
                x: [5],
                y: 8
            }
        },
        {
            name: 'whiteQueen',
            code: '&#9813;',
            position: {
                x: [4],
                y: 8
            }
        },
        {
            name: 'whiteRook',
            code: '&#9814;',
            position: {
                x: [1, 8],
                y: 8
            }
        },
        {
            name: 'whiteBishop',
            code: '&#9815;',
            position: {
                x: [3, 6],
                y: 8
            }
        },
        {
            name: 'whiteKnight',
            code: '&#9816;',
            position: {
                x: [2, 7],
                y: 8
            }
        },
        {
            name: 'whitePawn',
            code: '&#9817;',
            position: {
                x: [1, 2, 3, 4, 5, 6, 7, 8],
                y: 7
            }
        },
        {
            name: 'blackKing',
            code: '&#9818;',
            position: {
                x: [5],
                y: 1
            }
        },
        {
            name: 'blackQueen',
            code: '&#9819;',
            position: {
                x: [4],
                y: 1
            }
        },
        {
            name: 'blackRook',
            code: '&#9820;',
            position: {
                x: [1, 8],
                y: 1
            }
        },
        {
            name: 'blackBishop',
            code: '&#9821;',
            position: {
                x: [3, 6],
                y: 1
            }
        },
        {
            name: 'blackKnight',
            code: '&#9822;',
            position: {
                x: [2, 7],
                y: 1
            }
        },
        {
            name: 'blackPawn',
            code: '&#9823;',
            position: {
                x: [1, 2, 3, 4, 5, 6, 7, 8],
                y: 2
            }
        },


    ],

    /**
     * Initializes game
     */
    init() {
        this.table = document.getElementById(this.settings.tableId);
        this.render();
    },
    /**
     * Renders our chess table
     */
    render() {
        this.renderCells();
        this.paintCells();
        this.setFigures();
    },

    /**
     * Renders table cells
     */
    renderCells() {
        for (let row = 0; row < 10; row++) {
            let tr = document.createElement('tr');
            for (let col = 0; col < 10; col++) {
                let td = document.createElement('td');
                td.dataset.x = col;
                td.dataset.y = row;
                if (row === 0 || row === 9) {
                    td.innerText = this.columnSigns[col];
                }
                if (col === 0 || col === 9) {
                    td.innerText = this.rowSigns[row];
                }
                this.cellsStorage.push(td);
                tr.appendChild(td);
            }
            this.table.appendChild(tr);
        }
    },

    /**
     * Paints cells
     */
    paintCells() {
        for (const cell of this.cellsStorage) {
            if (cell.dataset.x > 0 && cell.dataset.x < 9 &&
                cell.dataset.y > 0 && cell.dataset.y < 9) {
                if (cell.dataset.y % 2 === 0 && cell.dataset.x % 2 !== 0) {
                    cell.style.backgroundColor = '#ccc';
                } else if (cell.dataset.y % 2 !== 0 && cell.dataset.x % 2 === 0) {
                    cell.style.backgroundColor = '#ccc';
                }
            }
        }
    },

    /**
     * Sets chess figures on start positions
     */
    setFigures() {
        //TODO:
        this.figuresStorage.forEach(figure => {
            figure.position.x.forEach(coordinateX => {
                this.table.querySelector(`td[data-x="${coordinateX}"][data-y="${figure.position.y}"]`)
                    .innerHTML = figure.code;
            })            
        });
    },

};

chess.init();