import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { ThemeToggleButton } from "@/components/theme-toggle-button"

export const metadata: Metadata = {
  title: "Vegan Check | Scan Ingredients to Check if Products are Vegan",
  description: "Upload a photo of ingredient lists to instantly check if a product is vegan-friendly.",
  openGraph: {
    title: "Vegan Check | Scan Ingredients to Check if Products are Vegan",
    description: "Upload a photo of ingredient lists to instantly check if a product is vegan-friendly.",
    type: "website",
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-background/90 dark:from-background dark:to-background/95">
      <Header />
      <main className="flex-1">
        <HeroSection />
      </main>
      <Footer />
      <ThemeToggleButton />
    </div>
  )
}
