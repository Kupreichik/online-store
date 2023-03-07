import { app } from '../../index';
import * as appState from '../state/appState';
import { STATE, DEFAULT_STATE } from '../state/State';

export class Controller {
  appStateControl(key: string, value: string, isRerender = true) {
    appState.setActualState(key, value);
    if (key === 'cart') {
      this.setHeaderCart();
    } else {
      if (key === 'category') value = STATE.filters.category.toString();
      if (key === 'light') value = STATE.filters.light.toString();
      this.setSearchParams(key, value);
    }
    if (isRerender) {
      app.router.resolveRoute();
    }
  }

  resetFilters(): void {
    STATE.filters = structuredClone(DEFAULT_STATE.filters);
    STATE.products = appState.productFilter();
    this.resetFilterParams();
    app.router.resolveRoute();
  }

  private resetFilterParams(): void {
    const url: URL = new URL(window.location.href);
    url.search = '';
    url.searchParams.set('sort', STATE.sortIndex.toString());
    url.searchParams.set('sortView', STATE.sortView);
    window.history.replaceState(STATE, '', url.toString());
  }

  setSearchParams(key: string, values: string): void {
    const url: URL = new URL(window.location.href);
    url.searchParams.set(key, values);
    window.history.replaceState(null, '', url.toString());
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
          appState.setActualState(key, val.replace(/\+/gi, ' '));
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

  setHeaderCart(): void {
    (document.querySelector('.header__total-price') as HTMLElement).innerText =
      STATE.cartPromocode.length > 0 ? `${appState.getSumPriceWithPromo()}$` : `${appState.getSumPrice()}$`;
    (document.querySelector('.header__cart-count') as HTMLElement).innerText = `(${appState.getAmountCart()})`;
  }

  setLocalStorage(): void {
    localStorage.setItem('cartProducts', JSON.stringify(STATE.cartProducts));
    localStorage.setItem('cartPromocode', JSON.stringify(STATE.cartPromocode));
  }

  getLocalStorage(): void {
    if (localStorage.getItem('cartProducts')) {
      STATE.cartProducts = JSON.parse(localStorage.getItem('cartProducts') as string);
    }
    if (localStorage.getItem('cartPromocode')) {
      STATE.cartPromocode = JSON.parse(localStorage.getItem('cartPromocode') as string);
    }
    this.setHeaderCart();
  }
}
