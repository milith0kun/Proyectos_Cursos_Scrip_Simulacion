import "../pages/pages.css";
import NutritionDashboard from "../Components/NutritionDashboard";
import { nutritionProps } from "../data/pageData";

function NutritionPage() {
  return (
    <div className="nutrition-page">
      <h1>Nutrición Holística</h1>
      <NutritionDashboard {...nutritionProps} />
    </div>
  );
}

export default NutritionPage;
