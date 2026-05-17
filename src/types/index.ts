export type Category =
  | 'all'
  | 'technology'
  | 'business'
  | 'sports'
  | 'science'
  | 'health'
  | 'entertainment'
  | 'politics';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  source: string;
  category: Category;
  imageUrl: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  views: number;
  isFeatured?: boolean;
}

export interface NewsState {
  articles: Article[];
  featuredArticles: Article[];
  activeCategory: Category;
  searchQuery: string;
  selectedArticle: Article | null;
  isLoading: boolean;
  error: string | null;
  page: number;
  hasMore: boolean;
}

export interface BookmarksState {
  bookmarkedIds: string[];
}

export interface UIState {
  darkMode: boolean;
  searchOpen: boolean;
}
