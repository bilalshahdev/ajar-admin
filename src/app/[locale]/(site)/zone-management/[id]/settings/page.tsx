import Container from "@/components/Container";
import ZoneSettings from "@/components/pages/ZoneSettings";

const SettingsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <Container title="Zone Settings">
      <ZoneSettings />
    </Container>
  );
};

export default SettingsPage;
