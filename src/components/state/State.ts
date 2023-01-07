import { productsData } from '../../data/products';
import { AppState, CartPromocodeState } from '../../types/interfaces';
import { SortKind } from '../../types/types';

export const DEFAULT_STATE: AppState = {
  cartProducts: [],
  cartItems: 3,
  cartPage: 1,
  cartPromocode: [],
  sortIndex: SortKind.popular,
  sortView: 'tile',
  filters: {
    search: '',
    category: [],
    light: [],
    price: {
      min: 27,
      max: 168,
    },
    stock: {
      min: 1,
      max: 38,
    },
  },
  products: productsData,
};

export const STATE: AppState = structuredClone(DEFAULT_STATE);

export function removePromocode(id: string) {
  STATE.cartPromocode = STATE.cartPromocode.filter((el) => el.id !== id);
}

export function getPromocode(id: string) {
  return STATE.cartPromocode.find((el) => el.id === id);
}

export function hasPromocode() {
  return STATE.cartPromocode.length > 0;
}

export function appPromocode(promocode: CartPromocodeState) {
  STATE.cartPromocode.push(promocode);
}
