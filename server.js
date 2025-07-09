const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.get('/api/news', async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    // Fetch news from multiple free sources
    const newsData = await fetchNewsData(page, limit);
    
    res.json({
      success: true,
      data: newsData,
      page: parseInt(page),
      hasMore: newsData.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch news data'
    });
  }
});

// Function to fetch news from multiple sources
async function fetchNewsData(page, limit) {
  const newsItems = [];
  
  try {
    // Fetch from NewsAPI (free tier)
    const newsApiKey = process.env.NEWS_API_KEY || 'demo';
    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&page=${page}&pageSize=${limit}&apiKey=${newsApiKey}`;
    
    const newsResponse = await axios.get(newsApiUrl);
    if (newsResponse.data.articles) {
      newsResponse.data.articles.forEach(article => {
        newsItems.push({
          id: `news-${Date.now()}-${Math.random()}`,
          title: article.title,
          description: article.description,
          imageUrl: article.urlToImage || getRandomImage(),
          source: article.source.name,
          url: article.url,
          publishedAt: article.publishedAt,
          type: 'news'
        });
      });
    }
  } catch (error) {
    console.log('NewsAPI error, using fallback data');
  }
  
  // Add some meme-like content and entertainment news
  const entertainmentItems = generateEntertainmentContent(page, limit);
  newsItems.push(...entertainmentItems);
  
  // Shuffle the items for variety
  return shuffleArray(newsItems).slice(0, limit);
}

function generateEntertainmentContent(page, limit) {
  const entertainmentData = [
    {
      id: `entertainment-${Date.now()}-1`,
      title: "Latest Tech Memes That Will Make You LOL",
      description: "The internet's funniest tech memes of the week that perfectly capture our digital struggles.",
      imageUrl: "https://picsum.photos/800/600?random=1",
      source: "Tech Humor Daily",
      url: "#",
      publishedAt: new Date().toISOString(),
      type: 'meme'
    },
    {
      id: `entertainment-${Date.now()}-2`,
      title: "Viral Cat Videos That Broke the Internet",
      description: "These adorable feline moments have taken social media by storm.",
      imageUrl: "https://picsum.photos/800/600?random=2",
      source: "Pet Lovers Weekly",
      url: "#",
      publishedAt: new Date().toISOString(),
      type: 'viral'
    },
    {
      id: `entertainment-${Date.now()}-3`,
      title: "Gaming Memes That Every Player Can Relate To",
      description: "From rage quits to epic wins, these gaming memes hit too close to home.",
      imageUrl: "https://picsum.photos/800/600?random=3",
      source: "Gaming Culture",
      url: "#",
      publishedAt: new Date().toISOString(),
      type: 'meme'
    },
    {
      id: `entertainment-${Date.now()}-4`,
      title: "Work From Home Memes That Are Too Real",
      description: "Remote work struggles captured in hilarious memes that every WFH employee understands.",
      imageUrl: "https://picsum.photos/800/600?random=4",
      source: "Remote Work Life",
      url: "#",
      publishedAt: new Date().toISOString(),
      type: 'meme'
    },
    {
      id: `entertainment-${Date.now()}-5`,
      title: "Food Memes That Will Make You Hungry",
      description: "The most relatable food memes that perfectly capture our relationship with delicious dishes.",
      imageUrl: "https://picsum.photos/800/600?random=5",
      source: "Foodie Memes",
      url: "#",
      publishedAt: new Date().toISOString(),
      type: 'meme'
    }
  ];
  
  return entertainmentData;
}

function getRandomImage() {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/800/600?random=${randomId}`;
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 