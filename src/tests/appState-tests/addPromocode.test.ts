import { addPromocode } from '../../components/state/appState';
import { STATE } from '../../components/state/State';

describe('addPromocode function', () => {
  afterAll(() => {
    STATE.cartPromocode = [];
  });

  test('should save promocode object in state of app', () => {
    const promocode = { id: 'rs', name: 'RSS', disc: 10 };

    addPromocode(promocode);
    expect(STATE.cartPromocode[0]).toBeDefined();
    expect(STATE.cartPromocode[0]).toEqual(promocode);
    expect(STATE.cartPromocode.length).toBe(1);
  });

  test('should add promocode object in state of app', () => {
    const promocode = { id: 'bigsale', name: 'Big Sale', disc: 50 };
    const expected = [
      { id: 'rs', name: 'RSS', disc: 10 },
      { id: 'bigsale', name: 'Big Sale', disc: 50 },
    ];

    addPromocode(promocode);
    expect(STATE.cartPromocode.length).toBe(2);
    expect(STATE.cartPromocode[1]).toEqual(promocode);
    expect(STATE.cartPromocode).toEqual(expected);
  });
});
