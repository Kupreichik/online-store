/* eslint-disable no-case-declarations */
import { productsData } from '../../data/products';
import { app } from '../../index';
import { AppState, Product } from '../../types/interfaces';
import { ACTUAL_STATE, DEFAULT_STATE } from '../state/State';

export class Controller {
  setActualState(key: string, value: string, isRerender = true): void {
    switch (key) {
      case 'category':
        const arrCtg: string[] = ACTUAL_STATE.filters.category;
        if (arrCtg.includes(value)) {
          arrCtg.splice(arrCtg.indexOf(value), 1);
        } else {
          arrCtg.push(value);
        }
        this.setSearchParams(key, arrCtg.toString());
        break;

      case 'light':
        const arrLgt: string[] = ACTUAL_STATE.filters.light;
        if (arrLgt.includes(value)) {
          arrLgt.splice(arrLgt.indexOf(value), 1);
        } else {
          arrLgt.push(value);
        }
        this.setSearchParams(key, arrLgt.toString());
        break;

      case 'price-min':
        ACTUAL_STATE.filters.price.min = parseInt(value);
        this.setSearchParams(key, ACTUAL_STATE.filters.price.min.toString());
        break;

      case 'price-max':
        ACTUAL_STATE.filters.price.max = parseInt(value);
        this.setSearchParams(key, ACTUAL_STATE.filters.price.max.toString());
        break;

      case 'stock-min':
        ACTUAL_STATE.filters.stock.min = parseInt(value);
        this.setSearchParams(key, ACTUAL_STATE.filters.stock.min.toString());
        break;

      case 'stock-max':
        ACTUAL_STATE.filters.stock.max = parseInt(value);
        this.setSearchParams(key, ACTUAL_STATE.filters.stock.max.toString());
        break;

      case 'sort':
        ACTUAL_STATE.sortIndex = parseInt(value);
        this.setSearchParams(key, ACTUAL_STATE.sortIndex.toString());
        break;

      case 'search':
        ACTUAL_STATE.filters.search = value;
        this.setSearchParams(key, ACTUAL_STATE.filters.search);
        break;

      case 'sortView':
        ACTUAL_STATE.sortView = value as 'tile' | 'list';
        this.setSearchParams(key, ACTUAL_STATE.sortView);
        break;
    }
    ACTUAL_STATE.products = this.productFilter();
    if (isRerender) {
      app.router.resolveRoute();
    }
  }

  private productFilter(): Product[] {
    const products: Product[] = productsData
      .filter((prod) =>
        ACTUAL_STATE.filters.search === ''
          ? true
          : [prod.title, prod.description, prod.price.toString(), prod.stock.toString(), ...prod.category].some((str) =>
              str.toLowerCase().match(new RegExp(ACTUAL_STATE.filters.search, 'gui'))
            )
      )
      .filter((prod) => ACTUAL_STATE.filters.category.every((ctgr) => prod.category.includes(ctgr)))
      .filter((prod) =>
        ACTUAL_STATE.filters.light.length === 0 ? true : ACTUAL_STATE.filters.light.some((lgt) => prod.light === lgt)
      )
      .filter((prod) => prod.price >= ACTUAL_STATE.filters.price.min && prod.price <= ACTUAL_STATE.filters.price.max)
      .filter((prod) => prod.stock >= ACTUAL_STATE.filters.stock.min && prod.stock <= ACTUAL_STATE.filters.stock.max);
    return products;
  }

  resetFilters(): void {
    const defState: AppState = JSON.parse(JSON.stringify(DEFAULT_STATE));
    ACTUAL_STATE.filters = defState.filters;
    ACTUAL_STATE.products = this.productFilter();
    this.resetFilterParams();
    app.router.resolveRoute();
  }

  private resetFilterParams(): void {
    const url: URL = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('sort', ACTUAL_STATE.sortIndex.toString());
    url.searchParams.set('sortView', ACTUAL_STATE.sortView);
    window.history.pushState(ACTUAL_STATE, '', url.toString());
  }

  private setSearchParams(key: string, values: string): void {
    const url: URL = new URL(window.location.href);
    url.searchParams.set(key, values);
    window.history.pushState(null, '', url.toString());
    this.setLinkHref();
  }

  syncState(): void {
    if (window.location.search.replace('?', '') !== '') {
      const state: string[][] = window.location.search
        .replace('?', '')
        .split('&')
        .map((el) => el.split('='));
      state.map(([key, values]) => {
        values.split('%2C').map((val) => this.setActualState(key, val, false));
      });
      this.setLinkHref();
    }
  }

  setLinkHref(): void {
    document.querySelector('.header__logo-link')?.setAttribute('href', window.location.search + '#/');
    document.querySelector('.header__cart-btn')?.setAttribute('href', window.location.search + '#/cart/');
  }

  copyToClipboard(e: Event) {
    const milliseconds = 700;
    navigator.clipboard.writeText(window.location.href).then(() => {
      const el = e.target as HTMLElement;
      el.textContent = 'Copied!';
      setTimeout(() => (el.textContent = 'Copy Link'), milliseconds);
    });
  }
}
