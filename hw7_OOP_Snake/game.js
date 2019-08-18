'use strict';

/**
 * Dto object with settings, settings can be changed at initializtion
 * @property {int} rowsCount Amount of map rows.
 * @property {int} colsCount Amount of map columns.
 * @property {int} speed Snake's speed.
 * @property {int} winLength Snake's length for achieving game victory.
 */
const settings = {
    rowsCount: 21,
    colsCount: 21,
    speed: 2,
    winFoodCount: 50,
};


/**
 * Config object, includes methods for gettings settings and validatings them.
 * @property {settings} settings Game settings.
 */
const config = {
    settings,

    /**
     * Config initialization
     * @param {Object} userSettings Custome settings
     */
    init(userSettings) {
        Object.assign(this.settings, userSettings);
    },

    /**
     * @returns {int} Returns amount of rows.
     */
    getRowsCount() {
        return this.settings.rowsCount;
    },

    /**
     * @returns {int} Returns amount of columns.
     */
    getColsCount() {
        return this.settings.colsCount;
    },

    /**
     * @returns {int} Returns snake speed.
     */
    getSpeed() {
        return this.settings.speed;
    },

    /**
     * @returns {int} Returns amount of food that is required for victory.
     */
    getWinFoodCount() {
        return this.settings.winFoodCount;
    },

    /**
     * Validates settings
     */
    validate() {
        /**
         * DTO object with validation results.
         * @property {boolean} isValid true, if settings are valid, else false.
         * @property {string[]} errors array with all mistakes.
         */
        const result = {
            isValid: true,
            errors: [],
        };

        if (this.settings.rowsCount < 10 || this.settings.rowsCount > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение rowsCount должно быть в диапазоне [10, 30].');
        }

        if (this.settings.colsCount < 10 || this.settings.colsCount > 30) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение colsCount должно быть в диапазоне [10, 30].');
        }

        if (this.settings.speed < 1 || this.settings.speed > 10) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение speed должно быть в диапазоне [1, 10].');
        }

        if (this.settings.winFoodCount < 5 || this.settings.winFoodCount > 50) {
            result.isValid = false;
            result.errors.push('Неверные настройки, значение winLength должно быть в диапазоне [5, 50].');
        }

        return result;
    },
};

/**
 * Map object, includes methods for displaying and creatings game map.
 * @property {Object} cells Object that contains all map cells.
 * @property {Array} usedCells Array contains all unavailable game cells.
 */
const map = {
    cells: null,
    usedCells: [],
    /**
     * Method initializes and renders map
     * @param {int} rowsCount Amount of rows on map
     * @param {int} colsCount Amount of cols on map
     */
    init(rowsCount, colsCount) {
        const table = document.getElementById('game');
        table.innerHTML = "";
        this.cells = {};
        this.usedCells = [];

        for (let row = 0; row < rowsCount; row++) {
            const tr = document.createElement('tr');
            tr.classList.add('row');
            table.appendChild(tr);

            for (let col = 0; col < colsCount; col++) {
                const td = document.createElement('td');
                td.classList.add('cell');

                this.cells[`x${col}_y${row}`] = td;

                tr.appendChild(td);
            }
        }

    },

    /**
     * Renders game objects on map
     * @param {{x: int, y: int}[]} snakePointsArray Array with snake's points.
     * @param {{x: int, y: int}} foodPoint Food point.
     */
    render(snakePointsArray, foodPoint) {
        //Clears map from previous render
        for (const cell of this.usedCells) {
            cell.className = 'cell';
        }

        //Clears usedCells
        this.usedCells = [];

        snakePointsArray.forEach((point, idx) => {
            const snakeCell = this.cells[`x${point.x}_y${point.y}`];
            snakeCell.classList.add(idx === 0 ? 'snakeHead' : 'snakeBody');
            this.usedCells.push(snakeCell);
        });

        const foodCell = this.cells[`x${foodPoint.x}_y${foodPoint.y}`];
        foodCell.classList.add('food');
        this.usedCells.push(foodCell);
    },
};

