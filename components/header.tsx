"use client"

import Link from "next/link"
import { Leaf } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
            <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <span className="text-xl font-bold">Vegan Check</span>
        </Link>
        <div className="flex items-center gap-4">
          {pathname !== "/scan" && (
            <Link
              href="/scan"
              className="text-sm font-medium text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 hidden sm:block"
            >
              Scan Ingredients
            </Link>
          )}
          <ModeToggle />
        </div>
      </div>
    </motion.header>
  )
}
