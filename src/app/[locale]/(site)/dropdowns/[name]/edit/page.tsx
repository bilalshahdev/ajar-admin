import Container from "@/components/Container";
import DropdownDetails from "@/components/pages/DropdownDetailPage";

const EditDropdown = async ({
  params,
}: {
  params: Promise<{ name: string }>;
}) => {
  const { name } = await params;
  return (
    <Container title="Edit Dropdown">
      <DropdownDetails name={name} />
    </Container>
  );
};

export default EditDropdown;
