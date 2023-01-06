import { STATE } from '../../state/State';
import { app } from '../../../index';

class Popup {
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
                <img class="popup-form__card-img
                  alt="card logo"
                  src="https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71"
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
    const personFormInputs = popupForm.querySelectorAll('.popup-form__item-input') as NodeListOf<HTMLInputElement>;
    const cardFormInputs = popupForm.querySelectorAll('.popup-form__card-item-input') as NodeListOf<HTMLInputElement>;
    const popupFormName = document.querySelector('.popup-form__name-input') as HTMLInputElement;
    const popupFormPhone = document.querySelector('.popup-form__phone-input') as HTMLInputElement;
    const popupFormAdress = document.querySelector('.popup-form__adress-input') as HTMLInputElement;
    const popupFormEmail = document.querySelector('.popup-form__email-input') as HTMLInputElement;
    const popupFormCardNumber = document.querySelector('.popup-form__card-number-input') as HTMLInputElement;
    const popupFormCardValid = document.querySelector('.popup-form__card-valid-input') as HTMLInputElement;
    const popupFormCardCvv = document.querySelector('.popup-form__card-cvv-input') as HTMLInputElement;
    let isTrue = true;

    popupForm.onsubmit = (event) => {
      event.preventDefault();
      const nameVal = popupFormName.value;
      const phoneVal = popupFormPhone.value;
      const adressVal = popupFormAdress.value;
      const emailVal = popupFormEmail.value;
      const cardNumberVal = popupFormCardNumber.value;
      const cardValidVal = popupFormCardValid.value;
      const cardCvvlVal = popupFormCardCvv.value;

      personFormInputs.forEach((input) => {
        this.removeError(input);
      });

      if (!this.checkName(nameVal)) {
        popupFormName.classList.add('error');
        this.createError(popupFormName);
        isTrue = false;
      } else {
        popupFormName.classList.remove('error');
      }

      if (!this.checkPhone(phoneVal)) {
        popupFormPhone.classList.add('error');
        this.createError(popupFormPhone);
        isTrue = false;
      } else {
        popupFormPhone.classList.remove('error');
      }

      if (!this.checkAdress(adressVal)) {
        popupFormAdress.classList.add('error');
        this.createError(popupFormAdress);
        isTrue = false;
      } else {
        popupFormAdress.classList.remove('error');
      }

      if (!this.checkEmail(emailVal)) {
        popupFormEmail.classList.add('error');
        this.createError(popupFormEmail);
        isTrue = false;
      } else {
        popupFormEmail.classList.remove('error');
      }

      cardFormInputs.forEach((input) => {
        this.removeCardError(input);
      });

      if (!this.checkCardNumber(cardNumberVal)) {
        popupFormCardNumber.classList.add('error');
        this.createCardError(popupFormCardNumber);
        isTrue = false;
      } else {
        popupFormCardNumber.classList.remove('error');
      }

      if (!this.checkValid(cardValidVal)) {
        popupFormCardValid.classList.add('error');
        this.createCardError(popupFormCardValid);
        isTrue = false;
      } else {
        popupFormCardValid.classList.remove('error');
      }

      if (!this.checkCvv(cardCvvlVal)) {
        popupFormCardCvv.classList.add('error');
        this.createCardError(popupFormCardCvv);
        isTrue = false;
      } else {
        popupFormCardCvv.classList.remove('error');
      }

      if (isTrue) {
        const main = document.querySelector('.main') as HTMLElement;
        STATE.cartProducts = [];
        main.innerHTML = app.view.cart.render();
        app.controller.setHeaderCart();
        const popup = document.querySelector('.popup') as HTMLElement;
        popup.classList.add('shadow');
        body.classList.add('shadow');

        let count = 5;
        popup.innerHTML = `<p class="popup-timer">Thanks for your order. Redirect to the store after ${count} sec<p>`;
        const timer = setInterval(() => {
          count--;
          popup.innerHTML = `<p class="popup-timer">Thanks for your order. Redirect to the store after ${count} sec<p>`;
          if (count === 0) {
            clearInterval(timer);
            body.classList.remove('shadow');
            window.location.href = '#/';
          }
        }, 1000);
      }
    };

    popupFormName.oninput = (event) => {
      const target = event.target as HTMLInputElement;
      if (!this.checkName(target.value)) {
        this.removeError(popupFormName);
        popupFormName.classList.add('error');
        this.createError(popupFormName);
        isTrue = false;
      } else {
        this.removeError(popupFormName);
        popupFormName.classList.remove('error');
        isTrue = true;
      }
    };

    popupFormPhone.oninput = (event) => {
      const target = event.target as HTMLInputElement;
      if (!this.checkPhone(target.value)) {
        this.removeError(popupFormPhone);
        popupFormPhone.classList.add('error');
        this.createError(popupFormPhone);
        isTrue = false;
      } else {
        this.removeError(popupFormPhone);
        popupFormPhone.classList.remove('error');
        isTrue = true;
      }
    };

