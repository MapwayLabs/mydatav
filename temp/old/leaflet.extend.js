L.LocationControl = L.Control.extend({

  options: {
    position: 'bottomleft'
  },

  onAdd: function (map) {
	  var container = L.DomUtil.create('img', 'leaflet-control-locate');
    container.src = 'assets/imgs/dw.png';
    L.DomEvent.on(container, 'click', function (){
      map.fire('getLocationEvt');
    });
		return container;
	},

	onRemove: function (map) {
	}

});
