"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Camera, Upload, RefreshCw, Loader2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScanResults } from "@/components/scan-results"
import { motion, AnimatePresence } from "framer-motion"
import Tesseract from "tesseract.js"

export function ScanForm() {
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [extractedText, setExtractedText] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processImageWithOCR = async (imageUrl: string) => {
    try {
      const result = await Tesseract.recognize(
        imageUrl,
        'eng',
        {
          logger: m => console.log(m)
        }
      );
      return result.data.text;
    } catch (error) {
      console.error('OCR processing error:', error);
      return null;
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const fileUrl = URL.createObjectURL(selectedFile)
      setPreviewUrl(fileUrl)
      setShowResults(false)
      setExtractedText(null)

      // Start OCR processing
      setIsProcessing(true)
      const text = await processImageWithOCR(fileUrl)
      setExtractedText(text || "Unable to extract text from image")
      setIsProcessing(false)
      setShowResults(true)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const resetForm = () => {
    setFile(null)
    setPreviewUrl(null)
    setExtractedText(null)
    setShowResults(false)
    setIsProcessing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const takeDemoPhoto = async () => {
    // Simulate camera capture by using a demo image
    const demoImageUrl = "/placeholder.svg?height=400&width=400"
    setPreviewUrl(demoImageUrl)
    setFile(null)

    // Process the demo image with OCR
    setIsProcessing(true)
    const text = await processImageWithOCR(demoImageUrl)
    setExtractedText(text || "Unable to extract text from image")
    setIsProcessing(false)
    setShowResults(true)
  }

  return (
    <div className="max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {!previewUrl || isProcessing ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-6 overflow-hidden border-2 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-6">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />

                  {isProcessing ? (
                    <div className="w-full py-16 flex flex-col items-center justify-center">
                      <div className="relative">
                        <Loader2 className="h-12 w-12 animate-spin text-green-600 dark:text-green-400" />
                        <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full border-2 border-green-600 opacity-20 dark:border-green-400"></div>
                      </div>
                      <h3 className="mt-6 text-xl font-medium">Analyzing ingredients...</h3>
                      <p className="text-center text-sm text-muted-foreground mt-2">
                        We're checking if this product is vegan
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="text-center">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                          <ImageIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-xl font-medium mb-1">Upload an ingredient list</h3>
                        <p className="text-sm text-muted-foreground">
                          Take a photo or upload an image of the ingredients
                        </p>
                      </div>

                      <div className="grid w-full gap-4">
                        <div
                          className="group relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 px-6 py-10 text-center transition-colors hover:bg-muted/80 dark:border-muted-foreground/20 dark:bg-muted/20 dark:hover:bg-muted/30"
                          onClick={handleUploadClick}
                        >
                          <div className="relative mb-4 h-10 w-10">
                            <Upload className="h-10 w-10 text-muted-foreground/50 transition-transform group-hover:scale-110" />
                            <div className="absolute inset-0 animate-pulse rounded-full bg-muted-foreground/5 group-hover:animate-none"></div>
                          </div>
                          <p className="mb-1 text-sm font-medium">Drag & drop or click to upload</p>
                          <p className="text-xs text-muted-foreground">Support for JPG, PNG and GIF files</p>
                        </div>

                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t"></span>
                          </div>
                          <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or</span>
                          </div>
                        </div>

                        <Button variant="outline" onClick={takeDemoPhoto} className="w-full py-6 text-base font-medium">
                          <Camera className="mr-2 h-5 w-5" />
                          Take a Photo
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ) : null}

        {showResults && extractedText ? (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-6">
              <ScanResults ingredientText={extractedText} imageUrl={previewUrl} />
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="group relative overflow-hidden rounded-full px-6 py-2 shadow-md transition-all hover:shadow-lg"
                >
                  <span className="relative z-10 flex items-center gap-2 text-sm font-medium transition-transform group-hover:scale-105">
                    <RefreshCw className="h-4 w-4" />
                    Scan Another Product
                  </span>
                  <span className="absolute inset-0 z-0 bg-gradient-to-r from-green-100 to-green-50 opacity-0 transition-opacity group-hover:opacity-100 dark:from-green-900/20 dark:to-green-800/20"></span>
                </Button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
