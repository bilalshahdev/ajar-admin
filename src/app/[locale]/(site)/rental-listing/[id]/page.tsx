import Container from "@/components/container";
import RentalListingDetail from "@/components/pages/rental-details";

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
