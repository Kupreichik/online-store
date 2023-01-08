import { CartState } from '../../../types/interfaces';
import { STATE } from '../../state/State';

class СartPagination {
  getChank(items: number, page: number): CartState[] {
    const arr = STATE.cartProducts;
    const pages = Math.ceil(arr.length / items);

    const startEl = (page - 1) * items;
    const endEl = startEl + items;

    if (pages < page && pages > 0) {
      STATE.cartPage--;
      const cartProductsNumber = document.querySelector('.cart__products-number') as HTMLElement;
      cartProductsNumber.textContent = STATE.cartPage.toString();
      return arr.slice(startEl - items, endEl - items);
    }

    return arr.slice(startEl, endEl);
  }
}

export default СartPagination;
