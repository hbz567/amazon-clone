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
            <div class="progress-label js-preparing-label">
                Preparing
            </div>
            <div class="progress-label js-shipped-label">
                Shipped
            </div>
            <div class="progress-label js-delivered-label">
                Delivered
            </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar js-progress-bar"></div>
            </div>
        </div>
    `;

    const orderTime = new Date(order.orderTime);
    const deliveryTime = new Date(orderItem.estimatedDeliveryTime);
    const currentTime = new Date();

    const progressPercentage = Math.round(
        ((currentTime - orderTime) / (deliveryTime - orderTime)) * 10000
    );

    let status = '';

    if (progressPercentage <= 49) {
        status = 'preparing';
    } else if (progressPercentage <= 99) {
        status = 'shipped';
    } else {
        status = 'delivered';
    }

    document.querySelector(`.js-${status}-label`).classList.add('current-status');
    document.querySelector('.js-progress-bar').style.width = progressPercentage + '%';
}
loadPage();