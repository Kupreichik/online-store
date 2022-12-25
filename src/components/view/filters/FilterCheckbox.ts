import { Product } from '../../../types/interfaces';
import { DEFAULT_STATE } from '../../state/State';

export abstract class FilterCheckbox {
  filters: string[];
  products: Product[];

  constructor(statFilters: string[]) {
    this.filters = statFilters;
    this.products = DEFAULT_STATE.products;
  }

  protected getFilterState(statFilters: string[]): void {
    this.filters = statFilters;
    this.products = DEFAULT_STATE.products;
  }

  protected isChecked(category: string): boolean {
    return this.filters.includes(category);
  }

  abstract getFindCount(value: string): number;

  protected createCategory(value: string, name: string, count: number): string {
    return `
      <label class="label">
        <input type="checkbox" class="checkbox" value="${value}"
        ${this.isChecked(value) ? ' checked' : ''}
        ${this.getFindCount(value) === 0 ? 'disabled' : ''}>
        ${name} <span>(${this.getFindCount(value)}/${count})</span>
      </label>
    `;
  }
}
