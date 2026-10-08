import { Container, Typography, Card, CardContent, Stack, Box, Chip } from '@mui/material';
import { mockAssessments } from '../mocks/history';

export function HistoryPage() {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          История оценок
        </Typography>

        <Stack spacing={2}>
          {mockAssessments.map((a) => (
            <Card key={a.id}>
              <CardContent>
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6">
                    {a.brand} {a.model}, {a.year}
                  </Typography>
                  <Chip
                    label={a.confirmed ? 'Подтверждена' : 'Черновик'}
                    color={a.confirmed ? 'success' : 'default'}
                    size="small"
                  />
                </Stack>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Дата: {a.AssessmentDate}
                </Typography>

                <Typography variant="body1" sx={{ mt: 1 }}>
                  Стоимость ремонта: <strong>{a.cost.toLocaleString('ru-RU')} ₽</strong>
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}