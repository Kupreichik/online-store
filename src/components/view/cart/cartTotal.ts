import { STATE } from '../../state/State';

class CarTotal {
  render() {
    STATE.sumPrice = STATE.cartProducts.reduce((acc, el) => (acc += el.price * el.count), 0);
    STATE.amountProductsCart = STATE.cartProducts.reduce((acc, el) => (acc += el.count), 0);

    return `
      <div class="cart__total">
        <h2 class="cart__total-title">Summary</h2>
        <div class="cart__total-spec">
          <div class="cart__total-products"><span>Products:</span> ${STATE.cartProducts.length}</div>
          <div class="cart__total-price"><span>Total:</span> ${STATE.sumPrice} $</div>
        </div>
        <div class="cart__promo">
          <div class="cart__promo-code">
            <input class="cart__promo-input" type="search" placeholder="Enter promo code" />
          </div>
          <span class="cart__promo-hint">Promo for test: 'RS', 'EPM'</span>
        </div>
        <button class="cart__total-btn btn">BUY NOW</button>
      </div>`;
  }

  setListeners(): void {
    const cartPromoInput = document.querySelector('.cart__promo-input') as HTMLElement;
    cartPromoInput.oninput = (event) => console.log(event.target);

    const cartTotalBtn = document.querySelector('.cart__total-btn') as HTMLElement;
    cartTotalBtn.onclick = () => console.log('popup');
  }

  changeValue(): void {
    const cartTotalProducts = document.querySelector('.cart__total-products') as HTMLElement;
    cartTotalProducts.innerHTML = `
      <span>Products: </span>${STATE.amountProductsCart}
    `;

    const cartTotalPrice = document.querySelector('.cart__total-price') as HTMLElement;
    cartTotalPrice.innerHTML = `
      <span>Total: </span>${STATE.sumPrice} $
    `;
  }
}

export default CarTotal;
