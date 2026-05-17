import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { NewsState, Category, Article } from '../../types';
import { generateMockArticles } from '../../utils/mockData';

const PAGE_SIZE = 12;
const allArticles = generateMockArticles();

const initialState: NewsState = {
  articles: [],
  featuredArticles: [],
  activeCategory: 'all',
  searchQuery: '',
  selectedArticle: null,
  isLoading: false,
  error: null,
  page: 1,
  hasMore: true,
};

export const fetchArticles = createAsyncThunk(
  'news/fetchArticles',
  async ({ category, page, query }: { category: Category; page: number; query: string }) => {
    await new Promise((r) => setTimeout(r, 500));
    let filtered =
      category === 'all' ? allArticles : allArticles.filter((a) => a.category === category);
    if (query.trim()) {
      const q = query.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    const start = (page - 1) * PAGE_SIZE;
    const slice = filtered.slice(start, start + PAGE_SIZE);
    return {
      articles: slice,
      hasMore: start + PAGE_SIZE < filtered.length,
      page,
      replace: page === 1,
    };
  },
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<Category>) => {
      state.activeCategory = action.payload;
      state.page = 1;
      state.articles = [];
      state.hasMore = true;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
      state.articles = [];
    },
    setSelectedArticle: (state, action: PayloadAction<Article | null>) => {
      state.selectedArticle = action.payload;
    },
    clearSearch: (state) => {
      state.searchQuery = '';
      state.page = 1;
      state.articles = [];
    },
    loadFeatured: (state) => {
      state.featuredArticles = allArticles.filter((a) => a.isFeatured).slice(0, 5);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        const { articles, hasMore, page, replace } = action.payload;
        state.articles = replace ? articles : [...state.articles, ...articles];
        state.hasMore = hasMore;
        state.page = page;
      })
      .addCase(fetchArticles.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Failed to load articles';
      });
  },
});

export const { setCategory, setSearchQuery, setSelectedArticle, clearSearch, loadFeatured } =
  newsSlice.actions;
export default newsSlice.reducer;
