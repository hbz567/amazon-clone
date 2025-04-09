import { getOrder, getProductFromOrder } from "../data/orders.js";
import { loadProductsFetch, getProduct } from '../data/products.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');

async function loadPage() {
    const order = getOrder(orderId);
    const orderItem = getProductFromOrder(order, productId);

    const formattedDate = new Date(orderItem.estimatedDeliveryTime).toLocaleString('en-US', {
        month: 'long',
        day: '2-digit',
        timeZone: 'UTC'
    });

    await loadProductsFetch();
    const product = getProduct(productId);

    document.querySelector('.js-order-tracking').innerHTML = `

        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
            Arriving on ${formattedDate}
            </div>

            <div class="product-info">
            ${product.name}
            </div>

            <div class="product-info">
            Quantity: ${orderItem.quantity}
            </div>

            <img class="product-image" src="../${product.image}">

            <div class="progress-labels-container">
            <div class="progress-label">
                Preparing
            </div>
            <div class="progress-label current-status">
                Shipped
            </div>
            <div class="progress-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
            <div class="progress-bar"></div>
            </div>
        </div>
    `;
}
loadPage();