"use strict";

let idInterval;
document.addEventListener("DOMContentLoaded", function(){
    const sliderBgColor = document.querySelectorAll('#slider ul li:nth-child(odd)');
    sliderBgColor.forEach(item => {
    item.style.background = "#aaa";
    });

    const checkbox = document.querySelector('#checkbox');
    checkbox.addEventListener('change', function () {
    if (this.checked) {
        idInterval = setInterval(moveRight, 1500);
    } else {
        clearInterval(idInterval);
    }
    });

    const slideCount = document.querySelectorAll('#slider ul li').length;
    const slideWidth = document.querySelector('#slider ul li').offsetWidth;
    const slideHeight = document.querySelector('#slider ul li').offsetHeight;
    const sliderUlWidth = slideCount * slideWidth;

    const slider = document.getElementById("slider");
    slider.style.width = slideWidth + 'px';
    slider.style.height = slideHeight + 'px';

    const sliderUl = document.querySelector("#slider ul");
    sliderUl.style.width = sliderUlWidth + "px";
    sliderUl.style.marginLeft = slideWidth + "px";

    sliderUl.prepend

})