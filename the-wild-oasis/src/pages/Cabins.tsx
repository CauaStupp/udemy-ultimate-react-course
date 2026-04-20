import AddCabin from "@/features/cabins/AddCabin";
import CabinTable from "@/features/cabins/CabinTable";
import CabinTableOperations from "@/features/cabins/CabinTableOperations";
import { FadeIn } from "@/styles/animations";
import { Heading } from "@/ui/Heading";
import Row from "@/ui/Row";

function Cabins() {
  return (
    <>
      <FadeIn>
        <Row $direction="row">
          <Heading>All cabins</Heading>
          <CabinTableOperations />
        </Row>
      </FadeIn>

      <FadeIn>
        <Row $direction="column">
          <AddCabin />
          <CabinTable />
        </Row>
      </FadeIn>
    </>
  );
}

export default Cabins;
