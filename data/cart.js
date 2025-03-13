export const cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId) {
    let inCart = false;

    cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
        inCart = true;
        cartItem.quantity += 1;
        }
    });

    inCart || cart.push({
        productId,
        quantity: 1
    });

    saveToStorage();
}

export function removeFromCart(productId) {
    cart.forEach((cartItem, index) => {
        if (cartItem.productId === productId) {
            cart.splice(index, 1);
        }
    });
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}