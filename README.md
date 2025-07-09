# Latest News App

A modern React-based news application that collects the latest popular memes, images, and news with infinite scroll functionality. Built with Node.js, Express, and React.

## Features

- 🚀 **Infinite Scroll** - Seamlessly load more content as you scroll
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 📰 **Multiple Content Types** - News, memes, and viral content
- 🔄 **Real-time Updates** - Refresh button to get latest content
- 🖼️ **Free Image Sources** - Uses Picsum Photos for random images
- 🌐 **Deployable** - Ready for Heroku deployment

## Tech Stack

- **Backend**: Node.js, Express
- **Frontend**: React, React Icons
- **Infinite Scroll**: react-infinite-scroll-component
- **HTTP Client**: Axios
- **Styling**: CSS3 with modern gradients and animations

## Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd node_latest_news
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   npm install
   
   # Install client dependencies
   cd client
   npm install
   cd ..
   ```

3. **Environment Setup (Optional)**
   
   Create a `.env` file in the root directory for NewsAPI integration:
   ```env
   NEWS_API_KEY=your_news_api_key_here
   ```
   
   Get a free API key from [NewsAPI](https://newsapi.org/)

4. **Run the application**
   ```bash
   # Development mode (runs both server and client)
   npm run dev
   
   # Or run separately:
   # Server only
   npm run server
   
   # Client only (in another terminal)
   npm run client
   ```

5. **Access the application**
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## API Endpoints

### GET /api/news
Fetches news and entertainment content with pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "unique-id",
      "title": "Article Title",
      "description": "Article description",
      "imageUrl": "https://picsum.photos/800/600?random=1",
      "source": "Source Name",
      "url": "https://article-url.com",
      "publishedAt": "2024-01-01T00:00:00.000Z",
      "type": "news|meme|viral"
    }
  ],
  "page": 1,
  "hasMore": true
}
```

## Deployment

### Heroku Deployment

1. **Create a Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables (optional)**
   ```bash
   heroku config:set NEWS_API_KEY=your_api_key_here
   ```

3. **Deploy**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push heroku main
   ```

4. **Open your app**
   ```bash
   heroku open
   ```

### Other Platforms

The app is also deployable on:
- Vercel
- Netlify
- Railway
- DigitalOcean App Platform

## Project Structure

```
node_latest_news/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # React source code
│   │   ├── App.js         # Main App component
│   │   ├── App.css        # App styles
│   │   ├── index.js       # React entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
├── server.js              # Express server
├── package.json           # Backend dependencies
├── Procfile              # Heroku deployment
└── README.md             # This file
```

## Features in Detail

### Infinite Scroll
- Automatically loads more content when user reaches the bottom
- Smooth loading animations
- Prevents duplicate requests

### Content Types
- **News**: Real news articles from NewsAPI
- **Memes**: Entertainment and humor content
- **Viral**: Trending and popular content

### Image Handling
- Uses Picsum Photos for random images
- Fallback images for broken links
- Optimized image loading

### Responsive Design
- Mobile-first approach
- Grid layout that adapts to screen size
- Touch-friendly interface

## Customization

### Adding New Content Sources

1. Modify the `fetchNewsData` function in `server.js`
2. Add new API integrations
3. Update the content generation logic

### Styling Changes

1. Edit `client/src/App.css` for component styles
2. Modify `client/src/index.css` for global styles
3. Update color schemes and gradients

### Adding New Content Types

1. Add new type in the content generation
2. Update the `getTypeIcon` and `getTypeColor` functions
3. Add corresponding CSS styles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

If you encounter any issues or have questions, please open an issue on the repository. 