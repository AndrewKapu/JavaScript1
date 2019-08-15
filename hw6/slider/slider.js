'use strict';


/**
 * @property {Object} settings Settings object.
 * @property {string} settings.previewSelector Selector of thumbnails wrapper of gallery.
 * @property {string} settings.openedImageWrapperClass Class of opened image wrapper.
 * @property {string} settings.openedImageClass Class of opened image.
 * @property {string} settings.openedImageScreenClass Class of screen of opened image.
 * @property {string} settings.openedImageCloseBtnClass Class of close button image.
 * @property {string} settings.openedImageCloseBtnSrc Source to open button image.
 */
const gallery = {
    settings: {
        previewSelector: '.mySuperGallery',
        openedImageWrapperClass: 'galleryWrapper',
        openedImageClass: 'galleryWrapper__image',
        openedImageScreenClass: 'galleryWrapper__screen',
        openedImageCloseBtnClass: 'galleryWrapper__close',
        openedImageCloseBtnSrc: 'images/gallery/close.png',
        nextImgBtnClass: 'arrow__right',
        nextImgBtnSrc: 'images/gallery/arrow.png',
        previousImgBtnClass: 'arrow__left',
        previousImgBtnSrc: 'images/gallery/arrow.png',
        dummyPicSrc: 'images/gallery/dummy.jpg',
    },
    currentGalleryImg: null,

    /**
     * User is able to set his own settings if he wants
     * @param {Object} settings User's settings
     */
    init(settings = {}) {
        Object.assign(this.settings, settings);
        document.querySelector(this.settings.previewSelector)
            .addEventListener('click', event => this.containerClickHandler(event));
    },

    /**
     * Eventhandler for opening image.
     * @param {MouseEvent} event Mouse click event.
     * @param {HTMLElement} event.target Real targrt of click.
     */
    containerClickHandler(event) {
        if (event.target.tagName !== 'IMG') {
            return;
        }
        this.currentGalleryImg = event.target;
        this.openImage(event.target.dataset.full_image_url);
    },

    /**
     * Opens full image
     * @param {string} src Src to full image
     */
    openImage(src) {
        this.getScreenContainer().querySelector(`.${this.settings.openedImageClass}`)
            .src = src;
    },

    getScreenContainer() {
        let galleryWrapperElement = document
            .querySelector(`.${this.settings.openedImageWrapperClass}`);
        if (galleryWrapperElement) {
            return galleryWrapperElement;
        }

        return this.createScreenContainer();
    },

    /**
     * Creates screen container for full image
     * @returns {HTMLElement}
     */
    createScreenContainer() {
        let galleryWrapperElement = document.createElement('div');
        galleryWrapperElement.classList.add(this.settings.openedImageWrapperClass);

        let galleryScreenElement = document.createElement('div');
        galleryScreenElement.classList.add(this.settings.openedImageScreenClass);
        galleryWrapperElement.appendChild(galleryScreenElement);

        let closeImageElement = new Image();
        closeImageElement.classList.add(this.settings.openedImageCloseBtnClass);
        closeImageElement.src = this.settings.openedImageCloseBtnSrc;
        closeImageElement.addEventListener('click', () => this.close());
        galleryWrapperElement.appendChild(closeImageElement);

        let image = new Image();
        image.classList.add(this.settings.openedImageClass);
        //Onerror event handler
        image.onerror = () => image.src = this.settings.dummyPicSrc;
        galleryWrapperElement.appendChild(image);

        //Next image btn
        let nextImgBtn = new Image();
        nextImgBtn.classList.add(this.settings.nextImgBtnClass);
        nextImgBtn.src = this.settings.nextImgBtnSrc;
        nextImgBtn.addEventListener('click', () => {
            this.sliderBtnHandler()
        });
        galleryWrapperElement.appendChild(nextImgBtn);

        //Previous image btn
        let previousImgBtn = new Image();
        previousImgBtn.classList.add(this.settings.previousImgBtnClass);
        previousImgBtn.src = this.settings.nextImgBtnSrc;
        galleryWrapperElement.appendChild(previousImgBtn);
        previousImgBtn.addEventListener('click', () => {
            this.sliderBtnHandler()
        });
        document.body.appendChild(galleryWrapperElement);
        return galleryWrapperElement;
    },

    /**
     * Closes image window
     */
    close() {
        document.querySelector(`.${this.settings.openedImageWrapperClass}`).remove();
    },

    /**
     * Handles slider next picture / previous picture buttons
     */
    sliderBtnHandler() {                  
        if (event.target.classList[0] === 'arrow__right' &&
            this.currentGalleryImg.nextElementSibling !== null) {

            this.openImage(this.currentGalleryImg.nextElementSibling.dataset.full_image_url);
            this.currentGalleryImg = this.currentGalleryImg.nextElementSibling;

        } else if (event.target.classList[0] === 'arrow__left' &&
            this.currentGalleryImg.previousElementSibling !== null) {

            this.openImage(this.currentGalleryImg.previousElementSibling.dataset.full_image_url);
            this.currentGalleryImg = this.currentGalleryImg.previousElementSibling;

        }
    },
    
};

gallery.init({
    previewSelector: '.galleryPreviewsContainer'
});