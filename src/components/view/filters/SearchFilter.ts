import { DEFAULT_STATE } from '../../state/State';

export class SearchFilter {
  search: string = DEFAULT_STATE.filters.search;

  private getState(): void {
    this.search = DEFAULT_STATE.filters.search;
  }

  render(): string {
    this.getState();
    return `
      <form class="products__search-form">
        <input class="products__search-input" type="text" placeholder="Quick Search..."
        ${this.search ? 'value="' + this.search + '"' : ''}>
      </form>
    `;
  }
}
