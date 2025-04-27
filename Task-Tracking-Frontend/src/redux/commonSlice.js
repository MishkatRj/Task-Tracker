import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: [
    {
      id:1,
      title:"To Do",
      tasks:[]
    },
    {
      id:2,
      title:"In Progress",
      tasks:[]
    },
    {
      id:3,
      title:"Done",
      tasks:[]
    },
  ],
};
export const commonSlice = createSlice({
  name: "commomSlice",
  initialState,
  reducers: {
    setAllTasks: (state, action) => {
      state.status = action.payload;
    },
    removeTask: (state, action) => {
      state.status = [
        {
          id:1,
          title:"To Do",
          tasks:[]
        },
        {
          id:2,
          title:"In Progress",
          tasks:[]
        },
        {
          id:3,
          title:"Done",
          tasks:[]
        },
      ];
    },
  },
});

export const { setAllTasks , removeTask } = commonSlice.actions;
export default commonSlice.reducer;
