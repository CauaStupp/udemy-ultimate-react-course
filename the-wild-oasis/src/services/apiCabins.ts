import type { CabinDataToSave, CabinsType } from "@/@types/cabinsType";
import supabase, { supabaseUrl } from "./supabase";

export async function getCabins(): Promise<CabinsType[] | null> {
  const { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Error could not be loaded");
  }

  if (!cabins.length) return null;

  return cabins as CabinsType[];
}

export async function createNewCabin(cabin: CabinDataToSave) {
  const { name, description, discount, image, maxCapacity, regularPrice } =
    cabin;
  const hasImagePath =
    typeof image === "string" && image.startsWith(supabaseUrl);
  let imagePath = image;
  let imageName = "";

  if (!hasImagePath && image instanceof File) {
    imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const { data, error } = await supabase
    .from("cabins")
    .insert([
      {
        name: name,
        description: description,
        discount: discount,
        image: imagePath,
        max: maxCapacity,
        regular_price: regularPrice,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Error to create a new cabin!");
  }

  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError.message);
    throw new Error("Error to insert Image!");
  }

  return data;
}

export async function updateCabin(cabinToEdit: CabinDataToSave) {
  const { id, name, description, discount, image, maxCapacity, regularPrice } =
    cabinToEdit;
  const hasImagePath =
    typeof image === "string" && image.startsWith(supabaseUrl);
  let imagePath = image;
  let imageName = "";

  if (!hasImagePath && image instanceof File) {
    imageName = `${Math.random()}-${image.name}`.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  const { data, error } = await supabase
    .from("cabins")
    .update({
      name,
      description,
      discount,
      image: imagePath,
      max: maxCapacity,
      regular_price: regularPrice,
    })
    .eq("id", id)
    .select();
  if (error) {
    console.error(error.message);
    throw new Error("Error to update cabin");
  }

  if (!hasImagePath && image instanceof File) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, image);

    if (storageError) {
      // Opcional: tratar erro de upload (ex: reverter o update do banco)
      console.error(storageError.message);
      throw new Error("Cabin record updated, but image upload failed.");
    }
  }

  return data;
}

export async function deleteCabin(id: number, imagePath: string) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be deleted");
  }

  const imageName = imagePath.split("/").pop();

  if (imageName) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .remove([imageName]);
    if (storageError) {
      console.error(storageError.message);
    }
  }
}
