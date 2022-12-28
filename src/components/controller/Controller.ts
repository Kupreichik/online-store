/* eslint-disable no-case-declarations */
import { productsData } from '../../data/products';
import { app } from '../../index';
import { Product } from '../../types/interfaces';
import { SortKind, SortView } from '../../types/types';
import { STATE, DEFAULT_STATE } from '../state/State';

export class Controller {
  setActualState(key: string, value: string, isRerender = true): void {
    switch (key) {
      case 'category':
        this.setStateAtArr(STATE.filters.category, key, value);
        break;

      case 'light':
        this.setStateAtArr(STATE.filters.light, key, value);
        break;

      case 'price-min':
        STATE.filters.price.min = parseInt(value);
        this.setSearchParams(key, value);
        break;

      case 'price-max':
        STATE.filters.price.max = parseInt(value);
        this.setSearchParams(key, value);
        break;

      case 'stock-min':
        STATE.filters.stock.min = parseInt(value);
        this.setSearchParams(key, value);
        break;

      case 'stock-max':
        STATE.filters.stock.max = parseInt(value);
        this.setSearchParams(key, value);
        break;

      case 'sort':
        STATE.sortIndex = value as SortKind;
        this.setSearchParams(key, value);
        break;

      case 'search':
        STATE.filters.search = value;
        this.setSearchParams(key, value);
        break;

      case 'sortView':
        STATE.sortView = value as SortView;
        this.setSearchParams(key, value);
        break;
    }
    STATE.products = this.productFilter();
    if (isRerender) {
      app.router.resolveRoute();
    }
  }

  private productFilter(): Product[] {
    const { search, category, price, stock, light } = STATE.filters;
    const products: Product[] = productsData
      .filter((prod) =>
        search === ''
          ? true
          : [prod.title, prod.description, prod.price.toString(), prod.stock.toString(), ...prod.category].some((str) =>
              str.toLowerCase().match(new RegExp(search, 'gui'))
            )
      )
      .filter((prod) => category.every((ctgr) => prod.category.includes(ctgr)))
      .filter((prod) => (light.length === 0 ? true : light.some((lgt) => prod.light === lgt)))
      .filter((prod) => prod.price >= price.min && prod.price <= price.max)
      .filter((prod) => prod.stock >= stock.min && prod.stock <= stock.max);
    return products;
  }

  resetFilters(): void {
    STATE.filters = structuredClone(DEFAULT_STATE.filters);
    STATE.products = this.productFilter();
    this.resetFilterParams();
    app.router.resolveRoute();
  }

  private resetFilterParams(): void {
    const url: URL = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('sort', STATE.sortIndex.toString());
    url.searchParams.set('sortView', STATE.sortView);
    window.history.pushState(STATE, '', url.toString());
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
        values.split('%2C').map((val) => {
          val = decodeURIComponent(val);
          this.setActualState(key, val.replace(/\+/gi, ' '), false);
        });
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

  private setStateAtArr(arr: string[], key: string, value: string): void {
    if (arr.includes(value)) {
      arr.splice(arr.indexOf(value), 1);
    } else {
      arr.push(value);
    }
    this.setSearchParams(key, arr.toString());
  }
}
