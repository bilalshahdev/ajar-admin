"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-geosearch/dist/geosearch.css";

import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";

const PolygonDrawer = ({
  onPolygonDrawn,
}: {
  onPolygonDrawn?: (points: { lat: number; lng: number }[]) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        marker: false,
        polyline: false,
        rectangle: false,
        circle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (event: any) {
      const layer = event.layer;
      drawnItems.addLayer(layer);

      const latlngs = layer.getLatLngs()[0].map((point: any) => ({
        lat: point.lat,
        lng: point.lng,
      }));

      console.log("lat lngs", latlngs);

      onPolygonDrawn?.(latlngs);
    });

    // 🧭 Add search control
    const provider = new OpenStreetMapProvider();
    const searchControl = GeoSearchControl({
      provider,
      style: "bar",
      showMarker: true,
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: "Enter location",
      keepResult: true,
    });

    map.addControl(searchControl);

    return () => {
      map.removeControl(drawControl);
      map.removeControl(searchControl);
    };
  }, [map, onPolygonDrawn]);

  return null;
};

const PolygonDrawMap = ({
  onPolygonDrawn,
}: {
  onPolygonDrawn?: (points: { lat: number; lng: number }[]) => void;
}) => {
  return (
    <MapContainer
      center={[33.6844, 73.0479]}
      zoom={12}
      scrollWheelZoom={true}
      style={{
        height: "500px",
        width: "100%",
        zIndex: 0,
        position: "relative",
      }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PolygonDrawer onPolygonDrawn={onPolygonDrawn} />
    </MapContainer>
  );
};

export default PolygonDrawMap;
