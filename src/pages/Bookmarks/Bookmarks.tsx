import { Box, Container, Typography, Grid, Button } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { clearBookmarks } from '../../features/bookmarks/bookmarksSlice';
import { generateMockArticles } from '../../utils/mockData';
import { NewsCard } from '../../components/NewsCard/NewsCard';

const allArticles = generateMockArticles();

export function Bookmarks() {
  const dispatch = useAppDispatch();
  const bookmarkedIds = useAppSelector((s) => s.bookmarks.bookmarkedIds);
  const bookmarked = allArticles.filter((a) => bookmarkedIds.includes(a.id));

  return (
    <Box sx={{ py: { xs: 3, sm: 5 } }}>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 4,
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BookmarkIcon sx={{ color: 'primary.main', fontSize: 32 }} />

            <Box>
              <Typography variant="h4" fontWeight={800}>
                Bookmarks
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {bookmarked.length} saved articles
              </Typography>
            </Box>
          </Box>

          {bookmarked.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={() => dispatch(clearBookmarks())}
            >
              Clear All
            </Button>
          )}
        </Box>

        {bookmarked.length === 0 ? (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <BookmarkIcon sx={{ fontSize: 80, color: 'action.disabled', mb: 3 }} />

            <Typography variant="h5" color="text.secondary" mb={1}>
              No bookmarks yet
            </Typography>

            <Typography variant="body2" color="text.disabled" mb={4}>
              Save articles by clicking the bookmark icon on any story
            </Typography>

            <Button
              component={Link}
              to="/"
              variant="contained"
              size="large"
              sx={{ borderRadius: 8, px: 5 }}
            >
              Browse News
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {bookmarked.map((a) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={a.id}>
                <NewsCard article={a} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
