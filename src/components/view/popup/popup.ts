import { STATE } from '../../state/State';
import { app } from '../../../index';
import { cardsLogoUrls } from '../../../data/cardsLogo';
import { regExpCallBack } from '../../../types/types';
import * as popupValidation from './popupValidation';

class Popup {
  isFormValid = false;
  render() {
    return `
      <div class="popup__inner">
        <form action="" class="popup-form">
          <div class="popup-form__person">
            <h2  class="popup-form__person-title">Personal details</h2>
            <div class="popup-form__name popup-form__item">
              <input
                class="popup-form__name-input popup-form__item-input"
                data-required="true"
                type="text"
                placeholder="Name"
                data-control="personName"
              />
            </div>
            <div class="popup-form__phone popup-form__item">
              <input
                class="popup-form__phone-input popup-form__item-input"
                type="text"
                placeholder="Phone number"
                data-control="phoneNumber"
              />
            </div>
            <div class="popup-form__adress popup-form__item">
              <input
                class="popup-form__adress-input popup-form__item-input"
                type="text"
                placeholder="Delivery address"
                data-control="adress"
              />
            </div>
            <div class="popup-form__email popup-form__item">
              <input
                class="popup-form__email-input popup-form__item-input"
                type="text"
                placeholder="E-mail"
                data-control="email"
              />
            </div>
          </div>
          <div class="popup-form__card">
            <h2 class="popup-form__card-title">Credit card details</h2>
            <div class="popup-form__card-data">
              <div class="popup-form__card-number">
                <img class="popup-form__card-img"
                  alt="card logo"
                  src="${cardsLogoUrls.noLogo}"
                />
                <input
                  class="popup-form__card-number-input popup-form__card-item-input"
                  type="text"
                  placeholder="Card number"
                  maxlength="19"
                  data-control="cardNumber"
                />
              </div>
              <div class="popup-form__card-other-data">
                <div class="popup-form__card-valid">
                  VALID:
                  <input
                    class="popup-form__card-valid-input popup-form__card-item-input"
                    type="text"
                    placeholder="Valid Thru"
                    maxlength="5"
                    data-control="cardDate"
                  />
                </div>
                <div class="popup-form__card-cvv">
                  CVV:
                  <input
                    class="popup-form__card-cvv-input popup-form__card-item-input"
                    type="text"
                    placeholder="Code"
                    maxlength="3"
                    data-control="cardCVV"
                  />
                </div>
              </div>
            </div>
          </div>
          <button class="popup-form__btn btn" type="submit">Confirm</button>
        </form>
      </div>
    `;
  }

