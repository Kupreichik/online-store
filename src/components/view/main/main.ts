import { DEFAULT_STATE } from '../../state/State';
import { CategoryFilter } from '../filters/CategoryFiter';
import { LightFilter } from '../filters/LightFilter';
import { PriceFilter } from '../filters/PriceFilter';
import { SearchFilter } from '../filters/SearchFilter';
import { StockFilter } from '../filters/StockFilter';

export class Main {
  categoryFilter: CategoryFilter = new CategoryFilter(DEFAULT_STATE.filters.category);
  lightFilter: LightFilter = new LightFilter(DEFAULT_STATE.filters.light);
  priceFilter: PriceFilter = new PriceFilter();
  stockFilter: StockFilter = new StockFilter();
  search: SearchFilter = new SearchFilter();

  render(): string {
    return `
        <div class="products__top">
          <div class="products__top_left">
            <h2 class="products__heading">Live Plants</h2>
            <p class="products__text">All our plants are guaranteed to arrive happy & healthy. It’s our customer happiness
              guarantee!</p>
          </div>
          <div class="products__top_right">
            ${this.search.render()}
            <div class="products__sort-wrapper">
              <form class="products__sort-form">
                <fieldset class="products__sort-fieldset">
                  <legend>Sort By: </legend>
                  <select name="sort" class="products__sort-select">
                    <option class="products__sort-option" value="0">Most Popular</option>
                    <option class="products__sort-option" value="1">Alphabet A - Z</option>
                    <option class="products__sort-option" value="2">Alphabet Z - A</option>
                    <option class="products__sort-option" value="3">$ Low to High</option>
                    <option class="products__sort-option" value="4">$ High to Low</option>
                  </select>
                </fieldset>
              </form>
              <div class="products__sort-btns">
                <div class="products__sort-tile ${DEFAULT_STATE.sortView === 'tile' ? 'checked' : ''}"></div>
                <div class="products__sort-list ${DEFAULT_STATE.sortView === 'list' ? 'checked' : ''}"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="products__found">
          Found: <span>${DEFAULT_STATE.products.length}</span>
        </div>
        <div class="products__bottom">
          <form class="products__filters">
            <div class="products__btns-wrapper">
              <button class="products__filter-btn btn">Reset Filters</button>
              <button class="products__filter-btn btn">Copy Link</button>
            </div>
            <fieldset class="products__filters-set">
              ${this.categoryFilter.render()}
            </fieldset>
            <fieldset class="products__filters-set">
              ${this.lightFilter.render()}
            </fieldset>
            <fieldset class="products__filters-set">
              ${this.priceFilter.render()}
            </fieldset>
            <fieldset class="products__filters-set">
              ${this.stockFilter.render()}
            </fieldset>
          </form>
          <div class="products__container"></div>
        </div>`;
  }

  setListeners(): void {
    this.priceFilter.listener();
    this.stockFilter.listener();
  }
}
