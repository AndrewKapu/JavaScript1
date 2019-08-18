'use strict';

/**
 * Object of shopping cart
 * @property {Object} userCart Contains user's cart information
 * @property {Object} userCart.products Contains products information
 * @property {Object} userCart.number Object of single product Object's name
 * itself is product's id
 * @property {HTMLElement} productsContainer Contains DOM element that contains products
 * @property {HTMLElement} cartContainer Contains DOM element of cart container
 * @property {Object} settings Contains different selectors that are required for script to
 * work
 */
const cart = {
    settings: {
        productsContainerId: 'products-wrapper',
        buyBtnClass: 'product__buy-btn',
        buyBtnId: 'buyBtn',
        userCartClass: 'cart',
        cartProductWrapperClass: 'cart__product',
        cartProductDelBtnClass: 'cart__product-del',
        cartDisplayGeneralClass: 'cart__display',
        cartDisplayQuantityClass: 'cart__display_quantity',
        cartTotalPriceClassWrapper: 'cart__total-price-wrapper',
        cartTotalPriceClass: 'cart__total-price',
    },
    userCart: {
        products: {
            // 1: {
            //     name: 'product1',
            //     quantity: 1,
            //     price: 100,
            // },
        },
        finalPrice: null,
    },
    productsContainer: null,
    cartContainer: null,

    /**
     * Initializes cart module, sets user's settings
     * @param {Object} userSettings User's settings
     */
    init(userSettings = {}) {
        Object.assign(this.settings, userSettings);
        this.productsContainer = document.getElementById(this.settings.productsContainerId);
        this.cartContainer = document.querySelector(`.${this.settings.userCartClass}`);
        this.initEventHListeners();
    },

    /**
     * Sets event handlers
     */
    initEventHListeners() {
        this.productsContainer.addEventListener('click', (event) => {
            if (event.target.id === this.settings.buyBtnId) {
                this.addToCart(event);
            }
        });

        this.cartContainer.addEventListener('click', () => {
            if (event.target.classList[0] === this.settings.cartProductDelBtnClass) {
                this.deleteProductFromCart(+event.target.parentNode.dataset.id);
            }
        });
    },

    /**
     * Adds products to cart
     */
    addToCart(event) {
        event.preventDefault();
        if (this.alreadyInCart(+event.target.dataset.product_id)) {
            this.increaseQuantity(+event.target.dataset.product_id);
            this.changeTotalPrice(+event.target.dataset.price, 'add');
            return;
        }
        //Creating product object to store it in userCart.products
        const product = {};
        product.name = event.target.dataset.name;
        product.quantity = 1;
        product.price = +event.target.dataset.price;
        let productId = +event.target.dataset.product_id;

        this.userCart.products[`${productId}`] = product;
        this.changeTotalPrice(product.price, 'add');
        this.renderProductInCart(product, productId);
    },

    /**
     * Increases quantity if products exists in cart
     * @param {int} id Product id 
     */
    increaseQuantity(id) {
        this.userCart.products[`${id}`].quantity++;
        this.cartContainer
            .querySelector(`.${this.settings.cartProductWrapperClass}[data-id="${id}"] .${this.settings.cartDisplayQuantityClass}`)
            .innerText = `Quantity: ${this.userCart.products[`${id}`].quantity}`;
    },

    /**
     * Checks if certain product already in cart
     * @param {int} id Product id
     * @returns {boolean} true if this kind of product is already in user's cart, false if not
     */
    alreadyInCart(id) {
        return id in this.userCart.products;
    },

    /**
     * Renders products element in cart
     * @param {{name: string, quantity: int, price: int}} product
     * @param {int} productId product id
     */
    renderProductInCart(product, productId) {
        let productWrapper = document.createElement('div');
        productWrapper.classList.add(this.settings.cartProductWrapperClass);
        productWrapper.dataset.id = productId;
        this.cartContainer
            .insertBefore(productWrapper, document.querySelector(`.${this.settings.cartTotalPriceClassWrapper}`));

        let productHtmlString = `<span class="${this.settings.cartDisplayGeneralClass}">${product.name}</span>
        <span class="${this.settings.cartDisplayGeneralClass} ${this.settings.cartDisplayQuantityClass}">Quantity: ${product.quantity}</span>
        <span class="${this.settings.cartDisplayGeneralClass}">X ${product.price}$</span>`;
        productWrapper.innerHTML = productHtmlString;
        
        let productDelBtn = document.createElement('a');
        productDelBtn.classList.add(this.settings.cartProductDelBtnClass);
        productDelBtn.innerText = 'Del';
        productWrapper.appendChild(productDelBtn);
    },

    /**
     * Updates price after product added to cart
     * @param {int} price Price of a product
     * @param {string} action Added to cart or removed from it
     */
    changeTotalPrice(price, action) {
        if (action === 'add') {
            this.userCart.finalPrice += price;                        
        } else if ('reduce') {
            this.userCart.finalPrice -= price;
        }
        this.cartContainer
                .querySelector(`.${this.settings.cartTotalPriceClass}`).innerText 
                = this.userCart.finalPrice;
    },


    /**
     * Deletes products from our script data and from user's html
     * @param {int} id Products id
     */
    deleteProductFromCart(id) {               
        this.changeTotalPrice(this.userCart.products[id].price * this.userCart.products[id].quantity, 'reduce');
        delete this.userCart.products[`${id}`];
        this.cartContainer.querySelector(`[data-id="${id}"]`).remove();
    },    
};

cart.init();