// Shared News helpers — repo config, front-matter parsing, small utils.
// Consumed by news-list.js (cards) and news-article.js (full post).
(function () {
  var SB = (window.SB = window.SB || {});

  // Where the Markdown posts live. Discovery uses the GitHub Contents API;
  // article bodies are fetched same-origin (Pages serves /news/*.md).
  SB.newsConfig = {
    owner: 'stormbreaker-project',
    repo: 'website',
    branch: 'master',
    dir: 'news'
  };

  // Split a `---` YAML-ish front-matter block from the Markdown body.
  // Only simple `key: value` pairs are supported (enough for post metadata).
  SB.parseFrontMatter = function (text) {
    text = String(text || '').replace(/^﻿/, '');
    var m = /^\s*---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/.exec(text);
    if (!m) return { data: {}, body: text };
    var data = {};
    m[1].split(/\r?\n/).forEach(function (line) {
      if (!line.trim() || /^\s*#/.test(line)) return;
      var i = line.indexOf(':');
      if (i === -1) return;
      var key = line.slice(0, i).trim();
      var val = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
      if (key) data[key] = val;
    });
    return { data: data, body: m[2] || '' };
  };

  // "2026-08-06" -> "Aug 6, 2026" (parsed manually to avoid UTC off-by-one).
  SB.formatDate = function (s) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s || '');
    if (!m) return s || '';
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[+m[2] - 1] + ' ' + (+m[3]) + ', ' + m[1];
  };

  SB.escapeHtml = function (s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  // Slugs map straight to filenames, so keep them strict.
  SB.isValidSlug = function (slug) { return /^[A-Za-z0-9._-]+$/.test(slug || ''); };
})();
