import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage() {
    try {
        // throw 'error1';

        await loadProductsFetch();

        const value = await new Promise((resolve, reject) => {
            // throw 'error2';
            loadCart(() => {
                // reject('error3');
                resolve('value2');
            });
        });

    } catch (error) {
        console.log('Unexpected Error. Please try again later. ' + error);
    }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*
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
*/

// loadProductsFetch().then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
// });

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