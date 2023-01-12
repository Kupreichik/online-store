import { Product } from '../../../types/interfaces';
import { STATE, DEFAULT_STATE } from '../../state/State';
import { SortKind } from '../../../types/types';
import { app } from '../../../index';

export class mainCards {
  products: Product[] = DEFAULT_STATE.products;
  sortKind: SortKind = DEFAULT_STATE.sortIndex;

  getState(): void {
    this.products = STATE.products;
    this.sortKind = STATE.sortIndex;
    switch (this.sortKind) {
      case SortKind.popular:
        this.products.sort((a, b) => a.id - b.id);
        break;
      case SortKind.alphabetUp:
        this.products.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
      case SortKind.alphabetDown:
        this.products.sort((a, b) => (a.title > b.title ? -1 : 1));
        break;
      case SortKind.priceUp:
        this.products.sort((a, b) => a.price - b.price);
        break;
      case SortKind.priceDown:
        this.products.sort((a, b) => b.price - a.price);
        break;
    }
  }

  render(): string {
    this.getState();
    let cardsLayout = '';
    for (let i = 0; i < this.products.length; i += 1) {
      const prod: Product = this.products[i];
      cardsLayout += `
      <div class="main-card">
        <a href="${window.location.search}#/id/${prod.id}/" class="main-card_link">
          <img src="${prod.images[0]}" alt="${prod.title}" class="main-card_img">
          <div>
            <h4 class="main-card_title">${prod.title}</h4>
            <p class="main-card_more">More Details</p>
          </div>
        </a>
        <div class="main-card_bottom">
          <span class="main-card_price">$ ${prod.price}</span>
          <button class="main-card_btn btn" value="${prod.id}">
          ${STATE.cartProducts.find((item) => item.id === prod.id) ? 'Remove' : 'Add To Cart'}
          </button>
        </div>
      </div>
    `;
    }
    return cardsLayout;
  }

  listener(): void {
    const btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.main-card_btn');
    btns.forEach((btn) => (btn.onclick = () => app.controller.appStateControl('cart', btn.value)));
  }
}
