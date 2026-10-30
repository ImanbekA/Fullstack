import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Stack,
  Box,
  Chip,
  Skeleton,
  Alert,
  Button,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { Inbox as InboxIcon, Refresh as RefreshIcon } from "@mui/icons-material";

import { mockAssessments } from "../shared/mocks/history";
import type { Assessment } from "../entities/types";

type LoadState = "loading" | "error" | "empty" | "success";

export function HistoryPage() {
  const [state, setState] = useState<LoadState>("loading");
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  const loadData = async () => {
    setState("loading");

    try {
      // Имитация загрузки с сервера
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Имитация пустого состояния (для теста)
      // раскомментируй, чтобы проверить пустоту:
      // setAssessments([]);
      // setState("empty");
      // return;

      // Имитация ошибки (для теста)
      // throw new Error("Ошибка сети");

      setAssessments(mockAssessments);
      setState(mockAssessments.length === 0 ? "empty" : "success");
    } catch {
      setState("error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          История оценок
        </Typography>

        <AnimatePresence mode="wait">
          {state === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Stack spacing={2}>
                {[1, 2, 3].map((i) => (
                  <Card key={i}>
                    <CardContent>
                      <Skeleton variant="text" width="60%" height={32} />
                      <Skeleton variant="text" width="40%" />
                      <Skeleton variant="text" width="50%" />
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </motion.div>
          )}

          {state === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Alert
                severity="error"
                action={
                  <Button color="inherit" size="small" onClick={loadData} startIcon={<RefreshIcon />}>
                    Повторить
                  </Button>
                }
              >
                Не удалось загрузить историю оценок
              </Alert>
            </motion.div>
          )}

          {state === "empty" && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Paper sx={{ p: 6, textAlign: "center" }}>
                <InboxIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  У вас пока нет оценок
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Создайте первую оценку повреждений автомобиля
                </Typography>
                <Button variant="contained" href="/assessment">
                  Создать оценку
                </Button>
              </Paper>
            </motion.div>
          )}

          {state === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Stack spacing={2}>
                {assessments.map((a, index) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card>
                      <CardContent>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-between", alignItems: "center" }}
                        >
                          <Typography variant="h6">
                            {a.brand} {a.model}, {a.year}
                          </Typography>
                          <Chip
                            label={a.confirmed ? "Подтверждена" : "Черновик"}
                            color={a.confirmed ? "success" : "default"}
                            size="small"
                          />
                        </Stack>

                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Дата: {a.assessmentDate}
                        </Typography>

                        <Typography variant="body1" sx={{ mt: 1 }}>
                          Стоимость ремонта:{" "}
                          <strong>{a.cost.toLocaleString("ru-RU")} ₽</strong>
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Container>
  );
}