import Container from "@/components/Container";
import Faqs from "@/components/pages/Faqs";
import FaqForm from "@/components/forms/FaqForm";

const FaqsPage = () => {
  return (
    <Container
      title="faqs"
      addBtnTitle="faq"
      isDialog
      dialogContent={<FaqForm />}
    >
      <Faqs />
    </Container>
  );
};

export default FaqsPage;