/**
 * Snake object.
 * @property {{x: int, y: int}[]} body Array with snake's body elements.
 * @property {string} direction Direction where user wants snake to go.
 * @property {string} lastStepDirection Direction of snake's previous movement.
 */
const snake = {
    body: null,
    direction: null,
    lastStepDirection: null,

    /**
     * Initializes snake, start position and direction.
     * @param {{x: int, y: int}[]} startBody Snake start position.
     * @param {string} direction Player's start position.
     */
    init(startBody, direction) {
        this.body = startBody;
        this.direction = direction;
        this.lastStepDirection = direction;
    },

    /**
     * Gets snake body
     * @return {{x: int, y: int}[]};
     */
    getBody() {
        return this.body;
    },

    /**
     * Gets point where snake head is going to be next step
     * @returns {{x: int, y: int}} Snake's head next position
     */
    getNextStepHeadPoint() {
        //Snake's head
        const firstPoint = this.body[0];
        switch (this.direction) {
            case 'up':
                return {
                    x: firstPoint.x, y: firstPoint.y - 1
                };
            case 'right':
                return {
                    x: firstPoint.x + 1, y: firstPoint.y
                };
            case 'down':
                return {
                    x: firstPoint.x, y: firstPoint.y + 1
                };
            case 'left':
                return {
                    x: firstPoint.x - 1, y: firstPoint.y
                };
        }
    },

    /**
     * Checks if snake contains point.
     * @param {{x: int, y: int}} point Point being checked.
     * @returns {boolean} true, if snake contains point, else false.
     */
    isOnPoint(point) {
        return this.body.some(snakePoint => snakePoint.x === point.x && snakePoint.y === point.y);
    },

    /**
     * Snake's step action
     */
    makeStep() {
        this.lastStepDirection = this.direction;
        this.body.unshift(this.getNextStepHeadPoint());
        this.body.pop();
    },

    /**
     * Sets snake's direction of movement
     * @param {string} direction Direction of movement
     */
    setDirection(direction) {
        this.direction = direction;
    },

    /**
     * Gets last step direction
     * @returns {string} last step direction
     */
    getLastStepDirection() {
        return this.lastStepDirection;
    },

    /**
     * Increases snake's length
     */
    growUp() {
        const lastBodyIdx = this.body.length - 1;
        const lastBodyPoint = this.body[lastBodyIdx];
        const lastBodyPointClone = Object.assign({}, lastBodyPoint);
        this.body.push(lastBodyPointClone);
    },

};
/**
 * Food object.
 * @property {int} x X-axis coordinate of food.
 * @property {int} y Y-axis coordinate of food.
 */
const food = {
    x: null,
    y: null,


    /**
     * Gets food coordinates
     * @returns {{x: int, y: int}} Food coordinates.
     */
    getCoordinates() {
        return {
            x: this.x,
            y: this.y,
        }
    },


    /**
     * Sets food coordinates
     * @param {{x: int, y: int}} point New point with food coordinates.
     */
    setCoordinates(point) {
        this.x = point.x;
        this.y = point.y;
    },

    /**
     * Checks if food is on certain point
     * @param {{x: int, y: int}} point point to check
     * @returns {boolean} true if points equal, else false 
     */
    isOnPoint(point) {
        return this.x === point.x && this.y === point.y;
    },
};

/**
 * Game status object.
 * @property {string} condition Game status.
 */
const status = {
    condition: null,

    /**
     * Sets status in "playing".
     */
    setPlaying() {
        this.condition = 'playing';
    },

    /**
     * Sets status in "stopped".
     */
    setStopped() {
        this.condition = 'stopped';
    },

    /**
     * Sets status in "finished".
     */
    setFinished() {
        this.condition = 'finished';
    },

    /**
     * Checks if status is in "playing".
     * @returns {boolean} true, if staus is "playing", else false.
     */
    isPlaying() {
        return this.condition === 'playing';
    },

    /**
     * Checks if status is in "stopped".
     * @returns {boolean} true, if staus is "stopped", else false.
     */
    isStopped() {
        return this.condition === 'stopped';
    },
};

