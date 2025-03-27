import { cart, removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";


export function renderOrderSummary() {
    let cartSummaryHTML = '';

    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);

        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');

        cartSummaryHTML += `
            <div class="cart-item-container js-cart-item-container 
            js-cart-item-container-${product.id}">
                <div class="delivery-date">
                    Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                    src="${product.image}">

                    <div class="cart-item-details">
                    <div class="product-name">
                        ${product.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(product.priceCents)}
                    </div>
                    <div class="product-quantity js-product-quantity-${product.id}">
                        <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                        </span>
                        <span class="update-quantity-link link-primary">
                        Update
                        </span>
                        <span class="delete-quantity-link js-delete-quantity-link 
                            link-primary js-delete-quantity-link-${product.id}"
                            data-product-id="${product.id}">
                        Delete
                        </span>
                    </div>
                    </div>

                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(product, cartItem)}
                    </div>
                </div>
            </div>
        `;
    });
    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

    function deliveryOptionsHTML(product, cartItem) {
        let html = '';

        deliveryOptions.forEach(deliveryOption => {
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const dateString = deliveryDate.format('dddd, MMMM D');
            const priceString = (deliveryOption.priceCents === 0) ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;
            
            const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

            html += `
                <div class="delivery-option js-delivery-option"
                data-product-id=${product.id} data-delivery-option-id=${deliveryOption.id}>
                    <input type="radio"
                    ${isChecked ? 'checked' : ''}
                    class="delivery-option-input"
                    name="delivery-option-${product.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${dateString}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
                </div>
            `;
        });
        return html;
    }

    document.querySelectorAll('.js-delete-quantity-link').forEach(link => {
        link.addEventListener('click', () => {
            const productId = link.dataset.productId;
            removeFromCart(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();
            renderPaymentSummary();
        });
    });

    document.querySelectorAll('.js-delivery-option').forEach(element => {
        element.addEventListener('click', () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, Number(deliveryOptionId));
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}