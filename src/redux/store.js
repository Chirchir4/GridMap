import { createStore, combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import GlobalsReducer from '../redux/globals.slice'
import DataReducer from '../redux/data.slice'

const rootReducer = combineReducers({
  globals: GlobalsReducer,
  allData: DataReducer
});

const store = configureStore({
  reducer: rootReducer
});

export { store };
