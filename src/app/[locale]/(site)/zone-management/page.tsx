import Container from "@/components/Container";
import ZoneForm from "@/components/forms/ZoneForm";
import Zones from "@/components/pages/Zones";

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
