/* eslint-disable no-case-declarations */
import { productsData } from '../../data/products';
import { app } from '../../index';
import { Product } from '../../types/interfaces';
import { ACTUAL_STATE, DEFAULT_STATE } from '../state/State';

export class Controller {
  setActualState(key: string, value: string): void {
    switch (key) {
      case 'category':
        const arrCtg: string[] = ACTUAL_STATE.filters.category;
        if (arrCtg.includes(value)) {
          arrCtg.splice(arrCtg.indexOf(value), 1);
        } else {
          arrCtg.push(value);
        }
        break;

      case 'light':
        const arrLgt: string[] = ACTUAL_STATE.filters.light;
        if (arrLgt.includes(value)) {
          arrLgt.splice(arrLgt.indexOf(value), 1);
        } else {
          arrLgt.push(value);
        }
        break;

      case 'price-min':
        ACTUAL_STATE.filters.price.min = parseInt(value);
        break;

      case 'price-max':
        ACTUAL_STATE.filters.price.max = parseInt(value);
        break;

      case 'stock-min':
        ACTUAL_STATE.filters.stock.min = parseInt(value);
        break;

      case 'stock-max':
        ACTUAL_STATE.filters.stock.max = parseInt(value);
        break;

      case 'sort':
        ACTUAL_STATE.sortIndex = parseInt(value);
        break;

      case 'search':
        ACTUAL_STATE.filters.search = value;
        break;

      case 'reset':
        this.resetFilters();
        break;
    }
    ACTUAL_STATE.products = this.productFilter();
    app.router.resolveRoute();
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

  private resetFilters(): void {
    ACTUAL_STATE.filters.category = [];
    ACTUAL_STATE.filters.light = [];
    ACTUAL_STATE.filters.search = '';
    ACTUAL_STATE.filters.price.min = DEFAULT_STATE.filters.price.min;
    ACTUAL_STATE.filters.price.max = DEFAULT_STATE.filters.price.max;
    ACTUAL_STATE.filters.stock.min = DEFAULT_STATE.filters.stock.min;
    ACTUAL_STATE.filters.stock.max = DEFAULT_STATE.filters.stock.max;
  }
}
