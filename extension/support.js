//// This extension require katex, chance.js and lodash.js



// katex
function katex_render(element = document.body) {
    if (typeof renderMathInElement !== "undefined") {
        renderMathInElement(element);
        console.log('[katex] typeset done');
    } else {
        console.log('[katex] auto-render is not ready when typeset is called');
    }
}



function katex_typeset(element = document.body, delay = 0) {
    if (delay == 0) {
        katex_render(element);
    } else {
        setTimeout(() => {
            katex_render(element);
        }, delay);
    }
}


// implement string.replaceAll, waiting for ES adoption

String.prototype.replaceAll = function (oldSubstring, newSubstring) {
    return this.split(oldSubstring).join(newSubstring);
};

