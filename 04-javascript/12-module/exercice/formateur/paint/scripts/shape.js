"use strict";

import { getMousePos } from "./mouse.js";
import { canvas, ctx, params } from "./init.js";
import { addAction } from "./history.js";

let originalShapePos = {}, snapshot;
/**
 * draw with the square tool
 * @param {MouseEvent} e 
 * @param {string} state The value can be "start", "selection" or "end"
 */
export function drawWithShape(e, state)
{
    if(!params.painting)return;
    const lastPos = getMousePos(e);
    if(state === "start")
    {
        console.log("start");
        
        originalShapePos = lastPos;
        snapshot = ctx.getImageData(0,0,canvas.width, canvas.height);
        // shapeSelector.style.display = "block";
        return;
    }
    const shape = getShapeRect(originalShapePos, lastPos);
    ctx.putImageData(snapshot, 0,0);
    if(state === "selection")
    {
        drawShape(shape);
        return;
    }
    
    drawShape(shape);
    addAction(shape);
}
/**
 * draw the requested shape
 * @param {{x:number, y:number, width: number, height:number}} shape 
 */
export function drawShape(shape)
{
    switch(params.tool)
    {
        case "square":
            ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            break;
        case "circle":
            ctx.beginPath();
            ctx.ellipse(shape.x + shape.width/2, shape.y +shape.height/2, shape.width/2, shape.height/2, 0, 0, Math.PI*2);
            ctx.stroke();
            break;
    }
}
/**
 * Return the position and size of the shape
 * @param {{x:number, y:number}} originalPos Starting position of the shape
 * @param {{x:number, y:number}} lastPos last position of the shape
 * @returns {{x:number, y:number, width: number, height:number}}
 */
export function getShapeRect(originalPos, lastPos) 
{
    const shape = {};
    if(originalPos.x < lastPos.x)
    {
        shape.x = originalPos.x;
        shape.width = lastPos.x - originalPos.x;
    }
    else
    {
        shape.x = lastPos.x;
        shape.width = originalPos.x - lastPos.x;
    }
    if(originalPos.y < lastPos.y)
    {
        shape.y = originalPos.y;
        shape.height = lastPos.y - originalPos.y;
    }
    else
    {
        shape.y = lastPos.y;
        shape.height = originalPos.y - lastPos.y;
    }
    return shape;
}