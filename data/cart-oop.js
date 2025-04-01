function Cart(localStorageKey) {
    const cart = {
        cartItems: undefined,
    
        loadFromStorage() {
            this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [];
        },
    
        saveToStorage() {
            localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
        },
    
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
        },
    
        removeFromCart(productId) {
            this.cartItems.forEach((cartItem, index) => {
                if (cartItem.productId === productId) {
                    this.cartItems.splice(index, 1);
                }
            });
            this.saveToStorage();
        },
    
        updateDeliveryOption(productId, deliveryOptionId) {
            this.cartItems.forEach(cartItem => {
                if (cartItem.productId === productId) {
                    cartItem.deliveryOptionsId = deliveryOptionId;
                }
            });
            this.saveToStorage();
        }
    }

    return cart;
}

const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');

cart.loadFromStorage();
businessCart.loadFromStorage();

console.log(cart);
console.log(businessCart);