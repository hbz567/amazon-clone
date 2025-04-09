export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId) {
    for (let i = 0; i < orders.length; i++) {
        if (orders[i].id === orderId) {
            return orders[i];
        }
    }
}

export function getProductFromOrder(order, productId) {
    for (let i = 0; i < order.products.length; i++) {
        if (order.products[i].productId === productId) {
            return order.products[i];
        }
    }
}
