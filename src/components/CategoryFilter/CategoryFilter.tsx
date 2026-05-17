import { Box, Container, Chip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCategory, fetchArticles } from '../../features/news/newsSlice';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../../theme';
import type { Category } from '../../types';

const CATEGORIES: Category[] = [
  'all',
  'technology',
  'business',
  'sports',
  'science',
  'health',
  'entertainment',
  'politics',
];

export function CategoryFilter() {
  const dispatch = useAppDispatch();
  const activeCategory = useAppSelector((s) => s.news.activeCategory);
  const searchQuery = useAppSelector((s) => s.news.searchQuery);
  const dark = useAppSelector((s) => s.ui.darkMode);

  function handleSelect(cat: Category) {
    dispatch(setCategory(cat));
    dispatch(fetchArticles({ category: cat, page: 1, query: searchQuery }));
  }

  return (
    <Box
      sx={{
        position: 'sticky',
        top: { xs: 56, sm: 64 },
        zIndex: 10,
        backgroundColor: dark ? 'rgba(10,12,16,0.95)' : 'rgba(248,249,252,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.06)',
        py: 1,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            overflowX: 'auto',
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
            pb: 0.5,
          }}
        >
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            const color = CATEGORY_COLORS[cat];

            return (
              <Chip
                key={cat}
                label={CATEGORY_LABELS[cat]}
                onClick={() => handleSelect(cat)}
                sx={{
                  flexShrink: 0,
                  fontWeight: 700,
                  fontSize: 13,
                  height: 32,
                  backgroundColor: active ? color : 'transparent',
                  color: active ? 'white' : 'text.secondary',
                  border: `1.5px solid ${active ? color : dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
                  '&:hover': {
                    backgroundColor: active ? color : `${color}22`,
                    borderColor: color,
                    color: active ? 'white' : color,
                  },
                  transition: 'all 0.2s',
                }}
              />
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
