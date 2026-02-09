import Container from "@/components/Container";
import DropdownDetails from "@/components/pages/DropdownDetailPage";
import React from "react";

const DropdownDetailPage = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;

  if (!name) return;
  return (
    <Container title="dropdownDetails">
      <DropdownDetails name={name} />
    </Container>
  );
};

export default DropdownDetailPage;
