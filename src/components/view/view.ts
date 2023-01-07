import Cart from './cart/cart';
import { Main } from './main/main';
import { ProductPage } from './product/Product';

export class View {
  main: Main = new Main();
  cart: Cart = new Cart();
  product: ProductPage = new ProductPage();

  render404page(): void {
    const el = document.querySelector('.main') as HTMLElement;
    el.innerHTML = `
    <div class="page404-container">
      <p>Page Not Found</p>
      <p class="page404-oops">Oops!</p>
      <p>The page you requested does not exist.</p>
      <a href="${document
        .querySelector('.header__logo-link')
        ?.getAttribute('href')}" class="page404_main-link">Back To The Store</a>
    </div>`;
  }
}
