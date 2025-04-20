"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScanForm } from "@/components/scan-form"
import { ThemeToggleButton } from "@/components/theme-toggle-button"
import { useLanguage } from "@/contexts/language-context"

export default function ScanPage() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/90 dark:from-background dark:to-background/95">
      <div className="absolute top-4 right-4">
        <ThemeToggleButton />
      </div>
      <Header />
      <main className="flex-1 container py-8 px-4 md:py-12">
        <h1 className="text-3xl font-bold mb-2 text-center">{t('scanner.title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8 max-w-lg mx-auto">
          {t('scanner.subtitle1')}<br />
          {t('scanner.subtitle2')}
        </p>
        <ScanForm />
      </main>
      <Footer />
    </div>
  )
}
