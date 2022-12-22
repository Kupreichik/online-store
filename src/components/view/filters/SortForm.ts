import { DEFAULT_STATE } from '../../state/State';

export class SortForm {
  sort: number = DEFAULT_STATE.sortIndex;

  private getState(): void {
    this.sort = DEFAULT_STATE.sortIndex;
  }

  render(): string {
    this.getState();
    return `
      <form class="products__sort-form">
        <fieldset class="products__sort-fieldset">
          <legend>Sort By: </legend>
          <select name="sort" class="products__sort-select">
            <option class="products__sort-option" value="0" ${this.sort === 0 ? 'selected' : ''}>Most Popular</option>
            <option class="products__sort-option" value="1" ${this.sort === 1 ? 'selected' : ''}>Alphabet A - Z</option>
            <option class="products__sort-option" value="2" ${this.sort === 2 ? 'selected' : ''}>Alphabet Z - A</option>
            <option class="products__sort-option" value="3" ${this.sort === 3 ? 'selected' : ''}>$ Low to High</option>
            <option class="products__sort-option" value="4" ${this.sort === 4 ? 'selected' : ''}>$ High to Low</option>
          </select>
        </fieldset>
      </form>
    `;
  }
}
