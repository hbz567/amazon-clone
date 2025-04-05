import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

// loadProductsFetch().then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

Promise.all([
    loadProductsFetch(),
    new Promise(resolve => {
        loadCart(resolve);
    })
]).then(values => {
    // console.log(values);
    renderOrderSummary();
    renderPaymentSummary();
});

/*
new Promise(resolve => {
    loadCart(resolve);

}).then(() => {
    return new Promise(resolve => {
        loadProducts(() => {
            resolve(4);
        });
    });

}).then(value => {
    console.log(value);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

// loadCart(() => {
//     loadProducts(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//     });
// });