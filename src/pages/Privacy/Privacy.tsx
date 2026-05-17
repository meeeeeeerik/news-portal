import {
  Box,
  Container,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppSelector } from '../../app/hooks';

const SECTIONS = [
  {
    title: 'Information We Collect',
    content:
      'We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and any other information you choose to provide.',
  },
  {
    title: 'How We Use Your Information',
    content:
      'We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, communicate with you about products, services, and promotions, and respond to your comments and questions.',
  },
  {
    title: 'Information Sharing',
    content:
      'We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information in response to legal requests or to protect our rights.',
  },
  {
    title: 'Data Security',
    content:
      'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.',
  },
  {
    title: 'Cookies and Tracking',
    content:
      'We use cookies and similar technologies to enhance your experience on our site. You can control cookie settings through your browser preferences.',
  },
  {
    title: 'Your Rights',
    content:
      'You have the right to access, update, or delete your personal information. You may also opt out of marketing communications at any time.',
  },
  {
    title: 'Changes to This Policy',
    content:
      'We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.',
  },
];

export function Privacy() {
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
          Privacy Policy
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Last updated: May 9, 2024
        </Typography>

        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          This Privacy Policy describes how ThePulse ("we," "us," or "our") collects, uses, and
          protects your personal information when you use our website and services.
        </Typography>

        {SECTIONS.map((section, index) => (
          <Accordion
            key={index}
            elevation={0}
            sx={{
              backgroundColor: 'transparent',
              border: dark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
              mb: 1,
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ '& .MuiAccordionSummary-content': { my: 2 } }}
            >
              <Typography variant="h6" fontWeight={600}>
                {section.title}
              </Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography variant="body1" color="text.secondary">
                {section.content}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}

        <Box
          sx={{
            mt: 4,
            p: 3,
            backgroundColor: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
            borderRadius: 1,
          }}
        >
          <Typography variant="h6" gutterBottom fontWeight={600}>
            Contact Us
          </Typography>

          <Typography variant="body2" color="text.secondary">
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            Email: privacy@thepulse.com
            <br />
            Address: 123 News Street, Media City, MC 12345
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
