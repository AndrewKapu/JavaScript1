'use strict';

/**
 * Объект с настройками игры.
 * @property {int} rowsCount - Rows in map.
 * @property {int} colsCount - Columns in map.
 * @property {int} startPositionX - Player's X coordinate start position.
 * @property {int} startPositionY - Player's Y coordinate start position.
 * @property {string} startDirection - Player's start direction.
 * @property {number} stepsInSecond - Steps in second.
 * @property {string} playerCellColor - Color of the cell where player is.
 * @property {string} emptyCellColor - Color of empty cell.
 */
const settings = {
    rowsCount: 10,
    colsCount: 10,
    startPositionX: 0,
    startPositionY: 0,
    startDirection: 'right',
    stepsInSecond: 5,
    playerCellColor: '#AA3333',
    emptyCellColor: '#EEEEEE',
};

/**
 * Player object 
 * @property {int} x x-axis coordinate position
 * @property {int} y y-axis coordinate position
 * @property {string} direction direction of movement
 */
const player = {
    x: null,
    y: null,
    direction: null,

    /**
     * Player initialize
     * @param {int} startX x-axis coordinate position
     * @param {int} startY y-axis coordinate position
     * @param {string} startDirection 
     */
    init(startX, startY, startDirection) {
        this.x = startX;
        this.y = startY;
        this.direction = startDirection;
    },

    /**
     * Player makes step
     */
    makeStep() {
        let nextPoint = this.getNextStepPoint();

        this.x = nextPoint.x;
        this.y = nextPoint.y;
    },

    /**
     * Gets player's next point     
     * @returns {{x: number, y: number}} next coordinate
     */
    getNextStepPoint() {
        let point = {
            x: this.x,
            y: this.y,
        };
        switch (this.direction) {
            case 'up':
                point.y--;
                break;
            case 'down':
                point.y++;
                break;
            case 'right':
                point.x++;
                break;
            case 'left':
                point.x--;
                break;
        }
        return point;
    },

    /**
     * Sets player's direction property
     * @param {string} direction direction of movement
     */
    setDirection(direction) {
        this.direction = direction;
    }
};
/**
 * Object of game
 * @property {player} player Participating player
 * @property {settings} settings Game settings
 * @property {HTMLElement} containerElement Container of our game.
 * @property {Array} cellElements Array of our game cells.
 */
const game = {
    player,
    settings,
    containerElement: null,
    cellElements: null,

    /**
     * Starts game
     */
    run() {
        this.init();
        setInterval(() => {
            if (this.canPlayerMakeStep()) {
                this.player.makeStep();
                this.render();
            }
        }, 1000 / this.settings.stepsInSecond)
    },

    /**
     * Game initialization
     */
    init() {
        this.player.init(this.settings.startPositionX,
            this.settings.startPositionY,
            this.settings.startDirection
        );
        this.containerElement = document.getElementById('game');
        this.initCells();
        this.initEventHandlers();
    },

    /**
     * Creates our map
     */
    initCells() {
        this.containerElement.innerHTML = '';
        this.cellElements = [];

        for (let row = 0; row < this.settings.rowsCount; row++) {
            let tr = document.createElement('tr');
            for (let col = 0; col < this.settings.colsCount; col++) {
                let cell = document.createElement('td');
                this.cellElements.push(cell);
                tr.appendChild(cell);
            }
            this.containerElement.appendChild(tr);
        }
    },

    /**
     * Sets Event Handlers
     */
    initEventHandlers() {
        document.addEventListener('keydown', (event) => {
            this.keyDownHandlers(event);
        });
    },

    /**
     * Handles keydown events
     * @property {Event} Keyboard event 
     */
    keyDownHandlers(event) {
        console.log(this);
        switch (event.code) {
            case 'KeyW':
            case 'ArrowUp':
                this.player.setDirection('up');
                break;
            case 'KeyS':
            case 'ArrowDown':
                this.player.setDirection('down');
                break;
            case 'KeyD':
            case 'ArrowRight':
                this.player.setDirection('right');
                break;
            case 'KeyA':
            case 'ArrowLeft':
                this.player.setDirection('left');
                break;
        }
    },

    /**
     * Finds player's coordinates and renders him
     */
    render() {
        this.cellElements.forEach(cell => {
            cell.style.backgroundColor = this.settings.emptyCellColor;
        });
        const playerCell = document
            .querySelector(`tr:nth-child(${this.player.y + 1})`)
            .querySelector(`td:nth-child(${this.player.x + 1})`);
        playerCell.style.backgroundColor = this.settings.playerCellColor;
    },

    /**
     * Decides if player can make step     
     * @returns {boolean} true if it's possible to make step, false if not
     */
    canPlayerMakeStep() {
        let point = this.player.getNextStepPoint();
        return point.x >= 0 && point.x < this.settings.colsCount &&
            point.y >= 0 && point.y < this.settings.rowsCount;
    },
};

window.onload = () => game.run();