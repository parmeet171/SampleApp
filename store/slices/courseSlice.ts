import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loaded: false,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses(state, action) {
      state.courses = action.payload;
      state.loaded = true;
    },
    deleteCourseFromState(state, action) {
        // @ts-ignore: Ignoring TypeScript error for now
        state.courses = state.courses.filter((course) => course.id !== action.payload);
    },
    updateCourseInState(state, action) {
        // @ts-ignore: Ignoring TypeScript error for now
        const index = state.courses.findIndex(course => course.id === action.payload.id);
        if (index !== -1) {
            // @ts-ignore: Ignoring TypeScript error for now
          state.courses[index] = action.payload;
        }
      },
  },
});

export const { setCourses, deleteCourseFromState, updateCourseInState } = courseSlice.actions;
export default courseSlice.reducer;
