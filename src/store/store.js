import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './slices/coursesSlice';
import enrollmentsReducer from './slices/enrollmentsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    enrollments: enrollmentsReducer,
    user: userReducer,
  },
});