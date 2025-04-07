export let cart;

loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
}

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
        quantity: 1,
        deliveryOptionsId: 1
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

export function updateDeliveryOption(productId, newOptionId) {
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            cartItem.deliveryOptionsId = newOptionId;
        }
    });
    saveToStorage();
}

export function loadCart(renderFunction) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    renderFunction();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch() {
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
    return text;
}