# QuoteFlow - AI-Powered Motivational Content Creator

A comprehensive web application for creating motivational quotes with AI-powered voice overs and background music. Perfect for content creators, social media managers, and anyone looking to create engaging motivational content at scale.

## Features

### 🎯 Core Features
- **AI Quote Generation**: Generate motivational quotes across multiple categories
- **Voice Over Integration**: Convert quotes to speech using OpenAI TTS or ElevenLabs
- **Background Music**: Add ambient soundtracks to enhance your content
- **Bulk Creation**: Process multiple quotes simultaneously
- **File Management**: Organized folder structure for easy asset management
- **Canva Integration**: Automatically create visual designs for your quotes

### 🎨 Design Elements
- Modern, clean interface with Apple-level aesthetics
- Responsive design for all devices
- Smooth animations and micro-interactions
- Comprehensive color system with multiple brand colors
- Professional typography and spacing

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/quoteflow.git
cd quoteflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## API Integration Setup

To use the full functionality of QuoteFlow, you'll need to set up API keys for various services:

### Required APIs

1. **OpenAI API** (for text-to-speech)
   - Sign up at [OpenAI Platform](https://platform.openai.com/)
   - Get your API key from the dashboard
   - Add to your environment variables as `OPENAI_API_KEY`

2. **ElevenLabs API** (alternative TTS)
   - Sign up at [ElevenLabs](https://elevenlabs.io/)
   - Get your API key from your account settings
   - Add to your environment variables as `ELEVENLABS_API_KEY`

3. **Canva API** (for design creation)
   - Apply for access at [Canva Developers](https://www.canva.com/developers/)
   - Get your API key once approved
   - Add to your environment variables as `CANVA_API_KEY`

4. **YouTube Data API** (for music library)
   - Create a project in [Google Cloud Console](https://console.cloud.google.com/)
   - Enable YouTube Data API v3
   - Create credentials and get your API key
   - Add to your environment variables as `YOUTUBE_API_KEY`

### Environment Variables

Create a `.env` file in the root directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
CANVA_API_KEY=your_canva_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here
```

## Usage

### 1. Generate Quotes
- Navigate to the Quote Generator
- Select category and number of quotes
- Click "Generate Quotes" to create motivational content

### 2. Create Voice Overs
- Go to the Voice Over section
- Configure voice settings (voice type, speed, pitch)
- Select quotes and generate audio files

### 3. Add Background Music
- Visit the Background Music page
- Choose genre and mood settings
- Select quotes to add ambient soundtracks

### 4. Bulk Processing
- Use the Bulk Creation feature for large batches
- Configure what to include (quotes, voice, music)
- Start batch processing and monitor progress

### 5. File Management
- Access the File Manager to organize your assets
- Download individual files or entire project folders
- View storage usage and project statistics

## File Structure

The application creates organized folder structures for your projects:

```
Project Name/
├── videos/           # Final rendered videos
├── voice-tracks/     # Voice over audio files
├── background-music/ # Background music tracks
├── raw-quotes/       # Text files with quotes
└── exports/          # Combined final exports
```

## API Integration Examples

### Voice Over Generation
```javascript
import { generateVoiceOver } from './utils/api';

const audioBlob = await generateVoiceOver(
  "Your motivational quote here",
  "neural-voice-1",
  process.env.OPENAI_API_KEY
);
```

### Canva Design Creation
```javascript
import { createCanvaDesign } from './utils/api';

const design = await createCanvaDesign(
  "Your quote text",
  "Author Name",
  process.env.CANVA_API_KEY
);
```

## Technologies Used

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Icons**: Lucide React

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@quoteflow.com or create an issue in the GitHub repository.

## Roadmap

- [ ] Integration with more TTS providers
- [ ] Advanced video editing capabilities
- [ ] Social media direct publishing
- [ ] Team collaboration features
- [ ] Advanced analytics and reporting
- [ ] Mobile app development

---

Made with ❤️ by the Dilshan weragoda graphics DETZ Studios team
