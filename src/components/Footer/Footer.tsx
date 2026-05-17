import {
  Box,
  Container,
  Typography,
  IconButton,
  Divider,
  Grid,
  Link as MuiLink,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { CATEGORY_LABELS } from '../../theme';
import type { Category } from '../../types';

const CATS: Category[] = [
  'technology',
  'business',
  'sports',
  'science',
  'health',
  'entertainment',
  'politics',
];

const SOCIALS = [
  { icon: <GitHubIcon />, href: 'https://github.com/meeeeeeerik', label: 'GitHub' },
  { icon: <TelegramIcon />, href: 'https://t.me/meeeeeeerik', label: 'Telegram' },
  { icon: <InstagramIcon />, href: 'https://www.instagram.com/meeeeeeerik/', label: 'Instagram' },
];

export function Footer() {
  const dark = useAppSelector((s) => s.ui.darkMode);

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        borderTop: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
        backgroundColor: 'background.paper',
        pt: 5,
        pb: 3,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4} mb={4}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <NewspaperIcon sx={{ color: 'primary.main', fontSize: 26 }} />

              <Typography variant="h6" fontWeight={900}>
                THE<span style={{ color: '#E63946' }}>PULSE</span>
              </Typography>
            </Box>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 2, lineHeight: 1.7, maxWidth: 280 }}
            >
              Your daily source for breaking news, in-depth analysis, and stories that matter —
              across tech, business, sports and beyond.
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {SOCIALS.map((s) => (
                <IconButton
                  key={s.label}
                  component="a"
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  size="small"
                  sx={{
                    color: 'text.secondary',
                    border: dark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                    '&:hover': {
                      color: 'primary.main',
                      borderColor: 'primary.main',
                      backgroundColor: 'rgba(230,57,70,0.08)',
                    },
                    transition: 'all 0.2s',
                  }}
                >
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Categories — first half */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={800} mb={1.5} color="text.primary">
              Categories
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8 }}>
              {CATS.slice(0, 4).map((cat) => (
                <MuiLink
                  key={cat}
                  component={Link}
                  to={`/category/${cat}`}
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: 14,
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s',
                  }}
                >
                  {CATEGORY_LABELS[cat]}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Categories — second half */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" fontWeight={800} mb={1.5} color="text.primary">
              {' '}
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mt: { xs: 0, sm: 3 } }}>
              {CATS.slice(4).map((cat) => (
                <MuiLink
                  key={cat}
                  component={Link}
                  to={`/category/${cat}`}
                  underline="none"
                  sx={{
                    color: 'text.secondary',
                    fontSize: 14,
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s',
                  }}
                >
                  {CATEGORY_LABELS[cat]}
                </MuiLink>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ opacity: 0.08, mb: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="caption" color="text.disabled">
            © {new Date().getFullYear()} ThePulse. All rights reserved.
          </Typography>

          <Typography variant="caption" color="text.disabled">
            Built with React · Redux Toolkit · Material UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
