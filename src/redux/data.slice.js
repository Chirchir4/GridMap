import { getDatabase, ref, set, get, child } from "firebase/database";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chats: [],
    users: [],
    receiverId:"",
    chatMessages:[],
    trackHistory:[]
};

export const allData = createSlice({
    name: "globals",
    initialState,
    reducers: {
        setAllChats: (state, action) => {
            console.log("CHAAAAAAAAAAAAAATS",action.payload)
            state.chats = action.payload;
        },
        setAllUsers: (state, action) => {
            console.log("USUUUUUUUUUUSERS",action.payload)
            state.users = action.payload;
        },
        setReceiverID: (state, action) => {
         
            state.receiverId = action.payload;
        },
        setChatMessages: (state, action) => {    
            console.log("MEEEEEEEEEEEE",action.payload) 
            state.chatMessages = action.payload;
        },
        setTrackHistory: (state, action) => {
            state.trackHistory = action.payload;
         }
    }
});

export const { setAllChats, setAllUsers,setReceiverID,setChatMessages, setTrackHistory } = allData.actions;

export default allData.reducer;
