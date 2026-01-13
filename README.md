# Avira Medical - KI-Co-Pilot Demo

A demonstration application for Avira Medical's AI-powered clinical documentation assistant for Hospital Information Systems (KIS).

## Features

- 🏥 **Patient Selection**: Search and select patients from sample data
- 📄 **Document Generation**: Animated 5-step pipeline for generating discharge letters
- 📊 **Output Preview**: Generated documents with source citations and guideline matching
- 📋 **Workflows**: Browse available document types and templates
- 📜 **History**: View previously generated documents with statistics
- 📚 **Guidelines**: Clinical guideline references for document matching
- 🏗️ **Architecture**: UML diagrams (Mermaid) with download functionality
- 🌐 **Multi-language**: German and English support

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` folder.

## Deployment Options

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy with default settings

Or use Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Option 2: Netlify

1. Push code to GitHub
2. Connect repository to [Netlify](https://netlify.com)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

Or drag & drop the `dist` folder to Netlify

### Option 3: GitHub Pages

1. Add to `vite.config.js`:
```js
export default defineConfig({
  base: '/your-repo-name/',
  // ...
})
```

2. Build and deploy:
```bash
npm run build
# Push dist folder to gh-pages branch
```

### Option 4: Static Hosting

Upload the contents of the `dist/` folder to any static web server (Apache, Nginx, S3, etc.)

## Project Structure

```
avira-medical-demo/
├── src/
│   ├── App.jsx          # Main app with all components
│   ├── main.jsx         # Entry point
│   ├── index.css        # Global styles
│   ├── i18n/
│   │   └── translations.js  # German/English translations
│   └── data/
│       └── patients.js  # Sample patient data
├── index.html
├── vite.config.js
└── package.json
```

## Demo Workflow

1. **Dashboard**: Start on the main assistant page
2. **Select Patient**: Click "Patient auswählen" to choose a sample patient
3. **Generate**: Click "Generieren" to start document generation
4. **Processing**: Watch the 5-step animated pipeline (~5 seconds)
5. **Output**: View the generated Arztbrief with:
   - Source citations (clickable)
   - Guideline matching panel
   - Quality check scores
6. **Explore**: Browse workflows, history, and architecture diagrams

## Technologies

- **React 18** - UI framework
- **React Router 6** - Navigation
- **Vite 5** - Build tool
- **Mermaid** - UML diagrams
- **Lucide React** - Icons

## Sample Patients

1. **Max Mustermann** (67, male)
   - COPD with acute exacerbation
   - Internal Medicine department
   
2. **Anna Weber** (50, female)
   - Acute appendicitis with peritonitis
   - Surgery department

## License

Proprietary - Avira Medical © 2026
