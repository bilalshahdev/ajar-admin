import React from "react";
import BusinessNavMenu from "@/components/pages/business-nav-menu";
import Container from "@/components/container";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container title="Business Settings">
      <BusinessNavMenu />
      <Container>{children}</Container>
    </Container>
  );
};

export default layout;
