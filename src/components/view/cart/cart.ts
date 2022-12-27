import { productsData } from '../../../data/products';
import { Product } from '../../../types/interfaces';
import { DEFAULT_STATE } from '../../state/State';

class Cart {
  sumPrice = 0;

  render() {
    let htmlInner = '';
    let html = '';
    let amountProducts = 0;
    DEFAULT_STATE.cartProducts.forEach((elCart, i) => {
      const product = productsData.find((elAllProducts) => elAllProducts.id === elCart.id) as Product;
      htmlInner += `
          <div class="cart__item">
            <p class="cart__item-text">${i + 1}</p>
            <img class="cart__item-img"src="${product.images[0]}" alt="flower">
            <div class="cart__item-center>
              <p class="cart__item-text">${product.title}</p>
              <p class="cart__item-text cart__item-accent">${product.light}</p>
            </div>
            <p class="cart__item-text cart__item-price">${product.price} $</p>
            <div class="cart__add">
              <button class="cart-btn minus">
                -
              </button>
              <p class="cart__item-text">${elCart.count}</p>
              <button class="cart-btn plus">
                +
              </button>
            </div>
          </div>
        `;

      this.sumPrice += product.price;
      amountProducts += 1;
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
                  <input class="cart__products-input" type="text" value="3"/>
                </div>
                <div class="cart__products-pages">
                  Page:
                  <button class="cart__products-btn">&lt;</button>
                  <span class="cart__products-number">1</span>
                  <button class="cart__products-btn">&gt;</button>
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
                <div class="cart__total-products"><span>Products:</span> ${amountProducts}</div>
                <div class="cart__total-price"><span>Total:</span> ${this.sumPrice} $</div>
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
    return html;
  }

  setListeners() {
    (document.querySelector('.cart') as HTMLElement).onclick = (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('plus')) {
        console.log('+');
        // this.plus(target.dataset.id);
      } else if (target.classList.contains('minus')) {
        console.log('-');
        // this.minus(target.dataset.id);
      }
    };
  }

  // plus(el) {
  //   console.log('+');
  // }

  // minus(el) {
  //   console.log('-');
  // }
}

export default Cart;
