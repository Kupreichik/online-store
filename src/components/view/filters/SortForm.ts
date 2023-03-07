import { app } from '../../../index';
import { SortKind } from '../../../types/types';
import { STATE, DEFAULT_STATE } from '../../state/State';

export class SortForm {
  sort: SortKind = DEFAULT_STATE.sortIndex;

  private getState(): void {
    this.sort = STATE.sortIndex;
  }

  private createOption(): string {
    let string = '';
    const sortOptions = Object.values(SortKind);

    for (const option of sortOptions) {
      string += `
      <option class="products__sort-option" value="${option}" ${
        this.sort === option ? 'selected' : ''
      }>${option}</option>
      `;
    }
    return string;
  }

  render(): string {
    this.getState();
    return `
      <form class="products__sort-form">
        <fieldset class="products__sort-fieldset">
          <legend>Sort By: </legend>
          <select name="sort" class="products__sort-select">
          ${this.createOption()}
          </select>
        </fieldset>
      </form>
    `;
  }

  listener(): void {
    const selectEl = document.querySelector('.products__sort-select') as HTMLSelectElement;
    selectEl.onchange = () => app.controller.appStateControl('sort', selectEl.value);
  }
}
