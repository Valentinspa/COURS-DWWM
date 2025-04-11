import { addAction } from "./history.js";
import { ctx } from "./init.js";
import { getMousePos } from "./mouse.js";

/**
 * Draw with the pen
 * @param {MouseEvent} e 
 */
export function drawWithPen(e)
{    
    ctx.lineCap = "round";
    let mouse = getMousePos(e);
    /* On dessine là où se trouve la souris. */
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
    // on augmente un peu la fluidité avec ceci: (optionnelle)
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    addAction({
        x: mouse.x,
        y: mouse.y
    });
}