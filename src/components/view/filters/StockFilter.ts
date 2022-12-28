import { DualSlider } from '../../../types/interfaces';
import { STATE, DEFAULT_STATE } from '../../state/State';
import { FilterDualSlider } from './FilterDualSlider';

export const stockFilterData: DualSlider = {
  range: {
    min: DEFAULT_STATE.products.sort((a, b) => a.stock - b.stock)[0].stock,
    max: DEFAULT_STATE.products.sort((a, b) => a.stock - b.stock)[DEFAULT_STATE.products.length - 1].stock,
  },
  minTextId: 'stock-min-text',
  maxTextId: 'stock-max-text',
  minInputId: 'stock-min',
  maxInputId: 'stock-max',
  correctionNumber: 1,
  additionalSymbol: '',
};

export class StockFilter extends FilterDualSlider {
  private getState(): void {
    this.products = STATE.products.sort((a, b) => a.stock - b.stock);
  }

  render(): string {
    this.getState();
    const curMmin: number = this.products.length > 0 ? this.products[0].stock : 0;
    const curMmax: number = this.products.length > 0 ? this.products[this.products.length - 1].stock : 0;
    return `
      <legend class="products__filter-heading">Stock</legend>
      <div class="products__stock-min-max">
        ${this.createSlider(curMmin, curMmax)}
      </div>
    `;
  }
}
