const setup = () => {
  customElements.define('drawer-layout', class extends HTMLElement {
    connectedCallback() {
      zuix.loadComponent(this, '/zuix-web-flix-master/source/shared/lib/1.2/controllers/drawer-layout', 'ctrl');
    }
  });
};
if (self.zuix === undefined) {
  import('/zuix-web-flix-master/source/js/zuix.module.min.js')
      .then(() => setup());
} else setup();
