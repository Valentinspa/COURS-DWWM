"use strict";

export class RatingStars extends HTMLElement {
  constructor() {
    super();

    for (let i = 0; i < 5; i++) {
      const newStar = document.createElement("i");
      newStar.classList.add("fa-star");
      this.#stars.push(newStar);
      newStar.addEventListener("click", () => this.setValue(i + 1));
      this.append(newStar);
    }

    this.setValue(this.getAttribute("value"));

    this.initStyle();
  }

  value = 1;
  #stars = [];
  static fullStar = "fa-solid";
  static emptyStar = "fa-regular";
  static stylesheet = "rating-stars.css";

  setValue(newValue) {
    console.log("set value", newValue);
    this.value = newValue;
    for (let i = 0; i < this.#stars.length; i++) {
      const star = this.#stars[i];
      if (i < this.value) {
        star.classList.remove(RatingStars.emptyStar);
        star.classList.add(RatingStars.fullStar);
      } else {
        star.classList.remove(RatingStars.fullStar);
        star.classList.add(RatingStars.emptyStar);
      }
    }
    this.setAttribute("value", this.value);
  }

  initStyle() {
    if (document.querySelector(`[href="${RatingStars.stylesheet}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = RatingStars.stylesheet;
    document.head.append(link);
  }
}

customElements.define("rating-stars", RatingStars);