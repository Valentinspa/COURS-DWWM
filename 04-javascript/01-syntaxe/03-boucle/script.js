"use strict";

let a = true;

while(a)
{
    console.log("Coucou");
    a = Math.random() < 0.5;
}
let b = 0;
while(true)
{
    b++;

    if(b < 10)
    {
        continue;
    }    
    if(b === 20)
    {
        break;
    }

    console.log(`b vaut ${b}`);

}
do
{
    console.log("do while, b vaut :", b);
}while(b < 5)
    
for(let i = 0; i < 10;i++)
{
    console.log("i vaut" + i);
}
const arr = ["pizza", "cannelé", "daifuku"];
const obj = {nom:"pierre", age:"45", yeux: "vert"};

for(let index in arr)
{
    console.log("index vaut", index);
    console.log(index, "->", arr[index]);
}

for(let prop in obj)
{
    console.log("prop vaut", prop);
    console.log(prop, "->", obj[prop]);
}
for(let valeur of arr)
{
    console.log("valeur vaut", valeur);
}    