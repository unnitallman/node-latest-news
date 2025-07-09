import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FiTrendingUp, FiClock, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchNews = async (pageNum = 1) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/news?page=${pageNum}&limit=10`);
      
      if (response.data.success) {
        if (pageNum === 1) {
          setNews(response.data.data);
        } else {
          setNews(prev => [...prev, ...response.data.data]);
        }
        setHasMore(response.data.hasMore);
        setPage(pageNum);
      }
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchNews(page + 1);
    }
  };

  const refreshNews = () => {
    setNews([]);
    setPage(1);
    setHasMore(true);
    setError(null);
    fetchNews(1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'meme':
        return '😂';
      case 'viral':
        return '🔥';
      case 'news':
        return '📰';
      default:
        return '📄';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'meme':
        return '#ff6b6b';
      case 'viral':
        return '#ffa726';
      case 'news':
        return '#4ecdc4';
      default:
        return '#95a5a6';
    }
  };

  if (error && news.length === 0) {
    return (
      <div className="container">
        <div className="error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={refreshNews} className="refresh-btn">
            <FiRefreshCw /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <FiTrendingUp className="logo-icon" />
              <h1>Latest News</h1>
            </div>
            <button onClick={refreshNews} className="refresh-btn" disabled={loading}>
              <FiRefreshCw className={loading ? 'spinning' : ''} />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <InfiniteScroll
            dataLength={news.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div className="loading">
                <FiRefreshCw className="spinning" />
                Loading more news...
              </div>
            }
            endMessage={
              <div className="loading">
                <p>You've reached the end! 🎉</p>
              </div>
            }
          >
            <div className="news-grid">
              {news.map((item) => (
                <article key={item.id} className="news-card">
                  <div className="card-image">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      onError={(e) => {
                        e.target.src = 'https://picsum.photos/400/300?random=' + Math.random();
                      }}
                    />
                    <div 
                      className="type-badge"
                      style={{ backgroundColor: getTypeColor(item.type) }}
                    >
                      {getTypeIcon(item.type)}
                    </div>
                  </div>
                  
                  <div className="card-content">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-description">{item.description}</p>
                    
                    <div className="card-meta">
                      <div className="meta-left">
                        <span className="source">
                          <FiTrendingUp />
                          {item.source}
                        </span>
                        <span className="date">
                          <FiClock />
                          {formatDate(item.publishedAt)}
                        </span>
                      </div>
                      
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="read-more"
                      >
                        <FiExternalLink />
                        Read More
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </main>
    </div>
  );
}

export default App; 