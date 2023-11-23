import { configureStore } from "@reduxjs/toolkit";
import ModeChangerReducer from "./Reducers/ModeChangerReducer";
import ItemsReducer from "./Reducers/ItemsReducer";
import CollectionReducer from "./Reducers/CollectionReducer";
import TagsReducer from "./Reducers/TagsReducer";
import LoggedUserReducer from "./Reducers/LoggedUserReducer";

export const store = configureStore({
  reducer: {
    modeChanger: ModeChangerReducer,
    items: ItemsReducer,
    collections: CollectionReducer,
    tags: TagsReducer,
    loggedUser: LoggedUserReducer,
  },
});
