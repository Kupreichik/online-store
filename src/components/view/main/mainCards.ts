import { Product } from '../../../types/interfaces';
import { DEFAULT_STATE } from '../../state/State';
import { SortKind } from '../../../types/types';

export class mainCards {
  products: Product[] = DEFAULT_STATE.products;
  sortKind: number = DEFAULT_STATE.sortIndex;

  getState(): void {
    this.products = DEFAULT_STATE.products;
    this.sortKind = DEFAULT_STATE.sortIndex;
    switch (this.sortKind) {
      case SortKind['Most Popular']:
        this.products.sort((a, b) => a.id - b.id);
        break;
      case SortKind['Alphabet A - Z']:
        this.products.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
      case SortKind['Alphabet Z - A']:
        this.products.sort((a, b) => (a.title > b.title ? -1 : 1));
        break;
      case SortKind['$ Low to High']:
        this.products.sort((a, b) => a.price - b.price);
        break;
      case SortKind['$ High to Low']:
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
        <a href="/#/id/${prod.id}/">
          <img src="${prod.images[0]}" alt="${prod.title}" class="main-card_img">
          <h4 class="main-card_title">${prod.title}</h4>
          <p class="main-card_more">More Details</p>
        </a>
        <div class="main-card_bottom">
          <span class="main-card_price">$ ${prod.price}</span>
          <button class="main-card_btn btn" value="${prod.id}">Add To Cart</button>
        </div>
      </div>
    `;
    }

    return cardsLayout;
  }
}
