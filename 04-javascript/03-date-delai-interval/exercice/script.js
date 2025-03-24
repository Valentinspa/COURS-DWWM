const hoursContainer = document.querySelector('.hours-container');
const minutesContainer = document.querySelector('.minutes-container');
const secondesContainer = document.querySelector('.seconds-container');

function timer() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    
    const hoursDg = (hours % 12) * 30 + minutes * 0.5;
    const minutesDg = minutes * 6;
    const secondsDg = seconds * 6;

    
    hoursContainer.style.transform = `rotate(${hoursDg}deg)`;
    minutesContainer.style.transform = `rotate(${minutesDg}deg)`;
    secondesContainer.style.transform = `rotate(${secondsDg}deg)`;
}


timer();


setInterval(timer, 1000);