import Container from "@/components/Container";
import Categories from "@/components/pages/Categories";

const CategoryManagementPage = () => {
  return (
    <Container title="Category Management" addBtnTitle="Category" className="">
      <Categories />
    </Container>
  );
};

export default CategoryManagementPage;
