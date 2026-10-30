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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  loginSchema,
  type LoginFormData,
} from "../shared/lib/validation";

export function LoginPage() {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError(null);

    try {
      // TODO: заменить на реальный API в лабе 4
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Имитация проверки
      if (data.email === "wrong@example.com") {
        throw new Error("Неверные данные");
      }

      console.log("Данные входа:", data);
      
      // Редирект на профиль после "успешного" входа
      navigate("/profile");
    } catch (error) {
      setSubmitError("Неверный email или пароль");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Вход в систему
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
                    label="Пароль"
                    type="password"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                  />

                  {submitError && <Alert severity="error">{submitError}</Alert>}

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Вход..." : "Войти"}
                  </Button>

                  <Button
                    variant="text"
                    fullWidth
                    component={RouterLink}
                    to="/register"
                  >
                    Нет аккаунта? Зарегистрироваться
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