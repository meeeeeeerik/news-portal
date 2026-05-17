import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BookmarksState } from '../../types';

const load = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem('np_bookmarks') || '[]');
  } catch {
    return [];
  }
};

const initialState: BookmarksState = { bookmarkedIds: load() };

const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const idx = state.bookmarkedIds.indexOf(id);
      if (idx >= 0) state.bookmarkedIds.splice(idx, 1);
      else state.bookmarkedIds.push(id);
      localStorage.setItem('np_bookmarks', JSON.stringify(state.bookmarkedIds));
    },
    clearBookmarks: (state) => {
      state.bookmarkedIds = [];
      localStorage.removeItem('np_bookmarks');
    },
  },
});

export const { toggleBookmark, clearBookmarks } = bookmarksSlice.actions;
export default bookmarksSlice.reducer;
