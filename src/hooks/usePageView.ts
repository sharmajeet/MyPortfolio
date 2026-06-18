import { useEffect } from "react";
import { trackEvent } from "../lib/api";

/** Records a page_view once when the component mounts. */
export function usePageView(): void {
  useEffect(() => {
    trackEvent("page_view");
  }, []);
}
