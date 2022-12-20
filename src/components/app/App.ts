import Router from '../router/Router';

export class App {
  router: Router<RegExpMatchArray>;

  constructor() {
    this.router = new Router({
      mode: 'hash',
      root: '/main/',
    });
  }

  start(): void {
    const el = document.querySelector('.main') as HTMLElement;
    this.router
      .add(/main/, () => {
        el.textContent = 'welcome to main page';
      })
      .add(/cart/, () => {
        el.textContent = 'You are in cart';
      })
      .add(/id\/([0-9]*)/, (match) => {
        //const id: string = match ? match[0] : '';
        el.textContent = `${match} - product id`;
      });
  }
}
