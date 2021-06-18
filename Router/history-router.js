class Routers {
    constructor() {
        this.routes = {};
        this.bindPopState()
    }
    init(path) {
        history.replaceState({
            path: path
        }, null.path)
        this.routes[path] && this.routes[path]()
    }
    route(path, callback) {
        this.routes[path] = callback || function () {}
    }
    go(path) {
        history.pushState({
            path: path
        }, null.path)
        this.routes[path] && this.routes[path]()
    }
    bindPopState() {
        window.addEventListener('popstate', (e) => {
            const path = e.state && e.state.path;
            this.routes[path] && this.routes[path]()

        })
    }
}
window.Router = new Routers();
Router.init(location.pathname);
const ul = document.querySelector('ul');
Router.route('/', function () {});
Router.route('/blue', function () {});
Router.route('/green', function () {});
ul.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      Router.go(e.target.getAttribute('href'));
    }
  });
  