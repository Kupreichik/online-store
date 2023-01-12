import { productsData } from '../../../data/products';
import { Product, CartState } from '../../../types/interfaces';
import { STATE } from '../../state/State';
import CartTotal from './cartTotal';
import CartPagination from './cartPagination';
import { app } from '../../../index';
import * as appState from '../../state/appState';

class Cart {
  cartTotal: CartTotal = new CartTotal();
  cartPagination: CartPagination = new CartPagination();

  main = document.querySelector('.main') as HTMLElement;

  render(products: CartState[] = STATE.cartProducts.slice(0, STATE.cartItems)): string {
    let htmlInner = '';
    let html = '';

    products.forEach((elCart) => {
      const product = productsData.find((elAllProducts) => elAllProducts.id === elCart.id) as Product;
      htmlInner += `
          <div id="id${product.id}" class="cart__item">
            <p class="cart__item-text cart__item-number">${STATE.cartProducts.indexOf(elCart) + 1}</p>
            <a href="${window.location.search}#/id/${product.id}/">
              <img class="cart__item-img"src="${product.images[0]}" alt="flower">
            </a>
            <div class="cart__item-title">
              <p class="cart__item-text">${product.title}</p>
              <p class="cart__item-text cart__item-accent">${product.category[0]}</p>
            </div>
            <div class="cart__item-prices">
              <p class="cart__item-text cart__item-price">${product.price}$</p>
              <p class="cart__item-text cart__item-accent">(stock: ${product.stock})</p>
            </div>
            <div class="cart__add">
              <button class="cart-btn minus" data-id="${product.id}">
                -
              </button>
              <p class="cart__item-text counter">${elCart.count}</p>
              <button class="cart-btn plus" data-id="${product.id}">
                +
              </button>
            </div>
          </div>
        `;
    });

    html = `
      <div class="cart">
        <div class="cart__inner">
          <div class="cart__products">
            <div class="cart__products-header">
              <h2 class="cart__products-title">Products In Cart</h2>
              <div class="cart__products-controls">
                <div class="cart__products-limit">
                  Items:
                  <input class="cart__products-input" type="number" min="1" value="${STATE.cartItems}"/>
                </div>
                <div class="cart__products-pages">
                  Page:
                  <button class="cart__products-btn prev">&lt;</button>
                  <span class="cart__products-number">${this.checkItemsPage()}</span>
                  <button class="cart__products-btn next">&gt;</button>
                </div>
              </div>
            </div>
            <div class="cart__items">
              ${htmlInner}
            </div>
          </div>
          <div class="cart__total">
            ${this.cartTotal.render()}
          </div>
        </div>
      </div>
      <div class="popup"></div>
        `;
    return STATE.cartProducts.length === 0 ? `<p class="cart-empty">Cart is Empty</p><div class="popup"></div>` : html;
  }

  setListeners(): void {
    this.cartTotal.setListeners();

    const cartItems = document.querySelector('.cart__items') as HTMLElement;

    cartItems.onclick = (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('plus')) {
        this.addProduct(target.dataset.id as string);
        this.cartTotal.changeValue();
      } else if (target.classList.contains('minus')) {
        this.removeProduct(target.dataset.id as string);

        if (STATE.cartProducts.length !== 0) this.cartTotal.changeValue();
      }
    };

    const cartProductsInput = document.querySelector('.cart__products-input') as HTMLInputElement;

    cartProductsInput.oninput = () => {
      if (+cartProductsInput.value < 1) cartProductsInput.value = '1';

      app.controller.appStateControl('items', cartProductsInput.value);
      const chank = this.cartPagination.getChank(STATE.cartItems, STATE.cartPage);
      this.main.innerHTML = this.render(chank);
      this.cartTotal.changeValue();
      this.setListeners();
    };

    const prev = document.querySelector('.prev') as HTMLElement;

    prev.onclick = () => {
      if (STATE.cartPage > 1) {
        STATE.cartPage--;
        this.renderChank();
      }
    };

    const next = document.querySelector('.next') as HTMLElement;

    next.onclick = () => {
      if (STATE.cartPage < STATE.cartProducts.length / STATE.cartItems) {
        STATE.cartPage++;
        this.renderChank();
      }
    };
  }

  addProduct(id: string): void {
    const count = appState.addProdToCart(+id);
    app.controller.setHeaderCart();
    this.cartTotal.changeValue();
    (this.main.querySelector(`#id${id} > .cart__add > p.counter`) as HTMLElement).innerHTML = count.toString();
    app.controller.setHeaderCart();

    if (STATE.cartPromocode.length > 0)
      (document.querySelector(
        '.cart__total-sale'
      ) as HTMLElement).innerText = `Total: ${appState.getSumPriceWithPromo()}$`;
  }

  removeProduct(id: string): void {
    const count = appState.removeProdFromCart(+id);
    app.controller.setHeaderCart();

    if (count) {
      this.cartTotal.changeValue();
      (this.main.querySelector(`#id${id} > .cart__add > p.counter`) as HTMLElement).innerHTML = count.toString();
      if (STATE.cartPromocode.length > 0)
        (document.querySelector(
          '.cart__total-sale'
        ) as HTMLElement).innerText = `Total: ${appState.getSumPriceWithPromo()}$`;
    } else {
      const chank = this.cartPagination.getChank(STATE.cartItems, STATE.cartPage);
      this.main.innerHTML = this.render(chank);

      if (STATE.cartProducts.length !== 0) this.setListeners();
    }
  }

  checkItemsPage(): number {
    if (STATE.cartPage > Math.ceil(STATE.cartProducts.length / STATE.cartItems)) {
      STATE.cartPage = 1;
      app.controller.setSearchParams('page', `${STATE.cartPage}`);
    }
    return STATE.cartPage;
  }

  renderChank(): void {
    app.controller.setSearchParams('page', `${STATE.cartPage}`);
    const chank = this.cartPagination.getChank(STATE.cartItems, STATE.cartPage);
    this.main.innerHTML = this.render(chank);
    this.setListeners();
  }
}

export default Cart;
