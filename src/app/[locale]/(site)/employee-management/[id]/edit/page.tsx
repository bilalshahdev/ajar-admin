import Container from "@/components/Container";
import EmployeeForm from "@/components/forms/EmployeeForm";
const EditEmployeePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Container title="editEmployee">
      <EmployeeForm id={id} />
    </Container>
  );
};

export default EditEmployeePage;
