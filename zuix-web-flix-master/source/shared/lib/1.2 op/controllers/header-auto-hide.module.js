const setup = () => {
  customElements.define('header-auto-hide', class extends HTMLElement {
    connectedCallback() {
      zuix.loadComponent(this, '/zuix-web-flix-master/source/shared/lib/1.2/controllers/header-auto-hide', 'ctrl', {
        scrollHost: this.offsetParent || this
      });
    }
  });
};
if (self.zuix === undefined) {
  import('/zuix-web-flix-master/source/js/zuix.module.min.js')
      .then(() => setup());
} else setup();
