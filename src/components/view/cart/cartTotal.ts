import { promocodesData } from '../../../data/promocodes';
import { app } from '../../../index';
import { STATE } from '../../state/State';
import cartPromocode from './cartPromocode';
import Popup from '../popup/popup';

class CarTotal {
  cartPromocode: cartPromocode = new cartPromocode();
  popup: Popup = new Popup();
  render() {
    return `
        <h2 class="cart__total-title">Summary</h2>
        <div class="cart__total-spec">
          <div class="cart__total-products"><span>Products:</span> ${app.controller.getAmountCart()}</div>
          <div class="cart__total-price" ${
            STATE.cartPromocode.length > 0 ? 'style="text-decoration: line-through"' : ''
          }>
          Total: ${app.controller.getSumPrice()} $</div>
          <div class="cart__total-sale"> ${
            STATE.cartPromocode.length > 0 ? 'Total: ' + app.controller.getSumPriceWithPromo() + '$' : ''
          }</div>
        </div>
        <div class="cart__promo">
          <div class="cart__promo-code">
            <input class="cart__promo-input" type="search" placeholder="Enter promo code" />
          </div>
          <span class="cart__promo-hint">Promo for test: 'RS', 'EPM'</span>
          <div class="promo-codes__prev"></div>
        </div>
        <div class="promo-codes">${
          STATE.cartPromocode.length > 0 ? this.cartPromocode.renderAdd(STATE.cartPromocode) : ''
        }</div>
        <button class="cart__total-btn btn">Buy Now</button>
    `;
  }

  setListeners(): void {
    const cartTotal = document.querySelector('.cart__total') as HTMLElement;
    const cartPromoInput = document.querySelector('.cart__promo-input') as HTMLElement;
    const promoCodesPrev = document.querySelector('.promo-codes__prev') as HTMLElement;
    cartPromoInput.oninput = (event) => {
      const target = event.target as HTMLInputElement;
      const promocode = promocodesData.find((el) => el.id === target.value.toLowerCase());
      if (promocode) {
        promoCodesPrev.innerHTML = this.cartPromocode.renderPrev(promocode);
        const addBtn = document.querySelector('.promo-codes__btn-add') as HTMLButtonElement;
        if (STATE.cartPromocode.find((el) => el.id === promocode.id)) {
          addBtn.style.display = 'none';
        }
        addBtn.onclick = () => {
          addBtn.style.display = 'none';
          STATE.cartPromocode.push(promocode);
          cartTotal.innerHTML = this.render();
          this.setListeners();
          app.controller.setHeaderCart();
        };
      } else {
        promoCodesPrev.innerHTML = '';
      }
    };

    if (STATE.cartPromocode.length > 0) {
      const removeBtnAll = document.querySelectorAll('.promo-codes__btn-remove') as NodeListOf<HTMLElement>;
      removeBtnAll.forEach(
        (el) =>
          (el.onclick = (event) => {
            const targetRem = event.target as HTMLElement;
            const promocodeReal = STATE.cartPromocode.filter(
              (el) => el.id !== targetRem.classList[targetRem.classList.length - 1]
            );
            STATE.cartPromocode = promocodeReal;
            cartTotal.innerHTML = this.render();
            this.setListeners();
            app.controller.setHeaderCart();
          })
      );
    }

    const cartTotalBtn = document.querySelector('.cart__total-btn') as HTMLElement;
    const body = document.querySelector('body') as HTMLElement;
    const popup = document.querySelector('.popup') as HTMLElement;
    cartTotalBtn.onclick = () => {
      body.classList.add('shadow');
      popup.classList.add('shadow');
      popup.innerHTML = this.popup.render();
      this.popup.setListeners();
    };

    popup.onclick = (event) => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('shadow')) {
        body.classList.remove('shadow');
        popup.classList.remove('shadow');
        popup.innerHTML = '';
      }
    };
  }

  changeValue(): void {
    const cartTotalProducts = document.querySelector('.cart__total-products') as HTMLElement;
    cartTotalProducts.innerHTML = `
      <span>Products: </span>${app.controller.getAmountCart()}
    `;

    const cartTotalPrice = document.querySelector('.cart__total-price') as HTMLElement;
    cartTotalPrice.innerHTML = `
      <span>Total: </span>${app.controller.getSumPrice()} $
    `;
  }
}

export default CarTotal;
