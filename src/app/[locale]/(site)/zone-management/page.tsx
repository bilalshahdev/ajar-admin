import Container from "@/components/Container";
import ZoneForm from "@/components/forms/ZoneForm";
import Zones from "@/components/pages/Zones";

const ZoneManagementPage = () => {
  return (
    <Container
      title="zoneManagement"
      addBtnTitle="zone"
      isDialog
      dialogContent={<ZoneForm />}
    >
      <Zones />
    </Container>
  );
};

export default ZoneManagementPage;
