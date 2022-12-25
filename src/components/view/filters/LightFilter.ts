import { DEFAULT_STATE } from '../../state/State';
import { FilterCheckbox } from './FilterCheckbox';

const lightFilterData: [string, string, number][] = [
  ['bright', 'Bright Direct', 12],
  ['medium', 'Bright-Medium Indirect', 7],
  ['light', 'Low Light', 5],
];

export class LightFilter extends FilterCheckbox {
  getFindCount(light: string): number {
    return this.products.filter((prod) => prod.light === light).length;
  }

  render(): string {
    this.getFilterState(DEFAULT_STATE.filters.light);
    return `
      <legend class="products__filter-heading">Light</legend>
      ${lightFilterData.reduce((acc, data) => acc + this.createCategory(...data), '')}
      `;
  }
}
