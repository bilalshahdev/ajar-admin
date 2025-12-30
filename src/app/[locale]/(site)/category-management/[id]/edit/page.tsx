import CategoryForm from "@/components/forms/CategoryForm";
import Container from "@/components/Container";

const EditCategoryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Container title="Edit Category">
      <CategoryForm id={id} />
    </Container>
  );
};

export default EditCategoryPage;
