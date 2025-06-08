# 🌙 Arabizi - Arabic Keyboard Online (Next.js Version)

A modern, responsive Arabic keyboard and transliteration tool built with Next.js, TypeScript, and Tailwind CSS. This is a complete conversion of the original Python Flask application to a modern React-based web application.

## ✨ Features

- **🎯 Smart AI Suggestions**: Real-time Arabic transliteration with intelligent suggestions
- **📱 Multi-Device Support**: Responsive design that works on desktop, mobile, and tablet
- **🧠 Memory System**: Remembers your preferred translations for faster typing
- **📋 Copy History**: Automatically saves your last 10 copied texts
- **🎨 Multiple Fonts**: Support for Cairo, Noto Sans Arabic, Amiri, and more
- **⌨️ Keyboard Navigation**: Full keyboard support with arrow keys, Enter, Space
- **🔄 Auto-Replace**: Smart auto-replacement as you type
- **📐 Flexible Sizing**: Normal, Middle, and Full-screen text area modes
- **🌐 SEO Optimized**: Complete meta tags, structured data, and sitemap
- **🔒 Privacy Focused**: Local storage only, no data sent to servers except for transliteration

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs/arabic-typing-nextjs
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── transliterate/
│   │   │   └── route.ts          # Main transliteration API endpoint
│   │   ├── robots.txt/
│   │   │   └── route.ts          # Robots.txt generation
│   │   └── sitemap.xml/
│   │       └── route.ts          # Sitemap.xml generation
│   ├── terms/
│   │   └── page.tsx              # Terms of Service page
│   ├── privacy/
│   │   └── page.tsx              # Privacy Policy page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main application page
│   └── globals.css               # Global styles
```

## 🔧 API Endpoints

### POST /api/transliterate
Transliterates English/Franco-Arabic text to Arabic script.

**Request Body:**
```json
{
  "text": "salam 7abibi"
}
```

**Response:**
```json
{
  "success": true,
  "candidates": ["سلام حبيبي", "سلام حبيبى", "سلام حبيبة"],
  "best_match": "سلام حبيبي",
  "original": "salam 7abibi"
}
```

### GET /robots.txt
Returns the robots.txt file for SEO.

### GET /sitemap.xml
Returns the XML sitemap for search engines.

## 🎨 Styling

The application uses:
- **Tailwind CSS** for utility-first styling
- **Custom CSS** for complex animations and Arabic-specific styling
- **Google Fonts** for Arabic typography (Cairo, Noto Sans Arabic, Amiri)
- **Gradient backgrounds** and modern UI elements

## 🌐 Features Comparison with Original Python Version

| Feature | Python Flask | Next.js | Status |
|---------|-------------|---------|--------|
| Arabic Transliteration | ✅ | ✅ | ✅ Complete |
| Smart Suggestions | ✅ | ✅ | ✅ Complete |
| Copy History | ✅ | ✅ | ✅ Complete |
| Multiple Fonts | ✅ | ✅ | ✅ Complete |
| Keyboard Navigation | ✅ | ✅ | ✅ Complete |
| Responsive Design | ✅ | ✅ | ✅ Enhanced |
| SEO Optimization | ✅ | ✅ | ✅ Complete |
| Terms/Privacy Pages | ✅ | ✅ | ✅ Complete |
| Background Animations | ✅ | ✅ | ✅ Complete |
| Local Storage | ✅ | ✅ | ✅ Complete |

## 🔄 Migration from Python Flask

This Next.js version maintains 100% feature parity with the original Python Flask application:

1. **Backend API**: Flask routes converted to Next.js API routes
2. **Frontend**: HTML/CSS/JavaScript converted to React components with TypeScript
3. **Styling**: Original CSS preserved and enhanced with Tailwind CSS
4. **Functionality**: All JavaScript functions converted to React hooks and callbacks
5. **SEO**: All meta tags, structured data, and SEO features preserved

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Environment Variables

No environment variables are required for basic functionality. The application uses the public Yamli API for transliteration.

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Privacy & Security

- **Local Storage Only**: Copy history and preferences stored locally
- **No User Tracking**: No analytics or tracking cookies
- **HTTPS Required**: All API calls use HTTPS encryption
- **Minimal Data**: Only text for transliteration is sent to external APIs

## 🌍 Internationalization

The application supports:
- **Arabic (RTL)**: Full right-to-left text support
- **English (LTR)**: Interface and input text
- **Franco-Arabic**: Romanized Arabic input (7abibi, 3ala, etc.)

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy to Vercel
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Static Export
```bash
npm run build
npm run export
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Yamli API** for Arabic transliteration services
- **Google Fonts** for Arabic typography
- **Next.js Team** for the amazing framework
- **Tailwind CSS** for utility-first styling

## 📞 Support

For support, feature requests, or bug reports, please open an issue on GitHub.

---

**Made with ❤️ for the Arabic-speaking community**

🌙 **Arabizi** - The best free Arabic keyboard online | Yamli Alternative 2025
