import { DEFAULT_STATE, resetState, STATE } from '../../components/state/State';
import { productsData } from '../../data/products';
import { SortKind, SortView } from '../../types/types';

const setStateAtArr = jest.fn((arr: string[], value: string) => `set value ${value} at array ${arr}`);
const removeProdFromCart = jest.fn(
  (id: number, bool: boolean) => `reduces the amount product ${id} from cart or drop if ${bool}`
);
const addProdToCart = jest.fn((id: number) => `add product ${id} to cart`);
const productFilter = jest.fn(() => productsData);

function setActualState(key: string, value: string): void {
  switch (key) {
    case 'category':
      setStateAtArr(STATE.filters.category, value);
      break;

    case 'light':
      setStateAtArr(STATE.filters.light, value);
      break;

    case 'price-min':
      STATE.filters.price.min = parseInt(value);
      break;

    case 'price-max':
      STATE.filters.price.max = parseInt(value);
      break;

    case 'stock-min':
      STATE.filters.stock.min = parseInt(value);
      break;

    case 'stock-max':
      STATE.filters.stock.max = parseInt(value);
      break;

    case 'sort':
      STATE.sortIndex = value as SortKind;
      break;

    case 'search':
      STATE.filters.search = value;
      break;

    case 'sortView':
      STATE.sortView = value as SortView;
      break;

    case 'cart':
      if (STATE.cartProducts.find((prod) => prod.id === +value)) {
        removeProdFromCart(+value, true);
      } else {
        addProdToCart(+value);
      }
      break;

    case 'items':
      STATE.cartItems = +value;
      break;

    case 'page':
      STATE.cartPage = +value;
      break;
  }

  STATE.products = productFilter();
}

describe('setActualState function', () => {
  let key, value;

  afterEach(() => resetState());

  test(`should call setStateAtArr function at case 'category'`, () => {
    key = 'category';
    value = 'some-category';
    const expectArg = STATE.filters.category;
    setActualState(key, value);
    expect(setStateAtArr).toHaveBeenCalled();
    expect(setStateAtArr).toHaveBeenCalledWith(expectArg, value);
    expect(setStateAtArr.mock.calls).toHaveLength(1);
    setStateAtArr.mockClear();
  });

  test(`should call setStateAtArr function at case 'light'`, () => {
    key = 'light';
    value = 'some-value';
    const expectArg = STATE.filters.light;
    setActualState(key, value);
    expect(setStateAtArr).toHaveBeenCalled();
    expect(setStateAtArr).toHaveBeenCalledWith(expectArg, value);
    expect(setStateAtArr.mock.calls).toHaveLength(1);
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

  test(`should call addProdToCart function if product with given id absent in cart at case 'cart'`, () => {
    key = 'cart';
    value = '5';
    const cbArg = parseInt(value);
    setActualState(key, value);
    expect(addProdToCart).toHaveBeenCalled();
    expect(addProdToCart.mock.calls[0][0]).toBe(cbArg);
    addProdToCart.mockClear();
  });

  test(`should call removeProdFromCart function if product with given id was in cart at case 'cart'`, () => {
    key = 'cart';
    value = '5';
    const cbArg = parseInt(value);
    STATE.cartProducts.push({ id: 5, count: 1, price: 10 });
    setActualState(key, value);
    expect(removeProdFromCart).toHaveBeenCalled();
    expect(removeProdFromCart.mock.calls[0][0]).toBe(cbArg);
    removeProdFromCart.mockClear();
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
    const checked = STATE;
    expect(checked).toEqual(DEFAULT_STATE);
  });

  test(`should call productFilter function in each call`, () => {
    const callsCount = 14;
    expect(productFilter.mock.calls).toHaveLength(callsCount);
  });
});
