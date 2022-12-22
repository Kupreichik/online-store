import { DEFAULT_STATE } from '../../state/State';
import { FilterCheckbox } from './FilterCheckbox';

export class CategoryFilter extends FilterCheckbox {
  private getFindCount(category: string): number {
    return this.products.filter((prod) => prod.category.includes(category)).length;
  }

  render(): string {
    this.getFilterState(DEFAULT_STATE.filters.category);
    return `
        <legend class="products__filter-heading">Category</legend>
      <label class="label">
        <input type="checkbox" class="checkbox" value="tabletop"
        ${this.isChecked('tabletop') ? ' checked' : ''}
        ${this.getFindCount('tabletop') === 0 ? 'disabled' : ''}
        >
        Tabletop Plants <span>(${this.getFindCount('tabletop')}/17)</span>
      </label>
      <label class="label">
        <input type="checkbox" class="checkbox" value="large"
        ${this.isChecked('large') ? ' checked' : ''}
        ${this.getFindCount('large') === 0 ? 'disabled' : ''}>
        Large Plants <span>(${this.getFindCount('large')}/5)</span>
      </label>
      <label class="label">
        <input type="checkbox" class="checkbox" value="easy-care"
        ${this.isChecked('easy-care') ? ' checked' : ''}
        ${this.getFindCount('easy-care') === 0 ? 'disabled' : ''}>
        Easy Care <span>(${this.getFindCount('easy-care')}/10)</span>
      </label>
      <label class="label">
        <input type="checkbox" class="checkbox" value="pet-friendly"
        ${this.isChecked('pet-friendly') ? ' checked' : ''}
        ${this.getFindCount('pet-friendly') === 0 ? 'disabled' : ''}>
        Pet Friendly <span>(${this.getFindCount('pet-friendly')}/11)</span>
      </label>
      <label class="label">
        <input type="checkbox" class="checkbox" value="air-purifying"
        ${this.isChecked('air-purifying') ? ' checked' : ''}
        ${this.getFindCount('air-purifying') === 0 ? 'disabled' : ''}>
        Air Purifying <span>(${this.getFindCount('air-purifying')}/8)</span>
      </label>`;
  }
}
