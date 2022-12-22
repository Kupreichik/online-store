import { callbackType } from './types';

export interface Route {
  path: RegExp;
  cb: callbackType;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string[];
  light: string;
  images: string[];
}

export interface ComponentConfig {
  element?: HTMLElement;
  selector?: string;
  tagName?: string;
  idName?: string;
  className?: string;
}

export interface AppState {
  cartProducts: number[];
  sortIndex: number;
  sortView: 'tile' | 'list';
  filters: Filters;
  products: Product[];
}

export interface Filters {
  search: string;
  category: string[];
  light: string[];
  price: Range;
  stock: Range;
}

export interface Range {
  min: number;
  max: number;
}
