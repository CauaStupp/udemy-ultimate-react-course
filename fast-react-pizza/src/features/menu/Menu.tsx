import { getMenu } from "@/services/apiRestaurant";
import { useLoaderData } from "react-router-dom";
import MenuItem from "./MenuItem";
import type { MenuType } from "@/@types/MenuType";

function Menu() {
  const menu = useLoaderData() as MenuType[];

  return (
    <ul className="divide-y-2 divide-stone-200 px-2 my-5">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function menuLoader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
