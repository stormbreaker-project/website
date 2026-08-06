// News listing — render sorted post cards from front-matter.
//
// Discovery has two modes:
//   • Production: GitHub Contents API lists news/*.md (cached 10 min/visitor).
//   • Localhost:  read the dev server's directory index, so local unpushed
//                 posts show up immediately without a push or a manifest.
// Article bodies are always fetched same-origin, so the API is hit at most
// once per visit in production and never during local dev.
(function () {
  var grid = document.getElementById('news-grid');
  var status = document.getElementById('news-status');
  if (!grid) return;

  var SB = window.SB;
  var cfg = SB.newsConfig;
  var CACHE_KEY = 'sb-news-cache-v1';
  var TTL = 10 * 60 * 1000;

  function isLocal() {
    return location.protocol === 'file:' ||
      /^(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])$/.test(location.hostname);
  }

  function setStatus(msg) {
    if (!status) return;
    status.textContent = msg || '';
    status.style.display = msg ? '' : 'none';
  }

  function toPost(name, text) {
    var fm = SB.parseFrontMatter(text).data;
    return {
      slug: name.replace(/\.md$/i, ''),
      title: fm.title, date: fm.date, tag: fm.tag,
      summary: fm.summary, author: fm.author
    };
  }

  function card(p) {
    var meta = [];
    if (p.date) meta.push('<span>' + SB.escapeHtml(SB.formatDate(p.date)) + '</span>');
    if (p.author) meta.push('<span>· ' + SB.escapeHtml(p.author) + '</span>');
    return '' +
      '<a class="news-card" href="/news/article.html?slug=' + encodeURIComponent(p.slug) + '">' +
        (p.tag ? '<span class="tag">' + SB.escapeHtml(p.tag) + '</span>' : '') +
        '<h3>' + SB.escapeHtml(p.title || p.slug) + '</h3>' +
        '<p>' + SB.escapeHtml(p.summary || '') + '</p>' +
        '<div class="meta">' + meta.join('') + '<span class="read">Read →</span></div>' +
      '</a>';
  }

  function render(posts) {
    posts.sort(function (a, b) { return String(b.date || '').localeCompare(String(a.date || '')); });
    if (!posts.length) { grid.innerHTML = ''; setStatus('No news yet — check back soon.'); return; }
    setStatus('');
    grid.innerHTML = posts.map(card).join('');
  }

  // ---- Discovery: localhost (directory index) ----
  function discoverLocal() {
    return fetch('/news/')
      .then(function (r) { if (!r.ok) throw new Error('dir ' + r.status); return r.text(); })
      .then(function (html) {
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var names = [].map.call(doc.querySelectorAll('a[href]'), function (a) {
          return (a.getAttribute('href') || '').replace(/^.*\//, '').replace(/\/$/, '');
        }).filter(function (n) { return /\.md$/i.test(n) && n.toLowerCase() !== 'readme.md'; });
        names = names.filter(function (n, i) { return names.indexOf(n) === i; });
        return Promise.all(names.map(function (n) {
          return fetch('/news/' + n).then(function (r) { return r.ok ? r.text() : ''; })
            .then(function (t) { return toPost(n, t); });
        }));
      });
  }

  // ---- Discovery: production (GitHub Contents API) ----
  function discoverApi() {
    var api = 'https://api.github.com/repos/' + cfg.owner + '/' + cfg.repo +
              '/contents/' + cfg.dir + '?ref=' + cfg.branch;
    return fetch(api, { headers: { Accept: 'application/vnd.github.v3+json' } })
      .then(function (r) {
        if (r.status === 404) return [];            // news/ dir not created yet
        if (!r.ok) throw new Error('list ' + r.status);
        return r.json();
      })
      .then(function (items) {
        var files = (items || []).filter(function (it) {
          return it.type === 'file' && /\.md$/i.test(it.name) && it.name.toLowerCase() !== 'readme.md';
        });
        return Promise.all(files.map(function (f) {
          return fetch(f.download_url)                // raw CDN — no API rate limit
            .then(function (r) { return r.ok ? r.text() : ''; })
            .then(function (t) { return toPost(f.name, t); });
        }));
      });
  }

  function readCache() {
    try {
      var o = JSON.parse(sessionStorage.getItem(CACHE_KEY));
      if (o && Date.now() - o.t < TTL) return o.posts;
    } catch (e) {}
    return null;
  }
  function writeCache(posts) {
    try { sessionStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), posts: posts })); } catch (e) {}
  }

  // ---- Run ----
  var local = isLocal();

  if (!local) {
    var cached = readCache();
    if (cached) { render(cached); return; }
  }

  setStatus('Loading news…');
  (local ? discoverLocal() : discoverApi())
    .then(function (posts) {
      if (!local) writeCache(posts);
      render(posts);
    })
    .catch(function (err) {
      console.error(err);
      setStatus('Couldn’t load news right now. Please try again in a bit.');
    });
})();
