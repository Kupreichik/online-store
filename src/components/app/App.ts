import { Controller } from '../controller/Controller';
import Router from '../router/Router';
import { STATE } from '../state/State';
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
      this.controller.getLocalStorage();
      this.router.resolveRoute();
    };
    window.onbeforeunload = () => {
      this.controller.setLocalStorage();
    };
    const el = document.querySelector('.main') as HTMLElement;
    this.router
      .add(/^$/, () => {
        el.innerHTML = this.view.main.render();
        this.view.main.setListeners();
      })
      .add(/^cart$/, () => {
        el.innerHTML = this.view.cart.render();
        if (STATE.cartProducts.length !== 0) this.view.cart.renderChank();
      })
      .add(/^id\/([0-9]*)/, (id: string) => {
        try {
          el.innerHTML = this.view.product.render(id);
          this.view.product.setListeners();
        } catch {
          this.view.render404page();
        }
      });
  }
}
