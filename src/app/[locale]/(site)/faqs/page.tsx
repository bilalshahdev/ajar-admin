import Container from "@/components/container";
import Faqs from "@/components/pages/faqs";
import FaqForm from "@/components/forms/faq-form";

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
