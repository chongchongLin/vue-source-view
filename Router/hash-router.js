class Routers {
    constructor() {
        this.routes = {};
        //当前路由的URL
        this.currentUrl = '';
        //存储路由过程
        this.history = [];
        //默认不是后退模式
        this.isBack = false;
        this.currentIndex = this.history.length - 1;
        this.refresh = this.refresh.bind(this);
        this.backoff = this.backoff.bind(this);
        window.addEventListener('load', this.refresh, false);
        window.addEventListener('hashchange', this.refresh, false);
    }
    route(path, callback) {
        this.routes[path] = callback || function () {};
    }
    refresh() {
        this.currentUrl = location.hash.slice(1) || '/';
        if (!this.isBack) {
            if (this.currentIndex < this.history.length - 1)
                this.history = this.history.slice(0, this.currentIndex + 1)
            this.history.push(this.currentUrl)
            this.currentIndex++
        }
        this.routes[this.currentUrl]()
        this.isBack = false;

    }
    backoff() {
        this.isBack = true;
        this.currentIndex <= 0 ? (this.currentIndex = 0) : (this.currentIndex = this.currentIndex - 1);
        location.hash = `#${this.history[this.currentIndex]}`;
        this.routes[this.history[this.currentIndex]]()

    }
}
window.Router = new Routers();
Router.route('/', function () {});
Router.route('/blue', function () {});
Router.route('/green', function () {});
const button = document.querySelector('button');
button.addEventListener('click', Router.backoff, false);