import { Card, CardContent, Skeleton, Box } from '@mui/material';

export function SkeletonCard() {
  return (
    <Card>
      <Skeleton variant="rectangular" height={180} />

      <CardContent>
        <Skeleton variant="text" width="30%" height={20} sx={{ mb: 1 }} />

        <Skeleton variant="text" height={24} />

        <Skeleton variant="text" height={24} width="80%" sx={{ mb: 1 }} />

        <Skeleton variant="text" height={18} />

        <Skeleton variant="text" height={18} width="90%" sx={{ mb: 1.5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton variant="text" width="40%" />

          <Skeleton variant="text" width="25%" />
        </Box>
      </CardContent>
    </Card>
  );
}
