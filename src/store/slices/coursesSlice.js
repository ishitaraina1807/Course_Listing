import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchCourses = createAsyncThunk('courses/fetchCourses', async () => {
  const response = await axios.get(`${API_URL}/courses`);
  return response.data;
});

export const fetchCourseById = createAsyncThunk('courses/fetchCourseById', async (id) => {
  const response = await axios.get(`${API_URL}/courses/${id}`);
  return response.data;
});

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    selectedCourse: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
      });
  },
});

export const { setSearchTerm } = coursesSlice.actions;
export default coursesSlice.reducer;