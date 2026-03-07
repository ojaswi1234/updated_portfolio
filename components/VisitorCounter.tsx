import { useVisitorCount } from "../hooks/useVisitorCount";
import { Eye } from "lucide-react";

export function VisitorCounter() {
  const count = useVisitorCount();

  return (
    <div className="neo-box bg-neo-green dark:bg-green-700 px-4 py-2 flex items-center gap-2 text-black dark:text-white font-bold text-sm select-none">
      <Eye className="size-4" />
      <span>
        {count !== null ? (
          <>
            <span className="font-black">{count.toLocaleString()}</span> unique{" "}
            {count === 1 ? "visitor" : "visitors"}
          </>
        ) : (
          "..."
        )}
      </span>
    </div>
  );
}
