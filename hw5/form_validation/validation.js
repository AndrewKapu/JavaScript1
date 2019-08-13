'use strict';

/*
Имя - должно содержать как минимум 1 символ, не более 50 символов.
Телефон - должно содержать 11 цифр, не больше, не меньше.
Пароль - минимум 5 символов, максимум 50.
Повтор пароля - значение должно совпадать с полем пароль.

 */

const validationPatterns = {

};
/**
 * @property {Array} validationPatterns stores patterns information
 * @property {RegExp} regExp stores RegExp object
 * @property {string} formSubmitBtnId attribute of submit button
 * @property {HTMLelement} form form itself
 */
const validation = {
    validationPatterns: [{
            id: 'name',
            regEx: /^[a-zA-Z]{1,50}$/,
            errorText: 'Имя должно содержать минимум 1 символ, максимум 50',
            userText: null,
        },
        {
            id: 'tel',
            regEx: /^[0-9]{11}$/,
            errorText: 'Телефон содержит ровно 11 символов',
            userText: null,
        },
        {
            id: 'password',
            regEx: /^[a-zA-Z,0-9]{5,50}$/,
            errorText: 'Пароль содержит от 5 до 50 символов',
            userText: null,
        },
        {
            id: 'password2',
            regEx: /^[a-zA-Z,0-9]{5,50}$/,
            errorText: 'Пароли должны совпадать',
            userText: null,
        },
    ],
    regExp: null,
    formSubmitBtnId: 'submitForm',
    form: null,

    /**
     * Runs validation logic
     */
    run() {
        this.init();
    },
    /**
     * Initialization
     */
    init() {
        this.initEventHandler();
    },

    /**
     * Initializes submit button event handler
     */
    initEventHandler() {
        document.getElementById(this.formSubmitBtnId)
            .addEventListener('click', (event) => {
                event.preventDefault();
                let errorsExists = this.validaTionProcessStart();
                if (!errorsExists) {
                    this.form.submit();
                    alert('Данные введены корректно! Форма успешно отправлена!');
                }

            });
    },

    /**
     * Initializes validation process
     */
    validaTionProcessStart() {
        this.form === null ? this.setForm(event.target.parentNode) : this.form;
        this.clearAllMessages();
        this.setUserValues();
        return this.validate();
    },

    /**
     * Sets form property
     * @param {HTMLelement} form Form in html document
     */
    setForm(form) {
        this.form = form;
    },

    /**
     * Sets text that user typed in our patterns array
     */
    setUserValues() {
        this.validationPatterns.forEach(pattern => {
            pattern.userText = this.form.querySelector(`#${pattern.id}`).value;
        });
    },


    /**
     * Validates all form fields
     * @returns {boolean} errorsExists true if at least one field is invalid
     */
    validate() {
        let errorsExists = false;
        for (let i = 0, patterns = this.validationPatterns; i < patterns.length; i++) {
            this.regExp = patterns[i].regEx;
            if (!this.regExp.test(patterns[i].userText)) {
                errorsExists = true;
                this.highLightError(patterns[i].id, patterns[i].errorText);
            }
            if (patterns[i].id === 'password2') {
                if (!this.validatePasswordEquality(patterns[i - 1].userText, patterns[i].userText)) {
                    this.highLightError(patterns[i].id, patterns[i].errorText);
                    errorsExists = true;
                }
            }
        }
        return errorsExists;
    },

    /**
     * Checks if user typed exact same info in both password fields
     * @returns {boolean} false if passwords are not equal true if they are equal
     */
    validatePasswordEquality(pass1, pass2) {
        return pass1 === pass2;
    },

    /**
     * Higlight error in html
     * @param {string} id Id of element to highlight 
     */
    highLightError(id, errorText) {
        let errorMsgBlock = document.createElement('DIV');
        errorMsgBlock.classList.add('error-msg');
        errorMsgBlock.innerText = errorText;
        this.form.querySelector(`#${id}`).parentNode.appendChild(errorMsgBlock);
    },

    /**
     * Clears all error messages before next validation
     */
    clearAllMessages() {
        this.form.querySelectorAll('.error-msg').forEach(msg => {
            msg.remove();
        })
    }
};

validation.run();