import { app } from '../../../index';
import { STATE } from '../../state/State';
import { FilterCheckbox } from './FilterCheckbox';

const lightFilterData: [string, string, string, number][] = [
  ['light', 'bright', 'Bright Direct', 12],
  ['light', 'medium', 'Bright-Medium Indirect', 7],
  ['light', 'light', 'Low Light', 5],
];

export class LightFilter extends FilterCheckbox {
  getFindCount(light: string): number {
    return this.products.filter((prod) => prod.light === light).length;
  }

  render(): string {
    this.getFilterState(STATE.filters.light);
    return `
      <legend class="products__filter-heading">Light</legend>
      ${lightFilterData.reduce((acc, data) => acc + this.createCategory(...data), '')}
      `;
  }

  listener(): void {
    const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll('.light');
    inputs.forEach((el) => (el.oninput = () => app.controller.appStateControl('light', el.value)));
  }
}
