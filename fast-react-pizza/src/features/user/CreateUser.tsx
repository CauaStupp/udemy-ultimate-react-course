import { useAppDispatch } from "@/hooks/reduxExtends";
import Button from "@/ui/Button";
import { useState, type ChangeEvent } from "react";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: ChangeEvent) {
    e.preventDefault();

    if (!username) return alert("Please insert your name!");
    if (username.length <= 2)
      return alert("The name need have 2 or more caracters");

    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        className="input w-72 capitalize"
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== "" && (
        <div className="mt-6">
          <Button type="submit">Start ordering</Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
