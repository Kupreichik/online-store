import { Controller } from '../../controller/Controller';
// import Promocode from './promocode';

class CarTotal {
  controller: Controller = new Controller();
  render() {
    return `
      <div class="cart__total">
        <h2 class="cart__total-title">Summary</h2>
        <div class="cart__total-spec">
          <div class="cart__total-products"><span>Products:</span> ${this.controller.getAmountCart()}</div>
          <div class="cart__total-price"><span>Total:</span> ${this.controller.getSumPrice()} $</div>
        </div>
        <div class="cart__promo">
          <div class="cart__promo-code">
            <input class="cart__promo-input" type="search" placeholder="Enter promo code" />
          </div>
          <span class="cart__promo-hint">Promo for test: 'RS', 'EPM'</span>
        </div>
        <button class="cart__total-btn btn">Buy Now</button>
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
      <span>Products: </span>${this.controller.getAmountCart()}
    `;

    const cartTotalPrice = document.querySelector('.cart__total-price') as HTMLElement;
    cartTotalPrice.innerHTML = `
      <span>Total: </span>${this.controller.getSumPrice()} $
    `;
  }

  // addDiscount() {}
}

export default CarTotal;
