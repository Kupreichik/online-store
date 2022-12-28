import { app } from '../../../index';
import { STATE, DEFAULT_STATE } from '../../state/State';

export class SearchFilter {
  search: string = DEFAULT_STATE.filters.search;

  private getState(): void {
    this.search = STATE.filters.search;
  }

  render(): string {
    this.getState();
    return `
      <form class="products__search-form">
        <input class="products__search-input 
        ${this.search !== '' ? 'search-active' : ''}" type="text" placeholder="Quick Search..."
        ${this.search ? 'value="' + this.search + '"' : ''}>
      </form>
    `;
  }

  listener(): void {
    const el = document.querySelector('.products__search-input') as HTMLInputElement;
    if (this.search !== '') {
      el.focus();
      el.selectionStart = el.value.length;
    }
    el.oninput = () => {
      app.controller.setActualState('search', el.value);
    };
  }
}
