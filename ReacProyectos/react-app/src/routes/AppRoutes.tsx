import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Components/Navbar";
import HomePage from "../pages/HomePage";
import NutritionPage from "../pages/NutritionPage";
import SeoPage from "../pages/SeoPage";
import ContactPage from "../pages/ContactPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
        <Route path="/seo" element={<SeoPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
