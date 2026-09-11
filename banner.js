/**
 * ai-navi.app 常時表示アフィリエイトバナー v2
 * スクロール30%後に表示（即表示よりCTR向上）
 * ×で24時間非表示。
 */
(function () {
  // 24時間非表示設定を確認
  const hiddenUntil = localStorage.getItem('af_banner_hidden');
  if (hiddenUntil && Date.now() < Number(hiddenUntil)) return;

  // プログラムリスト
  const programs = [
    {
      name: 'MiriCanvas',
      desc: 'AIが自動デザイン｜テンプレ10万点・完全無料',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+6NC9YQ+5EX8+5YRHE',
      px: 'https://www15.a8.net/0.gif?a8mat=4B7ROU+6NC9YQ+5EX8+5YRHE',
      color: '#7c3aed',
      label: '無料で始める →'
    },
    {
      name: 'Notta',
      desc: '録音→AI議事録｜42言語翻訳・月3時間無料',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7QWV+7FX302+5988+5YJRM',
      px: 'https://www19.a8.net/0.gif?a8mat=4B7QWV+7FX302+5988+5YJRM',
      color: '#0ea5e9',
      label: '無料で試す →'
    },
    {
      name: 'Awarefy',
      desc: '精神科医監修AIメンタルケア｜7日間全機能無料',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+5OT4VM+5CBW+5YZ75',
      px: 'https://www12.a8.net/0.gif?a8mat=4B7ROU+5OT4VM+5CBW+5YZ75',
      color: '#16a34a',
      label: '7日間無料 →'
    },
    {
      name: 'イルシル',
      desc: 'テキスト→AIスライド自動生成｜無料プランあり',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7QWV+73EZAQ+5UMS+5YZ75',
      px: 'https://www10.a8.net/0.gif?a8mat=4B7QWV+73EZAQ+5UMS+5YZ75',
      color: '#ea580c',
      label: '無料で作成 →'
    },
    {
      name: 'PLAUD NOTE',
      desc: 'ボタン1つで議事録完成｜月300分無料',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+691VG2+5J4W+5YRHE',
      px: 'https://www13.a8.net/0.gif?a8mat=4B7ROU+691VG2+5J4W+5YRHE',
      color: '#b45309',
      label: '無料で試す →'
    },
    {
      name: 'MillenVPN',
      desc: 'AIツール利用時のプライバシー保護｜月額286円〜',
      url: 'https://px.a8.net/svt/ejp?a8mat=4BAITO+6XGN8Y+3JTE+HVNAR',
      px: 'https://www19.a8.net/0.gif?a8mat=4BAITO+6XGN8Y+3JTE+HVNAR',
      color: '#0f172a',
      label: '月286円〜 →'
    }
  ];

  // 現在の記事に合わせてプログラムを選択（URLベース）
  const path = location.pathname;
  let idx = 0;
  if (path.includes('plaud') || path.includes('ic-recorder')) idx = 4;
  else if (path.includes('notta') || path.includes('transcri') || path.includes('memo') || path.includes('voice') || path.includes('record') || path.includes('zenchord')) idx = 1;
  else if (path.includes('awarefy') || path.includes('mental')) idx = 2;
  else if (path.includes('irusiru') || path.includes('slide') || path.includes('presentation')) idx = 3;
  else if (path.includes('stable-diffusion') || path.includes('image') || path.includes('conoha') || path.includes('midjourney') || path.includes('firefly') || path.includes('ai-image')) idx = 0;
  else if (path.includes('vpn') || path.includes('security') || path.includes('privacy') || path.includes('ablenet')) idx = 5;
  else if (path.includes('translate') || path.includes('deepl') || path.includes('ai-translate')) idx = 1;
  else if (path.includes('design') || path.includes('canva') || path.includes('miri') || path.includes('gamma') || path.includes('free-ai')) idx = 0;
  else if (path.includes('writing') || path.includes('chatgpt') || path.includes('claude') || path.includes('gemini') || path.includes('copilot') || path.includes('perplexity')) idx = 1;
  else idx = 0; // デフォルト: MiriCanvas

  const p = programs[idx];

  // バナー要素を作成（初期非表示）
  const bar = document.createElement('div');
  bar.id = 'af-sticky-bar';
  bar.setAttribute('role', 'complementary');
  bar.setAttribute('aria-label', 'PR広告');
  bar.style.cssText = [
    'position:fixed', 'bottom:-80px', 'left:0', 'right:0',
    'background:linear-gradient(135deg,#0f172a,#1e1b4b)',
    'color:#fff', 'padding:12px 20px', 'z-index:99999',
    'display:flex', 'align-items:center', 'justify-content:center',
    'gap:12px', 'font-size:0.85em', 'font-family:sans-serif',
    'box-shadow:0 -3px 20px rgba(0,0,0,0.4)',
    'flex-wrap:wrap',
    'transition:bottom 0.5s ease-out'
  ].join(';');

  bar.innerHTML = `
    <span style="background:#fff2;padding:2px 7px;border-radius:4px;font-size:0.75em;opacity:0.8;flex-shrink:0;">PR</span>
    <span style="opacity:0.9;flex-shrink:0;">${p.name}｜${p.desc}</span>
    <a href="${p.url}" rel="nofollow noopener" target="_blank"
       style="background:${p.color};color:#fff;padding:8px 20px;border-radius:6px;font-weight:bold;text-decoration:none;white-space:nowrap;flex-shrink:0;font-size:0.95em;box-shadow:0 2px 8px rgba(0,0,0,0.3);">
      ${p.label}
    </a>
    <img src="${p.px}" width="1" height="1" border="0" alt="" style="display:none;">
    <button id="af-close-btn"
      style="background:none;border:1px solid rgba(255,255,255,0.3);color:#aaa;cursor:pointer;padding:4px 10px;border-radius:4px;font-size:1em;flex-shrink:0;"
      aria-label="閉じる">×</button>
  `;

  document.body.appendChild(bar);

  // 閉じるボタン：24時間非表示
  document.getElementById('af-close-btn').addEventListener('click', function () {
    bar.style.bottom = '-80px';
    setTimeout(function() { bar.remove(); }, 500);
    localStorage.setItem('af_banner_hidden', String(Date.now() + 24 * 60 * 60 * 1000));
  });

  // スクロール30%でスライドイン表示（即表示より離脱が少ない）
  let shown = false;
  function checkScroll() {
    if (shown) return;
    const scrolled = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight > 0 && scrolled / docHeight > 0.3) {
      bar.style.bottom = '0';
      document.body.style.paddingBottom = '60px';
      shown = true;
      window.removeEventListener('scroll', checkScroll);
    }
  }
  window.addEventListener('scroll', checkScroll, { passive: true });

  // 5秒後にもスクロールしていなければ表示（短い記事対策）
  setTimeout(function() {
    if (!shown) {
      bar.style.bottom = '0';
      document.body.style.paddingBottom = '60px';
      shown = true;
      window.removeEventListener('scroll', checkScroll);
    }
  }, 5000);
})();
