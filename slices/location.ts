import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dispatch} from "react";

interface ILocalization {
  location: ILocalizationSlice;
}

export interface ILocalizationSlice {
  city: string | null;
  country: string | null;
  district: string | null;
  isoCountryCode: string | null;
  name: string | null;
  postalCode: string | null;
  region: string | null;
  street: string | null;
  subregion: string | null;
  timezone: string | null;
  isInitialized: boolean;
}

const initialState: ILocalization = {
  location: {
    city: null,
    country: null,
    district: null,
    isoCountryCode: null,
    name: null,
    postalCode: null,
    region: null,
    street: null,
    subregion: null,
    timezone: null,
    isInitialized: false
  }
};

const slice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocalization(state, action: PayloadAction<ILocalizationSlice>) {
      state.location = action.payload
      state.location.isInitialized = true;
    }
  }
});

export const { reducer } = slice;

export const storeLocalization = (localization: ILocalizationSlice) => async (dispatch: Dispatch<any>) => {
  dispatch(slice.actions.setLocalization(localization));
};

export default slice;
