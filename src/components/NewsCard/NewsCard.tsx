import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Skeleton,
} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleBookmark } from '../../features/bookmarks/bookmarksSlice';
import { CATEGORY_COLORS, CATEGORY_LABELS } from '../../theme';
import { timeAgo, fmtViews } from '../../utils/format';
import type { Article } from '../../types';

interface Props {
  article: Article;
  variant?: 'default' | 'featured' | 'compact';
}

export function NewsCard({ article, variant = 'default' }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const dark = useAppSelector((s) => s.ui.darkMode);
  const isBookmarked = useAppSelector((s) => s.bookmarks.bookmarkedIds.includes(article.id));
  const catColor = CATEGORY_COLORS[article.category];

  const isFeatured = variant === 'featured';
  const isCompact = variant === 'compact';

  function handleClick() {
    navigate(`/article/${article.id}`);
  }

  function handleBookmark(e: React.MouseEvent) {
    e.stopPropagation();
    dispatch(toggleBookmark(article.id));
  }

  if (isCompact) {
    return (
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          gap: 1.5,
          cursor: 'pointer',
          py: 1.5,
          borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
          '&:last-child': { borderBottom: 'none' },
          '&:hover': { '& .title': { color: 'primary.main' } },
          transition: 'all 0.2s',
        }}
      >
        <Box sx={{ width: 72, height: 56, borderRadius: 1.5, overflow: 'hidden', flexShrink: 0 }}>
          <Box
            component="img"
            src={article.imageUrl}
            alt={article.title}
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" fontWeight={700} sx={{ color: catColor }}>
            {CATEGORY_LABELS[article.category]}
          </Typography>

          <Typography
            className="title"
            variant="body2"
            fontWeight={700}
            sx={{
              lineHeight: 1.4,
              transition: 'color 0.2s',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {article.title}
          </Typography>

          <Typography variant="caption" color="text.secondary">
            {timeAgo(article.publishedAt)}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Card
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s, box-shadow 0.2s',
        transform: hovered ? 'translateY(-4px)' : 'none',
        boxShadow: hovered
          ? dark
            ? '0 12px 40px rgba(0,0,0,0.5)'
            : '0 12px 32px rgba(0,0,0,0.12)'
          : undefined,
      }}
    >
      {/* Image */}
      <Box
        sx={{ position: 'relative', paddingTop: isFeatured ? '45%' : '56%', overflow: 'hidden' }}
      >
        {!imgLoaded && (
          <Skeleton variant="rectangular" sx={{ position: 'absolute', inset: 0, height: '100%' }} />
        )}

        <CardMedia
          component="img"
          image={article.imageUrl}
          alt={article.title}
          onLoad={() => setImgLoaded(true)}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.3s, transform 0.4s',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
          }}
        />

        <Chip
          label={CATEGORY_LABELS[article.category]}
          size="small"
          sx={{
            position: 'absolute',
            top: 10,
            left: 10,
            backgroundColor: catColor,
            color: 'white',
            fontWeight: 700,
            fontSize: 11,
            height: 22,
          }}
        />

        <Tooltip title={isBookmarked ? 'Remove bookmark' : 'Bookmark'}>
          <IconButton
            onClick={handleBookmark}
            size="small"
            sx={{
              position: 'absolute',
              top: 6,
              right: 6,
              backgroundColor: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(8px)',
              color: isBookmarked ? 'primary.main' : 'rgba(255,255,255,0.8)',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.75)' },
            }}
          >
            {isBookmarked ? (
              <BookmarkIcon fontSize="small" />
            ) : (
              <BookmarkBorderIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Content */}
      <CardContent
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: { xs: 1.5, sm: 2 } }}
      >
        <Typography
          variant={isFeatured ? 'h6' : 'body1'}
          fontWeight={700}
          sx={{
            mb: 1,
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: isFeatured ? 3 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            '&:hover': { color: 'primary.main' },
            transition: 'color 0.2s',
          }}
        >
          {article.title}
        </Typography>

        {!isCompact && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1.5,
              flexGrow: 1,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: 1.6,
            }}
          >
            {article.excerpt}
          </Typography>
        )}

        {/* Meta */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: 'auto',
          }}
        >
          <Box>
            <Typography variant="caption" fontWeight={700} color="text.primary">
              {article.source}
            </Typography>

            <Typography variant="caption" color="text.secondary">
              {' '}
              · {timeAgo(article.publishedAt)}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <AccessTimeIcon sx={{ fontSize: 12, color: 'text.disabled' }} />

              <Typography variant="caption" color="text.disabled">
                {article.readTime}m
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              <VisibilityIcon sx={{ fontSize: 12, color: 'text.disabled' }} />

              <Typography variant="caption" color="text.disabled">
                {fmtViews(article.views)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
