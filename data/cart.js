export const cart = [];

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