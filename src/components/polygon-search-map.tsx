"use client";

import L, { LeafletEvent } from "leaflet";
import "leaflet-draw";
import { useTheme } from "next-themes";
import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Input } from "./ui/input";

interface Props {
  onUserPolygonDrawn?: (points: { lat: number; lng: number }[][]) => void;
  polygons?: { lat: number; lng: number }[][]; // passed from form
}

export interface PolygonSearchMapRef {
  clearMap: () => void;
}

const PolygonSearchMapComponent = forwardRef<PolygonSearchMapRef, Props>(
  ({ onUserPolygonDrawn, polygons }, ref) => {
    const map = useMap();
    const drawnItems = useRef(new L.FeatureGroup()).current;
    const [geoJsonLayer, setGeoJsonLayer] = useState<L.GeoJSON | null>(null);

    // ⛳ DrawControl
    useEffect(() => {
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

        const latLngs = layer.getLatLngs()[0].map((pt: any) => ({
          lat: pt.lat,
          lng: pt.lng,
        }));

        onUserPolygonDrawn?.([latLngs]);
      });

      return () => {
        map.removeControl(drawControl);
      };
    }, [map, onUserPolygonDrawn, drawnItems]);

    // 📍 Load existing polygons when editing
    useEffect(() => {
      if (polygons && polygons.length > 0) {
        drawnItems.clearLayers(); // remove previous

        polygons.forEach((polygonCoords) => {
          const latLngs = polygonCoords.map(
            (pt) => new L.LatLng(pt.lat, pt.lng)
          );
          const polygon = L.polygon(latLngs, {
            color: "#007bff",
            weight: 2,
            fillOpacity: 0.3,
          });

          drawnItems.addLayer(polygon);
        });

        // Fit bounds to existing polygons
        const bounds = L.latLngBounds(
          polygons.flat().map((pt) => [pt.lat, pt.lng])
        );
        map.fitBounds(bounds);
      }
    }, [polygons, map, drawnItems]);

    // 🌍 Search Location Handler
    const handlePlaceSearch = async (place: string) => {
      const url = `https://nominatim.openstreetmap.org/search?format=geojson&q=${encodeURIComponent(
        place
      )}&polygon_geojson=1`;

      try {
        const res = await fetch(url);
        const geojson = await res.json();

        if (!geojson.features || geojson.features.length === 0) return;

        const feature = geojson.features[0];
        const coordinates = feature.geometry.coordinates;
        const type = feature.geometry.type;

        let latLngArray: { lat: number; lng: number }[][] = [];

        if (type === "Polygon") {
          latLngArray = [
            coordinates[0].map(([lng, lat]: [number, number]) => ({
              lat,
              lng,
            })),
          ];
        } else if (type === "MultiPolygon") {
          latLngArray = coordinates.map((polygon: [number, number][][]) =>
            polygon[0].map(([lng, lat]) => ({ lat, lng }))
          );
        }

        onUserPolygonDrawn?.(latLngArray);

        // Remove old layer if any
        if (geoJsonLayer) {
          map.removeLayer(geoJsonLayer);
        }

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
        console.error("Search failed:", err);
      }
    };

    // 🧹 Clear function
    useImperativeHandle(ref, () => ({
      clearMap: () => {
        drawnItems.clearLayers();
        if (geoJsonLayer) {
          map.removeLayer(geoJsonLayer);
        }
      },
    }));

    return (
      <div style={{ position: "relative" }}>
        <Input
          className="w-full max-w-xs z-[2000] absolute top-2 left-14"
          onWheel={(e) => e.preventDefault()}
          type="text"
          placeholder="Search a place (e.g. Pakistan)"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handlePlaceSearch((e.target as any).value);
            }
          }}
        />
      </div>
    );
  }
);
PolygonSearchMapComponent.displayName = "PolygonSearchMapComponent";

// 📍 Wrapper with Theme + MapContainer
const PolygonSearchMap = forwardRef<PolygonSearchMapRef, Props>(
  ({ onUserPolygonDrawn, polygons }, ref) => {
    const { theme } = useTheme();

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
        center={[30.3753, 69.3451]}
        zoom={5}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "100%", zIndex: 0 }}
      >
        <PolygonSearchMapComponent
          ref={ref}
          polygons={polygons}
          onUserPolygonDrawn={onUserPolygonDrawn}
        />
        <TileLayer url={tileUrl} attribution={attribution} />
      </MapContainer>
    );
  }
);
PolygonSearchMap.displayName = "PolygonSearchMap";

export default PolygonSearchMap;
