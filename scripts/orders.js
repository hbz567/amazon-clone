import { orders } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import formatCurrency from './utils/money.js';
import { addToCart, updateCartQuantity } from '../data/cart.js';


async function renderOrderGrid() {
    updateCartQuantity();
    await loadProductsFetch();

    let ordersGridHTML = '';
    
    orders.forEach((order) => {

        const date = new Date(order.orderTime);
        const formattedDate = date.toLocaleString('en-US', {
            month: 'long',
            day: '2-digit',
            timeZone: 'UTC'
        });
        const orderDetails = orderDetailsHTML(order);

        ordersGridHTML += `
            <div class="order-container">
                    
                <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${formattedDate}</div>
                    </div>
                    <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                    </div>
                </div>

                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
                </div>

                <div class="order-details-grid">
                    ${orderDetails}
                </div>
            </div>
        `;
    });
    document.querySelector('.js-orders-grid').innerHTML = ordersGridHTML;

    document.querySelectorAll('.js-buy-again-button').forEach((button) => {
        button.addEventListener('click', () => {
            addToCart(button.dataset.productId);
            updateCartQuantity();
            button.innerHTML = '✔ Added';
        });
    });
    
}
renderOrderGrid();


function orderDetailsHTML(order) {    
    let html = '';

    order.products.forEach((orderItem) => {

        const product = getProduct(orderItem.productId);
        const arrivingTime = new Date(orderItem.estimatedDeliveryTime).toLocaleString('en-US', {
            month: 'long',
            day: '2-digit',
            timeZone: 'UTC'
        });

        html += `
            <div class="product-image-container">
                <img src="../${product.image}">
            </div>

            <div class="product-details">
                <div class="product-name">
                ${product.name}
                </div>
                <div class="product-delivery-date">
                Arriving on: ${arrivingTime}
                </div>
                <div class="product-quantity">
                Quantity: ${orderItem.quantity}
                </div>
                <button class="buy-again-button js-buy-again-button button-primary"
                data-product-id=${orderItem.productId}>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
                </button>
            </div>

            <div class="product-actions">
                <a href="tracking.html?orderId=${order.id}&productId=${orderItem.productId}">
                <button class="track-package-button button-secondary">
                    Track package
                </button>
                </a>
            </div>
        `;
    });

    return html;
}