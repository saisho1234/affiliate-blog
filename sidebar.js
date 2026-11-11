/**
 * ai-navi.app サイドバー広告 v1
 * PC（min-width:1200px）のみ表示
 * A8アフィリエイト + Amazonリンク をページに応じて切り替え
 */
(function () {
  if (window.innerWidth < 1200) return;

  const path = window.location.pathname;

  // ─── A8プログラム定義 ───────────────────────────────
  const A8 = {
    miricanvas: { name: 'MiriCanvas', desc: 'AIが自動デザイン｜テンプレ10万点', cta: '完全無料', color: '#7c3aed', label: '無料で始める →', url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+6NC9YQ+5EX8+5YRHE', px: 'https://www15.a8.net/0.gif?a8mat=4B7ROU+6NC9YQ+5EX8+5YRHE' },
    notta:      { name: 'Notta', desc: '録音→AI議事録｜42言語・月3時間無料', cta: '月3時間無料', color: '#0ea5e9', label: '無料で試す →', url: 'https://px.a8.net/svt/ejp?a8mat=4B7QWV+7FX302+5988+5YJRM', px: 'https://www19.a8.net/0.gif?a8mat=4B7QWV+7FX302+5988+5YJRM' },
    awarefy:    { name: 'Awarefy', desc: '精神科医監修AIメンタルケア', cta: '7日間全機能無料', color: '#16a34a', label: '7日間無料 →', url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+5OT4VM+5CBW+5YZ75', px: 'https://www12.a8.net/0.gif?a8mat=4B7ROU+5OT4VM+5CBW+5YZ75' },
    irusiru:    { name: 'イルシル', desc: 'AI資料自動生成｜月1,680円〜', cta: 'クレカ不要3日間', color: '#ea580c', label: '3日間無料 →', url: 'https://px.a8.net/svt/ejp?a8mat=4B7QWV+73EZAQ+5UMS+5YZ75', px: 'https://www10.a8.net/0.gif?a8mat=4B7QWV+73EZAQ+5UMS+5YZ75' },
    plaud:      { name: 'PLAUD NOTE', desc: 'ボタン1つで議事録完成', cta: '月300分無料', color: '#b45309', label: '無料で試す →', url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+691VG2+5J4W+5YRHE', px: 'https://www13.a8.net/0.gif?a8mat=4B7ROU+691VG2+5J4W+5YRHE' },
    millen:     { name: 'MillenVPN', desc: 'AIツール用セキュアVPN', cta: '30日保証', color: '#2563eb', label: '月286円〜 →', url: 'https://px.a8.net/svt/ejp?a8mat=4BAITO+6XGN8Y+3JTE+HVNAR', px: 'https://www19.a8.net/0.gif?a8mat=4BAITO+6XGN8Y+3JTE+HVNAR' },
    conoha:     { name: 'ConoHa AI Canvas', desc: 'AIでHP・LP自動生成', cta: '初月無料', color: '#7c3aed', label: '無料で始める →', url: 'https://px.a8.net/svt/ejp?a8mat=4B7QWV+8D9CVM+50+7RUDGZ', px: 'https://www19.a8.net/0.gif?a8mat=4B7QWV+8D9CVM+50+7RUDGZ' },
    bunken:     { name: '文賢', desc: 'AI文章校正｜プロ品質の仕上がり', cta: '1文字から校正', color: '#059669', label: '無料で試す →', url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+6JROC2+3Q2O+HVFKY', px: 'https://www12.a8.net/0.gif?a8mat=4B7ROU+6JROC2+3Q2O+HVFKY' },
    valueai:    { name: 'Value AI Writer', desc: 'AI記事生成｜月1,100円〜', cta: '5000文字無料', color: '#7c3aed', label: '無料で試す →', url: 'https://px.a8.net/svt/ejp?a8mat=4B7QWY+6KYJJM+1JUK+1HM30X', px: 'https://www12.a8.net/0.gif?a8mat=4B7QWY+6KYJJM+1JUK+1HM30X' },
  };

  // ─── Amazonリンク定義 ─────────────────────────────
  const AMZ = {
    ic:      { name: 'ICレコーダー おすすめ', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=IC%E3%83%AC%E3%82%B3%E3%83%BC%E3%83%80%E3%83%BC&tag=ainavi2026-22' },
    mic:     { name: 'コンデンサーマイク おすすめ', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=%E3%82%B3%E3%83%B3%E3%83%87%E3%83%B3%E3%82%B5%E3%83%BC%E3%83%9E%E3%82%A4%E3%82%AF&tag=ainavi2026-22' },
    monitor: { name: 'PCモニター おすすめ', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=PC%E3%83%A2%E3%83%8B%E3%82%BF%E3%83%BC&tag=ainavi2026-22' },
    earbuds: { name: 'ワイヤレスイヤホン おすすめ', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=%E3%83%AF%E3%82%A4%E3%83%A4%E3%83%AC%E3%82%B9%E3%82%A4%E3%83%A4%E3%83%9B%E3%83%B3&tag=ainavi2026-22' },
    headset: { name: 'ヘッドセット おすすめ', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=%E3%83%98%E3%83%83%E3%83%89%E3%82%BB%E3%83%83%E3%83%88+PC&tag=ainavi2026-22' },
    webcam:  { name: 'ウェブカメラ おすすめ', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=%E3%82%A6%E3%82%A7%E3%83%96%E3%82%AB%E3%83%A1%E3%83%A9&tag=ainavi2026-22' },
    pentab:  { name: 'ペンタブレット おすすめ', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=%E3%83%9A%E3%83%B3%E3%82%BF%E3%83%96%E3%83%AC%E3%83%83%E3%83%88&tag=ainavi2026-22' },
    plaud:   { name: 'PLAUD NOTE', kw: 'Amazon で価格を見る →', url: 'https://www.amazon.co.jp/s?k=PLAUD+NOTE&tag=ainavi2026-22' },
    desk:    { name: 'デスク・リモートワーク用品', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=%E3%83%AA%E3%83%A2%E3%83%BC%E3%83%88%E3%83%AF%E3%83%BC%E3%82%AF+%E3%83%87%E3%82%B9%E3%82%AF&tag=ainavi2026-22' },
    book:    { name: 'AI活用 おすすめ本', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=AI+%E6%B4%BB%E7%94%A8+%E6%9C%AC&tag=ainavi2026-22' },
    speaker: { name: 'スマートスピーカー おすすめ', kw: 'Amazon で探す →', url: 'https://www.amazon.co.jp/s?k=%E3%82%B9%E3%83%9E%E3%83%BC%E3%83%88%E3%82%B9%E3%83%94%E3%83%BC%E3%82%AB%E3%83%BC&tag=ainavi2026-22' },
  };

  // ─── ページ別プログラム選択 ──────────────────────────
  let main_a8 = A8.miricanvas;
  let sub_a8  = A8.notta;
  let amz     = AMZ.book;

  if (path.includes('deepl')) {
    main_a8 = A8.notta; sub_a8 = A8.miricanvas; amz = AMZ.book;
  } else if (path.includes('notta') || path.includes('gijiroku') || path.includes('meeting-minutes') || path.includes('english-meeting') || path.includes('transcri') || path.includes('zenchord') || path.includes('twomi')) {
    main_a8 = A8.notta; sub_a8 = A8.plaud; amz = AMZ.ic;
  } else if (path.includes('plaud')) {
    main_a8 = A8.plaud; sub_a8 = A8.notta; amz = AMZ.plaud;
  } else if (path.includes('ic-recorder')) {
    main_a8 = A8.notta; sub_a8 = A8.miricanvas; amz = AMZ.ic;
  } else if (path.includes('microphone')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.notta; amz = AMZ.mic;
  } else if (path.includes('monitor')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.notta; amz = AMZ.monitor;
  } else if (path.includes('earbuds') || path.includes('wireless')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.notta; amz = AMZ.earbuds;
  } else if (path.includes('headset')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.notta; amz = AMZ.headset;
  } else if (path.includes('webcam')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.notta; amz = AMZ.webcam;
  } else if (path.includes('pentab')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.irusiru; amz = AMZ.pentab;
  } else if (path.includes('desk') || path.includes('remote-work')) {
    main_a8 = A8.notta; sub_a8 = A8.miricanvas; amz = AMZ.desk;
  } else if (path.includes('smart-speaker')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.notta; amz = AMZ.speaker;
  } else if (path.includes('irusiru') || path.includes('presentation') || path.includes('slide') || path.includes('design')) {
    main_a8 = A8.irusiru; sub_a8 = A8.miricanvas; amz = null;
  } else if (path.includes('canva') || path.includes('miricanvas')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.irusiru; amz = null;
  } else if (path.includes('conoha')) {
    main_a8 = A8.conoha; sub_a8 = A8.irusiru; amz = null;
  } else if (path.includes('bunken') || path.includes('proofreading') || path.includes('writing-check')) {
    main_a8 = A8.bunken; sub_a8 = A8.miricanvas; amz = null;
  } else if (path.includes('value-ai-writer') || path.includes('sakubun')) {
    main_a8 = A8.valueai; sub_a8 = A8.miricanvas; amz = null;
  } else if (path.includes('awarefy')) {
    main_a8 = A8.awarefy; sub_a8 = A8.miricanvas; amz = null;
  } else if (path.includes('vpn') || path.includes('ablenet')) {
    main_a8 = A8.millen; sub_a8 = A8.notta; amz = null;
  } else if (path.includes('chatgpt') || path.includes('claude') || path.includes('gemini') || path.includes('copilot') || path.includes('perplexity') || path.includes('notebooklm') || path.includes('ai-writing') || path.includes('ai-tools') || path.includes('free-ai') || path.includes('ai-free') || path.includes('ai-side') || path.includes('ai-business')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.notta; amz = AMZ.book;
  } else if (path.includes('image') || path.includes('midjourney') || path.includes('stable-diffusion') || path.includes('aiarty') || path.includes('firefly')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.irusiru; amz = AMZ.book;
  } else if (path.includes('ai-books')) {
    main_a8 = A8.miricanvas; sub_a8 = A8.notta; amz = AMZ.book;
  }

  // ─── A8カードHTML生成 ────────────────────────────
  function a8Card(p) {
    return `
      <div style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:14px;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
        <div style="background:${p.color};padding:12px 14px;color:#fff;">
          <div style="font-weight:800;font-size:0.95em;">${p.name}</div>
          <div style="font-size:0.78em;opacity:0.9;margin-top:2px;">${p.desc}</div>
        </div>
        <div style="background:#fff;padding:12px 14px;">
          <div style="display:inline-block;background:#fef3c7;color:#92400e;border-radius:4px;padding:2px 8px;font-size:0.72em;font-weight:700;margin-bottom:8px;">${p.cta}</div><br>
          <a href="${p.url}" rel="nofollow noopener" target="_blank"
             style="display:block;background:${p.color};color:#fff;text-align:center;padding:9px 10px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.88em;">
            ${p.label}
          </a>
          <img src="${p.px}" width="1" height="1" style="border:0;" alt="">
        </div>
      </div>`;
  }

  // ─── Amazonカード HTML生成 ───────────────────────
  function amzCard(a) {
    if (!a) return '';
    return `
      <div style="border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;margin-bottom:14px;box-shadow:0 2px 8px rgba(0,0,0,0.07);">
        <div style="background:#FF9900;padding:12px 14px;color:#fff;">
          <div style="font-weight:800;font-size:0.95em;">Amazon</div>
          <div style="font-size:0.78em;opacity:0.9;margin-top:2px;">${a.name}</div>
        </div>
        <div style="background:#fff;padding:12px 14px;">
          <a href="${a.url}" rel="nofollow noopener" target="_blank" referrerpolicy="no-referrer-when-downgrade"
             style="display:block;background:#FF9900;color:#fff;text-align:center;padding:9px 10px;border-radius:8px;font-weight:700;text-decoration:none;font-size:0.88em;">
            ${a.kw}
          </a>
        </div>
      </div>`;
  }

  // ─── サイドバーHTML ──────────────────────────────
  const sidebarHtml = `
    <div style="text-align:center;margin-bottom:6px;font-size:0.68em;color:#94a3b8;letter-spacing:.08em;font-weight:600;">PR・広告</div>
    ${a8Card(main_a8)}
    ${amzCard(amz)}
    ${a8Card(sub_a8)}
  `;

  // ─── DOM構造を組み替えてサイドバーを注入 ─────────────
  const mainEl = document.querySelector('main');
  if (!mainEl) return;

  const article = mainEl.querySelector('article');
  if (!article) return;

  // ラッパー作成
  const wrapper = document.createElement('div');
  wrapper.id = 'sidebar-layout';
  wrapper.style.cssText = 'display:flex;gap:28px;align-items:flex-start;max-width:1180px;margin:0 auto;padding:0 20px;';

  // コンテンツ列
  const contentCol = document.createElement('div');
  contentCol.style.cssText = 'flex:1;min-width:0;';

  // サイドバー列
  const sidebarEl = document.createElement('aside');
  sidebarEl.id = 'page-sidebar';
  sidebarEl.setAttribute('aria-label', 'PR広告');
  sidebarEl.style.cssText = 'width:260px;flex-shrink:0;position:sticky;top:80px;align-self:flex-start;';
  sidebarEl.innerHTML = sidebarHtml;

  // article をラッパーに移動
  mainEl.insertBefore(wrapper, article);
  contentCol.appendChild(article);
  wrapper.appendChild(contentCol);
  wrapper.appendChild(sidebarEl);

  // main の余分なpaddingをリセット
  mainEl.style.padding = '0';
  mainEl.style.maxWidth = 'none';
})();
