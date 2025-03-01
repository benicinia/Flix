const setup = () => {
  customElements.define('shadow-view', class extends HTMLElement {
    connectedCallback() {
      zuix.loadComponent(this, 'default', 'ctrl', {
        container: this.attachShadow({
          mode: this.getAttribute(':mode') || 'closed'
        })
      });
    }
  });
};
if (self.zuix === undefined) {
  import('/zuix-web-flix-master/source/js/zuix.module.min.js')
      .then(() => setup());
} else setup();
