import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Divider,
  Avatar,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleBookmark } from '../../features/bookmarks/bookmarksSlice';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../../theme';
import { fmtDate, fmtViews } from '../../utils/format';
import { generateMockArticles } from '../../utils/mockData';
import { NewsCard } from '../../components/NewsCard/NewsCard';

const allArticles = generateMockArticles();

export function Article() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isBookmarked = useAppSelector((s) => s.bookmarks.bookmarkedIds.includes(id || ''));
  const [copied, setCopied] = useState(false);

  const article = allArticles.find((a) => a.id === id);
  const related = allArticles
    .filter((a) => a.category === article?.category && a.id !== id)
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h5" color="text.secondary">
          Article not found
        </Typography>

        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Go Home
        </Button>
      </Container>
    );
  }

  const catColor = CATEGORY_COLORS[article.category];

  function handleShare() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Box sx={{ py: { xs: 3, sm: 5 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Article */}
          <Grid item xs={12} lg={8}>
            <Button
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(-1)}
              sx={{ mb: 3, color: 'text.secondary' }}
            >
              Back
            </Button>

            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <Chip
                label={CATEGORY_LABELS[article.category]}
                size="small"
                sx={{ backgroundColor: catColor, color: 'white', fontWeight: 700 }}
              />

              {article.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: 11, height: 22, borderColor: 'divider', color: 'text.secondary' }}
                />
              ))}
            </Box>

            <Typography
              variant="h3"
              fontWeight={900}
              sx={{
                mb: 2,
                lineHeight: 1.3,
                fontSize: { xs: '1.6rem', sm: '2rem', md: '2.4rem' },
              }}
            >
              {article.title}
            </Typography>

            {/* Author row */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 3,
                flexWrap: 'wrap',
                gap: 1,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Avatar
                  sx={{
                    width: 38,
                    height: 38,
                    backgroundColor: catColor,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {article.author[0]}
                </Avatar>

                <Box>
                  <Typography variant="body2" fontWeight={700}>
                    {article.author}
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {article.source} · {fmtDate(article.publishedAt)}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mr: 1 }}>
                  <AccessTimeIcon sx={{ fontSize: 14, color: 'text.disabled' }} />

                  <Typography variant="caption" color="text.disabled">
                    {article.readTime} min read
                  </Typography>

                  <VisibilityIcon sx={{ fontSize: 14, color: 'text.disabled', ml: 1 }} />

                  <Typography variant="caption" color="text.disabled">
                    {fmtViews(article.views)} views
                  </Typography>
                </Box>

                <Tooltip title={copied ? 'Copied!' : 'Share'}>
                  <IconButton size="small" onClick={handleShare} sx={{ color: 'text.secondary' }}>
                    <ShareIcon fontSize="small" />
                  </IconButton>
                </Tooltip>

                <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}>
                  <IconButton
                    size="small"
                    onClick={() => dispatch(toggleBookmark(article.id))}
                    sx={{ color: isBookmarked ? 'primary.main' : 'text.secondary' }}
                  >
                    {isBookmarked ? (
                      <BookmarkIcon fontSize="small" />
                    ) : (
                      <BookmarkBorderIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Hero image */}
            <Box sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
              <Box
                component="img"
                src={article.imageUrl}
                alt={article.title}
                sx={{ width: '100%', maxHeight: 440, objectFit: 'cover' }}
              />
            </Box>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                mb: 3,
                fontWeight: 400,
                lineHeight: 1.7,
                fontStyle: 'italic',
                borderLeft: `4px solid ${catColor}`,
                pl: 2,
              }}
            >
              {article.excerpt}
            </Typography>

            {article.content.split('\n\n').map((para, i) => {
              if (para.startsWith('**') && para.endsWith('**')) {
                return (
                  <Typography key={i} variant="h5" fontWeight={800} sx={{ mt: 3, mb: 1.5 }}>
                    {para.replace(/\*\*/g, '')}
                  </Typography>
                );
              }

              return (
                <Typography
                  key={i}
                  variant="body1"
                  sx={{
                    mb: 2.5,
                    lineHeight: 1.85,
                    color: 'text.primary',
                    fontSize: { xs: '0.95rem', sm: '1.05rem' },
                  }}
                >
                  {para}
                </Typography>
              );
            })}

            <Divider sx={{ my: 4, opacity: 0.1 }} />

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {article.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  variant="outlined"
                  size="small"
                  sx={{ borderColor: catColor, color: catColor, fontWeight: 700 }}
                />
              ))}
            </Box>
          </Grid>

          {/* Sidebar */}
          <Grid item xs={12} lg={4}>
            <Box sx={{ position: { lg: 'sticky' }, top: { lg: 140 } }}>
              <Typography variant="h6" fontWeight={800} mb={2}>
                Related Articles
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {related.map((a) => (
                  <NewsCard key={a.id} article={a} />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
