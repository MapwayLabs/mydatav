import mapboxgl from 'mapbox-gl/dist/mapbox-gl-unminified';
import './tooltip.css';

export default class ToolTip {

  constructor(map, options = {}, theme) {
    this.map = map;
    this._popup = new mapboxgl.Popup(Object.assign({
        closeButton: true,
        closeOnClick: false,
        anchor: 'top',
        className: 'map-tooltip-container',
        maxWidth: '300px'
    }, options));
    this._currentThemeClass = theme;
    // this._popup.addTo(this.map);
  }

  close() {
    this._popup.remove();
  }

  open(data = [], lnglat) {
    const div = this._contentElement = document.createElement('div');
    div.classList.add('tooltip-content');
    const table = document.createElement('table');
    table.classList.add('tooltip-content-table');
    div.appendChild(table);
    const tableDataHTML = [];
    for(let i = 0, len = data.length; i < len; i++) {
      tableDataHTML.push('<tr>');
      tableDataHTML.push(`<td>${ data[i].key }</td>`);
      tableDataHTML.push(`<td>${ data[i].value }</td>`);
      tableDataHTML.push('</tr>');
    }
    table.innerHTML = tableDataHTML.join('');

    this._popup.setLngLat(lnglat)
      .setDOMContent(div)
      .addTo(this.map);
  }

  updateTheme(theme) {
    const element = this._popup.getElement();
    if (this._currentThemeClass) {
      element.classList.remove(this._currentThemeClass);
    }
    element.classList.add(theme);
    this._currentThemeClass = theme;
  }

  updateStyle(style) {
    this._contentElement.style = style;
  }
}