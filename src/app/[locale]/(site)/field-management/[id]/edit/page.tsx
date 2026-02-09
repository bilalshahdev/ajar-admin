import Container from "@/components/Container";
import FieldForm from "@/components/forms/FieldForm";
export default async function EditFieldPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <Container title="editField">
      <FieldForm id={id} />
    </Container>
  );
}
