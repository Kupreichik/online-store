import { app } from '../../../index';
import { DualSlider, Product } from '../../../types/interfaces';
import { DEFAULT_STATE } from '../../state/State';

export abstract class FilterDualSlider {
  products: Product[] = DEFAULT_STATE.products;

  constructor(protected sliderData: DualSlider) {}

  protected createSlider(currMin: number, currMax: number): string {
    return `
        <span id="${this.sliderData.minTextId}" 
          ${currMin === 0 ? 'style="display: none;"' : ''}>${this.sliderData.additionalSymbol}${currMin}</span>
        ${currMin === 0 ? '<span style="width: 100%; text-align: center;">Products Not Found</span>' : ''}
        <span id="${this.sliderData.maxTextId}" 
          ${currMin === 0 ? 'style="display: none;"' : ''}>${this.sliderData.additionalSymbol}${currMax}</span>
      </div>
      <div class="products__range">
        <input type="range" min="${this.sliderData.range.min}" max="${this.sliderData.range.max}" value="${
      currMin > 0 ? currMin : this.sliderData.range.min
    }"
        style="${this.createBackground(currMin, currMax)}"
        id="${this.sliderData.minInputId}">
        <input type="range" min="${this.sliderData.range.min}" max="${this.sliderData.range.max}" value="${
      currMax > 0 ? currMax : this.sliderData.range.min
    }" id="${this.sliderData.maxInputId}">
    `;
  }

  protected createBackground(currMin: number, currMax: number): string {
    return `
    background: linear-gradient(to right,
      rgb(129 127 124) 0%,
      rgb(129 127 124) ${
        ((currMin - this.sliderData.range.min) / (this.sliderData.range.max - this.sliderData.range.min)) * 100
      }%,
      rgb(0 171 132) ${
        ((currMin - this.sliderData.range.min) / (this.sliderData.range.max - this.sliderData.range.min)) * 100
      }%,
      rgb(0 171 132) ${
        ((currMax - this.sliderData.range.min) / (this.sliderData.range.max - this.sliderData.range.min)) * 100
      }%,
      rgb(129 127 124) ${
        ((currMax - this.sliderData.range.min) / (this.sliderData.range.max - this.sliderData.range.min)) * 100
      }%,
      rgb(129 127 124) 100%) no-repeat center;
      background-size: 100% 2px;
    `;
  }

  listener(): void {
    const lowerSlider = document.querySelector(`#${this.sliderData.minInputId}`) as HTMLInputElement;
    const upperSlider = document.querySelector(`#${this.sliderData.maxInputId}`) as HTMLInputElement;
    let lowerVal: number = parseInt(lowerSlider.value);
    let upperVal: number = parseInt(upperSlider.value);
    const labelMin: HTMLElement | null = document.querySelector(`#${this.sliderData.minTextId}`);
    const labelMax: HTMLElement | null = document.querySelector(`#${this.sliderData.maxTextId}`);

    const num: number = this.sliderData.correctionNumber;
    const symbol: string = this.sliderData.additionalSymbol ? this.sliderData.additionalSymbol : '';

    upperSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (upperVal < lowerVal + num) {
        lowerSlider.value = (upperVal - num).toString();
        if (labelMin) labelMin.innerText = `${symbol}${+lowerSlider.value + num}`;

        if (lowerVal === +lowerSlider.min) {
          upperSlider.value = (lowerVal + num).toString();
          if (labelMin) labelMin.innerText = `${symbol}${lowerSlider.value}`;
        }
      } else {
        if (labelMin) labelMin.innerText = `${symbol}${lowerSlider.value}`;
      }
      if (labelMax) labelMax.innerText = `${symbol}${upperVal}`;

      lowerSlider.setAttribute('style', this.createBackground(+lowerSlider.value, upperVal));
    };

    upperSlider.onchange = () => {
      app.controller.setActualState(
        this.sliderData.maxInputId,
        (labelMax as HTMLElement).innerText.replace(`${symbol}`, '')
      );
      app.controller.setActualState(
        this.sliderData.minInputId,
        (labelMin as HTMLElement).innerText.replace(`${symbol}`, '')
      );
    };

    lowerSlider.oninput = () => {
      lowerVal = parseInt(lowerSlider.value);
      upperVal = parseInt(upperSlider.value);

      if (lowerVal > upperVal - num) {
        upperSlider.value = (lowerVal + num).toString();
        if (labelMax) labelMax.innerText = `${symbol}${+upperSlider.value - num}`;

        if (upperVal === +upperSlider.max) {
          lowerSlider.value = `${parseInt(upperSlider.max) - num}`;
          if (labelMax) labelMax.innerText = `${symbol}${upperSlider.value}`;
        }
      } else {
        if (labelMax) labelMax.innerText = `${symbol}${upperSlider.value}`;
      }
      if (labelMin) labelMin.innerText = `${symbol}${lowerVal}`;
      lowerSlider.setAttribute('style', this.createBackground(lowerVal, +upperSlider.value));
    };

    lowerSlider.onchange = () => {
      app.controller.setActualState(
        this.sliderData.maxInputId,
        (labelMax as HTMLElement).innerText.replace(`${symbol}`, '')
      );
      app.controller.setActualState(
        this.sliderData.minInputId,
        (labelMin as HTMLElement).innerText.replace(`${symbol}`, '')
      );
    };
  }
}
