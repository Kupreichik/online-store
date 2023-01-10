import { getAmountCart, getSumPrice } from '../../components/state/appState';
import { STATE } from '../../components/state/State';

describe('getAmountCart function', () => {
  test('amount in full cart', () => {
    STATE.cartProducts = [
      {
        id: 1,
        count: 1,
        price: 50,
      },
      {
        id: 2,
        count: 2,
        price: 60,
      },
      {
        id: 3,
        count: 3,
        price: 70,
      },
    ];

    const result = getAmountCart();
    expect(result).toBeGreaterThan(0);
  });

  test('amount in empty cart', () => {
    STATE.cartProducts = [];

    const result = getAmountCart();
    expect(result).toBeLessThan(1);
  });
});

describe('getSumPrice function', () => {
  test('amount in full cart', () => {
    STATE.cartProducts = [
      {
        id: 1,
        count: 1,
        price: 50,
      },
      {
        id: 2,
        count: 2,
        price: 60,
      },
      {
        id: 3,
        count: 3,
        price: 70,
      },
    ];

    const result = getSumPrice();
    expect(result).toBeGreaterThanOrEqual(0);
  });

  test('amount in empty cart', () => {
    STATE.cartProducts = [];

    const result = getSumPrice();
    expect(result).toBeLessThanOrEqual(1);
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
  });
});
