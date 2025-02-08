import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001';

// Fetch enrollments for a user
export const fetchEnrollments = createAsyncThunk('enrollments/fetchEnrollments', async (userId) => {
  const response = await axios.get(`${API_URL}/enrollments?userId=${userId}`);
  return response.data;
});

// Enroll in a new course
export const enrollInCourse = createAsyncThunk('enrollments/enrollInCourse', async ({ userId, courseId }) => {
  const response = await axios.post(`${API_URL}/enrollments`, {
    userId,
    courseId,
    progress: 0,
    completed: false,
    enrollmentDate: new Date().toISOString(),
  });
  return response.data;
});

// Mark course as completed (updates DB)
export const markAsCompleted = createAsyncThunk('enrollments/markAsCompleted', async (enrollmentId) => {
  const response = await axios.patch(`${API_URL}/enrollments/${enrollmentId}`, {
    completed: true,
    progress: 100
  });
  return response.data;
});

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = 'succeeded';
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(markAsCompleted.fulfilled, (state, action) => {
        const enrollment = state.items.find(e => e.id === action.payload.id);
        if (enrollment) {
          enrollment.completed = true;
          enrollment.progress = 100;
        }
      });
  },
});

export default enrollmentsSlice.reducer;
