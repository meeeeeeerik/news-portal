import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import NewspaperIcon from '@mui/icons-material/Newspaper';

export function NotFound() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <NewspaperIcon sx={{ fontSize: 80, color: 'action.disabled' }} />

      <Typography variant="h2" fontWeight={900}>
        404
      </Typography>

      <Typography variant="h6" color="text.secondary">
        Page not found
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        size="large"
        sx={{ mt: 1, borderRadius: 8, px: 5 }}
      >
        Go Home
      </Button>
    </Box>
  );
}
