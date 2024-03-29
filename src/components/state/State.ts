import { productsData } from '../../data/products';
import { AppState } from '../../types/interfaces';
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

export let STATE: AppState = structuredClone(DEFAULT_STATE);

export function resetState(): void {
  STATE = structuredClone(DEFAULT_STATE);
}
