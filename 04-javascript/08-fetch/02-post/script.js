"use strict";

const url = "https://api.thedogapi.com/v1/images/upload";
const api_key = "live_U8C8pGOECtGkpLTkSJJ6QIBrZs0qC2gUTXObqsc40bpMn0KfQfVaPfoTgmPl9zFv";

const formulaire = document.querySelector('form');
const result = document.querySelector('.result');
formulaire.addEventListener('submit', uploadDog);

function uploadDog(e)
{
    e.preventDefault();
    const formData = new FormData(formulaire);
    result.textContent = "Chargement en cours";

    fetch(url,{
        method: "POST",
        headers: {"x-api-key": api_key},
        body: formData
    }).then(checkResponse);
}
function checkResponse (response)
{
    result.textContent = "Chargement terminé !";
    if(response.ok)
    {
        response.json().then(data=>{
            //console.log(data);
            result.innerHTML += `<hr><img src="${data.url}" alt="image de chien" width="400">`
            
        });
    }else
    {
        result.textContent = response.statutsText;
    }
}  

