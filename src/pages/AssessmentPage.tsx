import { useState } from 'react';
import {
  Container, Typography, Card, CardContent, Box,
  TextField, MenuItem, Button, Stack,
} from '@mui/material';
import { carBrands, type CarBrand } from '../mocks/cars';

export function AssessmentPage() {
  const [brand, setBrand] = useState<CarBrand | ''>('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');

  const models = brand ? carBrands[brand] : [];

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Оценка повреждений
        </Typography>

        <Card>
          <CardContent>
            <Stack spacing={2}>
              {/* Марка */}
              <TextField
                label="Марка"
                select
                fullWidth
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value as CarBrand | '');
                  setModel('');  
                }}
              >
                {Object.keys(carBrands).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </MenuItem>
                ))}
              </TextField>

              {/* Модель — зависит от марки */}
              <TextField
                label="Модель"
                select
                fullWidth
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!brand}
              >
                {models.map((m) => (
                  <MenuItem key={m} value={m}>
                    {m}
                  </MenuItem>
                ))}
              </TextField>

              {/* Год */}
              <TextField
                label="Год выпуска"
                type="number"
                fullWidth
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />

              {/* Загрузка фото */}
              <Button variant="contained" component="label">
                Загрузить фотографии
                <input type="file" hidden multiple accept="image/*" />
              </Button>

              {/* Кнопка анализа */}
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={!brand || !model || !year}
              >
                Проанализировать
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}