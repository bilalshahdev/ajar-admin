import React from "react";
import BusinessNavMenu from "@/components/pages/business-settings/business-nav-menu";
import Container from "@/components/container";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container title="Business Settings">
      <BusinessNavMenu />
      <div>{children}</div>
    </Container>
  );
};

export default layout;
