import Container from "@/components/container";
import Categories from "@/components/pages/categories";

const CategoryManagementPage = () => {
  return (
    <Container title="Category Management" addBtnTitle="Category" className="">
      <Categories />
    </Container>
  );
};

export default CategoryManagementPage;
