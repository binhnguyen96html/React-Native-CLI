import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import User from './reducers/user';
import Categories from './reducers/categories';
import Donations from './reducers/donations';

const rootReducer = combineReducers({
  categories: Categories,
  user: User,
  donations: Donations
});

const configuration = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};

const persistedReducer = persistReducer(configuration, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },

});

export default store;
export const persistor = persistStore(store);

//persistor.purge()

