/**
 * Minimal, safe Markdown → HTML renderer for the blog (no npm dependency).
 *
 * Supports the subset our posts use: h2/h3/h4, paragraphs, bold, italic, inline
 * code, links, unordered + ordered lists, blockquotes, and horizontal rules.
 *
 * Safety model: ALL input is HTML-escaped FIRST, so no author/source HTML can
 * survive. We then re-introduce only a fixed, known-safe set of tags from the
 * Markdown grammar. Link hrefs are restricted to http(s), mailto, and
 * site-relative URLs (anything else is dropped), so the output is safe to pass
 * to `dangerouslySetInnerHTML`.
 */

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Allow only safe hrefs; everything else becomes "#". */
function safeHref(raw: string): string {
  const href = raw.trim();
  if (/^https?:\/\//i.test(href)) return href;
  if (/^mailto:/i.test(href)) return href;
  if (href.startsWith('/') || href.startsWith('#')) return href;
  return '#';
}

/** Inline formatting on already-HTML-escaped text. */
function renderInline(text: string): string {
  let out = text;
  // Links: [label](href) — label may contain inline formatting after this pass.
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label: string, href: string) => {
    const safe = escapeHtml(safeHref(href));
    const external = /^https?:\/\//i.test(href);
    const rel = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${safe}"${rel}>${label}</a>`;
  });
  // Inline code (before bold/italic so * inside code is literal).
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Bold then italic.
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');
  return out;
}

export function renderMarkdown(markdown: string): string {
  const escaped = escapeHtml(markdown.replace(/\r\n/g, '\n').trim());
  const lines = escaped.split('\n');
  const html: string[] = [];

  let i = 0;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${renderInline(para.join(' ').trim())}</p>`);
      para = [];
    }
  };

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Blank line → paragraph break.
    if (trimmed === '') {
      flushPara();
      i++;
      continue;
    }

    // Horizontal rule.
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushPara();
      html.push('<hr />');
      i++;
      continue;
    }

    // Headings (#### → h4, ### → h3, ## → h2; single # collapses to h2).
    const heading = /^(#{1,4})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushPara();
      const level = Math.min(Math.max(heading[1].length, 2), 4);
      html.push(`<h${level}>${renderInline(heading[2].trim())}</h${level}>`);
      i++;
      continue;
    }

    // Blockquote (one or more consecutive `>` lines).
    if (/^&gt;\s?/.test(trimmed)) {
      flushPara();
      const quote: string[] = [];
      while (i < lines.length && /^&gt;\s?/.test(lines[i].trim())) {
        quote.push(lines[i].trim().replace(/^&gt;\s?/, ''));
        i++;
      }
      html.push(`<blockquote>${renderInline(quote.join(' '))}</blockquote>`);
      continue;
    }

    // Unordered list.
    if (/^[-*]\s+/.test(trimmed)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(`<li>${renderInline(lines[i].trim().replace(/^[-*]\s+/, ''))}</li>`);
        i++;
      }
      html.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Ordered list.
    if (/^\d+\.\s+/.test(trimmed)) {
      flushPara();
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(`<li>${renderInline(lines[i].trim().replace(/^\d+\.\s+/, ''))}</li>`);
        i++;
      }
      html.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // Otherwise accumulate into the current paragraph.
    para.push(trimmed);
    i++;
  }
  flushPara();

  return html.join('\n');
}
