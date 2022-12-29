import { productsData } from '../../../data/products';
import { Product, CartState } from '../../../types/interfaces';
import { STATE } from '../../state/State';
import CarTotal from './cartTotal';
import СartPagination from './cartPagination';

class Cart {
  cartTotal = new CarTotal();
  cartPagination = new СartPagination();
  main = document.querySelector('.main') as HTMLElement;

  render(products: CartState[] = STATE.cartProducts.slice(0, STATE.cartItems)): string {
    let htmlInner = '';
    let html = '';

    products.forEach((elCart) => {
      const product = productsData.find((elAllProducts) => elAllProducts.id === elCart.id) as Product;
      htmlInner += `
          <div id="id${product.id}" class="cart__item">
            <p class="cart__item-text">${STATE.cartProducts.indexOf(elCart) + 1}</p>
            <img class="cart__item-img"src="${product.images[0]}" alt="flower">
            <div class="cart__item-center>
              <p class="cart__item-text">${product.title}</p>
              <p class="cart__item-text cart__item-accent">${product.light}</p>
            </div>
            <p class="cart__item-text cart__item-price">${product.price} $</p>
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
                  <span class="cart__products-number">${STATE.cartPage}</span>
                  <button class="cart__products-btn next">&gt;</button>
                </div>
              </div>
            </div>
            <div class="cart__items">
              ${htmlInner}
            </div>
          </div>
          ${this.cartTotal.render()}
        </div>
      </div>
        `;
    return STATE.cartProducts.length === 0 ? `<p class="cart-empty" >Cart is Empty<p>` : html;
  }

  //добавление слушателей на кнопки и изменение инпута
  setListeners(): void {
    //add listners total
    this.cartTotal.setListeners();

    //add and remove product
    const cartItems = document.querySelector('.cart__items') as HTMLElement;
    cartItems.onclick = (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('plus')) {
        this.addProduct(target.dataset.id);
        this.cartTotal.changeValue();
      } else if (target.classList.contains('minus')) {
        this.removeProduct(target.dataset.id);
        this.cartTotal.changeValue();
      }
    };

    //change input
    const cartProductsInput = document.querySelector('.cart__products-input') as HTMLInputElement;
    cartProductsInput.oninput = () => {
      STATE.cartItems = Number(cartProductsInput.value);
      const chank = this.cartPagination.getChank(STATE.cartItems, STATE.cartPage);
      this.main.innerHTML = this.render(chank);
      this.setListeners();
    };

    //prev page cart
    const prev = document.querySelector('.prev') as HTMLElement;
    prev.onclick = () => {
      if (STATE.cartPage !== 1) {
        STATE.cartPage -= 1;
        const chank = this.cartPagination.getChank(STATE.cartItems, STATE.cartPage);
        this.main.innerHTML = this.render(chank);
        this.setListeners();
      }
    };

    //next page cart
    const next = document.querySelector('.next') as HTMLElement;
    next.onclick = () => {
      if (STATE.cartPage < STATE.cartProducts.length / STATE.cartItems) {
        STATE.cartPage++;
        const chank = this.cartPagination.getChank(STATE.cartItems, STATE.cartPage);
        this.main.innerHTML = this.render(chank);
        this.setListeners();
      }
    };
  }

  //plus product
  addProduct(id: string | undefined): void {
    console.log(STATE.cartProducts);
    STATE.cartProducts.forEach((el) => {
      if (el.id === Number(id)) {
        el.count++;
        STATE.amountProductsCart++;
        STATE.sumPrice += el.price;
        this.cartTotal.changeValue();
        (this.main.querySelector(`#id${id} > .cart__add > p.counter`) as HTMLElement).innerHTML = el.count.toString();
      }
    });
  }

  //minus product
  removeProduct(id: string | undefined): void {
    const product = STATE.cartProducts.find((el) => el.id === Number(id)) as CartState;
    if (product.count === 1) {
      STATE.cartProducts = STATE.cartProducts.filter((el) => el.id !== Number(id));
      STATE.amountProductsCart = STATE.cartProducts.reduce((acc, el) => acc + el.count, 0);
      STATE.sumPrice -= product.price;
      const chank = this.cartPagination.getChank(STATE.cartItems, STATE.cartPage);
      console.log(STATE.cartItems, STATE.cartPage, 'STATE.cartItems, STATE.cartPage');
      console.log(chank, 'chank');
      this.main.innerHTML = this.render(chank);
      this.setListeners();
    } else {
      product.count--;
      STATE.amountProductsCart--;
      STATE.sumPrice -= product.price;
      this.cartTotal.changeValue();
      (this.main.querySelector(
        `#id${id} > .cart__add > p.counter`
      ) as HTMLElement).innerHTML = product.count.toString();
    }
  }
}

export default Cart;
