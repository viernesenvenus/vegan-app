"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Edit2, Check } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface TextExtractionProps {
  extractedText: string
  onAnalyze: () => void
}

export function TextExtraction({ extractedText, onAnalyze }: TextExtractionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState(extractedText)

  const handleSaveEdit = () => {
    setIsEditing(false)
  }

  return (
    <Card className="mb-6">
      <CardHeader className="bg-blue-100 dark:bg-blue-900/20">
        <CardTitle className="flex items-center justify-between text-base">
          <span>Extracted Text from Image</span>
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)} className="h-8 px-2 text-blue-600">
            {isEditing ? <Check className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
            <span className="ml-1">{isEditing ? "Save" : "Edit"}</span>
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Detected Ingredients:</h3>
            {isEditing ? (
              <Textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="min-h-[100px]"
                placeholder="Edit the extracted text if needed"
              />
            ) : (
              <p className="text-sm p-3 bg-muted rounded-md">{editedText}</p>
            )}
          </div>

          <div className="flex justify-between">
            <p className="text-xs text-muted-foreground italic">
              {isEditing
                ? "Edit the text if OCR didn't capture it correctly"
                : "If the text doesn't match the image, click Edit to correct it"}
            </p>
            <Button onClick={onAnalyze} className="bg-green-600 hover:bg-green-700">
              <Search className="mr-2 h-4 w-4" />
              Analyze Ingredients
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
