"use strict"
const url = "./exercice/hero.json";
const select = document.getElementById('select');
fetch(url).then(handleRequest);

function handleRequest(response)
{
    if (response.ok) 
    {
        console.log(handleRequest);
        response.json()
        .then(function(data)
        {
            console.log(data);
            data.members.forEach(memb=> {select.innerHTML +=
            `<option>${memb.name}</option>`;
            });
        
        });
    
    }   
};

//TODO 3

fetch("https://api.thedogapi.com/v1/images/search").then(apiRequest);

function apiRequest(response)
{
    if(response.ok)
    {
        console.log(apiRequest);
        response.json().then(function(dataApi){
            dataApi.forEach(api=> {document.body.innerHTML +=
               `<img>${api.url}</img>` 
            })
        })
    }

}