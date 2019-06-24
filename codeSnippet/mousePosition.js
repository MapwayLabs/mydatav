// http://www.jacklmoore.com/notes/mouse-position/

// Mouse Event Properties
/**
 * clientX, clientY
 * screenX, screenY
 * offsetX, offsetY
 * pageX, pageY
 * x, y
 * layerX, layerY
 */

 // Normalization

 // Calculating pageX, pageY
 document.body.onclick = function(e) {
    e = e || window.event;
    var pageX = e.pageX;
    var pageY = e.pageY;
    if (pageX === undefined) {
        pageX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        pageY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }

    console.log([pageX, pageY]);
 }

 // Calculating offsetX, offsetY
 // border edge
 document.body.onclick = function(e) {
    e = e || window.event;

    var target = e.target || e.srcElement,
        rect = target.getBoundingClientRect(),
        offsetX = e.clientX - rect.left,
        offsetY = e.clientY - rect.top;

    console.log([offsetX, offsetY]);
 }

 // padding edge
 document.body.onclick = function(e) {
    e = e || window.event;

    var target = e.target || e.srcElement,
        style = target.currentStyle || window.getComputedStyle(target, null),
        borderLeftWidth = parseInt(style['borderLeftWidth'], 10),
        borderTopWidth = parseInt(style['borderTopWidth'], 10),
        rect = target.getBoundingClientRect(),
        offsetX = e.clientX - rect.left - borderLeftWidth,
        offsetY = e.clientY - rect.top - borderTopWidth;
        
    console.log([offsetX, offsetY]);
 }