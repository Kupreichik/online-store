export type routerMode = 'history' | 'hash';

export type callbackType = (...arg: string[]) => void;

export enum SortKind {
  'Most Popular',
  'Alphabet A - Z',
  'Alphabet Z - A',
  '$ Low to High',
  '$ High to Low',
}
