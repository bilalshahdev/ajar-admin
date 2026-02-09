import Container from "@/components/Container";
import TicketDetails from "@/components/pages/TicketDetails";

const TicketDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Container title="ticketDetails">
      <TicketDetails id={id} />
    </Container>
  );
};

export default TicketDetailsPage;
