import CreateUser from "@/features/user/CreateUser";
import { useAppSelector } from "@/hooks/reduxExtends";
import { Navigate } from "react-router-dom";

function Home() {
  const user = useAppSelector((state) => state.user);

  if (user.username) return <Navigate to="/menu" />;
  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="text-xl font-semibold mb-8 md:text-3xl">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      <CreateUser />
    </div>
  );
}

export default Home;
