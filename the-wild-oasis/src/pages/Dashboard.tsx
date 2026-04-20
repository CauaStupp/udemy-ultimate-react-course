import DashboardFilter from "@/features/dashboard/DashboardFilter";
import DashboardLayout from "@/features/dashboard/DashboardLayout";
import { FadeIn } from "@/styles/animations";
import { Heading } from "@/ui/Heading";
import Row from "@/ui/Row";

function Dashboard() {
  return (
    <>
      <FadeIn>
        <Row>
          <Heading>Dashboard</Heading>
          <DashboardFilter />
        </Row>
      </FadeIn>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
