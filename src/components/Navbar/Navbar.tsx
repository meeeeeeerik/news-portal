import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Badge,
  Tooltip,
  Container,
  alpha,
  styled,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import CloseIcon from '@mui/icons-material/Close';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { toggleDarkMode } from '../../features/ui/uiSlice';
import { setSearchQuery, setCategory, fetchArticles } from '../../features/news/newsSlice';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Bookmarks', to: '/bookmarks' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy Policy', to: '/privacy' },
];

const SearchBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: alpha(theme.palette.common.white, 0.08),
  borderRadius: theme.shape.borderRadius,
  padding: '4px 12px',
  transition: 'all 0.2s',
  '&:focus-within': {
    backgroundColor: alpha(theme.palette.common.white, 0.14),
    outline: `2px solid ${theme.palette.primary.main}`,
  },
}));

export function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dark = useAppSelector((s) => s.ui.darkMode);
  const bookmarkCount = useAppSelector((s) => s.bookmarks.bookmarkedIds.length);
  const searchQuery = useAppSelector((s) => s.news.searchQuery);
  const activeCategory = useAppSelector((s) => s.news.activeCategory);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (drawerOpen) setTimeout(() => drawerInputRef.current?.focus(), 100);
  }, [drawerOpen]);

  function handleSearch(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate('/');
      dispatch(fetchArticles({ category: activeCategory, page: 1, query: searchQuery }));
      setDrawerOpen(false);
    }
  }

  function handleDesktopSearch(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate('/');
      dispatch(fetchArticles({ category: activeCategory, page: 1, query: searchQuery }));
    }
  }

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: dark ? 'rgba(10,12,16,0.92)' : 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: dark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.08)',
          color: 'text.primary',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ px: { xs: 0 }, gap: 1, minHeight: { xs: 56, sm: 64 } }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              onClick={() => {
                dispatch(setCategory('all'));
                dispatch(setSearchQuery(''));
              }}
              sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
            >
              <NewspaperIcon sx={{ color: 'primary.main', fontSize: 28 }} />

              <Typography
                variant="h6"
                fontWeight={900}
                sx={{ color: 'text.primary', letterSpacing: '-0.5px' }}
              >
                THE<span style={{ color: '#E63946' }}>PULSE</span>
              </Typography>
            </Box>

            {/* Desktop nav links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 2, mr: 'auto' }}>
                {NAV_LINKS.map((link) => (
                  <Box
                    key={link.label}
                    component={Link}
                    to={link.to}
                    sx={{
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'text.secondary',
                      textDecoration: 'none',
                      transition: 'color 0.2s, background 0.2s',
                      '&:hover': {
                        color: 'primary.main',
                        backgroundColor: 'rgba(230,57,70,0.08)',
                      },
                    }}
                  >
                    {link.label}
                  </Box>
                ))}
              </Box>
            )}

            {isMobile && <Box sx={{ flex: 1 }} />}

            {/* Desktop search */}
            {!isMobile && (
              <SearchBox sx={{ width: 240 }}>
                <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />

                <InputBase
                  inputRef={inputRef}
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                  onKeyDown={handleDesktopSearch}
                  sx={{ color: 'text.primary', flex: 1, fontSize: 14 }}
                />

                {searchQuery && (
                  <IconButton size="small" onClick={() => dispatch(setSearchQuery(''))}>
                    <CloseIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                )}
              </SearchBox>
            )}

            {/* Desktop bookmarks & theme */}
            {!isMobile && (
              <>
                <Tooltip title="Bookmarks">
                  <IconButton component={Link} to="/bookmarks" sx={{ color: 'text.secondary' }}>
                    <Badge badgeContent={bookmarkCount} color="primary">
                      <BookmarkIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Toggle theme">
                  <IconButton
                    onClick={() => dispatch(toggleDarkMode())}
                    sx={{ color: 'text.secondary' }}
                  >
                    {dark ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>
              </>
            )}

            {/* Mobile: theme + burger only */}
            {isMobile && (
              <>
                <Tooltip title="Toggle theme">
                  <IconButton
                    onClick={() => dispatch(toggleDarkMode())}
                    sx={{ color: 'text.secondary' }}
                  >
                    {dark ? <LightModeIcon /> : <DarkModeIcon />}
                  </IconButton>
                </Tooltip>

                <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: 'text.secondary' }}>
                  <MenuIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
      >
        {/* Drawer header */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <NewspaperIcon sx={{ color: 'primary.main', fontSize: 22 }} />

            <Typography variant="subtitle1" fontWeight={900}>
              THE<span style={{ color: '#E63946' }}>PULSE</span>
            </Typography>
          </Box>

          <IconButton
            onClick={() => setDrawerOpen(false)}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ opacity: 0.1 }} />

        {/* Search inside drawer */}
        <Box sx={{ px: 2, py: 1.5 }}>
          <SearchBox
            sx={{
              backgroundColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
            }}
          >
            <SearchIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />

            <InputBase
              inputRef={drawerInputRef}
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              onKeyDown={handleSearch}
              sx={{ color: 'text.primary', flex: 1, fontSize: 14 }}
            />

            {searchQuery && (
              <IconButton size="small" onClick={() => dispatch(setSearchQuery(''))}>
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </SearchBox>
        </Box>

        <Divider sx={{ opacity: 0.1 }} />

        {/* Nav links */}
        <List disablePadding>
          {NAV_LINKS.map((link) => (
            <ListItem key={link.label} disablePadding>
              <ListItemButton
                component={Link}
                to={link.to}
                onClick={() => setDrawerOpen(false)}
                sx={{
                  px: 3,
                  py: 1.2,
                  '&:hover': {
                    color: 'primary.main',
                    backgroundColor: 'rgba(230,57,70,0.06)',
                  },
                }}
              >
                {link.label === 'Bookmarks' ? (
                  <Badge badgeContent={bookmarkCount} color="primary" sx={{ width: '100%' }}>
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
                    />
                  </Badge>
                ) : (
                  <ListItemText
                    primary={link.label}
                    primaryTypographyProps={{ fontSize: 15, fontWeight: 500 }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
