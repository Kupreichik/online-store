import { productsData } from '../../data/products';
import { CartPromocodeState, CartState, Product } from '../../types/interfaces';
import { SortKind, SortView } from '../../types/types';
import { STATE } from '../state/State';

export function setActualState(key: string, value: string): void {
  switch (key) {
    case 'category':
      setStateAtArr(STATE.filters.category, value);
      break;

    case 'light':
      setStateAtArr(STATE.filters.light, value);
      break;

    case 'price-min':
      STATE.filters.price.min = parseInt(value);
      break;

    case 'price-max':
      STATE.filters.price.max = parseInt(value);
      break;

    case 'stock-min':
      STATE.filters.stock.min = parseInt(value);
      break;

    case 'stock-max':
      STATE.filters.stock.max = parseInt(value);
      break;

    case 'sort':
      STATE.sortIndex = value as SortKind;
      break;

    case 'search':
      STATE.filters.search = value;
      break;

    case 'sortView':
      STATE.sortView = value as SortView;
      break;

    case 'cart':
      if (STATE.cartProducts.find((prod) => prod.id === +value)) {
        removeProdFromCart(+value, true);
      } else {
        addProdToCart(+value);
      }
      break;

    case 'items':
      STATE.cartItems = +value;
      break;

    case 'page':
      STATE.cartPage = +value;
      break;
  }

  STATE.products = productFilter();
}

export function productFilter(): Product[] {
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

export function setStateAtArr(arr: string[], value: string): void {
  if (value === '') arr = [];
  if (arr.includes(value)) {
    arr.splice(arr.indexOf(value), 1);
  } else {
    arr.push(value);
  }
}

export function addProdToCart(id: number): number {
  let prod: CartState | undefined = STATE.cartProducts.find((prod) => prod.id === id);
  const prodData = productsData.find((product) => product.id === id) as Product;
  if (prod) {
    if (prod.count < prodData.stock) prod.count += 1;
  } else {
    prod = {
      id: id,
      count: 1,
      price: prodData.price,
    };
    STATE.cartProducts.push(prod);
  }
  return prod.count;
}

export function removeProdFromCart(id: number, isDrop = false): number | undefined {
  const prod = STATE.cartProducts.find((prod) => prod.id === id) as CartState;

  if (isDrop || prod.count === 1) {
    STATE.cartProducts.splice(STATE.cartProducts.indexOf(prod), 1);
    if (STATE.cartProducts.length === 0) STATE.cartPromocode = [];
    return undefined;
  } else {
    prod.count -= 1;
  }
  return prod.count;
}

export function getAmountCart(): number {
  return STATE.cartProducts.reduce((curr, prod) => curr + prod.count, 0);
}

export function getSumPrice(): number {
  return STATE.cartProducts.reduce((curr, prod) => curr + prod.count * prod.price, 0);
}

export function getSumPriceWithPromo(): number {
  const promo = STATE.cartPromocode.reduce((acc, el) => acc + el.disc / 100, 0);
  return Math.round(getSumPrice() - getSumPrice() * promo);
}

export function removePromocode(id: string) {
  STATE.cartPromocode = STATE.cartPromocode.filter((el) => el.id !== id);
}

export function getPromocode(id: string) {
  return STATE.cartPromocode.find((el) => el.id === id);
}

export function hasPromocode() {
  return STATE.cartPromocode.length > 0;
}

export function addPromocode(promocode: CartPromocodeState) {
  STATE.cartPromocode.push(promocode);
}
