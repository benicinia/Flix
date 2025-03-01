const setup = () => {
  if (customElements.get('mdl-menu') == null) {
    customElements.define('mdl-menu', class extends HTMLElement {
      context = null;
      shadowView = null;
      connectedCallback() {
        if (!this.shadowView) {
          this.classList.add('visible-on-ready');
          this.style.display = 'inline-block';
          this.shadowView = this.attachShadow({mode: 'closed'});
          zuix.loadComponent(this, '/zuix-web-flix-master/source/shared/lib/1.2/controllers/mdl-menu', 'ctrl', {
            container: this.shadowView,
            ready: (ctx) => this.context = ctx
          });
        }
      }
    });
  }
};
if (self.zuix === undefined) {
  import('/zuix-web-flix-master/source/js/zuix.module.min.js')
      .then(() => setup());
} else setup();
