
import Container from "@/components/Container"
import StaffForm from "@/components/forms/StaffForm";
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
