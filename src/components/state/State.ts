import { productsData } from '../../data/products';
import { AppState } from '../../types/interfaces';
import { SortKind } from '../../types/types';

export const DEFAULT_STATE: AppState = {
  cartProducts: [
    { id: 3, count: 1, price: 88 },
    { id: 10, count: 1, price: 80 },
    { id: 15, count: 1, price: 48 },
    { id: 6, count: 1, price: 88 },
    { id: 8, count: 1, price: 80 },
    { id: 4, count: 1, price: 48 },
    { id: 1, count: 1, price: 48 },
  ],
  amountCart: 0,
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
