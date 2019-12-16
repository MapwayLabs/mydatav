bb = bb || elements.boundingBox();

let w = this.width();
let h = this.height();
let zoom;
padding = is.number( padding ) ? padding : 0;

if( !isNaN( w ) && !isNaN( h ) && w > 0 && h > 0 && !isNaN( bb.w ) && !isNaN( bb.h ) &&  bb.w > 0 && bb.h > 0 ){
  zoom = Math.min( (w - 2 * padding) / bb.w, (h - 2 * padding) / bb.h );

  // crop zoom
  zoom = zoom > this._private.maxZoom ? this._private.maxZoom : zoom;
  zoom = zoom < this._private.minZoom ? this._private.minZoom : zoom;

  let pan = { // now pan to middle
    x: (w - zoom * ( bb.x1 + bb.x2 )) / 2,
    y: (h - zoom * ( bb.y1 + bb.y2 )) / 2
  };

  return {
    zoom: zoom,
    pan: pan
  };
}