    popupFormAdress.oninput = (event) => {
      const target = event.target as HTMLInputElement;
      if (!this.checkAdress(target.value)) {
        this.removeError(popupFormAdress);
        popupFormAdress.classList.add('error');
        this.createError(popupFormAdress);
        isTrue = false;
      } else {
        this.removeError(popupFormAdress);
        popupFormAdress.classList.remove('error');
        isTrue = true;
      }
    };

    popupFormEmail.oninput = (event) => {
      const target = event.target as HTMLInputElement;
      if (!this.checkEmail(target.value)) {
        this.removeError(popupFormEmail);
        popupFormEmail.classList.add('error');
        this.createError(popupFormEmail);
        isTrue = false;
      } else {
        this.removeError(popupFormEmail);
        popupFormEmail.classList.remove('error');
        isTrue = true;
      }
    };

    popupFormCardNumber.oninput = (event) => {
      const popupFormCardImg = document.querySelector('.popup-form__card-img') as HTMLImageElement;
      const target = event.target as HTMLInputElement;
      target.value = target.value
        .replace(/\s/g, '')
        .split(/(\d{4})/)
        .filter((item) => item !== '')
        .join(' ');
      if (target.value.match(/^5/)) {
        popupFormCardImg.src = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
      } else if (target.value.match(/^4/)) {
        popupFormCardImg.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
      } else if (target.value.match(/^3/)) {
        popupFormCardImg.src =
          'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg';
      } else {
        popupFormCardImg.src =
          'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
      }

      if (!this.checkCardNumber(target.value)) {
        this.removeCardError(popupFormCardNumber);
        popupFormCardNumber.classList.add('error');
        this.createCardError(target);
        isTrue = false;
      } else {
        this.removeCardError(popupFormCardNumber);
        popupFormCardNumber.classList.remove('error');
        isTrue = true;
      }

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

      if (
        +target.value.slice(0, 2) === 0 ||
        +target.value.slice(0, 2) > 12 ||
        +target.value.slice(-2) === 0 ||
        +target.value.slice(-2) > +new Date().getFullYear().toString().slice(-2)
      ) {
        this.removeCardError(popupFormCardValid);
        this.createCardError(target);
      } else if (!this.checkValid(target.value)) {
        this.removeCardError(popupFormCardValid);
        popupFormCardValid.classList.add('error');
        this.createCardError(target);
        isTrue = false;
      } else {
        this.removeCardError(popupFormCardValid);
        popupFormCardValid.classList.remove('error');
        isTrue = true;
      }
    };

    popupFormCardCvv.oninput = (event) => {
      const target = event.target as HTMLInputElement;

      if (!this.checkCvv(target.value)) {
        this.removeCardError(popupFormCardCvv);
        popupFormCardCvv.classList.add('error');
        this.createCardError(target);
        isTrue = false;
      } else {
        this.removeCardError(popupFormCardCvv);
        popupFormCardCvv.classList.remove('error');
        isTrue = true;
      }

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

  removeError(input: HTMLElement) {
    const parent = input.parentNode as HTMLElement;
    const errorLable = parent.querySelector('.popup-form__error') as HTMLElement;
    if (input.classList.contains('error')) {
      errorLable.remove();
    }
  }

  removeCardError(input: HTMLInputElement) {
    const classEl = input.dataset.control as string;
    const errorLable = document.querySelector(`.${classEl}`) as HTMLElement;

    errorLable.remove();
  }

  checkName(name: string) {
    const rx = /^[a-zа-яё]{3,}\s[a-zа-яё]{3,}\D*/gi;
    return rx.test(name.toLowerCase());
  }

  checkPhone(phone: string) {
    const rx = /^\+\d{9,}/;
    return rx.test(phone);
  }

  checkAdress(adress: string) {
    const rx = /^[a-zа-яё]{5,}\s[a-zа-яё]{5,}\s[a-zа-яё]{5,}\D*/gi;
    return rx.test(adress.toLowerCase());
  }

  checkEmail(email: string) {
    const rx = /^[a-z0-9._%+-]+@[a-z0-9-]+.+.[a-z]{2,4}$/i;
    return rx.test(email.toLowerCase());
  }

  checkCardNumber(cardNumber: string) {
    const rx = /\d{4}\s\d{4}\s\d{4}\s\d{4}/;
    return rx.test(cardNumber);
  }

  checkValid(valid: string) {
    const rx = /\d{2}\/\d{2}/;
    return rx.test(valid);
  }

  checkCvv(cvv: string) {
    const rx = /\d{3}/;
    return rx.test(cvv);
  }
}

export default Popup;
