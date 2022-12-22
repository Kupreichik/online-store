import Router from '../router/Router';
import { View } from '../view/view';

export class App {
  router: Router;
  view: View;

  constructor() {
    this.router = new Router({
      mode: 'hash',
      root: '/main/',
    });
    this.view = new View();
  }

  start(): void {
    const el = document.querySelector('.main') as HTMLElement;
    this.router
      .add(/main/, () => {
        el.innerHTML = this.view.main.render();
      })
      .add(/cart/, () => {
        el.textContent = 'You are in cart';
      })
      .add(/id\/([0-9]*)/, (id: string) => {
        el.textContent = `${id} - product id`;
      });
  }
}
