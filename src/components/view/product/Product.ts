import { productsData } from '../../../data/products';
import { app } from '../../../index';
import { Product } from '../../../types/interfaces';
import { STATE } from '../../state/State';

export class ProductPage {
  product!: Product;

  private getProduct(id: number): void {
    this.product = productsData.find((prod) => prod.id === id) as Product;
  }

  render(id: string): string {
    this.getProduct(+id);
    const catgr = this.product.category[0];
    return `
      <a href="${document.querySelector('.header__logo-link')?.getAttribute('href')}" class="bread-crumbs">Home</a>
      <span> / </span><span>${catgr.charAt(0).toUpperCase() + catgr.slice(1)} Plants</span><span> / </span>
      <span class="current_link">${this.product.title}</span>
      <div class="product-container">
        <div class="small-img_block">${this.createImgs()}</div>
        <div style="background-image: url('${this.product.images[0]}');" class="large-img"></div>
        <div class="pr-description_container">
          <h2 class="pr-description_title">${this.product.title}</h2>
          <p class="pr-description_price">$${this.product.price}</p>
          ${this.createDescriptionItem()}
          <button class="main-card_btn btn product_btn" id="product-add" value="${this.product.id}">
          ${this.getCartButtonName()}
          </button>
          <button class="main-card_btn btn product_btn" id="product-buy" value="${this.product.id}">Buy Now</button>
        </div>
      </div>
    `;
  }

  private createDescriptionItem(): string {
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
    return this.product.images.reduce((acc, item, ind): string => {
      return acc + `<img src="${item}" alt="${this.product.title}" class="small-img${ind === 0 ? ' active-img' : ''}">`;
    }, '');
  }

  setListeners(): void {
    const imgs: NodeListOf<HTMLImageElement> = document.querySelectorAll('.small-img');
    const largeImg = document.querySelector('.large-img') as HTMLImageElement;
    imgs.forEach(
      (el) =>
        (el.onclick = () => {
          largeImg.setAttribute('style', `background-image: url('${el.getAttribute('src') as string}')`);
          imgs.forEach((img) => img.classList.remove('active-img'));
          el.classList.add('active-img');
        })
    );

    const btn = document.querySelector('#product-add') as HTMLButtonElement;
    btn.onclick = () => {
      app.controller.setActualState('cart', btn.value, false);
      btn.textContent = this.getCartButtonName();
    };

    const buyBtn = document.querySelector('#product-buy') as HTMLButtonElement;
    buyBtn.onclick = () => {
      if (!STATE.cartProducts.find((item) => item.id === this.product.id)) app.controller.addProdToCart(+buyBtn.value);
      window.history.replaceState(null, '', window.location.search + '#/cart/');
      app.router.resolveRoute();
      app.view.cart.cartTotal.openPopup();
    };
  }

  private getCartButtonName(): string {
    return STATE.cartProducts.find((item) => item.id === this.product.id) ? 'Remove From Cart' : 'Add To Cart';
  }
}
