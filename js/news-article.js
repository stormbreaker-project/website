// Single news article — fetch /news/<slug>.md (same-origin, served by Pages),
// split front-matter, and render the body with the vendored marked.js.
// NOTE: posts are first-party (same repo), so output isn't sanitized. If we
// ever accept outside contributions, add DOMPurify before injecting.
(function () {
  var body = document.getElementById('article-body');
  if (!body) return;

  var SB = window.SB;
  var titleEl = document.getElementById('article-title');
  var metaEl = document.getElementById('article-meta');
  var tagEl = document.getElementById('article-tag');

  var slug = new URLSearchParams(location.search).get('slug') || '';

  function fail(msg) {
    if (titleEl) titleEl.textContent = 'Article not found';
    if (tagEl) tagEl.style.display = 'none';
    if (metaEl) metaEl.textContent = '';
    body.innerHTML = '<p>' + SB.escapeHtml(msg) + '</p>' +
      '<p><a class="back" href="/news.html">← Back to News</a></p>';
  }

  if (!SB.isValidSlug(slug)) { fail('Invalid article link.'); return; }

  fetch('/news/' + slug + '.md')
    .then(function (r) { if (!r.ok) throw new Error('md ' + r.status); return r.text(); })
    .then(function (text) {
      var fm = SB.parseFrontMatter(text);
      var d = fm.data;
      var title = d.title || slug;

      document.title = title + ' · Team StormBreaker News';
      if (titleEl) titleEl.textContent = title;

      if (tagEl) {
        if (d.tag) { tagEl.textContent = d.tag; tagEl.style.display = ''; }
        else { tagEl.style.display = 'none'; }
      }
      if (metaEl) {
        var bits = [];
        if (d.date) bits.push(SB.formatDate(d.date));
        if (d.author) bits.push(d.author);
        metaEl.textContent = bits.join(' · ');
      }

      body.innerHTML = window.marked ? window.marked.parse(fm.body) : SB.escapeHtml(fm.body);
    })
    .catch(function (err) {
      console.error(err);
      fail('This article could not be found. It may have been moved or removed.');
    });
})();
