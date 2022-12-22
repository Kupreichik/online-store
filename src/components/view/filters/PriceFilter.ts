import { Product } from '../../../types/interfaces';
import { DEFAULT_STATE } from '../../state/State';

export class PriceFilter {
  products: Product[] = DEFAULT_STATE.products;

  private getState(): void {
    this.products = DEFAULT_STATE.products.sort((a, b) => a.price - b.price);
  }

  render(): string {
    this.getState();
    const min: number = this.products.length > 0 ? this.products[0].price : 0;
    const max: number = this.products.length > 0 ? this.products[this.products.length - 1].price : 0;
    return `
      <legend class="products__filter-heading">Price</legend>
      <div class="products__price-min-max">
        ${min > 0 ? '<span id="price-min-text">$ ' + min.toString() + '</span>' : ''}
        ${min === 0 ? '<span style="width: 100%; text-align: center;">Products Not Found</span>' : ''}
        ${min > 0 ? '<span id="price-max-text">$ ' + max.toString() + '</span>' : ''}
      </div>
      <div class="products__range">
        <input type="range" min="27" max="168" value="${min > 0 ? min : 27}"
        style="background: linear-gradient(to right,
        rgb(129 127 124) 0%,
        rgb(129 127 124) ${((min - 27) / (168 - 27)) * 100}%,
        rgb(0 171 132) ${((min - 27) / (168 - 27)) * 100}%,
        rgb(0 171 132) ${((max - 27) / (168 - 27)) * 100}%,
        rgb(129 127 124) ${((max - 27) / (168 - 27)) * 100}%,
        rgb(129 127 124) 100%) no-repeat center;
        background-size: 100% 2px;"
        id="price-min">
        <input type="range" min="27" max="168" value="${max > 0 ? max : 168}" id="price-max">
      </div>
    `;
  }

  listener(): void {
    const lowerSlider = document.querySelector('#price-min') as HTMLInputElement;
    const upperSlider = document.querySelector('#price-max') as HTMLInputElement;
    let lowerVal: number = parseInt(lowerSlider.value);
    let upperVal: number = parseInt(upperSlider.value);
    const labelMin: HTMLElement | null = document.querySelector('#price-min-text');
    const labelMax: HTMLElement | null = document.querySelector('#price-max-text');

    upperSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (upperVal < lowerVal + 4) {
        lowerSlider.value = (upperVal - 4).toString();

        if (lowerVal === +lowerSlider.min) {
          upperSlider.value = (lowerVal + 4).toString();
        }
      }
      if (labelMax) labelMax.innerText = `$ ${upperVal}`;
      if (labelMin) labelMin.innerText = `$ ${lowerSlider.value}`;
      lowerSlider.setAttribute(
        'style',
        `background: linear-gradient(to right,
        rgb(129 127 124) 0%,
        rgb(129 127 124) ${((+lowerSlider.value - 27) / (168 - 27)) * 100}%,
        rgb(0 171 132) ${((+lowerSlider.value - 27) / (168 - 27)) * 100}%,
        rgb(0 171 132) ${((upperVal - 27) / (168 - 27)) * 100}%,
        rgb(129 127 124) ${((upperVal - 27) / (168 - 27)) * 100}%,
        rgb(129 127 124) 100%) no-repeat center;
        background-size: 100% 2px;`
      );
    };

    lowerSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (lowerVal > upperVal - 4) {
        upperSlider.value = (lowerVal + 1).toString();

        if (upperVal === +upperSlider.max) {
          lowerSlider.value = `${parseInt(upperSlider.max) - 4}`;
        }
      }
      if (labelMin) labelMin.innerText = `$ ${lowerVal}`;
      if (labelMax) labelMax.innerText = `$ ${upperSlider.value}`;
      lowerSlider.setAttribute(
        'style',
        `background: linear-gradient(to right,
        rgb(129 127 124) 0%,
        rgb(129 127 124) ${((lowerVal - 27) / (168 - 27)) * 100}%,
        rgb(0 171 132) ${((lowerVal - 27) / (168 - 27)) * 100}%,
        rgb(0 171 132) ${((+upperSlider.value - 27) / (168 - 27)) * 100}%,
        rgb(129 127 124) ${((+upperSlider.value - 27) / (168 - 27)) * 100}%,
        rgb(129 127 124) 100%) no-repeat center;
        background-size: 100% 2px;`
      );
    };
  }
}
