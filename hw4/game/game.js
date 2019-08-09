'use strict';

/*
    Game where we can move as a players in browser's console
*/

/**
 * Game settings object.
 * @property {int} rowsCount Number of rows .
 * @property {int} colsCount Number of columns.
 * @property {int} startPositionX Player's starter position by X coordinate.
 * @property {int} startPositionY Player's starter position by Y coordinate.
 * @property {array} commands Available commands
 */
const settings = {
    rowsCount: 10,
    colsCount: 10,
    startPositionX: 0,
    startPositionY: 0,
    commands: [{
            direction: 'Выйти из игры - -1'
        },
        {
            direction: 'Вверх - 8'
        },
        {
            direction: 'Вниз - 2'
        },
        {
            direction: 'Вправо - 6'
        },
        {
            direction: 'Влево - 4'
        },
        {
            direction: 'Вправо + вверх - 9'
        },
        {
            direction: 'Вправо + вниз - 3'
        },
        {
            direction: 'Влево + вверх - 7'
        },
        {
            direction: 'Влево + вниз - 1'
        },
    ],
};

/**
 * Object of player, here's gonna be all properties and methods related to him.
 * @property {int} x position by X coordinate.
 * @property {int} y position by Y coordinate.
 */
const player = {
    x: null,
    y: null,

    /**
     * Initializes game
     * @param {int} startX X-axis coordinate 
     * @param {int} startY Y-axis coordinate
     */
    init(startX, startY) {
        this.x = startX;
        this.y = startY;
    },

    /**
     * Function sets new position of player
     * @param {{x: int, y:int}} coordinates Coordinates to move to 
     */
    move(coordinates) {
       this.x = coordinates.x;
       this.y = coordinates.y;
    },

    /**
     * Returns players next position according to direction
     * @param {int} direction Direction of movement 
     * @returns {object{x: int, y:int}} Object with coordinates of next step
     */
    getNextStep(direction) {        
        let coordinates = {
            x: this.x,
            y: this.y
        };
        switch (direction) {
            case 8:
                coordinates.y--;
                break;
            case 2:
                coordinates.y++;
                break;
            case 6:
                coordinates.x++;
                break;
            case 4:
                coordinates.x--;
                break;
            case 7:
                coordinates.y--;
                coordinates.x--;
                break;
            case 9:
                coordinates.x++;
                coordinates.y--;
                break;
            case 1:
                coordinates.x--;
                coordinates.y++;
                break;
            case 3:
                coordinates.x++;
                coordinates.y++;
                break;
        }
        return coordinates;
    }
};

/**
 * Object of game, here's gonna be all properties and methods related to game.
 * @property {settings} settings Game settings.
 * @property {player} player Player that participates in the game.
 */
const game = {
    settings,
    player,

    /**
     * Starts game     
     */
    run() {
        this.player.init(this.settings.startPositionX, this.settings.startPositionY);

        while (true) {
            this.render();

            const direction = this.getDirection();

            if (direction === -1) {
                return alert('До свидания!');
            } else if (this.canPlayerMakeStep(this.player.getNextStep(direction))) {
                this.player.move(this.player.getNextStep(direction));
            }
        }
    },
    /**
     * Renders game map in console 
     */
    render() {
        // String that will be our map
        let map = '';
        for (let row = 0; row < this.settings.rowsCount; row++) {
            for (let col = 0; col < this.settings.colsCount; col++) {
                if (this.player.x === col && this.player.y === row) {
                    map += '0 ';
                } else {
                    map += 'x ';
                }
            }
            map += '\n';
        }
        console.clear();
        console.log(map);
    },

    /**
     * Function asks direction from user
     * @returns {int} direction of movement
     */
    getDirection() {
        const availableDirections = [-1, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let msg = '';
        for (let val of this.settings.commands) {
            msg += `${val.direction}\n`;
        }
        while (true) {
            let direction = parseInt(prompt(`Введите одно из чисел\n ${msg}`));
            if (!availableDirections.includes(direction)) {
                alert('Вы ввели неверное число!');
                continue;
            }
            return direction;
        }
    },


    /**
     * Function decides if player can make step
     * @param {object{x: int, y: int}} coordinates Object with coordinates
     * @returns {boolean} premission to make step 
     */
    canPlayerMakeStep(coordinates) {        
        if (coordinates.x >= this.settings.colsCount || coordinates.x < 0 ||
            coordinates.y >= this.settings.rowsCount || coordinates.y < 0) {
            alert('Столкновение со стенкой!')
            return false;
        }

        return true;
    },
};

game.run();