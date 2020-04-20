import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


customElements.define('edit-span',
  class extends HTMLElement {

    static get observedAttributes() { return ['value']; }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === "value" && this.shadowRoot) {
        this.shadowRoot.querySelector("span").textContent = newValue;
        this.shadowRoot.querySelector("input").value = newValue;
      }
    }

    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: 'open' });
      const form = document.createElement('form');
      const input = document.createElement('input');
      const span = document.createElement('span');

      const style = document.createElement('style');
      style.textContent = 'span { background-color: #eef; padding: 0 2px }';

      shadowRoot.appendChild(style);
      shadowRoot.appendChild(form);
      shadowRoot.appendChild(span);

      // Object.defineProperty(this.childNodes[0], "textContent", {
      //   set(value) {
      //     span.textContent = value;
      //   }
      // })

      let value = this.getAttribute("value");
      span.textContent = value;
      input.value = value;

      form.appendChild(input);
      form.style.display = 'none';
      span.style.display = 'inline-block';
      input.style.width = span.clientWidth + 'px';

      this.setAttribute('tabindex', '0');
      input.setAttribute('required', 'required');
      this.style.display = 'inline-block';

      this.addEventListener('click', () => {
        span.style.display = 'none';
        form.style.display = 'inline-block';
        input.focus();
        input.setSelectionRange(0, input.value.length)
      });

      form.addEventListener('submit', e => {
        updateDisplay();
        e.preventDefault();
      });

      input.addEventListener('blur', updateDisplay);

      const _this = this;
      function updateDisplay() {
        span.style.display = 'inline-block';
        form.style.display = 'none';
        span.textContent = input.value;
        input.style.width = span.clientWidth + 'px';

        const event = new CustomEvent('change', {
          detail: {
            value: input.value
          },
          bubbles: true,
          cancelable: true,
        });
        _this.dispatchEvent(event);
      }
    }

    constructor() {
      super();
    }
  }
);



new Vue({
  render: h => h(App)
}).$mount('#app')

