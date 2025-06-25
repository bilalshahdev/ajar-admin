import CategoryForm from "@/components/forms/category-form";
import Container from "@/components/container";

const EditCategoryPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <Container title="Edit Category">
      <CategoryForm id={id} />
    </Container>
  );
};

export default EditCategoryPage;
