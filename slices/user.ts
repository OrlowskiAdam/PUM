import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Dispatch} from "react";
import {IUser} from "../model/IUser";

interface IUserSlice {
  user: IUser;
}

const initialState: IUserSlice = {
  user: {
    id: 0,
    name: "",
    surname: "",
    username: "",
    points: 0,
    roles: [],
    address: {},
    isInitialized: false,
    isAuthenticated: false
  }
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.user = action.payload
      state.user.isAuthenticated = true;
      state.user.isInitialized = true;
    }
  }
});

export const { reducer } = slice;

export const storeUser = (user: IUser) => async (dispatch: Dispatch<any>) => {
  dispatch(slice.actions.login(user));
};

export const me = () => async (dispatch: Dispatch<any>) => {

};

export default slice;
