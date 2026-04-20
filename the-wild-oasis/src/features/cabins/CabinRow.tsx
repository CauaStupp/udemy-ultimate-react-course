import Row from "@/ui/Row";
import Modal from "@/ui/Modal";
import Table from "@/ui/Table";
import ConfirmDelete from "@/ui/ConfirmDelete";
import CreateCabinForm from "./CreateCabinForm";
import {
  useCreateCabinMutation,
  useDeleteCabinMutation,
} from "./cabinMutations";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import styled from "styled-components";
import { formatCurrency } from "@/utils/helpers";
import type { CabinsType } from "@/@types/cabinsType";
import Menus from "@/ui/Menus";

const Img = styled.img`
  display: block;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: ${(props) => props.theme.borderRadius.sm};
  min-width: 6rem;
`;

const FakeImg = styled.div`
  aspect-ratio: 3 / 2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.grey[500]};
  background-color: ${(props) => props.theme.colors.grey[200]};
  font-size: 1rem;
  width: 6rem;
  border-radius: ${(props) => props.theme.borderRadius.sm};
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${(props) => props.theme.colors.grey[600]};
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: ${(props) => props.theme.colors.green[700]};
`;

type CabinProps = {
  cabin: CabinsType;
};

function CabinRow({ cabin }: CabinProps) {
  const { isDeleting, mutateDeleteCabin } = useDeleteCabinMutation();
  const { isCreating, mutateCreateCabin } = useCreateCabinMutation();

  function handleDuplicate() {
    mutateCreateCabin({
      name: `Copy of ${cabin.name}`,
      description: cabin.description,
      discount: cabin.discount,
      image: cabin.image,
      maxCapacity: cabin.max,
      regularPrice: cabin.regular_price,
    });
  }

  const cabinEdit = {
    id: cabin.id,
    name: cabin.name,
    regularPrice: cabin.regular_price,
    description: cabin.description,
    discount: cabin.discount,
    image: cabin.image,
    maxCapacity: cabin.max,
  };

  return (
    <Table.Row>
      {!cabin.image ? (
        <FakeImg>N / A</FakeImg>
      ) : (
        <Img src={cabin.image} alt={cabin.name} />
      )}

      <Cabin>{cabin.name}</Cabin>
      <div>Fits up to {cabin.max} guests</div>
      <Price>{formatCurrency(cabin.regular_price)}</Price>
      <Discount>{formatCurrency(cabin.discount)}</Discount>
      <Row $direction="row">
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabin.id} />

            <Menus.List id={cabin.id}>
              <Menus.Button onClick={handleDuplicate} disabled={isCreating}>
                <HiSquare2Stack />
                Duplicate
              </Menus.Button>

              <Modal.Open opensWindowName="edit-modal">
                <Menus.Button>
                  <HiPencil />
                  Edit
                </Menus.Button>
              </Modal.Open>

              <Modal.Open opensWindowName="delete-cabin">
                <Menus.Button>
                  <HiTrash />
                  Delete
                </Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-modal">
              <CreateCabinForm cabinEdit={cabinEdit} />
            </Modal.Window>

            <Modal.Window name="delete-cabin">
              <ConfirmDelete
                disabled={isDeleting}
                resourceName={cabin.name}
                onConfirm={() =>
                  mutateDeleteCabin({ id: cabin.id, imagePath: cabin.image })
                }
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </Row>
    </Table.Row>
  );
}

export default CabinRow;
