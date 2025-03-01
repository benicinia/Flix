const setup = () => {
  customElements.define('view-pager', class extends HTMLElement {
    connectedCallback() {
      this.style.display = 'block';
      zuix.loadComponent(this, '/zuix-web-flix-master/source/shared/lib/1.2/controllers/view-pager', 'ctrl');
    }
  });
};
if (self.zuix === undefined) {
  import('/zuix-web-flix-master/source/js/zuix.module.min.js')
      .then(() => setup());
} else setup();
