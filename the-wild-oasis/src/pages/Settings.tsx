import Row from "@/ui/Row";
import { Heading } from "../ui/Heading";
import UpdateSettingsForm from "@/features/settings/UpdateSettingsForm";
import { FadeIn } from "@/styles/animations";

function Settings() {
  return (
    <FadeIn>
      <Row $direction="column">
        <Heading>Update hotel settings</Heading>
        <UpdateSettingsForm />
      </Row>
    </FadeIn>
  );
}

export default Settings;
