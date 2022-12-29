export type routerMode = 'history' | 'hash';

export type callbackType = (...arg: string[]) => void;

export enum SortKind {
  popular = 'Most Popular',
  alphabetUp = 'Alphabet A - Z',
  alphabetDown = 'Alphabet Z - A',
  priceUp = '$ Low to High',
  priceDown = '$ High to Low',
}

export type SortView = 'tile' | 'list';
