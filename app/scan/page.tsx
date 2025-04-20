import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScanForm } from "@/components/scan-form"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

export const metadata: Metadata = {
  title: "Scan Ingredients | Vegan Check",
  description: "Upload a photo of ingredient lists to instantly check if a product is vegan-friendly.",
}

export default function ScanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/90 dark:from-background dark:to-background/95">
      <Header />
      <main className="flex-1 container py-8 px-4 md:py-12">
        <h1 className="text-3xl font-bold mb-2 text-center">Ingredient Scanner</h1>
        <p className="text-center text-muted-foreground mb-8 max-w-md mx-auto">
          Upload a photo of any ingredient list to instantly check if the product is vegan
        </p>
        <ScanForm />
      </main>
      <Footer />
      <ThemeToggleButton />
    </div>
  )
}
