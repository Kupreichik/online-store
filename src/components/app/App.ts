import { Controller } from '../controller/Controller';
import Router from '../router/Router';
import Header from '../view/cart/header';
import { View } from '../view/view';

export class App {
  router: Router;
  controller: Controller;
  view: View;
  header: Header = new Header();

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
        el.innerHTML = this.view.cart.render();
        this.view.cart.setListeners();
      })
      .add(/id\/([0-9]*)/, (id: string) => {
        el.textContent = `${id} - product id`;
      });
  }
}
