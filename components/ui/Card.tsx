import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  flagStripe?: boolean;
}

export function Card({ children, className, flagStripe = true }: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow",
        className
      )}
    >
      {flagStripe && (
        <div className="flex h-[3px]">
          <div className="flex-1 bg-yellow-400" />
          <div className="flex-1 bg-venezuela-blue" />
          <div className="flex-1 bg-venezuela-red" />
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
