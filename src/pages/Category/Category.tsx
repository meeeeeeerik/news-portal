import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCategory, fetchArticles } from '../../features/news/newsSlice';
import { NewsCard } from '../../components/NewsCard/NewsCard';
import { SkeletonCard } from '../../components/SkeletonCard/SkeletonCard';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../../theme';
import type { Category } from '../../types';

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { articles, isLoading } = useAppSelector((s) => s.news);
  const cat = (slug || 'all') as Category;
  const color = CATEGORY_COLORS[cat] || '#E63946';

  useEffect(() => {
    dispatch(setCategory(cat));
    dispatch(fetchArticles({ category: cat, page: 1, query: '' }));
    window.scrollTo(0, 0);
  }, [cat]);

  return (
    <Box sx={{ py: { xs: 3, sm: 5 } }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 4, pb: 2, borderBottom: `3px solid ${color}` }}>
          <Typography variant="overline" fontWeight={700} sx={{ color, letterSpacing: 2 }}>
            Category
          </Typography>

          <Typography variant="h3" fontWeight={900}>
            {CATEGORY_LABELS[cat] || cat}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {articles.map((a) => (
            <Grid item xs={12} sm={6} md={4} key={a.id}>
              <NewsCard article={a} />
            </Grid>
          ))}

          {isLoading &&
            Array.from({ length: 6 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={4} key={`sk-${i}`}>
                <SkeletonCard />
              </Grid>
            ))}
        </Grid>
      </Container>
    </Box>
  );
}
