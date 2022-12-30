import { productsData } from '../../data/products';
import { AppState } from '../../types/interfaces';
import { SortKind } from '../../types/types';

export const DEFAULT_STATE: AppState = {
  cartProducts: [
    // {
    //   id: 1,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 2,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 3,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 4,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 5,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 6,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 7,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 8,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 9,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 10,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 11,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 12,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 13,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 14,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 15,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 16,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 17,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 18,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 19,
    //   count: 1,
    //   price: 99,
    // },
    // {
    //   id: 20,
    //   count: 1,
    //   price: 99,
    // },
  ],
  cartItems: 3,
  cartPage: 1,
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
