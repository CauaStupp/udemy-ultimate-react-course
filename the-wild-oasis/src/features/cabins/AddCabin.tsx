import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
import { FadeIn } from "@/styles/animations";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opensWindowName="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <FadeIn>
          <CreateCabinForm />
        </FadeIn>
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