  setListeners(): void {
    const body = document.querySelector('body') as HTMLElement;
    const popupForm = document.querySelector('.popup-form') as HTMLInputElement;
    const popupFormName = document.querySelector('.popup-form__name-input') as HTMLInputElement;
    const popupFormPhone = document.querySelector('.popup-form__phone-input') as HTMLInputElement;
    const popupFormAdress = document.querySelector('.popup-form__adress-input') as HTMLInputElement;
    const popupFormEmail = document.querySelector('.popup-form__email-input') as HTMLInputElement;
    const popupFormCardNumber = document.querySelector('.popup-form__card-number-input') as HTMLInputElement;
    const popupFormCardValid = document.querySelector('.popup-form__card-valid-input') as HTMLInputElement;
    const popupFormCardCVV = document.querySelector('.popup-form__card-cvv-input') as HTMLInputElement;

    const inputData: [HTMLInputElement, regExpCallBack<string>][] = [
      [popupFormName, popupValidation.checkName],
      [popupFormPhone, popupValidation.checkPhone],
      [popupFormAdress, popupValidation.checkAdress],
      [popupFormEmail, popupValidation.checkEmail],
      [popupFormName, popupValidation.checkName],
    ];

    popupForm.onsubmit = (event) => {
      event.preventDefault();

      inputData.forEach(([input, cb]) => this.setError(input, cb));

      this.setCardError(popupFormCardNumber, popupValidation.checkCardNumber);

      this.setCardError(popupFormCardValid, popupValidation.checkCardValid);

      this.setCardError(popupFormCardCVV, popupValidation.checkCardCVV);

      if (this.isFormValid) {
        const main = document.querySelector('.main') as HTMLElement;
        STATE.cartProducts = [];
        main.innerHTML = app.view.cart.render();
        app.controller.setHeaderCart();
        const popup = document.querySelector('.popup') as HTMLElement;
        popup.classList.add('shadow');
        body.classList.add('shadow');

        let count = 5;
        popup.innerHTML = this.getRedirectMessage(count);

        const timer = setInterval(() => {
          count--;
          popup.innerHTML = this.getRedirectMessage(count);

          if (count === 0) {
            clearInterval(timer);
            body.classList.remove('shadow');
            window.location.href = '#/';
          }
        }, 1000);
      }
    };

    inputData.forEach(([input, cb]) => {
      input.oninput = () => this.setError(input, cb, true);
    });

    popupFormCardNumber.oninput = (event) => {
      const popupFormCardImg = document.querySelector('.popup-form__card-img') as HTMLImageElement;
      const target = event.target as HTMLInputElement;
      target.value = target.value
        .replace(/\s/g, '')
        .split(/(\d{4})/)
        .filter((item) => item !== '')
        .join(' ');

      if (target.value.match(/^5/)) {
        popupFormCardImg.src = cardsLogoUrls.mastercard;
      } else if (target.value.match(/^4/)) {
        popupFormCardImg.src = cardsLogoUrls.visa;
      } else if (target.value.match(/^3/)) {
        popupFormCardImg.src = cardsLogoUrls.americanExpress;
      } else if (target.value.match(/^2/)) {
        popupFormCardImg.src = cardsLogoUrls.unionPay;
      } else if (target.value.match(/^1/)) {
        popupFormCardImg.src = cardsLogoUrls.jcb;
      } else {
        popupFormCardImg.src = cardsLogoUrls.noLogo;
      }

      this.setCardError(target, popupValidation.checkCardNumber, true);

      if (Number.isNaN(+target.value.replace(/\s/g, ''))) target.value = target.value.slice(0, -1);
    };

    popupFormCardValid.oninput = (event) => {
      const target = event.target as HTMLInputElement;

      if (target.value.length > 2) {
        target.value = target.value
          .replace(/\//g, '')
          .split(/(\d{2})/)
          .filter((item) => item !== '')
          .join('/');
      }

      if (Number.isNaN(+target.value.replace(/\s/g, '').replace(/\//g, ''))) target.value = target.value.slice(0, -1);

      const targetDate: string = target.value
        .split('/')
        .reduce((acc, el, i) => (i === 0 ? acc + el + '/01/' : acc + ('20' + el)), '');

      if (target.value.length !== 5 || +new Date() < +new Date(targetDate) || +target.value.slice(0, 2) > 12) {
        if (!document.querySelector('.cardDate')) {
          this.createCardError(target);
          this.isFormValid = false;
        }
      } else {
        this.setCardError(target, popupValidation.checkCardValid, true);
      }
    };

    popupFormCardCVV.oninput = (event) => {
      const target = event.target as HTMLInputElement;
      this.setCardError(target, popupValidation.checkCardCVV, true);

      if (Number.isNaN(+target.value)) target.value = target.value.slice(0, -1);
    };
  }

  createError(input: HTMLInputElement) {
    const parent = input.parentNode as HTMLElement;

    const errorLable = document.createElement('label');
    errorLable.classList.add('popup-form__error');
    errorLable.textContent = 'error';

    parent.append(errorLable);
  }

  removeError(input: HTMLElement) {
    const parent = input.parentNode as HTMLElement;
    const errorLable = parent.querySelector('.popup-form__error') as HTMLElement;

    if (input.classList.contains('error')) {
      errorLable.remove();
    }
  }

  setError(input: HTMLInputElement, cb: regExpCallBack<string>, setTrue = false) {
    if (!cb(input.value)) {
      this.removeError(input);
      input.classList.add('error');
      this.createError(input);
      this.isFormValid = false;
    } else {
      this.removeError(input);
      input.classList.remove('error');

      if (setTrue) this.isFormValid = true;
    }
  }

  createCardError(input: HTMLInputElement) {
    const parent = document.querySelector('.popup-form__card') as HTMLElement;

    const errorLable = document.createElement('label');
    errorLable.classList.add('popup-form__error-card', `${input.dataset.control}`);
    errorLable.textContent =
      input.placeholder === 'Card number'
        ? `error - Card number`
        : input.placeholder === 'Valid Thru'
        ? `error - Card valid thru`
        : `error - Card CVV`;
    errorLable.style.display = 'block';

    parent.append(errorLable);
  }

  setCardError(input: HTMLInputElement, cb: regExpCallBack<string>, setTrue = false) {
    const classEl = input.dataset.control as string;
    const errorLable: HTMLElement | null = document.querySelector(`.${classEl}`);

    if (!cb(input.value)) {
      if (!errorLable) {
        this.createCardError(input);
      }
      input.classList.add('error');
      this.isFormValid = false;
    } else {
      errorLable?.remove();
      input.classList.remove('error');
      if (setTrue) this.isFormValid = true;
    }
  }

  getRedirectMessage(count: number) {
    return `<p class="popup-timer">Thanks for your order. Redirect to the store after ${count} sec<p>`;
  }
}

export default Popup;
