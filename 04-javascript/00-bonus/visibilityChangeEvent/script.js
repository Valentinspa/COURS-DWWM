document.addEventListener("visibilitychange", changeBackground);
// ! évènement déclenché uniquement si l'utilisateur a interagit avec la page
window.addEventListener("beforeunload", handleClose);
window.addEventListener("click", handleClick);

const snow = document.querySelector(".snow");
const calm = document.querySelector(".calm");
const text = document.querySelector("p");

changeBackground();

function changeBackground()
{
    if(document.hidden && snow.style.display !== "")
    {
        isAngry();
    }
}

function handleClose(e)
{
    if(snow.style.display !== "" && calm.style.display === "")
    {
        e.preventDefault(); // Certains navigateurs l'exigent
        e.returnValue = ''; // Déclenche l'affichage du message de confirmation
        isAngry();
    }

}

function handleClick()
{
    snow.style.display = "none";
    text.textContent = "Don't stop looking at it";
}

function isAngry()
{
    calm.style.display = "none";
    text.style.display = "none";
}