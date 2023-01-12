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
    expect(result).toEqual(6);
  });

  test('amount in empty cart', () => {
    STATE.cartProducts = [];

    const result = getAmountCart();
    expect(result).toEqual(0);
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
    expect(result).toEqual(380);
  });

  test('amount in empty cart', () => {
    STATE.cartProducts = [];

    const result = getSumPrice();
    expect(result).toEqual(0);
    expect(result).not.toBeUndefined();
    expect(result).not.toBeNull();
  });
});
