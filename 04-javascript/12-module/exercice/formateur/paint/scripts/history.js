"use strict";
import { btnRedo, btnUndo, canvas, ctx, params } from "./init.js";

const undoList = [], redoList = [];
let lastAction = [];

export function addAction(action)
{
    
    lastAction.push(action);
}

export function saveAction()
{
    if(!lastAction.length)return;
    const undoAction = {
        usedTool: params.tool,
        actions: lastAction,
        color: params.color,
        size: params.size
    }
    undoList.push(undoAction);
    lastAction = [];
    checkDisabled();
}

/**
 * Cancel the last actions
 */
export function undo(){
    if(!undoList.length)return;
    let redoAction = undoList.pop();
    redoList.push(redoAction);
    ctx.clearRect(0,0,canvas.width, canvas.height);
    redraw(undoList);
    checkDisabled();
}
/**
 * Redo the last canceled actions
 */
export function redo(){
    if(!redoList.length)return;
    let redoAction = redoList.pop();
    undoList.push(redoAction);
    redraw([redoAction]);
    checkDisabled();
}
/**
 * check if the undo and redo buttons have to be disabled.
 */
function checkDisabled()
{
    btnUndo.disabled = !undoList.length
    btnRedo.disabled = !redoList.length
}
/**
 * draw the actions sent on parameter
 * @param {Array} tab Array of actions to do
 */
function redraw(tab){
    tab.forEach(action =>{
        ctx.strokeStyle = action.color;
        ctx.lineWidth = action.size;
        switch(action.usedTool)
        {
            case "pen":
                ctx.beginPath();
                action.actions.forEach(move=>{
                    ctx.lineTo(move.x, move.y);
                    ctx.stroke();
                    ctx.beginPath();
                    ctx.moveTo(move.x, move.y);
                })
                break;
            case "square":
                const move = action.actions[0];
                ctx.strokeRect(move.x, move.y, move.width, move.height);
                break;
        }
        
    })
    ctx.beginPath();
}