# openCv

openCv is an interactive web-based puzzle and CV application built for Metin Taşçı. 
It features a developer-themed puzzle that, upon solving, transitions into a matrix-style decrypting animation, finally revealing a sleek, modern, and professional resume.

## Technologies Used

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Fonts**: Geist (Sans) and Geist Mono

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- **Puzzle Screen**: An interactive screen with a scenario-based question, hints (Accordion), and toast notifications for wrong answers.
- **Decrypting Animation**: A 3-second Scramble Text / Data Flow animation mimicking a terminal decryption process.
- **Embedded CV**: A clean, modern CV component using a corporate light theme, monospace badges, and well-structured sections for Experience, Education, and Skills.
- **Responsive Design**: Fully responsive layout adapting to mobile, tablet, and desktop screens.
