"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, AlertTriangle, ChevronDown, ChevronUp, Leaf } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

interface ScanResultsProps {
  ingredientText: string
  imageUrl: string | null
}

export function ScanResults({ ingredientText, imageUrl }: ScanResultsProps) {
  const [result, setResult] = useState<"vegan" | "non-vegan" | "unclear">("unclear")
  const [nonVeganIngredients, setNonVeganIngredients] = useState<string[]>([])
  const [showDetails, setShowDetails] = useState(false)
  const { t, language } = useLanguage()

  const resultText = {
    es: {
      title: {
        vegan: "Este Producto es Vegano",
        nonVegan: "Este Producto no es Vegano"
      },
      description: {
        vegan: "No se detectaron ingredientes de origen animal",
        nonVegan: (count: number) => `Contiene ${count} ingrediente${count > 1 ? "s" : ""} no vegano${count > 1 ? "s" : ""}`
      },
      goodChoice: "¡Buena elección! Este producto es apto para veganos.",
      showDetails: "Mostrar Detalles",
      hideDetails: "Ocultar Detalles",
      nonVeganFound: "Ingredientes no veganos encontrados:",
      analyzedIngredients: "Ingredientes analizados:"
    },
    en: {
      title: {
        vegan: "This Product is Vegan",
        nonVegan: "This Product is Not Vegan"
      },
      description: {
        vegan: "No animal-derived ingredients were detected",
        nonVegan: (count: number) => `Contains ${count} non-vegan ingredient${count > 1 ? "s" : ""}`
      },
      goodChoice: "Good choice! This product is suitable for vegans.",
      showDetails: "Show Details",
      hideDetails: "Hide Details",
      nonVeganFound: "Non-vegan ingredients found:",
      analyzedIngredients: "Analyzed ingredients:"
    }
  }

  useEffect(() => {
    // List of non-vegan ingredients to check against (in English and Spanish)
    const nonVeganItems = [
      // Basic non-vegan ingredients
      "\\bmilk\\b", "\\bleche\\b",
      "\\beggs\\b", "\\bhuevos\\b",
      "\\bhoney\\b", "\\bmiel\\b",
      "\\bgelatin\\b", "\\bgelatina\\b",
      "\\bcasein\\b", "\\bcaseína\\b",
      "\\bwhey\\b", "\\bsuero\\b",
      "\\blard\\b", "\\bmanteca\\b",
      "\\bbutter\\b", "\\bmantequilla\\b",
      "\\bcream\\b", "\\bcrema\\b",
      "\\bcheese\\b", "\\bqueso\\b",
      "\\byogurt\\b", "\\byogur\\b",
      "\\blactose\\b", "\\blactosa\\b",
      
      // E-numbers and additives
      "\\be-?120\\b", "\\bcarmin\\b", "\\bcochinilla\\b",
      "\\be-?441\\b", "\\bgelatina\\b",
      "\\be-?920\\b", "\\bl-cisteina\\b", "\\bl-cisteína\\b",
      "\\be-?921\\b", "\\bl-cisteina hcl\\b", "\\bl-cisteína hcl\\b",
      "\\be-?1105\\b", "\\blisozima\\b",
      "\\be-?901\\b", "\\bcera de abejas\\b",
      "\\be-?904\\b", "\\bgoma laca\\b",
      "\\be-?913\\b", "\\blanolina\\b",
      "\\be-?966\\b", "\\blactitol\\b",
      "\\be-?631\\b", "\\binosinato\\b",
      "\\be-?627\\b", "\\bguanilato\\b",
      "\\be-?542\\b", "\\bfosfato de huesos\\b",
      "\\be-?422\\b", "\\bglicerol\\b",
      "\\be-?471\\b", "\\bmonogliceridos\\b", "\\bdigliceridos\\b",
      "\\be-?270\\b", "\\bacido lactico\\b", "\\bácido láctico\\b",
      "\\be-?322\\b", "\\blecitina\\b",
      "\\be-?483\\b", "\\btartrato de estearilo\\b",
      "\\be-?570\\b", "\\bacido estearico\\b", "\\bácido esteárico\\b",
      "\\be-?640\\b", "\\bglicina\\b",

      // Other non-vegan ingredients
      "\\bcuajo\\b", "\\bcuajo animal\\b",
      "\\bcaseina\\b", "\\bcaseína\\b",
      "\\bcaseinato\\b",
      "\\bsuero lacteo\\b", "\\bsuero lácteo\\b",
      "\\balbumina\\b", "\\balbúmina\\b",
      "\\bjugo de huesos\\b",
      "\\bharina de pescado\\b",
      "\\bcolageno\\b", "\\bcolágeno\\b",
      "\\bqueratina\\b",
      "\\bhuesos\\b",
      "\\bpezuñas\\b",
      "\\bplumas\\b",
      "\\bpelo animal\\b",
      "\\bsebo\\b",
      "\\bgrasa animal\\b",
      "\\bextracto de carne\\b",
      "\\bextracto de pescado\\b"
    ]

    // Convert ingredient text to lowercase for case-insensitive matching
    const lowerCaseText = ingredientText.toLowerCase()

    // Extract the actual ingredients list by looking for common delimiters
    const extractIngredients = (text: string): string => {
      // Split by common ingredient list markers
      const markers = ["ingredientes:", "ingredients:", "contains:", "contiene:"]
      let ingredientSection = text

      for (const marker of markers) {
        if (text.includes(marker)) {
          ingredientSection = text.split(marker)[1] || text
          break
        }
      }

      // Remove manufacturing warnings and facility statements
      const warnings = [
        "puede contener",
        "may contain",
        "manufactured in",
        "produced in",
        "made in",
        "processed in",
        "fabricado en",
        "producido en",
        "elaborado en",
        "procesado en",
        "facility",
        "facilities",
        "equipment",
        "equipo",
        "traces",
        "trazas"
      ]

      let cleanedText = ingredientSection
      for (const warning of warnings) {
        const warningIndex = cleanedText.toLowerCase().indexOf(warning)
        if (warningIndex !== -1) {
          cleanedText = cleanedText.substring(0, warningIndex)
        }
      }

      return cleanedText
    }

    // Get clean ingredients text
    const cleanIngredientsText = extractIngredients(lowerCaseText)

    // Find any non-vegan ingredients in the text using word boundaries
    const foundNonVeganItems = nonVeganItems.filter((item) => {
      const regex = new RegExp(item, 'i')
      return regex.test(cleanIngredientsText)
    })

    setNonVeganIngredients(foundNonVeganItems.map(item => item.replace(/\\b/g, '').replace(/[\\?-]/g, '')))

    // Determine the result based on found ingredients only
    if (foundNonVeganItems.length > 0) {
      setResult("non-vegan")
    } else {
      setResult("vegan")
    }
  }, [ingredientText])

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative overflow-hidden rounded-2xl shadow-lg ${
          result === "vegan"
            ? "bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 dark:border dark:border-green-800/30"
            : "bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/20 dark:border dark:border-red-800/30"
        }`}
      >
        <div className="p-6 md:p-8">
          <div className={`flex flex-col md:flex-row ${imageUrl ? "md:gap-8" : ""}`}>
            {imageUrl && (
              <div className="mb-4 md:mb-0 md:w-1/3">
                <div className="overflow-hidden rounded-lg border-4 border-white shadow-md dark:border-gray-800">
                  <img
                    src={imageUrl}
                    alt={t("scan.ingredientList")}
                    className="aspect-square w-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className={`flex-1 ${imageUrl ? "md:w-2/3" : "w-full"}`}>
              <div className="mb-2">
                <Badge
                  variant="outline"
                  className={`mb-2 ${
                    result === "vegan"
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                >
                  {t(result === "vegan" ? "status.vegan" : "status.notVegan")}
                </Badge>
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                      result === "vegan"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                  >
                    {result === "vegan" ? (
                      <CheckCircle className="h-7 w-7" />
                    ) : (
                      <XCircle className="h-7 w-7" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {result === "vegan" 
                        ? resultText[language].title.vegan 
                        : resultText[language].title.nonVegan}
                    </h2>
                    <p className="text-muted-foreground">
                      {result === "vegan"
                        ? resultText[language].description.vegan
                        : resultText[language].description.nonVegan(nonVeganIngredients.length)}
                    </p>
                  </div>
                </div>
              </div>

              {result === "vegan" && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-100/50 p-3 dark:bg-green-900/10">
                  <Leaf className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <p className="text-sm text-green-800 dark:text-green-300">
                    {resultText[language].goodChoice}
                  </p>
                </div>
              )}

              <div className="mt-4 flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDetails(!showDetails)}
                  className="flex items-center gap-1 text-xs"
                >
                  {showDetails ? resultText[language].hideDetails : resultText[language].showDetails}
                  {showDetails ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t bg-white/50 dark:bg-gray-950/50"
            >
              <div className="p-6">
                <div className="space-y-4">
                  {result === "non-vegan" && nonVeganIngredients.length > 0 && (
                    <div>
                      <h3 className="mb-2 font-medium">{resultText[language].nonVeganFound}</h3>
                      <div className="flex flex-wrap gap-2">
                        {nonVeganIngredients.map((ingredient, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300"
                          >
                            {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="mb-2 font-medium">{resultText[language].analyzedIngredients}</h3>
                    <Card>
                      <CardContent className="p-3 text-sm">
                        <p className="font-mono">{ingredientText}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
