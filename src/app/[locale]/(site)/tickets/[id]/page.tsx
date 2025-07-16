import Container from "@/components/container";
import TicketDetails from "@/components/pages/ticket-details";

const TicketDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Container title="Ticket Details">
      <TicketDetails id={id} />
    </Container>
  );
};

export default TicketDetailsPage;
