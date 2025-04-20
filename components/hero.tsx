import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <h1 className="text-4xl font-bold tracking-tight">{t("hero.title")}</h1>
      <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
        {t("hero.subtitle")}
      </p>
      <Button size="lg" asChild>
        <a href="#scan">{t("status.scanNow")}</a>
      </Button>
    </div>
  )
} 