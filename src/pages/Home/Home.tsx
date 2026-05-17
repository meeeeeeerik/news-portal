import { useEffect } from 'react';
import { Box, Container, Grid, Typography, Button, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArticles, loadFeatured } from '../../features/news/newsSlice';
import { NewsCard } from '../../components/NewsCard/NewsCard';
import { SkeletonCard } from '../../components/SkeletonCard/SkeletonCard';
import { generateMockArticles } from '../../utils/mockData';

function FeaturedHero() {
  const featured = useAppSelector((s) => s.news.featuredArticles);

  if (!featured.length) return null;

  const main = featured[0];
  const side = featured.slice(1, 4);

  return (
    <Box sx={{ mb: 5 }}>
      <Typography
        variant="overline"
        fontWeight={800}
        color="primary"
        sx={{ mb: 1, display: 'block', letterSpacing: 2 }}
      >
        Top Stories
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <NewsCard article={main} variant="featured" />
        </Grid>

        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}>
            {side.map((a) => (
              <NewsCard key={a.id} article={a} variant="compact" />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export function Home() {
  const dispatch = useAppDispatch();
  const dark = useAppSelector((s) => s.ui.darkMode);
  const { articles, isLoading, error, hasMore, page, activeCategory, searchQuery } = useAppSelector(
    (s) => s.news,
  );

  useEffect(() => {
    dispatch(loadFeatured());
    dispatch(fetchArticles({ category: 'all', page: 1, query: '' }));
  }, []);

  const allMock = generateMockArticles();
  const trending = allMock.sort((a, b) => b.views - a.views).slice(0, 5);

  function handleLoadMore() {
    dispatch(fetchArticles({ category: activeCategory, page: page + 1, query: searchQuery }));
  }

  return (
    <Box sx={{ py: { xs: 3, sm: 4 } }}>
      <Container maxWidth="xl">
        {!searchQuery && activeCategory === 'all' && <FeaturedHero />}

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight={800}>
            {searchQuery
              ? `Results for "${searchQuery}"`
              : activeCategory === 'all'
                ? 'Latest News'
                : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} News`}
          </Typography>

          {!isLoading && (
            <Typography variant="body2" color="text.secondary">
              {articles.length} articles
            </Typography>
          )}
        </Box>

        <Grid container spacing={3}>
          {/* Main grid */}
          <Grid item xs={12} lg={8}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Grid container spacing={2}>
              {articles.map((article) => (
                <Grid item xs={12} sm={6} key={article.id}>
                  <NewsCard article={article} />
                </Grid>
              ))}

              {isLoading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <Grid item xs={12} sm={6} key={`sk-${i}`}>
                    <SkeletonCard />
                  </Grid>
                ))}
            </Grid>

            {!isLoading && hasMore && articles.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleLoadMore}
                  size="large"
                  sx={{ px: 5, borderRadius: 8 }}
                >
                  Load More
                </Button>
              </Box>
            )}

            {!isLoading && articles.length === 0 && !error && (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  No articles found
                </Typography>

                <Typography variant="body2" color="text.disabled" mt={1}>
                  Try a different search or category
                </Typography>
              </Box>
            )}
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box
              sx={{
                position: { lg: 'sticky' },
                top: { lg: 140 },
                backgroundColor: 'background.paper',
                borderRadius: 3,
                border: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.06)',
                p: 2.5,
              }}
            >
              <Typography variant="h6" fontWeight={800} mb={2}>
                🔥 Trending Now
              </Typography>

              {trending.map((a) => (
                <NewsCard key={a.id} article={a} variant="compact" />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
