'use strict';

const ticTackToe = {
    gameTableElement: null,
    status: 'playing',
    mapValues: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],

    phase: 'X',

    init() {
        this.gameTableElement = document.getElementById('game');
        this.renderMap();
        this.initEventHandlers();
    },

    /**
     * Renders map in HTML
     */
    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                const td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    },

    /**
     * Sets event handlers
     */
    initEventHandlers() {
        this.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
    },

    /**
     * Handles click
     * @param {Event} event click event
     */
    cellClickHandler(event) {
        const row = event.target.dataset.row;
        const col = event.target.dataset.col;

        if (!this.isStatusPlaying() || !this.isClickByCell(event) || !this.isCellEmpty(row, col)) {
            return;
        }
        
        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
        if (this.hasWon()) {
            this.stopGame();
            this.congratulatePlayer();
        }
        this.togglePhase();
    },

    /*
    mapValues: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],*/

    /**
     * Checks if we have winning line
     * @returns {boolean} true if we have winning line, false if not
     */
    hasWon() {        
        return this.isLineWon({x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}) ||
            this.isLineWon({x: 0, y: 1}, {x: 1, y: 1}, {x: 2, y: 1}) ||
            this.isLineWon({x: 0, y: 2}, {x: 1, y: 2}, {x: 2, y: 2}) ||

            this.isLineWon({x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}) ||
            this.isLineWon({x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}) ||
            this.isLineWon({x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}) ||

            this.isLineWon({x: 0, y: 0}, {x: 1, y: 1}, {x: 2, y: 2}) ||
            this.isLineWon({x: 0, y: 2}, {x: 1, y: 1}, {x: 2, y: 0});
    },

    /**
     * Checks potential winning line
     * @param {{x: int, y: int}} a Cell coordiantes on map
     * @param {{x: int, y: int}} b Cell coordiantes on map
     * @param {{x: int, y: int}} c Cell coordiantes on map
     */
    isLineWon(a, b, c) {
        const value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] + this.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000';
    },

    /**
     * Checks if click target was td
     * @param {Event} event click event
     * @returns {boolean} true if clicked by td, false if else
     */
    isClickByCell(event) {
        return event.target.tagName === 'TD';
    },

    /**
     * Toggles player phase (X or 0)
     */
    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    },

    /**
     * Checks if cell available for setting 'X' or '0'
     * @param {int} row Cell's row
     * @param {int} col Cell's col
     * @returns {boolean} returns true if cell is available, false if not
     */
    isCellEmpty(row, col) {
        return this.mapValues[row][col] === '';
    },

    /**
     * Says winnig phrase
     */
    congratulatePlayer() {
        const figure = this.phase === 'X' ? 'Крестики' : 'Нолики';
        setTimeout(() => {alert(`${figure} выигрывают эту игру!`)}, 500);
    },

    /**
     * Stops game
     */
    stopGame() {
        this.status = 'stopped';
    },

    /**
     * Defines if game is in playing status
     * @returns {boolean} true if game status is 'playing', false if not
     */
    isStatusPlaying() {
        return this.status === 'playing';
    },
};

window.onload = ticTackToe.init();