import Container from "@/components/Container";
import Categories from "@/components/pages/Categories";

const CategoryManagementPage = () => {
  return (
    <Container title="categoryManagement" addBtnTitle="category" className="">
      <Categories />
    </Container>
  );
};

export default CategoryManagementPage;
