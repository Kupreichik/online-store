import { DEFAULT_STATE } from '../../state/State';
import { FilterCheckbox } from './FilterCheckbox';

const categoryFilterData: [string, string, number][] = [
  ['tabletop', 'Tabletop Plants', 17],
  ['large', 'Large', 5],
  ['easy-care', 'Easy Care', 10],
  ['pet-friendly', 'Pet Friendly', 11],
  ['air-purifying', 'Air Purifying', 8],
];

export class CategoryFilter extends FilterCheckbox {
  getFindCount(category: string): number {
    return this.products.filter((prod) => prod.category.includes(category)).length;
  }

  render(): string {
    this.getFilterState(DEFAULT_STATE.filters.category);
    return `
        <legend class="products__filter-heading">Category</legend>
        ${categoryFilterData.reduce((acc, data) => acc + this.createCategory(...data), '')}
    `;
  }
}
