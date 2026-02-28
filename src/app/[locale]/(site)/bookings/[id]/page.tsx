import Container from "@/components/Container";
import BookingDetail from "@/components/pages/BookingDetail";

const BookingDetailPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    return (
        <Container title="booking">
            <BookingDetail id={id} />
        </Container>
    );
};

export default BookingDetailPage;
