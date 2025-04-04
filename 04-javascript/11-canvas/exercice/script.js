"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resize()
{
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.putImageData(snapshot, 0, 0);
}
resize();
window.addEventListener("resize", resize);

canvas.onmousemove = function(e)
{
    const x = e.clientX;
    const y = e.clientY;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 1;
    ctx.beginPath(x,y);
    ctx.moveTo(x, y);
    ctx.lineTo(x, y),
    ctx.stroke(x, y);
}



