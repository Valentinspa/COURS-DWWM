"use strict";

import { RatingStars } from "../../../01-customElements/exercice/antonio/rating-stars.js";

class ProductSweat extends HTMLElement{

  
constructor()
{
  super()
  this.shadow = this.attachShadow({mode:"open"});
  // const container = document.createElement("div");
  // container.textContent = "Produit : " + this.getAttribute("description");
  // this.shadow.appendChild(container)

  // Ajout du style
  this.CreateStyle();
    
  // Création de la structure HTML du produit
  const productcard = document.createElement("div");
  productcard.className = "product-card";
  // Ajout du productcard au shadow DOM
  this.shadowRoot.append(productcard);

  const image = document.createElement("img");
  image.className = "img-sweat";
  image.src = this.getAttribute("image")

  const nom = document.createElement("div");
  nom.className = "name";
  nom.textContent = this.getAttribute("name");

  const description = document.createElement("div");
  description.className = "description";
  description.textContent = this.getAttribute("description")

  const prix = document.createElement("div");
  prix.className = "price"
  prix.textContent = this.getAttribute("price")

  const bouton = document.createElement("button");
  bouton.textContent = "Ajouter au panier"

  const stars = document.createElement("rating-stars");

  console.log(this.getAttribute("name"));
  console.log(this.getAttribute("price"));

  // Ajout des éléments au productcard
  productcard.appendChild(image);
  productcard.appendChild(stars);
  productcard.appendChild(nom);
  productcard.appendChild(description);
  productcard.appendChild(prix);
  productcard.appendChild(bouton);
  // console.log(stars.children[0].children);
  
  const starContainer = stars.children[0];
  const value = (this.getAttribute("value")??1)-1;
  
  // stars.ClickEtoile({target:starContainer.children[2]})
  starContainer.children[value].click()

}
CreateStyle()
{
    const style = document.createElement("style");
    this.shadowRoot.append(style);
    style.textContent = /* CSS */
    `
    /**{background: red!important;}*/
    .product-card{
      margin: 15px;
      padding: 20px;
      width: 250px;
      border: solid 2px black;
      border-radius: 10px;
      background-color: #f9f9f9;
      text-align: center;
      
    }
    .img-sweat{
        width: 100%;
        height: auto;
        border-radius: 5px;
    }
   .name {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 10px 0;
   }
   .description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 10px;
}
.price {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
}
button {
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}
    `;
}
}

customElements.define("product-sweat", ProductSweat);






 