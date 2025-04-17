
export class RatingStars extends HTMLElement {
    constructor() {
      super();
      this.value = parseInt(this.getAttribute('value')) || 0;
      this.disabled = this.hasAttribute("disabled");
      this.render();
    }

    render() {
      this.style.cursor = "pointer";
      this.innerHTML = '';
      for (let i = 1; i <= 5; i++) {
        const star = document.createElement('span');
        star.textContent = i <= this.value ? '★' : '☆';
        star.addEventListener('click', () => {
          if(this.disabled)return;
          this.value = i;
          this.setAttribute('value', this.value);
          this.render();
        });
        this.append(star);
      }
    }

    checkDisabled(isDisabled)
    {
      this.disabled = isDisabled;
      this.style.color = isDisabled?"grey":"";
      this.style.cursor = isDisabled?'':"pointer";
    }
    static get observedAttributes() {
      return ['value', "disabled"];
    }

    attributeChangedCallback(name, oldVal, newVal) {
      switch(name)
      {
        case "value":
          this.value = parseInt(newVal);
          this.render();
          break;
        case "disabled":
          const isDisabled = newVal.toLowerCase() === "true" || newVal === "";
          this.checkDisabled(isDisabled);
          break;
      }
    }
  }

  customElements.define('rating-stars', RatingStars);