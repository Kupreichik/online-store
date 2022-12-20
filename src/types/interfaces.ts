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