/**
 * Object of score
 * @property {int} value Score value
 */
const score = {
    value: null,
    scoreDomElemId: 'score',

    /**
     * Initializes score
     */
    init() {
        this.value = 0;
    },

    /**
     * Increases score by increment
     * @param {int} increment Value by which you need to increase the number
     */
    increaseValue(increment) {
        this.value += increment;
    },

    /**
     * Gets score value
     */
    getScore() {
        return this.value;
    },


    /**
     * Sets score value
     * @param {int} value Value to be setted
     */
    setScore(value) {
        this.value = value;
    },

    /**
     * Renders score in user's interface
     */
    render() {
        document.getElementById(this.scoreDomElemId).innerText = `Змейка съела: ${this.value}`;
    },

    /**
     * Resets score
     */
    reset() {
        this.init(),
            this.render();
    },
};

/**
 * Game object.
 * @property {settings} settings Game settings.
 * @property {map} map Map object.
 * @property {snake} snake Snake object.
 * @property {food} food Food object.
 * @property {status} status Game status.
 * @property {int} tickInterval Game interval number.
 * @property {int} score User's score
 */
const game = {
    config,
    map,
    snake,
    food,
    status,
    score,
    tickInterval: null,

    /**
     * Game initialization
     * @param {Object} userSettings User can set custom settings
     */
    init(userSettings) {
        this.config.init(userSettings);
        const validation = this.config.validate();

        if (!validation.isValid) {
            for (const err of validation.errors) {
                console.error(err);
            }
            return;
        }

        this.map.init(this.config.getRowsCount(), this.config.getColsCount());

        this.setEventHandlers();

        this.reset();

        this.score.init();
    },

    /**
     * Sets game at a starting position
     */
    reset() {
        this.stop();
        this.snake.init(this.getStartSnakeBody(), 'up');
        this.food.setCoordinates(this.getRandomFreeCoordinates());
        this.render();
        this.score.reset();
    },

    /**
     * Plays game
     */
    play() {
        this.status.setPlaying();
        this.tickInterval = setInterval(() => {
            this.tickHandler()
        }, 1000 / this.config.getSpeed());
        this.setPlayButton('Стоп');
    },

    /**
     * Stops game
     */
    stop() {
        this.status.setStopped();
        clearInterval(this.tickInterval);
        this.setPlayButton('Старт');
    },

    /**
     * Finishes game
     */
    finish() {
        this.status.setFinished();
        clearInterval(this.tickInterval);
        this.setPlayButton('Игра закончена', true);
    },

    /**
     * Game ticking handler, moderates when snake shoulf move
     */
    tickHandler() {
        //TODO:Decide if it's needed anymore
        if (!this.canMakeStep() && !this.teleportSnake()) {
            return this.finish();
        }        

        if (this.food.isOnPoint(this.snake.getNextStepHeadPoint())) {
            this.snake.growUp();
            this.score.increaseValue(1);
            this.score.render();
            this.food.setCoordinates(this.getRandomFreeCoordinates());
            if (this.isGameWon()) {
                this.finish();
            }
        }

        this.snake.makeStep();
        this.render();
    },

    /**
     * Checks if snake can make step
     */
    canMakeStep() {
        const nextHeadPoint = this.snake.getNextStepHeadPoint();

        return !this.snake.isOnPoint(nextHeadPoint) &&
            nextHeadPoint.x < this.config.getColsCount() &&
            nextHeadPoint.y < this.config.getRowsCount() &&
            nextHeadPoint.x >= 0 &&
            nextHeadPoint.y >= 0;
    },

    /**
     * Changes play button in user's interface.
     * @param {string} textContent Button text.
     * @param {boolean} [isDisabled = false] Should we disable button.
     */
    setPlayButton(textContent, isDisabled = false) {
        const playButton = document.getElementById('playButton');
        playButton.innerText = textContent;
        isDisabled ? playButton.classList.add('disabled') : playButton.classList.remove('disabled');
    },

    /**
     * Renders everything that is needed for the game - map, snake, food
     */
    render() {
        this.map.render(this.snake.getBody(), this.food.getCoordinates());
    },

    /**
     * Returns snake start position in cart center.
     * @returns {{x: int, y: int}[]} Snake's start position point.
     */
    getStartSnakeBody() {
        return [{
            x: Math.floor(this.config.getColsCount() / 2),
            y: Math.floor(this.config.getRowsCount() / 2),
        }];
    },

    /**
     * Returns available (not occupied) coordinates on map
     */
    getRandomFreeCoordinates() {
        const exclude = [this.food.getCoordinates(), ...this.snake.getBody()];

        while (true) {
            const rndPoint = {
                x: Math.floor(Math.random() * this.config.getColsCount()),
                y: Math.floor(Math.random() * this.config.getRowsCount()),
            };

            if (!exclude.some((elem) => {
                    elem.x === rndPoint.x && elem.y === rndPoint.y
                })) {
                return rndPoint;
            }
        }
    },

    /**
     * Sets event handlers
     */
    setEventHandlers() {
        document.getElementById('playButton').addEventListener('click', () => this.playClickHandler());
        document.getElementById('newGameButton').addEventListener('click', event => this.newGameClickHandler(event));
        document.addEventListener('keydown', event => this.keyDownHandler(event));
    },

    /**
     * "Play" button handler
     */
    playClickHandler() {
        if (this.status.isPlaying()) {
            this.stop();
        } else if (this.status.isStopped()) {
            this.play();
        }
    },

    /**
     * "New game" button handler
     */
    newGameClickHandler() {
        this.reset();
    },

    keyDownHandler(event) {
        if (!this.status.isPlaying()) {
            return;
        }
        const direction = this.getDirectionByCode(event.code);

        if (this.canSetDirection(direction)) {
            this.snake.setDirection(direction);
        }
    },

    /**
     * 
     * @param {string} direction Current direction of snake
     */
    canSetDirection(direction) {
        const lastStepDirection = this.snake.getLastStepDirection();

        return direction === 'up' && lastStepDirection !== 'down' ||
            direction === 'right' && lastStepDirection !== 'left' ||
            direction === 'down' && lastStepDirection !== 'up' ||
            direction === 'left' && lastStepDirection !== 'right';
    },

    /**
     * Determines direction depends on what button user clicked
     * @param {string} code Code of a keyboard button 
     * @returns {string} Snake's movement direction
     */
    getDirectionByCode(code) {
        switch (code) {
            case 'KeyW':
            case 'ArrowUp':
                return 'up';
            case 'KeyD':
            case 'ArrowRight':
                return 'right';
            case 'KeyS':
            case 'ArrowDown':
                return 'down';
            case 'KeyA':
            case 'ArrowLeft':
                return 'left';
            default:
                return '';
        }
    },

    /**
     * @returns {boolean} true if game is won, false if not
     */
    isGameWon() {
        return this.snake.getBody().length > this.config.getWinFoodCount();
    },

    /**
     * Teleports snake if it hits wall (changes snake's head coordinates)
     * @returns {boolean} true if snake gets teleported, false if not     
     */
    teleportSnake() {
        const point = this.snake.getNextStepHeadPoint();
        if (point.x >= this.config.getColsCount()) {
            this.snake.body[0].x -= this.config.getColsCount();
            return true;
        } else if (point.x < 0) {
            this.snake.body[0].x += this.config.getColsCount();
            return true;
        } else if (point.y >= this.config.getRowsCount()) {
            this.snake.body[0].y -= this.config.getRowsCount();
            return true;
        } else if (point.y < 0) {
            this.snake.body[0].y += this.config.getRowsCount();
            return true;
        }

        return false;
    },
};

game.init({
    speed: 5,
    winFoodCount: 10
});