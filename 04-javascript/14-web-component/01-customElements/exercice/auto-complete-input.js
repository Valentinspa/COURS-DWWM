"use strict";

export class AutoCompleteInput extends HTMLInputElement {
  constructor() {
    super();

    this.setAttribute("list", "options");
    const datalist = document.createElement("datalist");
    datalist.id = "options";
    const dataOptions = this.getAttribute("data-options")
       .split(",")
       .map((item) => item.trim());
    dataOptions.forEach((option) => {
      const newOption = document.createElement("option");
      newOption.setAttribute("value", option);
      datalist.append(newOption);
    });
    this.parentElement.append(datalist);

    this.initStyle();
  }

  static stylesheet = "auto-complete-input.css";


  initStyle() {
    if (document.querySelector(`[href="${AutoCompleteInput.stylesheet}"]`)) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = AutoCompleteInput.stylesheet;
    document.head.append(link);
  }
}

customElements.define("auto-complete-input", AutoCompleteInput, { extends: "input" });
