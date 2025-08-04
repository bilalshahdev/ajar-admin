import Container from "@/components/container";
import FieldForm from "@/components/forms/field-form";
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
