import { STATE } from '../../state/State';

class Header {
  render() {
    const headerTotalPrice = document.querySelector('.header__total-price') as HTMLElement;
    headerTotalPrice.innerHTML = `${STATE.sumPrice}.00 $`;

    const headerCartCount = document.querySelector('.header__cart-count') as HTMLElement;
    headerCartCount.innerHTML = `(${STATE.amountProductsCart})`;
  }
}

export default Header;
