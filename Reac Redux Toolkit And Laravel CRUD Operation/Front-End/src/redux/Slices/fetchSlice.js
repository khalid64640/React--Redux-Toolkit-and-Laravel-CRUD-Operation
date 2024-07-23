import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  status: "idle",
  error: null,
};

// Define the async thunk for fetching users
export const fetchUser = createAsyncThunk("fetchUser", async () => {
  const response = await axios.get(`http://127.0.0.1:8000/api/users`);
  return response.data;
});

// Insert the data into the store or database
export const formDataStore = createAsyncThunk(
  "formDataStore",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/store",
        payload
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a record from the User Table
export const DeleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/delete/${id}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// this method just update the modal data 
export const updateformData = createAsyncThunk(
  "users/formDataStore",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/update/${id}`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// this method just show id related record in the modal input 
export const updateUser = createAsyncThunk("users/updateUser", async (id) => {
  const response = await axios.get(`http://127.0.0.1:8000/api/getData/${id}`);
  return response.data;
});



const fetchSlice = createSlice({
  name: "fetchSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch users
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = action.payload;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    // Insert new data
    builder.addCase(formDataStore.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(formDataStore.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users.push(action.payload);
    });
    builder.addCase(formDataStore.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Delete user
    builder.addCase(DeleteUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(DeleteUser.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.users = state.users.filter((user) => user.id !== action.payload.id);
    });
    builder.addCase(DeleteUser.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });

    // Update user
    builder.addCase(updateformData.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateformData.fulfilled, (state, action) => {
      state.status = "succeeded";
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    });
    builder.addCase(updateformData.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export default fetchSlice.reducer;
