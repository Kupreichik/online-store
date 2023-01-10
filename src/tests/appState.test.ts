import { addPromocode } from '../components/state/appState';
import { STATE } from '../components/state/State';

describe('appPromocode function', () => {
  afterEach(() => {
    STATE.cartPromocode = [];
  });

  test('should add promocode object in state of app', () => {
    const promocode = { id: 'rs', name: 'RSS', disc: 10 };
    const expected = [{ id: 'rs', name: 'RSS', disc: 10 }];
    addPromocode(promocode);
    expect(STATE.cartPromocode[0]).toBeDefined();
    expect(STATE.cartPromocode).toEqual(expected);
  });
});
