"use client";

import L, { LeafletEvent } from "leaflet";
import "leaflet-draw";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Input } from "./ui/input";

interface Props {
  onUserPolygonDrawn?: (points: { lat: number; lng: number }[][]) => void;
}

const PolygonSearchMapComponent = ({ onUserPolygonDrawn }: Props) => {
  const map = useMap();

  const [geoJsonLayer, setGeoJsonLayer] = useState<L.GeoJSON | null>(null);

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: false,
        rectangle: false,
        marker: false,
        circle: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (event: LeafletEvent) => {
      const layer = (event as any).layer;
      drawnItems.addLayer(layer);

      const latlngs = layer.getLatLngs()[0].map((pt: any) => ({
        lat: pt.lat,
        lng: pt.lng,
      }));
      onUserPolygonDrawn?.(latlngs);
    });

    return () => {
      map.removeControl(drawControl);
    };
  }, [map, onUserPolygonDrawn]);

  const handlePlaceSearch = async (place: string) => {
    const url = `https://nominatim.openstreetmap.org/search?format=geojson&q=${encodeURIComponent(
      place
    )}&polygon_geojson=1`;

    try {
      const res = await fetch(url);
      const geojson = await res.json();

      if (!geojson.features || geojson.features.length === 0) {
        console.warn("No features found for the searched place.");
        return;
      }

      const feature = geojson.features[0];

      // 👉 Parse & log polygon data
      const coordinates = feature.geometry.coordinates;
      const type = feature.geometry.type;

      if (type === "Polygon") {
        const latLngArray = coordinates[0].map(
          ([lng, lat]: [number, number]) => ({ lat, lng })
        );
        onUserPolygonDrawn?.([latLngArray]); // Now an array of arrays
      } else if (type === "MultiPolygon") {
        const latLngArray = coordinates.map((polygon: [number, number][][]) =>
          polygon[0].map(([lng, lat]) => ({ lat, lng }))
        );
        onUserPolygonDrawn?.(latLngArray); // 👈 Array of polygons
      }

      // Remove existing polygon if needed
      if (geoJsonLayer) {
        map.removeLayer(geoJsonLayer);
      }

      // Draw new polygon on map
      const layer = L.geoJSON(feature, {
        style: {
          color: "#007bff",
          weight: 2,
          fillOpacity: 0.3,
        },
      });

      layer.addTo(map);
      map.fitBounds(layer.getBounds());
      setGeoJsonLayer(layer);
    } catch (err) {
      console.error("Failed to fetch polygon for place:", err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <Input
        className="w-full max-w-xs z-[2000] absolute top-2 left-14 bg-background"
        onWheel={(e) => e.preventDefault()}
        type="text"
        placeholder="Search a place (e.g. Pakistan)"
        onKeyDown={(e) => {
          if (e.key === "Enter") handlePlaceSearch((e.target as any).value);
        }}
      />
    </div>
  );
};

const PolygonSearchMap = ({ onUserPolygonDrawn }: Props) => {
  const { theme } = useTheme();
  useEffect(() => {
    if (theme === "dark") {
      const style = document.createElement("style");
      style.innerHTML = `
        /* 🔲 Zoom Control Buttons */
        .leaflet-control-zoom a {
          background-color: #2d2d2d !important;
          color: #fff !important;
          border: 1px solid #444 !important;
        }
  
        .leaflet-control-zoom a:hover {
          background-color: #3a3a3a !important;
        }
  
        /* ✏️ Draw Toolbar Buttons */
        .leaflet-draw-toolbar a {
          background-color: #2d2d2d !important;
          color: #fff !important;
          border: 1px solid #444 !important;
        }
  
        .leaflet-draw-toolbar a:hover {
          background-color: #3a3a3a !important;
        }
  
        /* 🧽 Edit Toolbar (Save, Cancel, Delete) */
        .leaflet-draw-actions a {
          background-color: #2d2d2d !important;
          color: #fff !important;
          border: 1px solid #444 !important;
        }
  
        .leaflet-draw-actions a:hover {
          background-color: #3a3a3a !important;
        }
  
        /* ℹ️ Attribution */
        .leaflet-control-attribution {
          background: #1e1e1e !important;
          color: #aaa !important;
        }
  
        /* 🧭 Layer switcher or other custom buttons (if any) */
        .leaflet-control-container .leaflet-control {
          background-color: #2d2d2d !important;
          color: #fff !important;
          border: 1px solid #444 !important;
        }
      `;
      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    }
  }, [theme]);

  const tileUrl =
    theme === "dark"
      ? "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const attribution =
    theme === "dark"
      ? '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
      : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';
  return (
    <MapContainer
      center={[30.3753, 69.3451]} // Pakistan center
      zoom={5}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "100%", zIndex: 0 }}
    >
      <PolygonSearchMapComponent onUserPolygonDrawn={onUserPolygonDrawn} />
      <TileLayer url={tileUrl} attribution={attribution} />
    </MapContainer>
  );
};

export default PolygonSearchMap;
