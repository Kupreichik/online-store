import { productsData } from '../../data/products';
import { AppState } from '../../types/interfaces';

export const DEFAULT_STATE: AppState = {
  cartProducts: [],
  sortIndex: 0,
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
