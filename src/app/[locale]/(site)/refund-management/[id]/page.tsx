import Container from "@/components/Container";
import RefundDetails from "@/components/pages/RefundDetails";

const RefundDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Container title="refundDetails">
      <RefundDetails id={id} />
    </Container>
  );
};

export default RefundDetailPage;
