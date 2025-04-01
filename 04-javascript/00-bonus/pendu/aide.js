/*
------------------------------------- AIDE mémoire -----------------------------------
    N'oubliez pas le DEFER sur le script !
    document.querySelector("selecteur css"); retourne un élément HTML
    document.getElementById("nom de l'id");	retourne un élément HTML
    document.getElementsByClassName("Nom de la classe");	Retourne un tableau d'élément HTML
    document.getElementsByTagName("nom d'une balise"); Retourne un tableau d'élément HTML
    document.querySelectorAll("selecteur css"); Retourne un tableau d'élément HTML

    Une fois votre élément selectionné (rangé dans une variable ou autre)

    Element.addEventListener("nom de l'évènement", fonction callback);
    (click, mouseover, input... il existe tous un tas d'event)
    Element.onclick = fonction callback; 						
    (.onover, .oninput, il existe tous un tas de onEvent)

    Pensez que les évènement ne s'ajoutent que sur les élément HTML, si vous avez un tableauu d'élément, il faudra faire une boucle.
    tableau.foreach(function callback)
    for(let i=0; i<tableau.length; i++){ }
    for(let el of tableau){} (ou for in)
    Ces boucles seront sûrement les plus pratiques dans ce cas

    Quand vous faites une fonction callback vous pouvez utiliser :
    une fonction déclaré ailleur et donner juste le nom de la fonction au callback:
    function nomdelafonction(argument){action}
    Une fonction anonyme directement là où on a besoin du callback :
    function(argument){action}
    Une fonction fléché :
    (argument)=>{action}
*/