import { cn } from "@/lib/utils";

function SectionTitle({
  className,
  title,
}: {
  className?: string;
  title: string;
}) {
  return (
    <h2
      className={cn("text-2xl font-semibold font-mono mx-2", className ?? "")}
    >
      {title}
    </h2>
  );
}

export default SectionTitle;
