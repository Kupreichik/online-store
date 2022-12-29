import { productsData } from '../../data/products';
import { AppState } from '../../types/interfaces';
import { SortKind } from '../../types/types';

export const DEFAULT_STATE: AppState = {
  cartProducts: [],
  sumPrice: 0,
  amountProductsCart: 0,
  cartItems: 3,
  cartPage: 1,
  sortIndex: SortKind['Most Popular'],
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
