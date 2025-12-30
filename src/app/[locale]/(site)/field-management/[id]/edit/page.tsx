import Container from "@/components/Container";
import FieldForm from "@/components/forms/FieldForm";
export default async function EditFieldPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id)
  return (
    <Container title="Edit Field">
      <FieldForm id={id} />
    </Container>
  );
}
