"use strict";

import { redo, undo } from "./history.js";
import { changeTool, chooseColor, load, save, handleSetSize } from "./interface.js";
import { draw, finishedPosition, startPosition } from "./mouse.js";

const
    minSize = 1, maxSize = 100,
    toolList = ["pen", "square", "circle"],
    canvas = document.querySelector('canvas'),
    ctx = canvas.getContext("2d"),
    inputColor = document.querySelector(".btn-color"),
    inputSize = document.querySelector(".btn-size"),
    btnUndo = document.querySelector(".btn-undo"),
    btnRedo = document.querySelector(".btn-redo"),
    btnSave = document.querySelector(".btn-save"),
    btnLoad = document.querySelector(".btn-load"),
    btnsTool = document.querySelectorAll(".btn-tool"),
    params = {
        painting : false,
        tool : "pen", 
        color : "black", 
        size : 10
    };
let 
    painting = false,
    tool = "pen", 
    color = "black", 
    size = 10;



/**
 * Initialize the paint app with default values and events
 */
export function init()
{
    inputColor.value = color;
    inputSize.value = size;

    resize();
    window.addEventListener("resize", resize);
    
    // On commence à dessiner quand on enfonce le bouton de la souris
    canvas.addEventListener("mousedown", startPosition);
    // On arrête quand on le relève.
    window.addEventListener("mouseup", finishedPosition);
    // On dessine quand on déplace la souris.
    canvas.addEventListener("mousemove", draw);
    // quand on appui sur une touche du clavier
    document.addEventListener("keypress", keyboard);
    inputColor.addEventListener("change", chooseColor);
    inputSize.addEventListener("change", handleSetSize);
    btnUndo.addEventListener("click", undo);
    btnRedo.addEventListener("click", redo);
    btnSave.addEventListener("click", save);
    btnLoad.addEventListener("click", load);
    btnsTool.forEach(btn => {
        btn.addEventListener("click",changeTool);
    });
}
/**
 * Handle keyboard actions
 * @param {KeyboardEvent} e 
 */
function keyboard(e){
    e.preventDefault();
    if(!e.shiftKey)return;
    
    // Selon la touche pressé je lance différente fonctions.
    switch(e.key.toLowerCase()){
        case "s":
            save();
            break;
        case "l":
            load();
            break;
        case "c":
            inputColor.click();
            break;
        case "z":
            undo();
            break;
        case "y":
            redo();
            break;
        case "+":
            inputSize.value++;
            setSize();
            break;
        case "-":
            inputSize.value--;
            setSize();
            break;
        case "1":
        case "2":
        case "3":
            btnsTool[e.key-1].click();
            break;
    }
    /*
        paramètre le contexte une fois que les autres actions l'ont modifié
        (par exemple les modifications apportés par le undo/redo)
    */
    setContext();
}

/**
 * resize Canvas when the page size change
 */
function resize(){
    let snapshot = ctx.getImageData(0,0, canvas.width, canvas.height)
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.putImageData(snapshot, 0, 0)
    setContext();
}

/**
 * Change width and color context
 */
export function setContext()
{
    ctx.lineWidth = params.size;
    ctx.strokeStyle = params.color;
}

export {minSize, maxSize, toolList, canvas, ctx, btnUndo, btnRedo, inputSize, inputColor, params};