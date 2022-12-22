import { DEFAULT_STATE } from '../../state/State';
import { CategoryFilter } from '../filters/CategoryFiter';
import { LightFilter } from '../filters/LightFilter';

export class Main {
  categoryFilter: CategoryFilter = new CategoryFilter(DEFAULT_STATE.filters.category);
  lightFilter: LightFilter = new LightFilter(DEFAULT_STATE.filters.light);

  render(): string {
    return `
        <div class="products__top">
          <div class="products__top_left">
            <h2 class="products__heading">Live Plants</h2>
            <p class="products__text">All our plants are guaranteed to arrive happy & healthy. It’s our customer happiness
              guarantee!</p>
          </div>
          <div class="products__top_right">
            <form class="products__search-form">
              <input class="products__search-input" type="text" placeholder="Quick Search...">
            </form>
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
              <legend class="products__filter-heading">Price</legend>
              <div class="products__price-min-max">
                <span>$ 27</span><span>$ 168</span>
              </div>
              <div class="products__range">
                <input type="range" min="27" max="168" value="27" id="price-min">
                <input type="range" min="27" max="168" value="168" id="price-max">
              </div>
            </fieldset>
            <fieldset class="products__filters-set">
              <legend class="products__filter-heading">Stock</legend>
              <div class="products__stock-min-max">
                <span>1</span><span>38</span>
              </div>
              <div class="products__range">
                <input type="range" min="1" max="38" value="1" id="price-min">
                <input type="range" min="1" max="38" value="38" id="price-max">
              </div>
            </fieldset>
          </form>
          <div class="products__container"></div>
        </div>`;
  }
}
