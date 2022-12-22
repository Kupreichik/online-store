import { Product } from '../../../types/interfaces';
import { DEFAULT_STATE } from '../../state/State';

export class StockFilter {
  products: Product[] = DEFAULT_STATE.products;

  private getState(): void {
    this.products = DEFAULT_STATE.products.sort((a, b) => a.stock - b.stock);
  }

  render(): string {
    this.getState();
    const min: number = this.products.length > 0 ? this.products[0].stock : 0;
    const max: number = this.products.length > 0 ? this.products[this.products.length - 1].stock : 0;
    return `
      <legend class="products__filter-heading">Stock</legend>
      <div class="products__stock-min-max">
        ${min > 0 ? '<span id="stock-min-text">' + min.toString() + '</span>' : ''}
        ${min === 0 ? '<span style="width: 100%; text-align: center;">Products Not Found</span>' : ''}
        ${min > 0 ? '<span id="stock-max-text">' + max.toString() + '</span>' : ''}
      </div>
      <div class="products__range">
        <input type="range" min="1" max="38" value="${min > 0 ? min : 1}"
        style="background: linear-gradient(to right,
        rgb(129 127 124) 0%,
        rgb(129 127 124) ${((min - 1) / (38 - 1)) * 100}%,
        rgb(0 171 132) ${((min - 1) / (38 - 1)) * 100}%,
        rgb(0 171 132) ${((max - 1) / (38 - 1)) * 100}%,
        rgb(129 127 124) ${((max - 1) / (38 - 1)) * 100}%,
        rgb(129 127 124) 100%) no-repeat center;
        background-size: 100% 2px;"
        id="stock-min">
        <input type="range" min="1" max="38" value="${max > 0 ? max : 38}" id="stock-max">
      </div>
    `;
  }

  listener(): void {
    const lowerSlider = document.querySelector('#stock-min') as HTMLInputElement;
    const upperSlider = document.querySelector('#stock-max') as HTMLInputElement;
    let lowerVal: number = parseInt(lowerSlider.value);
    let upperVal: number = parseInt(upperSlider.value);
    const labelMin: HTMLElement | null = document.querySelector('#stock-min-text');
    const labelMax: HTMLElement | null = document.querySelector('#stock-max-text');

    upperSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (upperVal < lowerVal + 1) {
        lowerSlider.value = (upperVal - 1).toString();

        if (lowerVal === +lowerSlider.min) {
          upperSlider.value = (lowerVal + 1).toString();
        }
      }
      if (labelMax) labelMax.innerText = `${upperVal}`;
      if (labelMin) labelMin.innerText = `${lowerSlider.value}`;
      lowerSlider.setAttribute(
        'style',
        `background: linear-gradient(to right,
        rgb(129 127 124) 0%,
        rgb(129 127 124) ${((+lowerSlider.value - 1) / (38 - 1)) * 100}%,
        rgb(0 171 132) ${((+lowerSlider.value - 1) / (38 - 1)) * 100}%,
        rgb(0 171 132) ${((upperVal - 1) / (38 - 1)) * 100}%,
        rgb(129 127 124) ${((upperVal - 1) / (38 - 1)) * 100}%,
        rgb(129 127 124) 100%) no-repeat center;
        background-size: 100% 2px;`
      );
    };

    lowerSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (lowerVal > upperVal - 1) {
        upperSlider.value = (lowerVal + 1).toString();

        if (upperVal === +upperSlider.max) {
          lowerSlider.value = `${parseInt(upperSlider.max) - 1}`;
        }
      }
      if (labelMin) labelMin.innerText = `${lowerVal}`;
      if (labelMax) labelMax.innerText = `${upperSlider.value}`;
      lowerSlider.setAttribute(
        'style',
        `background: linear-gradient(to right,
        rgb(129 127 124) 0%,
        rgb(129 127 124) ${((lowerVal - 1) / (38 - 1)) * 100}%,
        rgb(0 171 132) ${((lowerVal - 1) / (38 - 1)) * 100}%,
        rgb(0 171 132) ${((+upperSlider.value - 1) / (38 - 1)) * 100}%,
        rgb(129 127 124) ${((+upperSlider.value - 1) / (38 - 1)) * 100}%,
        rgb(129 127 124) 100%) no-repeat center;
        background-size: 100% 2px;`
      );
    };
  }
}
