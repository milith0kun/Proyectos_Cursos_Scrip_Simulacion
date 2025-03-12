import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useRouteLogger(pageName: string) {
  const location = useLocation();

  useEffect(() => {
    console.group(`📄 Página: ${pageName}`);
    console.log("URL:", location.pathname);
    console.log("Query params:", location.search);
    console.log("Hash:", location.hash);
    console.groupEnd();

    return () => {
      console.log(`🔚 Saliendo de ${pageName}`);
    };
  }, [location, pageName]);
}
