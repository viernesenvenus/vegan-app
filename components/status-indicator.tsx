import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

interface StatusIndicatorProps {
  status: "vegan" | "not-vegan" | "check"
  className?: string
}

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  const { t } = useLanguage()

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        status === "vegan" && "bg-green-100 text-green-700",
        status === "not-vegan" && "bg-red-100 text-red-700",
        status === "check" && "bg-blue-100 text-blue-700",
        className
      )}
    >
      <div
        className={cn(
          "h-2 w-2 rounded-full",
          status === "vegan" && "bg-green-500",
          status === "not-vegan" && "bg-red-500",
          status === "check" && "bg-blue-500"
        )}
      />
      {status === "vegan" && t("status.vegan")}
      {status === "not-vegan" && t("status.notVegan")}
      {status === "check" && t("status.check")}
    </div>
  )
} 