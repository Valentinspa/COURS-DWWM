import { saveAction } from "./history.js";
import { canvas, ctx, params } from "./init.js";
import { drawWithPen } from "./pen.js";
import { drawWithShape } from "./shape.js";
/**
 * Return the position of the cursor in the canvas
 * @param {MouseEvent} evt 
 * @returns {{x:number, y:number}}
 */
export function getMousePos(evt) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

/**
 * Start the draw.
 * @param {MouseEvent} e 
 */
export function startPosition(e){
    // setPainting(true);
    params.painting = true;
    switch(params.tool)
    {
        case "pen":
            // pour faire des points au clique
            draw(e);
            break;
        case "circle":
        case "square":
            drawWithShape(e, "start");
            break;

    }
}
/**
 * Finish the draw
 * @param {MouseEvent} e 
 */
export function finishedPosition(e){
    
    switch(params.tool)
    {
        case "pen":
            params.painting = false;
            draw(e);
            break;
        case "circle":
        case "square":
            drawWithShape(e, "end");
            params.painting = false;
            break;
    }

    ctx.beginPath();
    saveAction();
}

/**
 * draw with the selected tool
 * @param {MouseEvent} e 
 */
export function draw(e){
    // Si on n'est pas en train de dessiner, on arrête la fonction.
    
    if(!params.painting) return;
    switch(params.tool)
    {
        case "pen":
            drawWithPen(e);
            break;
        case "circle":
        case "square":
            drawWithShape(e, "selection");
            break;
            
    }
}