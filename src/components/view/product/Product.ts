import { productsData } from '../../../data/products';
import { app } from '../../../index';
import { Product } from '../../../types/interfaces';
import { STATE } from '../../state/State';

export class ProductPage {
  product: Product = productsData[0];

  private getProduct(id: number): void {
    this.product = productsData.find((prod) => prod.id === id) as Product;
  }

  render(id: string): string {
    this.getProduct(+id);
    return `
      <a href="${document.querySelector('.header__logo-link')?.getAttribute('href')}" class="bread-crumbs">Home</a>
      <span> / </span><span>${this.product.category[0]} plants</span><span> / </span>
      <span>${this.product.title}</span>
      <div class="product-container">
        <div class="small-img_block">${this.createImgs()}</div>
        <div style="background-image: url('${this.product.images[0]}');" class="large-img"></div>
        <div class="pr-description_container">
          <h2 class="pr-description_title">${this.product.title}</h2>
          <p class="pr-description_price">$${this.product.price}</p>
          ${this.crateDescriptionItem()}
          <button class="main-card_btn btn product_btn" id="product-add" value="${this.product.id}">
          ${STATE.cartProducts.find((item) => item.id === this.product.id) ? 'Remove From Cart' : 'Add To Cart'}
          </button>
          <button class="main-card_btn btn product_btn" id="product-buy" value="${this.product.id}">Buy Now</button>
        </div>
      </div>
    `;
  }

  private crateDescriptionItem(): string {
    const items: (string | number)[] = [
      this.product.category.join(', '),
      this.product.light,
      this.product.stock,
      this.product.description,
    ];
    const headings: string[] = ['Category: ', `Plant's need for sunlight: `, 'Available for order: ', ''];

    return items.reduce(
      (acc: string, item: string | number, i): string =>
        acc + `<p class="pr-description_item"><span>${headings[i]}</span>${item}</p>`,
      ''
    );
  }

  private createImgs(): string {
    return this.product.images.reduce((acc, item): string => {
      return acc + `<img src="${item}" alt="${this.product.title}" class="small-img">`;
    }, '');
  }

  setListeners(): void {
    const imgs: NodeListOf<HTMLImageElement> = document.querySelectorAll('.small-img');
    imgs.forEach(
      (el) =>
        (el.onclick = () =>
          document
            .querySelector('.large-img')
            ?.setAttribute('style', `background-image: url('${el.getAttribute('src') as string}')`))
    );

    const btn = document.querySelector('#product-add') as HTMLButtonElement;
    btn.onclick = () => {
      app.controller.setActualState('cart', btn.value, false);
      btn.textContent = STATE.cartProducts.find((item) => item.id === this.product.id)
        ? 'Remove From Cart'
        : 'Add To Cart';
    };
  }
}
