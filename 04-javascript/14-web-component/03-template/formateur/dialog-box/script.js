"use strict";

class DialogBox extends HTMLElement {
    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'open' });
      const template = document.getElementById('dialog-template');
      shadow.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
      this.shadowRoot.getElementById('close-btn').addEventListener('click', () => {
        this.style.display = 'none';
      });
    }
  }

  customElements.define('dialog-box', DialogBox);