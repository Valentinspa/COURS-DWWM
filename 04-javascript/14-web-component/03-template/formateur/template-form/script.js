const fields = [
    { label: "Nom", type: "text", name: "nom" },
    { label: "Email", type: "email", name: "email" },
    { label: "Age", type: "number", name: "age" },
    { label: "Envoyer", type: "submit", name: "envoi" },
];
generateForm(fields,"#dynamic-form", "#field-template");

/**
 * Rempli le formulaire selectionné avec les champs fourni en premier argument.
 * @param {Array} fields liste des champs à ajouter au formulaire
 * @param {string} formSelector selecteur CSS pour le formulaire
 * @param {string} templateSelector selecteur CSS pour le template
 */
function generateForm(fields = [], formSelector = "", templateSelector)
{
  const template = document.querySelector(templateSelector);
  const form = document.querySelector(formSelector);

  if(!template || !form)return;

  fields.forEach((field)=>{
    generateField(field, form, template)
  });

}

/**
 * Génère un nouveau champs pour le formulaire 
 * @param {object} field objet contenant les informations pour généré un nouvel input
 * @param {string} field.label Texte affiché sur le label et le fieldset
 * @param {string} field.type Type de l'input
 * @param {string} field.name attribut name de l'input
 * @param {HTMLFormElement} form attribut name de l'input
 * @param {HTMLTemplateElement} template attribut name de l'input
 */
function generateField(field, form, template)
{
  const clone = template.content.cloneNode(true);
  const label = clone.querySelector("label");
  const input = clone.querySelector("input");
  const legend = clone.querySelector("legend");
  if(input)
  {
    input.name = field.name;
    input.type = field.type;
    if(field.type === "submit")
    {
      label?.remove();
      legend?.remove();
      input.value = field.label;
      form.append(clone);
      return;
    }
  }
  
  if(legend)
  {
    legend.textContent = field.label;
  }
  if(label)
  {
    label.textContent = field.label;
    label.setAttribute("for", field.name);
  }
  else
  {
    input.placeholder = field.label
  }
  form.append(clone);

}
