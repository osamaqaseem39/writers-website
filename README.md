# Nawa Sohail - Writer Website

A beautiful, modern website for writer and author Nawa Sohail, built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Elegant Design**: Clean, literary-themed design with beautiful typography
- ⏰ **Countdown Timer**: Interactive countdown to website launch
- 📱 **Responsive**: Fully responsive design that works on all devices
- 🚀 **Modern Tech Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- 📧 **Newsletter Signup**: Email subscription form for updates
- 🎯 **SEO Optimized**: Proper metadata and Open Graph tags

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd writer-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles and Tailwind CSS
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
└── components/
    └── ComingSoon.tsx   # Main coming soon component
```

## Customization

### Changing the Launch Date

Edit the `targetDate` in `src/components/ComingSoon.tsx`:

```typescript
const targetDate = new Date('2024-12-31T00:00:00')
```

### Styling

The website uses Tailwind CSS with custom color schemes. You can modify:
- Colors in `tailwind.config.js`
- Custom CSS classes in `src/app/globals.css`
- Component-specific styles in the component files

### Content

Update the content in `src/components/ComingSoon.tsx` to match your preferences:
- Author name and title
- Coming soon message
- Newsletter signup text
- Footer information

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms

Build the project and deploy the `out` folder:

```bash
npm run build
npm run export
```

## Technologies Used

- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - UI library
- **PostCSS** - CSS processing

## License

This project is licensed under the ISC License.

## Contact

For questions about this website, please contact Nawa Sohail.

---

*Built with ❤️ for the literary world* 