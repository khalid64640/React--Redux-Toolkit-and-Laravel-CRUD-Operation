// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';


// const initialState = {
//     formData: {
//          name: '',
//          fname: '',
//          province: '',
//          phone: '',
//     },      
// }


// export const formDataStore = createAsyncThunk(
//   "save-data",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://127.0.0.1:8000/api/store",
//         payload
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const formSlice = createSlice({
//   name: "form",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(formDataStore.pending, (state) => {
//         // Handle the pending state if needed
//       })
//       .addCase(formDataStore.fulfilled, (state, action) => {
//         // Handle the fulfilled state and update the form data
//         state.formData = action.payload;
//       })
//       .addCase(formDataStore.rejected, (state, action) => {
//         // Handle the rejected state and any error data
//         console.error("Error saving form data:", action.payload);
//       });
//   },
// });

// export const { updateFormData } = formSlice.actions;

// export default formSlice.reducer;