import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  Button,
  Stack,
  Alert,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

import {
  registrationSchema,
  type RegistrationFormData,
} from "../shared/lib/validation";

export function RegistrationPage() {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      // TODO: заменить на реальный API в лабе 5
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Данные регистрации:", data);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError("Ошибка регистрации. Попробуйте позже.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Регистрация
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
                  <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />

                  <TextField
                    label="Никнейм"
                    fullWidth
                    {...register("nickname")}
                    error={!!errors.nickname}
                    helperText={errors.nickname?.message}
                  />

                  <TextField
                    label="Телефон"
                    fullWidth
                    placeholder="+79991234567"
                    {...register("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone?.message}
                  />

                  <TextField
                    label="Пароль"
                    type="password"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />

                  {submitError && <Alert severity="error">{submitError}</Alert>}
                  {submitSuccess && (
                    <Alert severity="success">
                      Регистрация прошла успешно!
                    </Alert>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Отправка..." : "Зарегистрироваться"}
                  </Button>

                  <Button
                    variant="text"
                    fullWidth
                    component={RouterLink}
                    to="/login"
                  >
                    Уже есть аккаунт? Войти
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