import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RegistrationPage } from "./pages/RegistrationPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AssessmentPage } from "./pages/AssessmentPage";
import { HistoryPage } from "./pages/HistoryPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { Header } from "./shared/ui/Header";

function  App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>

  )
}
export default App;