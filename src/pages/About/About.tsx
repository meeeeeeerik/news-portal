import { Box, Container, Typography, Paper } from '@mui/material';
import { useAppSelector } from '../../app/hooks';

export function About() {
  const dark = useAppSelector((s) => s.ui.darkMode);

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Paper
        elevation={0}
        sx={{
          p: 4,
          backgroundColor: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
          border: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="h3" component="h1" gutterBottom fontWeight={700} align="center">
          About ThePulse
        </Typography>

        <Typography variant="h6" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Your trusted source for breaking news and in-depth analysis
        </Typography>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Our Mission
          </Typography>

          <Typography variant="body1" paragraph>
            ThePulse is dedicated to delivering high-quality, unbiased news coverage across multiple
            categories including technology, business, sports, science, health, entertainment, and
            politics. We strive to keep our readers informed with timely, accurate, and engaging
            content.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            What We Offer
          </Typography>

          <Typography variant="body1" paragraph>
            • Breaking news updates as they happen
            <br />
            • In-depth analysis and investigative reporting
            <br />
            • Personalized news feed based on your interests
            <br />
            • Bookmarking system for saving articles
            <br />
            • Dark mode for comfortable reading
            <br />• Mobile-responsive design
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Our Values
          </Typography>

          <Typography variant="body1" paragraph>
            We believe in journalistic integrity, factual reporting, and providing diverse
            perspectives. Our team works tirelessly to verify information and present it in an
            accessible, engaging format.
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center">
          Built with React, Redux Toolkit, and Material-UI
        </Typography>
      </Paper>
    </Container>
  );
}
