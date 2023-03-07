import { app } from '../../../index';
import { STATE } from '../../state/State';
import { FilterCheckbox } from './FilterCheckbox';

const categoryFilterData: [string, string, string, number][] = [
  ['category', 'tabletop', 'Tabletop Plants', 17],
  ['category', 'large', 'Large', 5],
  ['category', 'easy-care', 'Easy Care', 10],
  ['category', 'pet-friendly', 'Pet Friendly', 11],
  ['category', 'air-purifying', 'Air Purifying', 8],
];

export class CategoryFilter extends FilterCheckbox {
  getFindCount(category: string): number {
    return this.products.filter((prod) => prod.category.includes(category)).length;
  }

  render(): string {
    this.getFilterState(STATE.filters.category);
    return `
        <legend class="products__filter-heading">Category</legend>
        ${categoryFilterData.reduce((acc, data) => acc + this.createCategory(...data), '')}
    `;
  }

  listener(): void {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.category');
    inputs.forEach((el) => (el.oninput = () => app.controller.appStateControl('category', el.value)));
  }
}
