class Cart {
    cartItems;
    #localStorageKey;

    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
    }

    saveToStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    }

    addToCart(productId) {
        let inCart = false;

        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
                inCart = true;
                cartItem.quantity += 1;
            }
        });
    
        inCart || this.cartItems.push({
            productId,
            quantity: 1,
            deliveryOptionsId: 1
        });
    
        this.saveToStorage();
    }

    removeFromCart(productId) {
        this.cartItems.forEach((cartItem, index) => {
            if (cartItem.productId === productId) {
                this.cartItems.splice(index, 1);
            }
        });
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
                cartItem.deliveryOptionsId = deliveryOptionId;
            }
        });
        this.saveToStorage();
    }
}

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);