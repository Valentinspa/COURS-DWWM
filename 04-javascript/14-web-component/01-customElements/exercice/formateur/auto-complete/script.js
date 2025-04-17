
class AutoCompleteInput extends HTMLInputElement {
    liste = document.createElement('datalist');
    options = [];
    constructor() {
      super();
      this.createOptions();
    }

    connectedCallback() {
      this.after(this.liste);
    }
    disconnectedCallback()
    {
      this.liste.remove();
    }
    createOptions()
    {
      const data = this.getAttribute('data-options');
      this.options = data ? data.split(',') : [];
      this.options.forEach(option=>{
        const op = document.createElement("option");
        op.value = option;
        this.liste.append(op);
      })
      const listName = this.getAttribute("list")?? "default-list";
      this.setAttribute("list", listName);
      this.liste.id = listName;
    }
  }

  customElements.define('auto-complete-input', AutoCompleteInput, { extends: 'input' });