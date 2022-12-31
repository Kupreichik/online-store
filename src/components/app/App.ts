import { Controller } from '../controller/Controller';
import Router from '../router/Router';
import { View } from '../view/view';

export class App {
  router: Router;
  controller: Controller;
  view: View;

  constructor() {
    this.router = new Router({
      mode: 'hash',
      root: '/',
    });
    this.controller = new Controller();
    this.view = new View();
  }

  start(): void {
    window.onload = () => {
      this.controller.syncState();
      this.router.resolveRoute();
    };
    const el = document.querySelector('.main') as HTMLElement;
    this.router
      .add(/^$/, () => {
        el.innerHTML = this.view.main.render();
        this.view.main.setListeners();
      })
      .add(/cart/, () => {
        el.textContent = 'You are in cart';
      })
      .add(/id\/([0-9]*)/, (id: string) => {
        el.innerHTML = this.view.product.render(id);
        this.view.product.setListeners();
      });
  }
}
