import { app } from '../../../index';
import { SortKind } from '../../../types/types';
import { ACTUAL_STATE, DEFAULT_STATE } from '../../state/State';

export class SortForm {
  sort: number = DEFAULT_STATE.sortIndex;

  private getState(): void {
    this.sort = ACTUAL_STATE.sortIndex;
  }

  private createOption(optsCount: number): string {
    let string = '';
    for (let i = 0; i < optsCount; i += 1) {
      string += `
      <option class="products__sort-option" value="${SortKind[i]}" ${
        SortKind[this.sort] === SortKind[i] ? 'selected' : ''
      }>${SortKind[i]}</option>
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
          ${this.createOption(5)}
          </select>
        </fieldset>
      </form>
    `;
  }

  listener(): void {
    const selectEl = document.querySelector('.products__sort-select') as HTMLSelectElement;
    selectEl.onchange = () => {
      app.controller.setActualState('sort', `${selectEl.selectedIndex}`);
    };
  }
}
