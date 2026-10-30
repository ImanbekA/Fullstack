import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  MenuItem,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";

import { carBrands, type CarBrand } from "../shared/mocks/cars";
import {
  assessmentSchema,
  type AssessmentFormData,
} from "../shared/lib/validation";

export function AssessmentPage() {
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      brand: "",
      model: "",
      year: new Date().getFullYear(),
    },
  });

  const selectedBrand = watch("brand") as CarBrand | "";
  const models = selectedBrand ? carBrands[selectedBrand] : [];

  const onSubmit = async (data: AssessmentFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // Проверка фото — по методичке нужно хотя бы одно
      if (photos.length === 0) {
        setSubmitError("Загрузите хотя бы одну фотографию");
        return;
      }

      // TODO: реальный API в лабе 5
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Данные оценки:", { ...data, photos });
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError("Ошибка создания оценки. Попробуйте позже.");
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Оценка повреждений
        </Typography>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                  {/* Марка — через Controller для правильной интеграции */}
                  <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Марка"
                        select
                        fullWidth
                        error={!!errors.brand}
                        helperText={errors.brand?.message}
                        onChange={(e) => {
                          field.onChange(e);
                          // При смене марки — сбрасываем модель
                          // (это можно сделать через resetField, но проще через re-render)
                        }}
                      >
                        {Object.keys(carBrands).map((key) => (
                          <MenuItem key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  {/* Модель — зависит от выбранной марки */}
                  <Controller
                    name="model"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Модель"
                        select
                        fullWidth
                        disabled={!selectedBrand}
                        error={!!errors.model}
                        helperText={errors.model?.message}
                      >
                        {models.map((m) => (
                          <MenuItem key={m} value={m}>
                            {m}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />

                  {/* Год */}
                  <TextField
                    label="Год выпуска"
                    type="number"
                    fullWidth
                    {...register("year", { valueAsNumber: true })}
                    error={!!errors.year}
                    helperText={errors.year?.message}
                  />

                  {/* Загрузка фото */}
                  <Button variant="outlined" component="label">
                    Загрузить фотографии ({photos.length})
                    <input
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={(e) => {
                        const files = Array.from(e.target.files || []);
                        setPhotos(files);
                      }}
                    />
                  </Button>

                  {photos.length > 0 && (
                    <Typography variant="body2" color="text.secondary">
                      Загружено {photos.length} фото
                    </Typography>
                  )}

                  {submitError && <Alert severity="error">{submitError}</Alert>}
                  {submitSuccess && (
                    <Alert severity="success">
                      Оценка создана.
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Анализ..." : "Проанализировать"}
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    </Container>
  );
}