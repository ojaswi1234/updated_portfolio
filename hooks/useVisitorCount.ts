import { useState, useEffect } from "react";

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => setCount(data.count))
      .catch(() => {
        // Fallback: try GET
        fetch("/api/visitors")
          .then((res) => res.json())
          .then((data) => setCount(data.count))
          .catch(() => setCount(null));
      });
  }, []);

  return count;
}
