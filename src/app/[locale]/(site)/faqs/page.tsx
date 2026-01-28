import Container from "@/components/Container";
import Faqs from "@/components/pages/Faqs";
import FaqForm from "@/components/forms/FaqForm";

const FaqsPage = () => {
  return (
    <Container
      title="FAQs"
      addBtnTitle="FAQ"
      isDialog
      dialogContent={<FaqForm />}
    >
      <Faqs />
    </Container>
  );
};

export default FaqsPage;
