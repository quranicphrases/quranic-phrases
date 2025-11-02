# Quranic Phrases App

A modern React TypeScript application for displaying Quranic content with proper multilingual support and accessibility features.

## 🚀 Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Material-UI (MUI)** for consistent design components
- **Tailwind CSS** for utility-first styling
- **ESLint** for code quality

## 📦 Components

### PhraseText Component
A reusable component for displaying multilingual Quranic text with proper language, edition, and content information.

**Features:**
- Material-UI integration with Box, Typography, and Paper components
- Multilingual support with proper text alignment and direction (LTR/RTL)
- Accessibility features for screen readers
- Customizable typography variants and styling via MUI sx prop
- Optional Paper wrapper for elevated design

**Usage:**
```tsx
import PhraseText from './components/PhraseText';

<PhraseText
  language="العربية"
  languageEnglish="Arabic"
  edition="القرآن الكريم"
  editionEnglish="The Holy Quran"
  text="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
  textAlign="right"
  direction="rtl"
  variant="h4"
  languageCode="ar"
  usePaper
/>
```

### ReferenceBadge Component
A clickable Material-UI Chip component for displaying Quranic references.

**Features:**
- Accepts reference format "surahNo:verseNo" (e.g., "2:255")
- Blue themed chip with Link icon
- Clickable with customizable onClick handler
- Default redirect to Google.com (customizable)
- Proper accessibility with ARIA labels

**Usage:**
```tsx
import ReferenceBadge from './components/ReferenceBadge';

<ReferenceBadge reference="2:255" />
<ReferenceBadge 
  reference="1:1" 
  onClick={() => console.log('Custom action')} 
/>
```

### References Component
A container component that displays a horizontally scrollable list of reference badges.

**Features:**
- Horizontal scrolling with custom scrollbar styling
- Configurable title (defaults to "References")
- Support for custom click handlers and redirect URLs
- Empty state handling
- Responsive design with proper spacing
- Accessible scrolling for keyboard and screen reader users

**Usage:**
```tsx
import References from './components/References';

<References
  references={['2:255', '1:1', '112:1', '113:1']}
  title="Related Verses"
  onReferenceClick={(ref) => console.log(`Clicked: ${ref}`)}
/>

// Empty state
<References references={[]} title="No References" />
```

### PhraseCard Component
A comprehensive card component that combines all other components to display a complete Quranic phrase with translations and references.

**Features:**
- Material-UI Card with customizable elevation and styling
- Displays text in four languages (Arabic, English, Hindi, Urdu)
- Integrated References component for related verses
- Advanced accessibility features following WCAG 2.1 AA standards
- Proper semantic HTML structure with ARIA labels
- Screen reader optimized with comprehensive descriptions
- Keyboard navigation support with focus management
- Unique IDs for accessibility linking between sections

**Accessibility Standards:**
- **ARIA Attributes**: Proper `role`, `aria-labelledby`, and `aria-describedby`
- **Semantic Structure**: Uses proper heading hierarchy and landmarks
- **Language Tags**: Correct `lang` attributes for each text section
- **Focus Management**: Visible focus indicators and logical tab order
- **Screen Reader Support**: Hidden descriptive summaries for context
- **Keyboard Navigation**: All interactive elements accessible via keyboard
- **Color Contrast**: Meets WCAG AA contrast requirements
- **Text Scaling**: Supports up to 200% zoom without horizontal scrolling

**Usage:**
```tsx
import PhraseCard from './components/PhraseCard';

<PhraseCard
  arabic={{
    text: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
    edition: 'القرآن الكريم',
    editionEnglish: 'The Holy Quran',
  }}
  english={{
    text: 'In the name of Allah, the Entirely Merciful...',
    edition: 'Sahih International',
  }}
  hindi={{
    text: 'अल्लाह के नाम से जो अत्यंत कृपालु...',
    edition: 'फारूकी',
    editionEnglish: 'Faruqi',
  }}
  urdu={{
    text: 'اللہ کے نام سے جو نہایت مہربان...',
    edition: 'احمد علی',
    editionEnglish: 'Ahmed Ali',
  }}
  references={['1:1', '112:1', '113:1']}
  onReferenceClick={(ref) => console.log(`Clicked: ${ref}`)}
  elevation={4}
/>
```

## 🎨 Design System

The app uses Material-UI's design system with:
- **Material Design 3** principles
- **Responsive Typography** with proper font scaling
- **Consistent Spacing** using MUI's 8px grid system
- **Color Palette** with primary, secondary, and semantic colors
- **Accessibility** features built-in

## 🌍 Multilingual Support

### Supported Languages
- **Arabic**: Right-to-left text with Amiri font family
- **English**: Left-to-right with standard fonts
- **Urdu**: Right-to-left with Noto Nastaliq Urdu font
- **Hindi**: Left-to-right with Devanagari script support

### Font Loading
Google Fonts are imported for better multilingual typography:
```css
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400;500;700&family=Noto+Sans+Devanagari:wght@400;500;700&display=swap');
```

## ♿ Accessibility Features

- **ARIA Labels**: Comprehensive labeling for screen readers
- **Language Attributes**: Proper `lang` attributes for text sections
- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Focus Indicators**: Clear focus styles for better navigation
- **Screen Reader Support**: Hidden descriptive text for context
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd quranic-phrases

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## 📁 Project Structure

```
src/
├── components/
│   ├── PhraseText.tsx      # Multilingual text display component
│   ├── ReferenceBadge.tsx  # Quranic reference chip component
│   ├── References.tsx      # Horizontally scrollable reference list
│   └── PhraseCard.tsx      # Complete phrase card with all languages
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## 🔧 Development

### Adding New Languages
1. Update the `PhraseText` component with new font families
2. Add language-specific styling in the `sx` prop
3. Include proper `languageCode` for accessibility
4. Test with screen readers for proper pronunciation

### Customizing Themes
The app uses Material-UI's theming system. Modify the theme in `App.tsx`:

```tsx
const theme = createTheme({
  typography: {
    fontFamily: '"Custom Font", "Roboto", sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
