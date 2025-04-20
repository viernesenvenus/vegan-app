"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/mode-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { Logo } from "@/components/logo"

export function Header() {
  const { t } = useLanguage()
  const pathname = usePathname()

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <ModeToggle />
        </div>
      </div>
    </motion.header>
  )
}
