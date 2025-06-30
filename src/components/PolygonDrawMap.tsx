"use client";

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

const PolygonDrawer = ({
  onPolygonDrawn,
}: {
  onPolygonDrawn: (points: { lat: number; lng: number }[]) => void;
}) => {
  const map = useMap(); // ✅ Correct way to get map instance in react-leaflet v4+

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
// please ignore type error 
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

      onPolygonDrawn(latlngs);
    });

    return () => {
      map.removeControl(drawControl);
    };
  }, [map, onPolygonDrawn]);

  return null;
};

const PolygonDrawMap = ({
  onPolygonDrawn,
}: {
  onPolygonDrawn: (points: { lat: number; lng: number }[]) => void;
}) => {
  return (
    <MapContainer
      center={[33.6844, 73.0479]}
      zoom={12}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PolygonDrawer onPolygonDrawn={onPolygonDrawn} />
    </MapContainer>
  );
};

export default PolygonDrawMap;
