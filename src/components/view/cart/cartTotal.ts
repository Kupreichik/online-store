import { promocodesData } from '../../../data/promocodes';
import { app } from '../../../index';
import * as appState from '../../state/appState';
import cartPromocode from './cartPromocode';
import Popup from '../popup/popup';
import { STATE } from '../../state/State';

class CarTotal {
  cartPromocode: cartPromocode = new cartPromocode();
  popup: Popup = new Popup();
  render() {
    return `
        <h2 class="cart__total-title">Summary</h2>
        <div class="cart__total-spec">
          <div class="cart__total-products"><span>Products:</span> ${appState.getAmountCart()}</div>
          <div class="cart__total-price" ${appState.hasPromocode() ? 'style="text-decoration: line-through"' : ''}>
          Total: ${appState.getSumPrice()} $</div>
          <div class="cart__total-sale"> ${
            appState.hasPromocode() ? 'Total: ' + appState.getSumPriceWithPromo() + '$' : ''
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
          appState.hasPromocode() ? this.cartPromocode.renderAdd(STATE.cartPromocode) : ''
        }</div>
        <button class="cart__total-btn btn">Buy Now</button>
    `;
  }

  setListeners(): void {
    const cartTotal = document.querySelector('.cart__total') as HTMLElement;
    const cartPromoInput = document.querySelector('.cart__promo-input') as HTMLElement;
    const promoCodesPrev = document.querySelector('.promo-codes__prev') as HTMLElement;

    cartPromoInput.oninput = ({ target }) => {
      const { value } = target as HTMLInputElement;
      const promocode = promocodesData.find((el) => el.id === value.toLowerCase());

      if (promocode) {
        promoCodesPrev.innerHTML = this.cartPromocode.renderPrev(promocode);
        const addBtn = document.querySelector('.promo-codes__btn-add') as HTMLButtonElement;

        if (appState.getPromocode(promocode.id)) {
          addBtn.style.display = 'none';
        }

        addBtn.onclick = () => {
          addBtn.style.display = 'none';
          appState.addPromocode(promocode);
          this.refreshCartTotal(cartTotal);
        };
      } else {
        promoCodesPrev.innerHTML = '';
      }
    };

    if (appState.hasPromocode()) {
      const removeButtons = document.querySelectorAll('.promo-codes__btn-remove') as NodeListOf<HTMLElement>;

      removeButtons.forEach(
        (el) =>
          (el.onclick = ({ target }) => {
            appState.removePromocode((target as HTMLElement).id);
            this.refreshCartTotal(cartTotal);
          })
      );
    }

    const cartTotalBtn = document.querySelector('.cart__total-btn') as HTMLElement;
    const popup = document.querySelector('.popup') as HTMLElement;
    cartTotalBtn.onclick = () => {
      this.openPopup();
    };

    popup.onmousedown = (event) => {
      this.closePopup(event, popup);
    };

    popup.ontouchstart = (event) => {
      this.closePopup(event, popup);
    };
  }

  openPopup() {
    const body = document.querySelector('body') as HTMLElement;
    const popup = document.querySelector('.popup') as HTMLElement;

    body.classList.add('shadow');
    popup.classList.add('shadow');
    popup.innerHTML = this.popup.render();
    this.popup.setListeners();
  }

  closePopup(event: Event, popup: HTMLElement) {
    const body = document.querySelector('body') as HTMLElement;
    const target = event.target as HTMLElement;

    if (target.classList.contains('shadow')) {
      body.classList.remove('shadow');
      popup.classList.remove('shadow');
      popup.innerHTML = '';
    }
  }

  changeValue(): void {
    const cartTotalProducts = document.querySelector('.cart__total-products') as HTMLElement;
    cartTotalProducts.innerHTML = `
      <span>Products: </span>${appState.getAmountCart()}
    `;

    const cartTotalPrice = document.querySelector('.cart__total-price') as HTMLElement;
    cartTotalPrice.innerHTML = `
      <span>Total: </span>${appState.getSumPrice()} $
    `;
  }

  refreshCartTotal(cartTotal: HTMLElement) {
    cartTotal.innerHTML = this.render();
    this.setListeners();
    app.controller.setHeaderCart();
  }
}

export default CarTotal;
