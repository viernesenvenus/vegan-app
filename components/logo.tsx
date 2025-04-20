import { Leaf } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Leaf className="h-6 w-6 text-green-600 dark:text-green-400" />
      <span className="font-bold text-xl">
        Vegan<span className="text-green-600 dark:text-green-400">Check</span>
      </span>
    </div>
  )
} 