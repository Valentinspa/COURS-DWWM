"use strict";

const divOpen = document.querySelector('.open');
const shadowpen = divOpen.attachShadow({mode:"open"});

console.log(shadowpen, divOpen.shadowRoot);

createWeatherWidget(data)

