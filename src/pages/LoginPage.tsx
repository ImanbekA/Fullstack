import { Container, Typography, Card, CardContent, Box, TextField, Button, Stack } from '@mui/material';

export function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Вход в систему
        </Typography>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              <TextField label="Email" type="email" fullWidth />
              <TextField label="Пароль" type="password" fullWidth />
              <Button variant="contained" size="large" fullWidth>
                Войти
              </Button>
              <Button variant="text" fullWidth href="/register">
                Нет аккаунта? Зарегистрироваться
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}