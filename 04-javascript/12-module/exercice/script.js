"use strict";
const images = ["./img/automne.jpg", "./img/hiver.jpg", "./img/lac.jpg", "./img/montagne.jpg",];
const button = document.getElementById("button");
button.addEventListener("click", async function eventClick () {
    const { createSlider, startSlider } = await import("./slider.js");
    const slider = createSlider(images);
    document.body.append(slider);
    startSlider(slider, images, 4000);
    button.removeEventListener("click", eventClick);
});