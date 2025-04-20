import Link from "next/link"
import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <Leaf className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vegan Check. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="#" className="hover:text-foreground hover:underline">
            Privacy
          </Link>
          <Link href="#" className="hover:text-foreground hover:underline">
            Terms
          </Link>
          <Link href="#" className="hover:text-foreground hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  )
}
