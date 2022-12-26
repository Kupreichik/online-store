import { Route } from '../../types/interfaces';
import { callbackType, routerMode } from '../../types/types';

class Router {
  routes: Route[];
  mode: routerMode;
  root: string;
  current: string | null;

  constructor(options: { mode: routerMode; root: string }) {
    this.mode = window.history.state ? 'history' : 'hash';
    if (options?.mode) this.mode = options.mode;
    this.root = options?.root ? options.root : '/';
    this.routes = [];
    this.current = null;
    this.listen();
  }

  add = (path: RegExp, cb: callbackType): this => {
    this.routes.push({ path, cb });
    return this;
  };

  remove = (path: string): this => {
    for (let i = 0; i < this.routes.length; i += 1) {
      if (path.match(this.routes[i].path)) {
        this.routes.slice(i, 1);
        return this;
      }
    }
    return this;
  };

  flush = (): this => {
    this.routes = [];
    return this;
  };

  clearSlashes = (path: string): string => path.toString().replace(/\/$/, '').replace(/^\//, '');

  getFragment = (): string => {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  };

  navigate = (path = ''): this => {
    if (this.mode === 'history') {
      window.history.pushState(null, '', this.root + this.clearSlashes(path));
    } else {
      window.location.hash = `${window.location.hash.replace(/#(.*)$/, '')}#${path}`;
    }
    return this;
  };

  listen = (): void => {
    window.addEventListener('load', this.resolveRoute);
    window.addEventListener('hashchange', this.resolveRoute);
  };

  resolveRoute = (): void => {
    //if (!this.current) this.navigate(this.root);
    //if (this.current === this.getFragment()) return;
    this.current = this.getFragment();
    this.routes.some((route) => {
      const match: RegExpMatchArray | null = (this.current as string).match(route.path);
      if (match) {
        match.shift();
        route.cb.apply({}, match);
        return match;
      }
      return false;
    });
  };
}

export default Router;
