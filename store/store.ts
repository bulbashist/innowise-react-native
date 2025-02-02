import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import settingsReducer from "@/store/settings/slice";
import detailsReducer from "@/store/details/slice";
import listReducer from "@/store/list/slice";
import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["settings"],
};

const reducer = combineReducers({
  details: detailsReducer,
  list: listReducer,
  settings: settingsReducer,
});

type RootReducer = ReturnType<typeof reducer>;
const persistedReducer = persistReducer<RootReducer>(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
