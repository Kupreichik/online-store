import { productsData } from '../../../data/products';
import { Product, CartState } from '../../../types/interfaces';
import { DEFAULT_STATE } from '../../state/State';

class Cart {
  //рендер страницы
  render(products: CartState[] = DEFAULT_STATE.cartProducts.slice(0, 3)): string {
    let htmlInner = '';
    let html = '';
    let sumPrice = 0;
    sumPrice += DEFAULT_STATE.cartProducts.reduce((acc, el) => {
      return (acc += el.price * el.count);
    }, sumPrice);

    products.forEach((elCart, i) => {
      const product = productsData.find((elAllProducts) => elAllProducts.id === elCart.id) as Product;
      htmlInner += `
          <div class="cart__item">
            <p class="cart__item-text">${(DEFAULT_STATE.cartPage - 1) * 3 + (i + 1)}</p>
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
              <p class="cart__item-text">${elCart.count}</p>
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
                  <input class="cart__products-input" type="text" value="${DEFAULT_STATE.cartItems}"/>
                </div>
                <div class="cart__products-pages">
                  Page:
                  <button class="cart__products-btn prev">&lt;</button>
                  <span class="cart__products-number">${DEFAULT_STATE.cartPage}</span>
                  <button class="cart__products-btn next">&gt;</button>
                </div>
              </div>
            </div>
            <div class="cart__items">
              ${htmlInner}
            </div>
          </div>
            <div class="cart__total">
              <h2 class="cart__total-title">Summary</h2>
              <div class="cart__total-spec">
                <div class="cart__total-products"><span>Products:</span> ${DEFAULT_STATE.cartProducts.length}</div>
                <div class="cart__total-price"><span>Total:</span> ${sumPrice} $</div>
              </div>
              <div class="cart__promo">
                <div class="cart__promo-code">
                  <input class="cart__promo-input" type="search" placeholder="Enter promo code" />
                </div>
                <span class="cart__promo-hint">Promo for test: 'RS', 'EPM'</span>
              </div>
              <button class="cart__total-btn btn">BUY NOW</button>
            </div>
          </div>
        </div>
      </div>
        `;
    this.changeHeader(sumPrice, products.length);
    return html;
  }

  //добавление слушателей на кнопки и изменение инпута
  setListeners(): void {
    (document.querySelector('.cart__items') as HTMLElement).onclick = (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('plus')) {
        this.plus(target.dataset.id);
      } else if (target.classList.contains('minus')) {
        this.minus(target.dataset.id);
      }
    };
    (document.querySelector('.cart__products-input') as HTMLInputElement).onchange = (event) => {
      const target = event.target as HTMLInputElement;
      this.pagination(+target.value, DEFAULT_STATE.cartPage);
    };
    (document.querySelector('.prev') as HTMLElement).onclick = () => {
      if (DEFAULT_STATE.cartPage !== 1) {
        DEFAULT_STATE.cartPage -= 1;
        this.pagination(DEFAULT_STATE.cartItems, DEFAULT_STATE.cartPage);
        this.setListeners();
      }
    };
    (document.querySelector('.next') as HTMLElement).onclick = () => {
      if (DEFAULT_STATE.cartPage < DEFAULT_STATE.cartProducts.length / DEFAULT_STATE.cartItems) {
        DEFAULT_STATE.cartPage += 1;
        this.pagination(DEFAULT_STATE.cartItems, DEFAULT_STATE.cartPage);
        this.setListeners();
      }
    };
  }

  //плюс количество одного товара
  plus(id: string | undefined): void {
    const main = document.querySelector('.main') as HTMLElement;
    DEFAULT_STATE.cartProducts.forEach((el) => {
      if (el.id === Number(id)) {
        el.count += 1;
        main.innerHTML = this.render();
        this.setListeners();
      }
    });
  }

  //минус количество одного товара
  minus(id: string | undefined): void {
    const main = document.querySelector('.main') as HTMLElement;
    const arr: CartState[] | never = [];
    DEFAULT_STATE.cartProducts.forEach((el) => {
      arr.push(el);
      if (el.id === Number(id)) {
        if (el.count === 1) {
          arr.pop();
        } else {
          el.count -= 1;
        }
      }
      DEFAULT_STATE.cartProducts = arr;
      main.innerHTML = this.render();
      this.setListeners();
    });
  }

  //изменение в шапке количество в корзине и тотал
  changeHeader(sumPrice: number, allProductCount: number): void {
    (document.querySelector('.header__total-price') as HTMLElement).innerHTML = `${sumPrice} $`;
    (document.querySelector('.header__cart-count') as HTMLElement).innerHTML = `(${allProductCount})`;
  }

  //разбитие на страницы в зависимости от инпута и номера страницы.
  pagination(value: number, page: number) {
    DEFAULT_STATE.cartItems = +value;
    const cartItems = DEFAULT_STATE.cartItems;
    const arr = DEFAULT_STATE.cartProducts;
    const size = Number(value);
    const pages = Math.ceil(arr.length / size);

    if (pages < page) return;

    const startEl = (page - 1) * cartItems;
    const endEl = startEl + cartItems;

    console.log(startEl, 'startEl');
    console.log(endEl, 'endEl');
    console.log(arr.slice(startEl, endEl), 'arr.slice(startEl, endEl)');

    const main = document.querySelector('.main') as HTMLElement;
    main.innerHTML = this.render(arr.slice(startEl, endEl));
    this.setListeners();
  }
}

export default Cart;
