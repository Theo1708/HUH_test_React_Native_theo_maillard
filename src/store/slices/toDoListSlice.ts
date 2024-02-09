import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '..';

const initialState : toDoListState = {
    toDoList: []
};

export const toDoListSlice = createSlice({
    name: 'toDoList',
    initialState,
    reducers: {
        createTask (state, {payload}) {
            state.toDoList.push({
                title : payload,
                completed : false,
                id : uuidv4()
            })
        },
        editTask (state, {payload}) {
            const index = state.toDoList.findIndex(task => task.id === payload.id);
            state.toDoList[index] = payload
        },
        deleteTask (state, {payload}) {
            state.toDoList = state.toDoList.filter((task) => task.id !== payload)
        }
    }
});

export const {
    createTask,
    editTask,
    deleteTask
} = toDoListSlice.actions;

export const selectToDoList = (state: RootState) => state.toDoList.toDoList;

export default toDoListSlice.reducer;