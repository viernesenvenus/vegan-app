"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'es' | 'en'

type TranslationKey = 
  | 'hero.badge'
  | 'hero.title'
  | 'hero.subtitle'
  | 'hero.cta'
  | 'hero.howItWorks'
  | 'scanner.title'
  | 'scanner.subtitle1'
  | 'scanner.subtitle2'
  | 'header.scan'
  | 'header.how'
  | 'language.es'
  | 'language.en'
  | 'scan.button'
  | 'scan.another'
  | 'scan.processing'
  | 'scan.upload'
  | 'scan.dragDrop'
  | 'scan.or'
  | 'scan.takePhoto'
  | 'scan.ingredientList'
  | 'status.vegan'
  | 'status.notVegan'
  | 'status.check'
  | 'status.scanNow'

const translations = {
  es: {
    'hero.badge': 'Vida vegana más fácil',
    'hero.title': '¿Es Vegano?',
    'hero.subtitle': 'Sube una foto de cualquier lista de ingredientes y descubre instantáneamente si el producto es vegano. Sin más esfuerzo leyendo etiquetas diminutas o buscando ingredientes desconocidos.',
    'hero.cta': 'Escanear Ingredientes',
    'hero.howItWorks': 'Cómo Funciona',
    'scanner.title': 'Escáner de Ingredientes',
    'scanner.subtitle1': 'Toma una foto o sube una imagen de los ingredientes',
    'scanner.subtitle2': 'Estamos verificando si este producto es vegano',
    'header.scan': 'Escanear Ingredientes',
    'header.how': 'Cómo Funciona',
    'language.es': 'Español',
    'language.en': 'English',
    'scan.button': 'Escanear',
    'scan.another': 'Escanear Otro Producto',
    'scan.processing': 'Analizando ingredientes...',
    'scan.upload': 'Sube una lista de ingredientes',
    'scan.dragDrop': 'Arrastra y suelta o haz clic para subir',
    'scan.or': 'O',
    'scan.takePhoto': 'Tomar una Foto',
    'scan.ingredientList': 'Lista de ingredientes',
    'status.vegan': 'Vegano',
    'status.notVegan': 'No Vegano',
    'status.check': 'Verificar',
    'status.scanNow': 'Escanear Ahora'
  },
  en: {
    'hero.badge': 'Easier vegan life',
    'hero.title': 'Is it Vegan?',
    'hero.subtitle': 'Upload a photo of any ingredient list and instantly discover if a product is vegan. No more effort reading tiny labels or searching for unknown ingredients.',
    'hero.cta': 'Scan Ingredients',
    'hero.howItWorks': 'How It Works',
    'scanner.title': 'Ingredient Scanner',
    'scanner.subtitle1': 'Take a photo or upload an image of the ingredients',
    'scanner.subtitle2': 'We are verifying if this product is vegan',
    'header.scan': 'Scan Ingredients',
    'header.how': 'How It Works',
    'language.es': 'Spanish',
    'language.en': 'English',
    'scan.button': 'Scan',
    'scan.another': 'Scan Another Product',
    'scan.processing': 'Analyzing ingredients...',
    'scan.upload': 'Upload an ingredients list',
    'scan.dragDrop': 'Drag and drop or click to upload',
    'scan.or': 'Or',
    'scan.takePhoto': 'Take a Photo',
    'scan.ingredientList': 'Ingredient list',
    'status.vegan': 'Vegan',
    'status.notVegan': 'Not Vegan',
    'status.check': 'Check',
    'status.scanNow': 'Scan Now'
  }
} as const

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && (savedLanguage === 'es' || savedLanguage === 'en')) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key]
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 