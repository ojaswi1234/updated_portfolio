import { useState, useEffect } from "react";

function getVisitorId(): string {
  const key = "portfolio_visitor_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(key, id);
  }
  return id;
}

export function useVisitorCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const visitorId = getVisitorId();

    fetch("/api/visitors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
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
