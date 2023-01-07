import { callbackType, SortKind, SortView } from './types';

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
  cartProducts: CartState[];
  cartItems: number;
  cartPage: number;
  cartPromocode: CartPromocodeState[];
  sortIndex: SortKind;
  sortView: SortView;
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

export interface DualSlider {
  range: Range;
  minTextId: string;
  maxTextId: string;
  minInputId: string;
  maxInputId: string;
  correctionNumber: number;
  additionalSymbol?: string;
}

export interface CartState {
  id: number;
  count: number;
  price: number;
}

export interface CartPromocodeState {
  id: string;
  name: string;
  disc: number;
}

export interface CardsLogoUrlsState {
  visa: string;
  mastercard: string;
  americanExpress: string;
  unionPay: string;
  jcb: string;
  noLogo: string;
}
