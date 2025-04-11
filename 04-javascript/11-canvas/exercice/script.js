"use strict";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const charger = document.getElementById("charger");

function resize() {
  const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.putImageData(snapshot, 0, 0);
}
resize();
window.addEventListener("resize", resize);

let painting = false;
let x, y;

let color = "#000000";
document.getElementById("colorPicker").addEventListener("input", function (e) {
  color = e.target.value;
});

let trait = 1;
document.getElementById("trait").addEventListener("input", function (e) {
  trait = e.target.value;
});
let u = [];
let r = [];

function save(stack, keepRedo = false) {
  if (!keepRedo) r = [];
  stack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

function undo() {
  if (u.length > 0) {
    const snapshot = u.pop();
    r.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(snapshot, 0, 0);
  }
}

function redo() {
  if (r.length > 0) {
    const snapshot = r.pop();
    u.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(snapshot, 0, 0);
  }
}

canvas.onmousedown = function (e) {
  painting = true;
  x = e.clientX;
  y = e.clientY;
  this.x = x;
  this.y = y;
  save(u);
};

canvas.onmousemove = function (e) {
  if (painting) {
    const x = e.clientX;
    const y = e.clientY;
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = trait;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(x, y), ctx.stroke();
    ctx.closePath();

    this.x = x;
    this.y = y;
  }
};
canvas.onmouseup = function (e) {
  painting = false;
};
function saveImage() {
  const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.putImageData(snapshot, 0, 0);
  const dataURL = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "dessin.png";
  link.click();
  ctx.putImageData(snapshot, 0, 0);
}
charger.addEventListener("change", function (event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
