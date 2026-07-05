import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const articlesDir = 'C:/Users/kouki/affiliate-blog/articles';
const siteUrl = 'https://ai-navi.app';
const ogImage = 'https://ai-navi.app/og-image.png';

const files = readdirSync(articlesDir).filter(f => f.endsWith('.html'));

let updated = 0;

for (const file of files) {
  const filePath = join(articlesDir, file);
  let html = readFileSync(filePath, 'utf-8');

  // すでにBreadcrumbListがある場合はスキップ
  if (html.includes('BreadcrumbList')) {
    console.log(`SKIP (already has BreadcrumbList): ${file}`);
    continue;
  }

  // タイトルを取得
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const title = titleMatch ? titleMatch[1].split(' | ')[0] : file;

  // ファイル名からURLを生成
  const articleUrl = `${siteUrl}/articles/${file}`;

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = `
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem", "position": 1, "name": "ホーム", "item": "${siteUrl}/"},
      {"@type": "ListItem", "position": 2, "name": "AIツール比較", "item": "${siteUrl}/"},
      {"@type": "ListItem", "position": 3, "name": "${title}", "item": "${articleUrl}"}
    ]
  }
  </script>`;

  // og:imageを追加（og:urlの直後）
  if (!html.includes('og:image')) {
    html = html.replace(
      /(<meta property="og:url"[^>]+>)/,
      `$1\n  <meta property="og:image" content="${ogImage}">\n  <meta property="og:type" content="article">\n  <meta name="twitter:card" content="summary_large_image">\n  <meta name="twitter:image" content="${ogImage}">`
    );
  }

  // BreadcrumbListを</head>の直前に追加
  html = html.replace('</head>', `${breadcrumbSchema}\n</head>`);

  writeFileSync(filePath, html, 'utf-8');
  console.log(`UPDATED: ${file}`);
  updated++;
}

console.log(`\n完了: ${updated}件更新`);
