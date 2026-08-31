/**
 * ai-navi.app 常時表示アフィリエイトバナー
 * 画面下部に固定表示。×で24時間非表示。
 */
(function () {
  // 24時間非表示設定を確認
  const hiddenUntil = localStorage.getItem('af_banner_hidden');
  if (hiddenUntil && Date.now() < Number(hiddenUntil)) return;

  // プログラムリスト（ローテーション）
  const programs = [
    {
      name: 'MiriCanvas',
      desc: 'AIで3分でプレゼン資料を作成・無料登録',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+6NC9YQ+5EX8+5YRHE',
      px: 'https://www15.a8.net/0.gif?a8mat=4B7ROU+6NC9YQ+5EX8+5YRHE',
      color: '#7c3aed',
      label: '無料で始める →'
    },
    {
      name: 'Notta',
      desc: 'AI文字起こし・議事録を自動作成',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7QWV+7FX302+5988+5YJRM',
      px: 'https://www19.a8.net/0.gif?a8mat=4B7QWV+7FX302+5988+5YJRM',
      color: '#0ea5e9',
      label: '無料で試す →'
    },
    {
      name: 'Awarefy',
      desc: 'メンタルケアアプリ・7日間無料',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+5OT4VM+5CBW+5YZ75',
      px: 'https://www12.a8.net/0.gif?a8mat=4B7ROU+5OT4VM+5CBW+5YZ75',
      color: '#16a34a',
      label: '7日間無料で試す →'
    },
    {
      name: 'イルシル',
      desc: 'AIスライド資料作成ツール・無料プランあり',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7QWV+73EZAQ+5UMS+5YZ75',
      px: 'https://www10.a8.net/0.gif?a8mat=4B7QWV+73EZAQ+5UMS+5YZ75',
      color: '#ea580c',
      label: '無料で使う →'
    },
    {
      name: 'PLAUD NOTE',
      desc: 'AI搭載ボイスレコーダー・議事録を自動生成',
      url: 'https://px.a8.net/svt/ejp?a8mat=4B7ROU+691VG2+5J4W+5YRHE',
      px: 'https://www13.a8.net/0.gif?a8mat=4B7ROU+691VG2+5J4W+5YRHE',
      color: '#b45309',
      label: '公式サイトを見る →'
    }
  ];

  // 現在の記事に合わせてプログラムを選択（URLベース）
  const path = location.pathname;
  let idx = 0;
  if (path.includes('notta') || path.includes('transcri')) idx = 1;
  else if (path.includes('awarefy') || path.includes('mental')) idx = 2;
  else if (path.includes('irusiru') || path.includes('slide') || path.includes('presentation')) idx = 3;
  else if (path.includes('plaud') || path.includes('voice') || path.includes('record')) idx = 4;
  else idx = Math.floor(Date.now() / (1000 * 60 * 30)) % programs.length; // 30分ごとに切り替え

  const p = programs[idx];

  // バナー要素を作成
  const bar = document.createElement('div');
  bar.id = 'af-sticky-bar';
  bar.setAttribute('role', 'complementary');
  bar.setAttribute('aria-label', 'PR広告');
  bar.style.cssText = [
    'position:fixed', 'bottom:0', 'left:0', 'right:0',
    'background:linear-gradient(135deg,#0f172a,#1e1b4b)',
    'color:#fff', 'padding:10px 20px', 'z-index:99999',
    'display:flex', 'align-items:center', 'justify-content:center',
    'gap:12px', 'font-size:0.85em', 'font-family:sans-serif',
    'box-shadow:0 -3px 20px rgba(0,0,0,0.4)',
    'flex-wrap:wrap'
  ].join(';');

  bar.innerHTML = `
    <span style="background:#fff2;padding:2px 7px;border-radius:4px;font-size:0.75em;opacity:0.8;flex-shrink:0;">PR</span>
    <span style="opacity:0.9;flex-shrink:0;">${p.name}｜${p.desc}</span>
    <a href="${p.url}" rel="nofollow noopener" target="_blank"
       style="background:${p.color};color:#fff;padding:7px 18px;border-radius:6px;font-weight:bold;text-decoration:none;white-space:nowrap;flex-shrink:0;font-size:0.95em;">
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
    bar.remove();
    localStorage.setItem('af_banner_hidden', String(Date.now() + 24 * 60 * 60 * 1000));
  });

  // コンテンツが隠れないようにbodyにpadding追加
  document.body.style.paddingBottom = (document.body.style.paddingBottom || '0px').replace(/\d+/, n => Number(n) + 60);
})();
