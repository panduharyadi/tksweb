var map = L.map('map', {
	zoomControl: false,
	dragging: true,
	noWrap: true,
	scrollWheelZoom: false,
}).setView([-2.5, 118], 5);

var locations = [
	{ name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
	{ name: 'Surabaya', lat: -7.2575, lng: 112.7521 },
	{ name: 'Medan', lat: 3.5952, lng: 98.6722 },
	{ name: 'Makassar', lat: -5.1477, lng: 119.4327 },
	{ name: 'Balikpapan', lat: -1.2654, lng: 116.8312 },
];

var circleMarkersLayer = L.layerGroup().addTo(map);

map.createPane('circleMarkersPane');
map.getPane('circleMarkersPane').style.zIndex = 650;

locations.forEach(function (location) {
	L.circleMarker([location.lat, location.lng], {
		color: '#0b3b82',
		fillColor: '#FFA500',
		fillOpacity: 1,
		radius: 6,
		pane: 'circleMarkersPane',
	})
		.bindTooltip(location.name, {
			permanent: false,
			direction: 'top',
			offset: [0, -10],
			className: 'custom-tooltip',
		})
		.addTo(circleMarkersLayer);
});

var imageBounds = [
	[-90, -180],
	[90, 180],
];

const indonesiaGeoJSON =
	'https://raw.githubusercontent.com/Vizzuality/growasia_calculator/master/public/indonesia.geojson';

function style(feature) {
	return {
		fillColor: '#dda431',
		weight: 2,
		opacity: 1,
		color: '#fff',
		dashArray: '3',
		fillOpacity: 1,
	};
}

fetch(indonesiaGeoJSON)
	.then((response) => response.json())
	.then((data) => {
		console.log('GeoJSON Data:', data);

		var geoJsonLayer = L.geoJSON(data, {
			style: style,
		}).addTo(map);

		var bounds = geoJsonLayer.getBounds();

		map.setMaxBounds(bounds);

		map.on('zoomend', function () {
			if (
				map.getBounds().getNorthWest().lat < bounds.getNorthWest().lat ||
				map.getBounds().getSouthEast().lat > bounds.getSouthEast().lat ||
				map.getBounds().getNorthWest().lng < bounds.getNorthWest().lng ||
				map.getBounds().getSouthEast().lng > bounds.getSouthEast().lng
			) {
				map.fitBounds(bounds);
			}
		});
	})
	.catch((error) => {
		console.log('Error loading GeoJSON:', error);
	});

function resizeMap() {
	map.invalidateSize();
}

window.addEventListener('resize', resizeMap);
