"use client";

import Container from "@/components/container";
import PolygonDrawMap from "@/components/PolygonDrawMap";
import Zones from "@/components/zones";

const ZoneManagementPage = () => {
  return (
    <Container title="Zone Management" addBtnTitle="Zone">
      <PolygonDrawMap
        onPolygonDrawn={(points) => console.log("Polygon:", points)}
      />
      <Zones />
    </Container>
  );
};

export default ZoneManagementPage;
