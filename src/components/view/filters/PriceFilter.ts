import { DualSlider } from '../../../types/interfaces';
import { ACTUAL_STATE, DEFAULT_STATE } from '../../state/State';
import { FilterDualSlider } from './FilterDualSlider';

export const priceFilterData: DualSlider = {
  range: {
    min: DEFAULT_STATE.products.sort((a, b) => a.price - b.price)[0].price,
    max: DEFAULT_STATE.products.sort((a, b) => a.price - b.price)[DEFAULT_STATE.products.length - 1].price,
  },
  minTextId: 'price-min-text',
  maxTextId: 'price-max-text',
  minInputId: 'price-min',
  maxInputId: 'price-max',
  correctionNumber: 4,
  additionalSymbol: '$ ',
};

export class PriceFilter extends FilterDualSlider {
  private getState(): void {
    this.products = ACTUAL_STATE.products.sort((a, b) => a.price - b.price);
  }

  render(): string {
    this.getState();
    const currMin: number = this.products.length > 0 ? this.products[0].price : 0;
    const currMax: number = this.products.length > 0 ? this.products[this.products.length - 1].price : 0;
    return `
      <legend class="products__filter-heading">Price</legend>
      <div class="products__price-min-max">
        ${this.createSlider(currMin, currMax)}
      </div>
    `;
  }
}
