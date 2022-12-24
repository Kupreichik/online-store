import { Product } from '../../../types/interfaces';
import { DEFAULT_STATE } from '../../state/State';

export class mainCards {
  products: Product[] = DEFAULT_STATE.products;
  sortIndex: number = DEFAULT_STATE.sortIndex;

  getState(): void {
    this.products = DEFAULT_STATE.products;
    this.sortIndex = DEFAULT_STATE.sortIndex;
    switch (this.sortIndex) {
      case 0:
        this.products.sort((a, b) => a.id - b.id);
        break;
      case 1:
        this.products.sort((a, b) => (a.title > b.title ? 1 : -1));
        break;
      case 2:
        this.products.sort((a, b) => (a.title > b.title ? -1 : 1));
        break;
      case 3:
        this.products.sort((a, b) => a.price - b.price);
        break;
      case 4:
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
