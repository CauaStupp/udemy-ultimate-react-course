export type CabinsType = {
  id: number;
  created_at: string;
  name: string;
  max: number;
  regular_price: number;
  discount: number;
  description: string;
  image: string;
};

export type CreateCabinType = {
  id?: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList | string;
};

export type CabinTypeMod = {
  id: number;
  name: string;
  regularPrice: number;
  description: string;
  discount: number;
  image: string;
  maxCapacity: number;
};

export type CabinDataToSave = Omit<CreateCabinType, "image"> & {
  image: File | string;
};
