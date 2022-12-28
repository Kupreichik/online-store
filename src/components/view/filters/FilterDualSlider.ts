import { app } from '../../../index';
import { DualSlider, Product } from '../../../types/interfaces';
import { DEFAULT_STATE } from '../../state/State';

export abstract class FilterDualSlider {
  products: Product[] = DEFAULT_STATE.products;

  constructor(protected sliderData: DualSlider) {}

  protected createSlider(currMin: number, currMax: number): string {
    const { minInputId, maxInputId, minTextId, maxTextId, range, additionalSymbol } = this.sliderData;
    return `
        <div>
          <span>${additionalSymbol}</span>
          <span id="${minTextId}" 
            ${currMin === 0 ? 'style="display: none;"' : ''}>${currMin}</span>
        </div>
          ${currMin === 0 ? '<span style="width: 100%; text-align: center;">Products Not Found</span>' : ''}
        <div>
          <span>${additionalSymbol}</span>
          <span id="${maxTextId}" 
            ${currMin === 0 ? 'style="display: none;"' : ''}>${currMax}</span>
        </div>
      </div>
      <div class="products__range">
        <input type="range" min="${range.min}" max="${range.max}" value="${currMin > 0 ? currMin : range.min}"
        style="${this.createBackground(currMin, currMax)}"
        id="${minInputId}">
        <input type="range" min="${range.min}" max="${range.max}" value="${
      currMax > 0 ? currMax : range.min
    }" id="${maxInputId}">
    `;
  }

  protected createBackground(currMin: number, currMax: number): string {
    return `
    background: linear-gradient(to right,
      rgb(129 127 124) 0%,
      rgb(129 127 124) ${this.getPercentVal(currMin)}%,
      rgb(0 171 132) ${this.getPercentVal(currMin)}%,
      rgb(0 171 132) ${this.getPercentVal(currMax)}%,
      rgb(129 127 124) ${this.getPercentVal(currMax)}%,
      rgb(129 127 124) 100%) no-repeat center;
      background-size: 100% 2px;
    `;
  }

  private getPercentVal(curr: number, min = this.sliderData.range.min, max = this.sliderData.range.max): number {
    return ((curr - min) / (max - min)) * 100;
  }

  listener(): void {
    const lowerSlider = document.querySelector(`#${this.sliderData.minInputId}`) as HTMLInputElement;
    const upperSlider = document.querySelector(`#${this.sliderData.maxInputId}`) as HTMLInputElement;
    let lowerVal: number = parseInt(lowerSlider.value);
    let upperVal: number = parseInt(upperSlider.value);
    const labelMin = document.querySelector(`#${this.sliderData.minTextId}`) as HTMLElement;
    const labelMax = document.querySelector(`#${this.sliderData.maxTextId}`) as HTMLElement;

    const num: number = this.sliderData.correctionNumber;

    upperSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (upperVal < lowerVal + num) {
        lowerSlider.value = (upperVal - num).toString();
        labelMin.innerText = `${+lowerSlider.value + num}`;

        if (lowerVal === +lowerSlider.min) {
          upperSlider.value = (lowerVal + num).toString();
          labelMin.innerText = lowerSlider.value;
        }
      } else {
        labelMin.innerText = lowerSlider.value;
      }
      labelMax.innerText = `${upperVal}`;

      lowerSlider.setAttribute('style', this.createBackground(+lowerSlider.value, upperVal));
    };

    upperSlider.onchange = () => {
      this.setSliderState(labelMin, labelMax);
    };

    lowerSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (lowerVal > upperVal - num) {
        upperSlider.value = (lowerVal + num).toString();
        labelMax.innerText = `${+upperSlider.value - num}`;

        if (upperVal === +upperSlider.max) {
          lowerSlider.value = `${parseInt(upperSlider.max) - num}`;
          labelMax.innerText = upperSlider.value;
        }
      } else {
        labelMax.innerText = upperSlider.value;
      }
      labelMin.innerText = `${lowerVal}`;
      lowerSlider.setAttribute('style', this.createBackground(lowerVal, +upperSlider.value));
    };

    lowerSlider.onchange = () => {
      this.setSliderState(labelMin, labelMax);
    };
  }

  setSliderState(labelMin: HTMLElement, labelMax: HTMLElement): void {
    app.controller.setActualState(this.sliderData.maxInputId, labelMax.innerText);
    app.controller.setActualState(this.sliderData.minInputId, labelMin.innerText);
  }
}
