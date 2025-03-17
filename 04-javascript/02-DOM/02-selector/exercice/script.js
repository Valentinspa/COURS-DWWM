// ------------EXO 1 ---------------
// Déplacer la modale dans le body. Celle ci est déjà présente, mais le CSS la cache. Il faudra la déplacer sans modifier le CSS
const div1 = document.getElementsByTagName("div");
document.body.append(div1[0]);


// ----------- EXO 2 ---------------
// modifier le texte des 3 li du footer, si possible avec une boucle.
for (let i = 0; i < 3; i++)
{     
    const li = document.getElementsByTagName("li");
    li[i].textContent = `menu ${[i]}`;
}


// ------------ EXO 3 --------------
// Remplacer le texte des paragraphes pair.
const para = document.querySelectorAll("p:nth-of-type(even)");
for (let i = 0; i < para.length; i++)
{
    para[i].textContent = "Ce paragraphe à éte modifié";
}