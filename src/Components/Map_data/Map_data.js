import React, { useRef, useEffect, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "./Map_data.css";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGVydmVydCIsImEiOiJja2wweHZiMHYybjZhMndwaDdwN2l6d2xqIn0.e4tAcQDjhs53APwuNcWhcA";

const windowWidth = window.innerWidth;
export default function MapData() {
  const mapboxElRef = useRef(null);
  const indiaData = useMemo(() => {
    const indiData = [];

    fetch("https://corona.lmao.ninja/v2/jhucsse")
      .then((response) => response.json())
      .then((result) => {
        result.map((i, index) => {
          if (i.country === "India") {
            indiData.push({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [i.coordinates.longitude, i.coordinates.latitude],
              },
              properties: {
                id: index,
                country: i.country,
                province: i.province,
                cases: i.stats.confirmed,
                deaths: i.stats.deaths,
              },
            });
          }
          return indiData;
        });
      })
      .catch((error) => console.log("error", error));
    return indiData;
  }, []);

  useEffect(() => {
    if (indiaData) {
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: "mapbox://styles/pervert/ckmbpwke3909e17pgdi8kplu2",
        center: [83, 22.5],
        zoom: windowWidth < 500 ? 3 : 3.8,
      });

      map.addControl(new mapboxgl.NavigationControl());
      map.once("load", function () {
        map.addSource("points", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: indiaData,
          },
        });

        // Add our layer
        map.addLayer({
          id: "circles",
          source: "points",
          type: "circle",
          paint: {
            "circle-opacity": 0.3,

            "circle-radius": [
              "interpolate",
              ["linear"],
              ["get", "cases"],
              1,
              1,
              1000,
              5,
              4000,
              10,
              8000,
              15,
              12000,
              20,
              100000,
              25,
              1000000,
              30,
            ],
            "circle-color": [
              "interpolate",
              ["linear"],
              ["get", "cases"],
              1,
              "#CC0099",
              5000,
              "#CCFF00",
              10000,
              "#CCCC00",
              25000,
              "#6600FF",
              50000,
              "#3300FF",
              75000,
              "#0000FF",
              1000000,
              "#CC0000",
            ],
          },
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        map.on("mousemove", "circles", (e) => {
          const id = e.features[0].properties.id;

          if (id) {
            const { cases, deaths, province } = e.features[0].properties;

            const coordinates = e.features[0].geometry.coordinates.slice();

            const provinceHTML =
              province !== "null" ? `<p>State: ${province}</p>` : "";

            const mortalityRate = ((deaths / cases) * 100).toFixed(2);

            const HTML = `<div class='popup'>
                ${provinceHTML}
                <p>Cases: ${cases}</p>
                <p>Deaths: ${deaths}</p>
                <p>Mortality Rate: ${mortalityRate}%</p></div>
                `;

            popup.setLngLat(coordinates).setHTML(HTML).addTo(map);
          }
        });

        map.on("mouseleave", "circles", function () {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      });
    }
  }, [indiaData]);

  return (
    <React.Fragment>
      {indiaData ? (
        <div className="map">
          <h2 id="map_title">Map Representation of COVID Cases in India</h2>
          <div className="mapContainer">
            {/* Mapbox Container */}
            <div className="mapBox" ref={mapboxElRef} />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}
