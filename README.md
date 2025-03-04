# Unduck but its EVEN FASTER

My daily driver search router. Project forked so I can make and host the changes that I want to see instantly.
- 60% reduced dictionary size vs Unduck & DuckDuckGo
- Popular bangs are cached
- Lazy loading bang dictionary
- Dark/Light mode support (Stops page from flashing the wrong colour after every search)
- Hosted on Cloudflare pages (Slightly faster than Vercel #placebo)
- Default search engine selection (Cached permanently in localStorage)

# Motivation

DuckDuckGo's bang redirects are too slow. Add the following URL as a custom search engine to your browser. Enables all of DuckDuckGo's bangs to work, but much faster.

```
https://search.gphua.com?q=%s
```

## How is it that much faster?

DuckDuckGo does their redirects server side. Their DNS is...not always great. Result is that it often takes ages.

I solved this by doing all of the work client side. Once you've went to [search.gphua.com](https://search.gphua.com) once, the JS is all cache'd and will never need to be downloaded again. Your device does the redirects, not me.
