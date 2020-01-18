import { useEffect } from "react";

export function useTabTitle(title: string) {
  useEffect(() => {
    document.title = 'Air2Day | ' + title;
    return
  }, [title]);
}
