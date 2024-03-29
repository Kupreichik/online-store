import { app } from '../../../index';
import { STATE } from '../../state/State';
import { CategoryFilter } from '../filters/CategoryFiter';
import { LightFilter } from '../filters/LightFilter';
import { PriceFilter, priceFilterData } from '../filters/PriceFilter';
import { SearchFilter } from '../filters/SearchFilter';
import { SortForm } from '../filters/SortForm';
import { StockFilter, stockFilterData } from '../filters/StockFilter';
import { mainCards } from './mainCards';

export class Main {
  categoryFilter: CategoryFilter = new CategoryFilter(STATE.filters.category);
  lightFilter: LightFilter = new LightFilter(STATE.filters.light);
  priceFilter: PriceFilter = new PriceFilter(priceFilterData);
  stockFilter: StockFilter = new StockFilter(stockFilterData);
  search: SearchFilter = new SearchFilter();
  sortForm: SortForm = new SortForm();
  cards: mainCards = new mainCards();

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
              ${this.sortForm.render()}
              <div class="products__sort-btns">
                <div class="products__sort-tile ${STATE.sortView === 'tile' ? 'checked' : ''}"></div>
                <div class="products__sort-list ${STATE.sortView === 'list' ? 'checked' : ''}"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="products__found">
          Found: <span>${STATE.products.length}</span>
        </div>
        <div class="products__bottom">
          <form class="products__filters">
            <div class="products__btns-wrapper">
              <button type="button" class="products__filter-btn btn" id="reset-btn">Reset Filters</button>
              <button type="button" class="products__filter-btn btn" id="copy-link-btn">Copy Link</button>
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
          ${STATE.products.length === 0 ? '<p class="products__no-res">No Results</p>' : ''}
          <div class="products__container ${STATE.sortView}">${this.cards.render()}</div>
        </div>`;
  }

  setListeners(): void {
    this.search.listener();
    this.priceFilter.listener();
    this.stockFilter.listener();
    this.categoryFilter.listener();
    this.lightFilter.listener();
    this.lightFilter.listener();
    this.sortForm.listener();
    this.cards.listener();

    const copyBtn = document.querySelector('#copy-link-btn') as HTMLButtonElement;
    copyBtn.onclick = (e) => {
      app.controller.copyToClipboard(e);
    };

    const resBtn = document.querySelector('#reset-btn') as HTMLButtonElement;
    resBtn.onclick = () => {
      app.controller.resetFilters();
    };

    const tileBtn = document.querySelector('.products__sort-tile') as HTMLElement;
    tileBtn.onclick = () => app.controller.appStateControl('sortView', 'tile');

    const listBtn = document.querySelector('.products__sort-list') as HTMLElement;
    listBtn.onclick = () => app.controller.appStateControl('sortView', 'list');
  }
}
