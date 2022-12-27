import Cart from './cart/cart';
import { Main } from './main/main';

export class View {
  main: Main = new Main();
  cart: Cart = new Cart();
}
