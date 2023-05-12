import { getDatabase, ref, set, get, child } from "firebase/database";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    users: [],
    receiverId:"",
    chatMessages:[]
};

export const allData = createSlice({
    name: "globals",
    initialState,
    reducers: {
        setAllChats: (state, action) => {
            state.chats = action.payload;
        },
        setAllUsers: (state, action) => {
            state.users = action.payload;
        },
        setReceiverID: (state, action) => {
         
            state.receiverId = action.payload;
        },
        setChatMessages: (state, action) => {     
            state.chatMessages = action.payload;
        }
    }
});

export const { setAllChats, setAllUsers,setReceiverID,setChatMessages } = allData.actions;

export default allData.reducer;
