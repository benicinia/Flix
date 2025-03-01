const setup = () => {
  customElements.define('scroll-helper', class extends HTMLElement {
    connectedCallback() {
      const contextId = this.getAttribute('z-context');
      zuix.loadComponent(this.parentElement, '/zuix-web-flix-master/source/shared/lib/1.2/controllers/scroll-helper', 'ctrl', {
        contextId, ready: (ctx) => zuix.$(this).trigger('component:ready', ctx)
      });
    }
  });
};
if (self.zuix === undefined) {
  import('/zuix-web-flix-master/source/js/zuix.module.min.js')
      .then(() => setup());
} else setup();
