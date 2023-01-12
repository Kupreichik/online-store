import { setActualState } from '../../components/state/appState';
import { DEFAULT_STATE, resetState, STATE } from '../../components/state/State';
import { SortKind } from '../../types/types';

describe('setActualState function', () => {
  let key, value;

  afterEach(() => resetState());

  test(`should add given category in state at case 'category'`, () => {
    key = 'category';
    value = 'some-category';
    const value2 = 'else-category';
    const expected = ['some-category', 'else-category'];
    const checked = STATE.filters.category;

    setActualState(key, value);
    expect(checked.length).toBe(1);
    expect(checked[0]).toBe(expected[0]);

    setActualState(key, value2);
    expect(checked.length).toBe(2);
    expect(checked[1]).toBe(expected[1]);
    expect(checked).toEqual(expected);
  });

  test(`should remove given category from state, if category already was in state at case 'category'`, () => {
    key = 'category';
    value = 'some-category';
    const value2 = 'else-category';
    STATE.filters.category = ['some-category', 'else-category'];
    const checked = STATE.filters.category;

    setActualState(key, value);
    expect(checked.length).toBe(1);
    expect(checked).not.toContain(value);

    setActualState(key, value2);
    expect(checked.length).toBe(0);
    expect(checked).not.toContain(value2);
  });

  test(`should add given value in state at case 'light'`, () => {
    key = 'light';
    value = 'some-value';
    const value2 = 'else-value';
    const expected = ['some-value', 'else-value'];
    const checked = STATE.filters.light;

    setActualState(key, value);
    expect(checked.length).toBe(1);
    expect(checked[0]).toBe(expected[0]);

    setActualState(key, value2);
    expect(checked.length).toBe(2);
    expect(checked[1]).toBe(expected[1]);
    expect(checked).toEqual(expected);
  });

  test(`should remove given value from state, if value already was in state at case 'light'`, () => {
    key = 'light';
    value = 'some-value';
    const value2 = 'else-value';
    STATE.filters.light = ['some-value', 'else-value'];
    const checked = STATE.filters.light;

    setActualState(key, value);
    expect(checked.length).toBe(1);
    expect(checked).not.toContain(value);

    setActualState(key, value2);
    expect(checked.length).toBe(0);
    expect(checked).not.toContain(value2);
  });

  test(`should set price as number in satate at case 'price-min'`, () => {
    key = 'price-min';
    value = '33';
    const expected = parseInt(value);
    setActualState(key, value);
    const checked = STATE.filters.price.min;
    expect(checked).toBe(expected);
    expect(checked).not.toBeNaN();
    expect(checked).toBeDefined();
  });

  test(`should set price as number in satate at case 'price-max'`, () => {
    key = 'price-max';
    value = '33';
    const expected = parseInt(value);
    setActualState(key, value);
    const checked = STATE.filters.price.max;
    expect(checked).toBe(expected);
    expect(checked).not.toBeNaN();
    expect(checked).toBeDefined();
  });

  test(`should set stock count as number in satate at case 'stock-min'`, () => {
    key = 'stock-min';
    value = '4';
    const expected = parseInt(value);
    setActualState(key, value);
    const checked = STATE.filters.stock.min;
    expect(checked).toBe(expected);
    expect(checked).not.toBeNaN();
    expect(checked).toBeDefined();
  });

  test(`should set stock count as number in satate at case 'stock-max'`, () => {
    key = 'stock-max';
    value = '4';
    const expected = parseInt(value);
    setActualState(key, value);
    const checked = STATE.filters.stock.max;
    expect(checked).toBe(expected);
    expect(checked).not.toBeNaN();
    expect(checked).toBeDefined();
  });

  test(`should set sort kinde as enum SortKind in satate at case 'sort'`, () => {
    key = 'sort';
    value = 'Alphabet Z - A';
    const expected = SortKind.alphabetDown;
    setActualState(key, value);
    const checked = STATE.sortIndex;
    expect(checked).toBe(expected);
    expect(checked).toBeDefined();
  });

  test(`should set search string in satate at case 'search'`, () => {
    key = 'search';
    value = 'something';
    setActualState(key, value);
    const checked = STATE.filters.search;
    expect(checked).toBe(value);
    expect(checked).not.toBe('');
  });

  test(`should set sort view as SortView type in satate at case 'sortView'`, () => {
    key = 'sortView';
    value = 'list';
    setActualState(key, value);
    const checked = STATE.sortView;
    expect(checked).toBe(value);
  });

  test(`should add product in cart if product with given id absent in cart at case 'cart'`, () => {
    key = 'cart';
    value = '5';
    const value2 = '15';
    const expected = [
      { id: 5, count: 1, price: 84 },
      { id: 15, count: 1, price: 48 },
    ];
    const checked = STATE.cartProducts;

    setActualState(key, value);
    expect(checked.length).toBe(1);
    expect(checked[0]).toEqual(expected[0]);

    setActualState(key, value2);
    expect(checked.length).toBe(2);
    expect(checked[1]).toEqual(expected[1]);
    expect(checked).toEqual(expected);
  });

  test(`should remove product from cart if product with given id already was in cart at case 'cart'`, () => {
    key = 'cart';
    value = '5';
    const value2 = '15';
    STATE.cartProducts = [
      { id: 5, count: 1, price: 84 },
      { id: 15, count: 1, price: 48 },
    ];
    const checked = STATE.cartProducts;

    setActualState(key, value);
    expect(checked.length).toBe(1);
    expect(checked).not.toContain(value);

    setActualState(key, value2);
    expect(checked.length).toBe(0);
    expect(checked).not.toContain(value2);
  });

  test(`should set items count of cart pagination as number in satate at case 'items'`, () => {
    key = 'items';
    value = '4';
    const expected = parseInt(value);
    setActualState(key, value);
    const checked = STATE.cartItems;
    expect(checked).toBe(expected);
    expect(checked).not.toBeNaN();
  });

  test(`should set page number of cart pagination as number in satate at case 'page'`, () => {
    key = 'page';
    value = '4';
    const expected = parseInt(value);
    setActualState(key, value);
    const checked = STATE.cartPage;
    expect(checked).toBe(expected);
    expect(checked).not.toBeNaN();
  });

  test(`should not change state when key not valid`, () => {
    key = 'not valid key';
    value = 'something';
    setActualState(key, value);
    expect(STATE).toEqual(DEFAULT_STATE);
  });
});
