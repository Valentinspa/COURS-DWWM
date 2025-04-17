import { RatingStars } from "../../../01-customElements/exercice/rating-stars/script.js";

class ProductCard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {        
      const name = this.getAttribute('name');
      const desc = this.getAttribute('description');
      const price = this.getAttribute('price');
      const image = this.getAttribute('image');
      const note = this.getAttribute('note');
      this.details = {name: name, price: price}

      this.shadowRoot.innerHTML = `
        <style>
            :host{
                display: inline-block;
            }
          .card {
            border: 1px solid #ccc;
            padding: 10px;
            font-family: sans-serif;
            max-width: 25vw;
            min-height: 100%;
          }
          img {
            width: 100%;
          }
        </style>
        <div class="card">
          <img src="${image}" alt="${name}">
          <rating-stars value="${note}"></rating-stars>
          <h3>${name}</h3>
          <p>${desc}</p>
          <strong>${price}€</strong>
          <button>Ajouter au panier</button>
        </div>
      `;
        
      this.addToCartEvent();
    }
    getAttribute(name)
    {
        return super.getAttribute(name)||"NC";
    }
    addToCartEvent()
    {
        this.shadowRoot.querySelector('button').onclick = () => {
            this.dispatchEvent(new CustomEvent('add-to-cart', {
              detail: this.details,
              bubbles: true,
              composed: true
            }));
          };
        this.addEventListener("add-to-cart", e=>{console.log(e)})
    }
  }

  customElements.define('product-card', ProductCard);