import Container from "@/components/container";
import FieldForm from "@/components/forms/field-form";
export default async function EditFieldPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <Container>
      <FieldForm id={id} />
    </Container>
  );
}
