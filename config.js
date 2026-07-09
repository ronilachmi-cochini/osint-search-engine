const APP = {
  name: "OSINT Search Engine Pro",
  version: "2.0.0"
};

const SEARCH_TYPES = {
  auto: { regex: /.*/ },
  email: { regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  phone: { regex: /^[0-9+\-\s()]{7,}$/ },
  ip: { regex: /^(?:\d{1,3}\.){3}\d{1,3}$/ },
  domain: { regex: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
  username: { regex: /^[a-zA-Z0-9._-]+$/ },
  name: { regex: /.*/ }
};

const CATEGORIES = [
  {
    id: "search",
    title: "🌐 מנועי חיפוש",
    sources: [
      { name: "Google", url: "https://www.google.com/search?q={query}" },
      { name: "Bing", url: "https://www.bing.com/search?q={query}" },
      { name: "DuckDuckGo", url: "https://duckduckgo.com/?q={query}" },
      { name: "Yandex", url: "https://yandex.com/search/?text={query}" }
    ]
  },
  {
    id: "social",
    title: "👤 רשתות חברתיות",
    sources: [
      { name: "GitHub", url: "https://github.com/search?q={query}" },
      { name: "Reddit", url: "https://www.reddit.com/search/?q={query}" },
      { name: "LinkedIn", url: "https://www.google.com/search?q=site:linkedin.com+{query}" },
      { name: "Facebook", url: "https://www.google.com/search?q=site:facebook.com+{query}" },
      { name: "Instagram", url: "https://www.google.com/search?q=site:instagram.com+{query}" },
      { name: "TikTok", url: "https://www.google.com/search?q=site:tiktok.com+{query}" },
      { name: "X", url: "https://www.google.com/search?q=site:x.com+{query}" }
    ]
  },
  {
    id: "images",
    title: "📷 תמונות",
    sources: [
      { name: "Google Images", url: "https://www.google.com/search?tbm=isch&q={query}" },
      { name: "Bing Images", url: "https://www.bing.com
