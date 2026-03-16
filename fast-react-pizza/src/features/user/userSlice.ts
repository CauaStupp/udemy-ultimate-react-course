import { getAddress } from "@/services/apiGeocoding";
import type { RootState } from "@/store";
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

type PositionType = {
  coords: {
    latitude: number;
    longitude: number;
  };
};

function getPosition(): Promise<PositionType> {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk("user/fetchAddress", async () => {
  const positionObj = await getPosition();
  const position = {
    latitude: positionObj.coords.latitude,
    longitude: positionObj.coords.longitude,
  };

  const addressObj = await getAddress(position);

  const locality = addressObj?.locality || "";
  const city = addressObj?.city !== locality ? addressObj?.city : "";

  const address = [
    locality,
    city,
    addressObj?.postcode,
    addressObj?.countryName,
  ]
    .filter(Boolean)
    .join(", ");

  return { position, address };
});

type InitialStateType = {
  username: string;
  status: string;
  position: {
    latitude: number;
    longitude: number;
  };
  address: string;
  error: string;
};

const initialState: InitialStateType = {
  username: "",
  status: "idle",
  position: {
    latitude: 0,
    longitude: 0,
  },
  address: "",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.status = "done";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle";
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error = "Dont find your location. Try fill this field";
      });
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (state: RootState) => state.user;
