import { callbackType } from './types';

export interface Route<T> {
  path: RegExp;
  cb: callbackType<T>;
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
