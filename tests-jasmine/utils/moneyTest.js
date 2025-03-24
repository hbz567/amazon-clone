import formatCurrency from "../../scripts/utils/money.js";

describe('Test suite: formatCurrency', () => {
    it('Converts cents to dollars', () => {
        expect(formatCurrency(2086)).toEqual('20.86');
    });

    it('Rounds up to nearest cent', () => {
        expect(formatCurrency(2000.5)).toEqual('20.01');
    });
});