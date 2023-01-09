import { Controller } from '../components/controller/Controller';
import { STATE } from '../components/state/State';

const controller = new Controller();
global.structuredClone = (val: object) => JSON.parse(JSON.stringify(val));

describe('Controller: addProdToCart', () => {
  afterEach(() => {
    STATE.cartProducts = [];
  });

  test('should add product in state of cart', () => {
    const id = 5;
    const expected = [
      {
        id: 5,
        count: 1,
        price: 84,
      },
    ];
    controller.addProdToCart(id);
    expect(STATE.cartProducts[0]).toBeDefined();
    expect(STATE.cartProducts).toEqual(expected);
  });
});
