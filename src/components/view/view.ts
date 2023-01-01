import Cart from './cart/cart';
import { Main } from './main/main';
import { ProductPage } from './product/Product';

export class View {
  main: Main = new Main();
  cart: Cart = new Cart();
  product: ProductPage = new ProductPage();
}
