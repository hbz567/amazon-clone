export const cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2
}, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];

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
}

export function removeFromCart(productId) {
    cart.forEach((cartItem, index) => {
        if (cartItem.productId === productId) {
            cart.splice(index, 1);
        }
    });
}