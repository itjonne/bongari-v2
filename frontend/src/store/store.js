import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducers/user/userSlice';
import filterReducer from '../reducers/filter/filterSlice';
import objectsReducer from '../reducers/objects/objectsSlice';
import findsReducer from '../reducers/finds/findsSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    objects: objectsReducer,
    filter: filterReducer,
    finds: findsReducer,
  },
});
