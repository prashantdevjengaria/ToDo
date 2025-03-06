import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const DataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    updateTaskList: (state, {payload}) => {
      state.tasks = payload.tasks;
    },
  },
});

export const {updateTaskList} = DataSlice.actions;
export default DataSlice.reducer;
