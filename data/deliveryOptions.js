export function getDeliveryOption(deliveryOptionId) {
    for (let i = 0; i < deliveryOptions.length; i++) {
        if (deliveryOptions[i].id === deliveryOptionId) {
            return deliveryOptions[i];
        }
    }
}

export const deliveryOptions = [{
    id: 1,
    deliveryDays: 7,
    priceCents: 0
}, {
    id: 2,
    deliveryDays: 3,
    priceCents: 499
}, {
    id: 3,
    deliveryDays: 1,
    priceCents: 999
}];