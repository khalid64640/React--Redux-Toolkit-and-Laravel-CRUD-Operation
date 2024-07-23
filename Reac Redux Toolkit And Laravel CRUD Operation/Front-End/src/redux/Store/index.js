import { configureStore } from "@reduxjs/toolkit";
import fetchUserReducer from "../Slices/fetchSlice";


export const store = configureStore({
  reducer: {
    users: fetchUserReducer,
    
  },
});
