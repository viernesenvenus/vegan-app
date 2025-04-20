"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Leaf, Camera, Check, X, AlertTriangle } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] h-[800px] w-[800px] rounded-full bg-green-200/20 blur-3xl dark:bg-green-900/10" />
        <div className="absolute -bottom-[40%] -left-[60%] h-[800px] w-[800px] rounded-full bg-green-200/20 blur-3xl dark:bg-green-900/10" />
      </div>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-green-100 px-3 py-1 text-sm dark:bg-green-800/30">
                  <span className="flex items-center gap-1">
                    <Leaf className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    <span className="text-green-800 dark:text-green-300">Plant-based living made easy</span>
                  </span>
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Is it <span className="text-green-600 dark:text-green-400">Vegan</span>?
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Take a photo of any ingredient list and instantly know if a product is vegan-friendly. No more
                  squinting at tiny labels or Googling unfamiliar ingredients.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/scan">
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700 w-full min-[400px]:w-auto"
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Scan Ingredients
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                    How It Works
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative mx-auto aspect-square w-full max-w-[450px] overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-green-100 p-4 dark:from-green-950/40 dark:to-green-900/20 shadow-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 p-4 w-full max-w-[350px]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="col-span-2 flex items-center justify-center rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <Check className="h-8 w-8 text-green-500" />
                        <span className="text-lg font-medium">Vegan</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center justify-center rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <X className="h-6 w-6 text-red-500" />
                        <span className="text-sm font-medium">Not Vegan</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-center justify-center rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                        <span className="text-sm font-medium">Check</span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="col-span-2 flex items-center justify-center rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800"
                    >
                      <div className="flex items-center gap-2">
                        <Camera className="h-5 w-5 text-gray-500" />
                        <span className="text-sm font-medium">Scan Now</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="how-it-works" className="mt-24 mb-12">
            <h2 className="text-2xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <Camera className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Snap a Photo</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Take a picture of the ingredient list on any food product
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-8 w-8 text-green-600 dark:text-green-400"
                  >
                    <path d="M14 3v4a1 1 0 0 0 1 1h4" />
                    <path d="M5 12V5a2 2 0 0 1 2-2h7l5 5v4" />
                    <path d="M5 21h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Instant Analysis</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Our app scans and analyzes all ingredients automatically
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
                  <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold">Get Results</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Instantly see if the product is vegan, non-vegan, or needs verification
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
