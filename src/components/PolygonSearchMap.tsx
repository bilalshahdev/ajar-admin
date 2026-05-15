"use client";

import L, { LeafletEvent } from "leaflet";
import "leaflet-draw";
import { useTheme } from "next-themes";
import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { Input } from "./ui/input";

interface Props {
  onUserPolygonDrawn?: (points: { lat: number; lng: number }[][]) => void;
  polygons?: { lat: number; lng: number }[][];
}

export interface PolygonSearchMapRef {
  clearMap: () => void;
}

const collectAllPolygons = (
  drawnItems: L.FeatureGroup
): { lat: number; lng: number }[][] => {
  return drawnItems.getLayers().map((l: any) => {
    const latLngs = l.getLatLngs();
    const ring = Array.isArray(latLngs[0]) ? latLngs[0] : latLngs;
    return ring.map((pt: any) => ({ lat: pt.lat, lng: pt.lng }));
  });
};

const PolygonSearchMapComponent = forwardRef<PolygonSearchMapRef, Props>(
  ({ onUserPolygonDrawn, polygons }, ref) => {
    const map = useMap();
    const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());
    const drawnItems = drawnItemsRef.current;

    // ✅ Key fix: once the user interacts (draw/edit/delete/search),
    // we stop syncing from props so deletions aren't reverted.
    const userHasControl = useRef(false);

    // ⛳ Setup draw control + event listeners — runs ONCE
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

      const onCreated = (event: LeafletEvent) => {
        userHasControl.current = true;
        const layer = (event as any).layer;
        drawnItems.addLayer(layer);
        onUserPolygonDrawn?.(collectAllPolygons(drawnItems));
      };

      const onEdited = () => {
        userHasControl.current = true;
        onUserPolygonDrawn?.(collectAllPolygons(drawnItems));
      };

      const onDeleted = () => {
        userHasControl.current = true;
        // Collect whatever remains after deletion (may be empty array)
        onUserPolygonDrawn?.(collectAllPolygons(drawnItems));
      };

      map.on(L.Draw.Event.CREATED, onCreated);
      map.on(L.Draw.Event.EDITED, onEdited);
      map.on(L.Draw.Event.DELETED, onDeleted);

      return () => {
        map.removeControl(drawControl);
        map.removeLayer(drawnItems);
        map.off(L.Draw.Event.CREATED, onCreated);
        map.off(L.Draw.Event.EDITED, onEdited);
        map.off(L.Draw.Event.DELETED, onDeleted);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [map]);

    // 📍 Load polygons from props ONLY on initial edit-mode open
    useEffect(() => {
      if (userHasControl.current) return;      // user is driving — don't overwrite
      if (!polygons || polygons.length === 0) return;
      if (drawnItems.getLayers().length > 0) return; // already loaded once

      polygons.forEach((polygonCoords) => {
        const latLngs = polygonCoords.map((pt) => new L.LatLng(pt.lat, pt.lng));
        const polygon = L.polygon(latLngs, {
          color: "#007bff",
          weight: 2,
          fillOpacity: 0.3,
        });
        drawnItems.addLayer(polygon);
      });

      const bounds = L.latLngBounds(
        polygons.flat().map((pt) => [pt.lat, pt.lng] as [number, number])
      );
      map.fitBounds(bounds);
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

        let latLngArrays: { lat: number; lng: number }[][] = [];

        if (type === "Polygon") {
          latLngArrays = [
            coordinates[0].map(([lng, lat]: [number, number]) => ({ lat, lng })),
          ];
        } else if (type === "MultiPolygon") {
          latLngArrays = coordinates.map((polygon: [number, number][][]) =>
            polygon[0].map(([lng, lat]) => ({ lat, lng }))
          );
        }

        userHasControl.current = true;

        latLngArrays.forEach((coords) => {
          const latLngs = coords.map((pt) => new L.LatLng(pt.lat, pt.lng));
          const polygon = L.polygon(latLngs, {
            color: "#007bff",
            weight: 2,
            fillOpacity: 0.3,
          });
          drawnItems.addLayer(polygon);
        });

        const bounds = L.latLngBounds(
          latLngArrays.flat().map((pt) => [pt.lat, pt.lng] as [number, number])
        );
        map.fitBounds(bounds);

        onUserPolygonDrawn?.(collectAllPolygons(drawnItems));
      } catch (err) {
        console.error("Search failed:", err);
      }
    };

    // 🧹 Clear (called after form submit)
    useImperativeHandle(ref, () => ({
      clearMap: () => {
        drawnItems.clearLayers();
        userHasControl.current = false; // reset so next dialog open loads from props
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
              handlePlaceSearch((e.target as HTMLInputElement).value);
            }
          }}
        />
      </div>
    );
  }
);
PolygonSearchMapComponent.displayName = "PolygonSearchMapComponent";

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
        style={{ height: "250px", width: "100%", zIndex: 0 }}
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