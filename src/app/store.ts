import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/news/newsSlice';
import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    news: newsReducer,
    bookmarks: bookmarksReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
