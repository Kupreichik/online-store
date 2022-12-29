import { Product } from '../../../types/interfaces';
import { STATE, DEFAULT_STATE } from '../../state/State';

export abstract class FilterCheckbox {
  filters: string[];
  products: Product[];

  constructor(statFilters: string[]) {
    this.filters = statFilters;
    this.products = DEFAULT_STATE.products;
  }

  protected getFilterState(statFilters: string[]): void {
    this.filters = statFilters;
    this.products = STATE.products;
  }

  protected isChecked(value: string): boolean {
    return this.filters.includes(value);
  }

  abstract getFindCount(value: string): number;

  protected createCategory(selector: string, value: string, name: string, count: number): string {
    return `
      <label class="label">
        <input type="checkbox" class="checkbox ${selector}" value="${value}"
        ${this.isChecked(value) ? ' checked' : ''}
        ${this.getFindCount(value) === 0 ? 'disabled' : ''}>
        ${name} <span>(${this.getFindCount(value)}/${count})</span>
      </label>
    `;
  }
}
