import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
function Loading({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center items-center", className ?? "")}>
      <Loader className="animate-spin" />
    </div>
  );
}

export default Loading;
