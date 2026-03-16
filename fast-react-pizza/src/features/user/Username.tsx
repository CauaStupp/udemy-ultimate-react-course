import { useAppSelector } from "@/hooks/reduxExtends";

function Username() {
  const username = useAppSelector((state) => state.user.username);

  if (!username) return null;
  return (
    <div className="text-sm font-semibold hidden uppercase md:block">
      {username}
    </div>
  );
}

export default Username;
