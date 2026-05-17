import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { useAppSelector } from './app/hooks';
import { store } from './app/store';
import { getTheme } from './theme';
import { Navbar } from './components/Navbar/Navbar';
import { CategoryFilter } from './components/CategoryFilter/CategoryFilter';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { Article } from './pages/Article/Article';
import { Bookmarks } from './pages/Bookmarks/Bookmarks';
import { CategoryPage } from './pages/Category/Category';
import { About } from './pages/About/About';
import { Contact } from './pages/Contact/Contact';
import { Privacy } from './pages/Privacy/Privacy';
import { NotFound } from './pages/NotFound/NotFound';

function AppContent() {
  const dark = useAppSelector((s) => s.ui.darkMode);

  return (
    <ThemeProvider theme={getTheme(dark)}>
      <CssBaseline />

      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />

        <CategoryFilter />

        <Box sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
