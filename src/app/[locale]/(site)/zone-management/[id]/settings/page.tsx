import Container from "@/components/container";
import ZoneSettings from "@/components/pages/zone-settings";

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
