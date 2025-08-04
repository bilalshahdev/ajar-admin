import Container from "@/components/container";
import ZoneForm from "@/components/forms/zone-form";
import Zones from "@/components/pages/zones";

const ZoneManagementPage = () => {
  return (
    <Container
      title="Zone Management"
      addBtnTitle="Zone"
      isDialog
      dialogContent={<ZoneForm />}
    >
      <Zones />
    </Container>
  );
};

export default ZoneManagementPage;
