import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const scrollElement = document.getElementById("main-root");

  useEffect(() => {
    if(scrollElement) {
      scrollElement.scrollTo(0, 0)
    }
  }, [pathname, scrollElement]);

  return null;
}
