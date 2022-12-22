import { DEFAULT_STATE } from '../../state/State';
import { FilterCheckbox } from './FilterCheckbox';

export class LightFilter extends FilterCheckbox {
  private getFindCount(light: string): number {
    return this.products.filter((prod) => prod.light === light).length;
  }

  render(): string {
    this.getFilterState(DEFAULT_STATE.filters.light);
    return `
      <legend class="products__filter-heading">Light</legend>
      <label class="label">
        <input type="checkbox" class="checkbox" value="bright"
        ${this.isChecked('bright') ? ' checked' : ''}
        ${this.getFindCount('bright') === 0 ? 'disabled' : ''}>
        Bright Direct <span>(${this.getFindCount('bright')}/12)</span>
      </label>
      <label class="label">
        <input type="checkbox" class="checkbox" value="medium"
        ${this.isChecked('medium') ? ' checked' : ''}
        ${this.getFindCount('medium') === 0 ? 'disabled' : ''}>
        Bright-Medium Indirect <span>(${this.getFindCount('medium')}/7)</span>
      </label>
      <label class="label">
        <input type="checkbox" class="checkbox" value="light"
        ${this.isChecked('light') ? ' checked' : ''}
        ${this.getFindCount('light') === 0 ? 'disabled' : ''}>
        Low Light <span>(${this.getFindCount('light')}/5)</span>
      </label>`;
  }
}
