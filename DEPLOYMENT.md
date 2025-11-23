# Quranic Phrases

A modern web application showcasing beautiful Quranic phrases with translations in multiple languages (Arabic, English, Hindi, and Urdu).

## 🌐 Live Demo

[https://quranicphrases.github.io/quranic-phrases/](https://quranicphrases.github.io/quranic-phrases/)

## 🚀 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

**Setup Steps:**

1. **Push code to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/quranicphrases/quranic-phrases.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**

   - Go to your repo: `https://github.com/quranicphrases/quranic-phrases`
   - Navigate to: **Settings** → **Pages**
   - Under **Source**, select: **GitHub Actions**
   - Save

3. **Automatic Deployment:**
   - Every push to `main` branch triggers automatic build and deployment
   - Check deployment status in **Actions** tab
   - Site will be live at: `https://quranicphrases.github.io/quranic-phrases/`

### Manual Deployment

If you prefer manual deployment:

```bash
# Build for GitHub Pages
npm run build:gh-pages

# The dist folder is ready to deploy
# You can use gh-pages package or upload manually
```

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
quranic-phrases/
├── public/                    # Static files (JSON data)
│   ├── phrases-overview.json
│   ├── phrases-anonymous.json
│   ├── phrases-praise-0.json
│   └── phrases-praise-1.json
├── src/
│   ├── assets/               # Static assets & text content
│   ├── components/           # React components
│   ├── config/               # Configuration files
│   ├── hooks/                # Custom React hooks
│   ├── pages/                # Page components
│   ├── types/                # TypeScript types
│   └── utils/                # Utility functions
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions deployment
└── vite.config.ts            # Vite configuration
```

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Material-UI (MUI)** - Component library
- **React Router** - Client-side routing

## 📝 Data Caching Strategy

The app uses intelligent caching to provide fast loading:

- **Development:** Files cached using `force-cache` strategy
- **Production:** GitHub Pages ETags for automatic cache invalidation
- **Offline Support:** Falls back to cached data when network unavailable

## 🔄 Updating Phrase Data

1. Update JSON files in `/public` folder
2. Push changes to GitHub
3. GitHub Actions automatically rebuilds and deploys
4. ETags ensure users get updated content

## 📄 License

[Add your license here]

## 👥 Contributing

[Add contribution guidelines if applicable]
