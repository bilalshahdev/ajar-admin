
import Container from "@/components/container"
import StaffForm from "@/components/forms/staff-form";
const EditStaffPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Container title="Edit Staff">
      <StaffForm id={id} />
    </Container>
  )
}

export default EditStaffPage
