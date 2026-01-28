import React from "react";
import BusinessNavMenu from "@/components/pages/BusinessNavMenu";
import Container from "@/components/Container";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container title="Business Settings">
      <BusinessNavMenu />
      <Container>{children}</Container>
    </Container>
  );
};

export default layout;
