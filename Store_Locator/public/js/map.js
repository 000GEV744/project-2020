mapboxgl.accessToken =
  "pk.eyJ1IjoiYW51ajYwMzYwIiwiYSI6ImNrODI2bHd3MDAxcHoza28wYzk0cWcwdmgifQ.JYyhxrxZbhA_5w8rHuHPdw";
var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  zoom: 4, //zoom level
  center: [78.8718, 21.7679]
});
// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);

//fetch stores from api
async function getStores() {
  const res = await fetch("/api/stores");
  const data = await res.json();
  console.log(data);
  const stores = data.data.map(store => {
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: "shop"
      }
    };
  });
  loadMap(stores);
}

//load map with stores
function loadMap(stores) {
  map.on("load", function() {
    map.addSource("point", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: stores
      }
    });
    map.addLayer({
      id: "points",
      type: "symbol",
      source: "point",
      layout: {
        "icon-image": "{icon}-15",
        "icon-size": 1.5,
        "text-field": "{storeId}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.9],
        "text-anchor": "top"
      }
    });
  });
}

getStores();
