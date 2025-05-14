import {createSlice} from '@reduxjs/toolkit'

const requestSlice = createSlice({
    name: 'request',
    initialState: [],
    reducers: {
        addRequest(state, action) {
            return action.payload;
        },
        removeRequest(state, action) {
            return newarray = state.filter((request) => {
                return request._id !== action.payload._id;
            });
        }
    }
})

export const { addRequest, removeRequest } = requestSlice.actions;
export const requestReducer = requestSlice.reducer;