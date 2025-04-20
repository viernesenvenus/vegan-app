# Vegan Check

A modern, responsive web app that allows users to take a photo of an ingredient list on a food product and tells them whether the product is vegan or not.

## Features

- Upload or take a photo of a product's ingredient label
- OCR functionality to extract text from photos
- Ingredient analysis to determine if a product is vegan
- Mobile-first, responsive design
- Dark mode support

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/vegan-check.git
cd vegan-check
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

This project is ready to be deployed on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Deploy

## Project Structure

\`\`\`
vegan-check/
├── app/
│   ├── layout.tsx      # Root layout with theme provider
│   ├── page.tsx        # Home page
│   ├── globals.css     # Global styles
│   └── scan/
│       └── page.tsx    # Scan page
├── components/
│   ├── ui/             # shadcn/ui components
│   ├── header.tsx      # App header with dark mode toggle
│   ├── footer.tsx      # App footer
│   ├── hero-section.tsx # Home page hero section
│   ├── scan-form.tsx   # Form for uploading/taking photos
│   ├── scan-results.tsx # Results display component
│   ├── mode-toggle.tsx # Dark mode toggle component
│   └── theme-provider.tsx # Theme provider for dark mode
├── public/             # Static assets
└── README.md           # Project documentation
\`\`\`

## License

This project is licensed under the MIT License.
