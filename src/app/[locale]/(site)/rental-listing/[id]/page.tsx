import Container from "@/components/Container";
import RentalListingDetail from "@/components/pages/RentalDetails";

const RentalListingDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <Container title="Rental Listing">
      <RentalListingDetail id={id} />
    </Container>
  );
};

export default RentalListingDetailPage;
