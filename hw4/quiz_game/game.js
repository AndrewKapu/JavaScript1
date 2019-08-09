'use strict';

/*3 ** Реализовать игру« Кто хочет стать миллионером ? ».
Т.е.у вас должен быть главный объект содержащий всю логику игры, который будет иметь методы, например
метод run, возможно метод init и т.д.
В игре должны быть заранее подготовлены список вопросов и ответов(как минимум 5 вопросов).
Игра должна приветствовать пользователя, после чего задавать вопросы пользователю и предлагать варианты
ответов в виде теста, например:
    Сколько букв в слове "привет":
    a.Пять.
b.Шесть.
c.Семь.
d.Куда я попал ?
    Проверять правильный вариант выбрал пользователь или нет, необходимо вести счет.
По окончании игры, когда было задано 5 вопросов, вы должны сообщить пользователю его счет и предложить
сыграть снова.
Также должна быть возможность выхода из игры заранее, если пользователю надоело играть.
*/

/* @property {number} questions[].answers.id Answer id
 * @property {string} questions[].answers.text Answer text*/

/**
 * Object of settings
 * @property {Object[]} questions Stores game questions
 * @property {string} questions[].question Stores question
 * @property {[{id: number, text: string}]} questions[].answers Stores game queations 
 * @property {number} questions[].correctAnswerId Stores key to determine correct answer
 */
const settings = {
    questions: [{
            question: 'Сколько бит в байте?',
            answers: [{
                    id: 1,
                    text: '2',

                },
                {
                    id: 2,
                    text: '0',

                },
                {
                    id: 3,
                    text: '4',

                },
                {
                    id: 4,
                    text: '8',
                },
            ],
            correctAnswerId: 4,
        },
        {
            question: 'Сколько планет в солнечной системе',
            answers: [{
                    id: 1,
                    text: '5',

                },
                {
                    id: 2,
                    text: '4',

                },
                {
                    id: 3,
                    text: '7',

                },
                {
                    id: 4,
                    text: '8',
                },
            ],
            correctAnswerId: 4,
        },
        {
            question: 'Сколько миллиардов человек на земле?',
            answers: [{
                    id: 1,
                    text: '10',
    
                },
                {
                    id: 2,
                    text: '7',
    
                },
                {
                    id: 3,
                    text: '3',
    
                },
                {
                    id: 4,
                    text: '5',
                },
            ],
            correctAnswerId: 2,
        },
        {
            question: 'Кто создал язык программирования JavaScript?',
            answers: [{
                    id: 1,
                    text: 'Брендан Эйх',
    
                },
                {
                    id: 2,
                    text: 'Расмус Лердорф',
    
                },
                {
                    id: 3,
                    text: 'Гвидо ван Россум',
    
                },
                {
                    id: 4,
                    text: 'Тим Бернерс-Ли',
                },
            ],
            correctAnswerId: 1,
        },

        {
            question: 'Кто глава Apple?',
            answers: [{
                    id: 1,
                    text: 'Стив Возняк',
    
                },
                {
                    id: 2,
                    text: 'Джонатан Айв',
    
                },
                {
                    id: 3,
                    text: 'Тим Кук',
    
                },
                {
                    id: 4,
                    text: 'Дитер Рамс',
                },
            ],
            correctAnswerId: 3,
        },
    ],
};

/**
 * Describes user
 */
const user = {

    /**
     * Gets user's answer to question
     * @param {string} question Question being asked
     * @returns {number} User's answer
     */
    answerQuestion(question) {
        return parseInt(prompt(question));
    },
};

/**
 * Object of game, here's gonna be all properties and methods related to game.
 * @property {Object} settings Settings object
 * @property {Object} user Player object
 * @property {number} score Stores game score
 */
const game = {
    settings,
    user,
    score: 0,

    /**
     * Starts game
     */
    run() {
        this.score = 0;
        alert('Игра "Кто хочет стать миллионером!", для выхода из игры в любой момент введите -1')
        for (let i = 0; i < this.settings.questions.length; i++) {
            let answer = this.user.answerQuestion(this.askQuestion(this.settings.questions[i]));
            if (answer === -1) {
                return alert('До свидания! Спасибо за игру!')
            } else if (this.checkAnswer(this.settings.questions[i], answer)) {
                this.score++;
            }            
        }
        alert(`Вы ответили правильно на ${this.score} вопросов из ${this.settings.questions.length}`);
        confirm('Сыграем ещё?') ? this.run() : alert('До свидания!');
    },

    /**
     * Asks user a queation
     * @param {Object} question
     * @returns {string} Question
     */
    askQuestion(question) {
        console.log(question);
        return this.buildQuestionString(question);
    },

    //@param {{question: string, answers: [{id: number, text: string}], correctAnswerId: number}} question
    /**
     * Checks if user's answer is correct
     * @param {Object} question
     * @param {string} question.question
     * @param {[{id: number, text: string}]} question.answers
     * @param {number} question.correctAnswerId
     * @param {number} answer Answer to a question
     * @returns {boolean} true if correct, fasle if not
     */
    checkAnswer(question, answer) {
        if (question.correctAnswerId === answer) {            
            return true;
        } else return false;
    },

    /**
     * Builds question string for user
     * @param {Object} question
     * @param {string} question.question
     * @param {[{id: number, text: string}]} question.answers
     * @param {number} question.correctAnswerId
     * @returns {string} readeable question string
     */
    buildQuestionString(question) {
        let questionString = question.question + '\n';
        for (let val of question.answers) {
            questionString += `${val.id}) - ${val.text}\n`;
        }
        return questionString;
    },
};

game.run();