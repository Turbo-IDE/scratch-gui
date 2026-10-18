// Name: TurboForge Studio
// ID: turboforge
// Description: Tạo extension custom ngay trong TurboWarp với trợ lý AI BeaBea 🐾
// By: TurboWS Team
// License: MIT
(function (Scratch) {
'use strict';

if (!Scratch.extensions.unsandboxed) {
  throw new Error('TurboForge must run as an unsandboxed extension');
}

// ==========================================
// 1. TAI NGUYEN & BIEU TUONG
// ==========================================
var LOGO_URL = 'https://editor.turboshare.org.uk/assets/Turbo-IDE-Dewc6i7p.png';
var EXT_ICON_URL = 'https://files.catbox.moe/xfh3x0.png';
var BEABEA_AVATAR = 'https://raw.githubusercontent.com/danvPR/workshop/refs/heads/main/Assets/BeaBea.jpg';

var ICONS = {
  close: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
  trash: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
  send: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
  play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
  download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
  copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
  plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
  sun: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>',
  moon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
  check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>',
  poll: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>',
  magic: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5 4 4"></path><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"></path><path d="m8 6 2-2"></path><path d="m18 16 2-2"></path><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"></path></svg>',
  undo: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7v6h6"></path><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"></path></svg>',
  edit: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>'
};
// ==========================================
// 2. NGON NGU (VI / EN)
// ==========================================
var TRANSLATIONS = {
  vi: {
    title: 'TurboForge Studio',
    openStudio: 'Mở TurboForge Studio',
    tabGeneral: 'Cài đặt',
    tabBlocks: 'Khối lệnh',
    tabAI: 'AI BeaBea 🐾',
    tabExport: 'Xuất mã',
    extId: 'Mã định danh (ID)',
    extName: 'Tên hiển thị',
    extColor: 'Màu chủ đạo',
    addBlockBtn: 'Thêm khối thủ công',
    aiProvider: 'Dịch vụ AI',
    aiApiKey: 'Mã khóa API',
    aiThinking: 'BeaBea đang soạn câu trả lời...',
    loadIntoEditor: 'Nạp vào TurboWarp',
    copyCode: 'Sao chép mã',
    downloadFile: 'Tải file JS',
    noBlocks: 'Chưa có khối lệnh nào',
    aiPromptPlaceholder: 'Trò chuyện, gửi ý tưởng hoặc nhờ BeaBea sửa đổi...',
    welcomeAiMsg: 'Hế lô bạn nha! ✨ Mình là **BeaBea** 🐾, trợ lý thiết kế tiện ích của bạn đây nè. Hiện tại tiện ích đang có **$1** khối lệnh. Hôm nay bạn đang ấp ủ ý tưởng gì? Cứ chia sẻ nhé! 🌸',
    actionAccept: 'Chấp nhận thay đổi',
    actionRevise: 'Chưa ưng, sửa lại chút',
    actAdd: 'Đề xuất: THÊM khối mới',
    actUpdate: 'Đề xuất: CẬP NHẬT khối',
    actDelete: 'Đề xuất: XÓA khối',
    actSettings: 'Đề xuất: CẬP NHẬT CÀI ĐẶT',
    undoBtn: 'Hoàn tác',
    editAiBtn: 'Sửa với BeaBea',
    diffMsg: 'Sẽ cập nhật cấu hình và mã thực thi của khối lệnh.'
  },
  en: {
    title: 'TurboForge Studio',
    openStudio: 'Open TurboForge Studio',
    openStudioBlock: 'open TurboForge Studio',
    tabGeneral: 'Settings',
    tabBlocks: 'Blocks',
    tabAI: 'BeaBea AI',
    tabExport: 'Export',
    extId: 'Identifier (ID)',
    extName: 'Display Name',
    extColor: 'Theme Color',
    addBlockBtn: 'Add Block Manually',
    aiProvider: 'AI Provider',
    aiApiKey: 'API Key',
    aiThinking: 'BeaBea is crafting a reply...',
    loadIntoEditor: 'Inject to TurboWarp',
    copyCode: 'Copy Code',
    downloadFile: 'Download JS',
    noBlocks: 'No custom blocks added yet',
    aiPromptPlaceholder: 'Chat, brainstorm or request changes from BeaBea...',
    welcomeAiMsg: 'Hi there! I am **BeaBea**, your extension co-creator buddy! Your extension currently has **$1** block(s). What idea are you planning today?',
    actionAccept: 'Accept changes',
    actionRevise: 'Revise',
    actAdd: 'Proposal: ADD new block',
    actUpdate: 'Proposal: UPDATE block',
    actDelete: 'Proposal: DELETE block',
    actSettings: 'Proposal: UPDATE SETTINGS',
    undoBtn: 'Undo',
    editAiBtn: 'Edit with BeaBea',
    diffMsg: 'Will update the block definition and execution logic.'
  }
};

function safeGet(key, fallback) {
  try { var v = localStorage.getItem(key); return v === null ? fallback : v; }
  catch (e) { return fallback; }
}
function safeSet(key, val) {
  try { localStorage.setItem(key, val); } catch (e) {}
}
function getLocale() {
  try {
    var loc = (Scratch.vm && Scratch.vm.getLocale ? Scratch.vm.getLocale() : (navigator.language || 'en'));
    return String(loc).toLowerCase().indexOf('vi') === 0 ? 'vi' : 'en';
  } catch (e) { return 'en'; }
}
function t(key, a1) {
  var lang = getLocale();
  var str = (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS.en[key] || key;
  if (a1 !== undefined) str = String(str).split('$1').join(String(a1));
  return str;
}

// ==========================================
// 3. STATE + LICH SU UNDO
// ==========================================
var extData = {
  id: 'customTools',
  name: 'Công cụ Tùy chỉnh',
  color: '#d9383a',
  blocks: [
    {
      opcode: 'calculateBmi',
      type: 'REPORTER',
      text: 'tính BMI cân nặng [WEIGHT] chiều cao [HEIGHT]',
      args: { WEIGHT: '60', HEIGHT: '1.7' },
      code: 'var w = Number(args.WEIGHT) || 0;\nvar h = Number(args.HEIGHT) || 1;\nreturn (w / (h * h)).toFixed(2);'
    }
  ]
};
var historyStack = [];
function pushHistory() {
  try {
    historyStack.push(JSON.parse(JSON.stringify(extData)));
    if (historyStack.length > 25) historyStack.shift();
  } catch (e) {}
}
function undoHistory() {
  if (historyStack.length > 0) { extData = historyStack.pop(); return true; }
  return false;
}
var chatHistory = [];
var isThinking = false;
var currentTheme = safeGet('turboforge_theme', 'dark');
var activeTab = 'ai';

function sanitizeId(s) {
  s = String(s || '').replace(/[^a-zA-Z0-9_]/g, '');
  if (!s) s = 'ext' + Math.floor(Math.random() * 10000);
  if (/^[0-9]/.test(s)) s = 'ext' + s;
  return s;
}
// ==========================================
// 4. MARKDOWN NHO (CODE + TABLE + LIST)
// ==========================================
function escHtml(s) {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function inlineFormat(str) {
  if (!str) return '';
  var s = escHtml(str);
  s = s.replace(/`([^`]+)`/g, '<code class="chat-inline-code">$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return s;
}
function renderMarkdown(content) {
  if (!content) return '';
  var text = String(content).replace(/<action>[\s\S]*?<\/action>/gi, '').replace(/<poll[\s\S]*?<\/poll>/gi, '').trim();
  var codeBlocks = [];
  text = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, function (m, lang, code) {
    var id = '__CODE_BLOCK_' + codeBlocks.length + '__';
    codeBlocks.push({ lang: lang, code: code });
    return id;
  });
  // table | a | b |
  var tableRegex = /((?:^[ \t]*\|.+?\|[ \t]*\r?\n){2,}(?:^[ \t]*\|.+?\|[ \t]*(?:\r?\n|$))*)/gm;
  text = text.replace(tableRegex, function (block) {
    var lines = block.trim().split('\n').map(function (l) { return l.trim(); }).filter(Boolean);
    if (lines.length < 2) return block;
    function cellsOf(line) { return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map(function (c) { return c.trim(); }); }
    var headers = cellsOf(lines[0]);
    var seps = cellsOf(lines[1]);
    var isSep = seps.length > 0 && seps.every(function (s) { return /^:?-{1,}:?$/.test(s); });
    if (!isSep) return block;
    var html = '<div class="table-wrap"><table class="chat-table"><thead><tr>';
    headers.forEach(function (h) { html += '<th>' + inlineFormat(h) + '</th>'; });
    html += '</tr></thead><tbody>';
    for (var i = 2; i < lines.length; i++) {
      var cells = cellsOf(lines[i]);
      html += '<tr>';
      for (var c = 0; c < headers.length; c++) html += '<td>' + inlineFormat(cells[c] || '') + '</td>';
      html += '</tr>';
    }
    return html + '</tbody></table></div>';
  });
  // poll tags -> box chon nhanh
  var polls = [];
  text = text.replace(/<poll\s+title="([^"]*)">([\s\S]*?)<\/poll>/gi, function (m, title, inner) {
    var id = '__POLL_' + polls.length + '__';
    var opts = [];
    try { opts = JSON.parse(inner.trim()); } catch (e) { opts = []; }
    polls.push({ title: title, opts: opts });
    return id;
  });
  var lines = String(text).split('\n');
  var out = [];
  lines.forEach(function (line) {
    var tr = line.trim();
    if (/^__CODE_BLOCK_\d+__$/.test(tr) || /^__POLL_\d+__$/.test(tr)) { out.push(tr); return; }
    if (tr.indexOf('<div class="table-wrap') === 0 || tr.indexOf('<tr>') === 0 || tr.indexOf('</table>') === 0) { out.push(line); return; }
    if (tr.indexOf('### ') === 0) { out.push('<h5>' + inlineFormat(tr.slice(4)) + '</h5>'); return; }
    if (tr.indexOf('## ') === 0) { out.push('<h4>' + inlineFormat(tr.slice(3)) + '</h4>'); return; }
    if (tr.indexOf('# ') === 0) { out.push('<h3>' + inlineFormat(tr.slice(2)) + '</h3>'); return; }
    if (tr.indexOf('> ') === 0) { out.push('<blockquote class="chat-quote">' + inlineFormat(tr.slice(2)) + '</blockquote>'); return; }
    if (tr.indexOf('- ') === 0 || tr.indexOf('* ') === 0) { out.push('<div class="chat-li"><span class="chat-dot">\u2022</span> ' + inlineFormat(tr.slice(2)) + '</div>'); return; }
    var num = tr.match(/^(\d+)\.\s+(.*)$/);
    if (num) { out.push('<div class="chat-li"><span class="chat-num">' + num[1] + '.</span> ' + inlineFormat(num[2]) + '</div>'); return; }
    if (tr === '') { out.push('<div style="height:6px"></div>'); return; }
    out.push('<div>' + inlineFormat(tr) + '</div>');
  });
  var result = out.join('');
  codeBlocks.forEach(function (item, idx) {
    var html = '<div class="chat-code-container"><div class="chat-code-header"><span>' + escHtml(item.lang || 'javascript') + '</span></div><pre class="chat-code-block"><code>' + escHtml(item.code) + '</code></pre></div>';
    result = result.split('__CODE_BLOCK_' + idx + '__').join(html);
  });
  polls.forEach(function (p, idx) {
    var html = '<div class="poll-card"><div class="poll-title">' + escHtml(p.title) + '</div>';
    p.opts.forEach(function (o) { html += '<button class="btn btn-secondary poll-opt" data-poll="' + escHtml(o) + '">' + escHtml(o) + '</button>'; });
    result = result.split('__POLL_' + idx + '__').join(html + '</div>');
  });
  return result;
}
function extractAction(content) {
  var m = String(content || '').match(/<action>([\s\S]*?)<\/action>/);
  if (!m) return null;
  try { return JSON.parse(m[1].trim()); } catch (e) { return null; }
}
// ==========================================
// 5. AI BEABEA
// ==========================================
function buildSystemPrompt() {
  var lang = getLocale() === 'vi' ? 'Vietnamese' : 'English';
  return 'You are BeaBea, a sweet friendly AI co-creator inside TurboForge for TurboWarp.\n' +
    'Reply in ' + lang + '. Be cute, use emojis. Address user as "ban", yourself as "minh/BeaBea".\n' +
    'WORKFLOW: brainstorm first with MARKDOWN TABLES. Ask block type (COMMAND/REPORTER/BOOLEAN), args, defaults.\n' +
    'Polls: <poll title="...">["A","B"]</poll>.\n' +
    'ONLY attach ONE <action> when user confirmed or gave exact spec.\n' +
    'CURRENT EXTENSION: ' + JSON.stringify(extData) + '\n' +
    'ACTION SPEC:\n' +
    '- ADD: <action>{"type":"ADD_BLOCK","data":{"opcode":"...","type":"COMMAND|REPORTER|BOOLEAN","text":"...","args":{},"code":"..."}}</action>\n' +
    '- UPDATE: <action>{"type":"UPDATE_BLOCK","target":"opcode","data":{...}}</action>\n' +
    '- DELETE: <action>{"type":"DELETE_BLOCK","target":"opcode"}</action>\n' +
    '- SETTINGS: <action>{"type":"UPDATE_SETTINGS","data":{"id":"...","name":"...","color":"..."}}</action>\n' +
    'Write clean JS for code body. Max ONE action per reply.';
}
function sendChatMessage(userText, provider, apiKey, model) {
  chatHistory.push({ role: 'user', content: userText });
  var messages = [{ role: 'system', content: buildSystemPrompt() }].concat(chatHistory);
  if (provider === 'pollinations') {
    // Pollinations validate seed la int32 (<= 2147483647). Date.now() vuot gioi han -> 400.
    var safeSeed = Math.floor(Math.random() * 2147483647);
    return fetch('https://text.pollinations.ai/', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages, model: model || 'openai', seed: safeSeed })
    }).then(function (res) {
      if (!res.ok) throw new Error('Pollinations HTTP ' + res.status);
      return res.text();
    }).then(function (reply) {
      chatHistory.push({ role: 'assistant', content: reply });
      return reply;
    });
  }
  var endpoint = 'https://api.openai.com/v1/chat/completions';
  if (provider === 'groq') endpoint = 'https://api.groq.com/openai/v1/chat/completions';
  if (provider === 'deepseek') endpoint = 'https://api.deepseek.com/chat/completions';
  var useModel = model || (provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');
  return fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
    body: JSON.stringify({ model: useModel, messages: messages })
  }).then(function (res) { return res.json(); }).then(function (data) {
    if (data.error) throw new Error(data.error.message || 'AI error');
    var reply = data.choices[0].message.content;
    chatHistory.push({ role: 'assistant', content: reply });
    return reply;
  });
}
function applyAction(act) {
  pushHistory();
  if (act.type === 'ADD_BLOCK') { extData.blocks.push(act.data); activeTab = 'blocks'; }
  else if (act.type === 'UPDATE_BLOCK') {
    var idx = -1;
    for (var i = 0; i < extData.blocks.length; i++) if (extData.blocks[i].opcode === act.target) idx = i;
    if (idx >= 0) extData.blocks[idx] = act.data; else extData.blocks.push(act.data);
    activeTab = 'blocks';
  } else if (act.type === 'DELETE_BLOCK') {
    extData.blocks = extData.blocks.filter(function (b) { return b.opcode !== act.target; });
    activeTab = 'blocks';
  } else if (act.type === 'UPDATE_SETTINGS') {
    if (act.data.id) extData.id = sanitizeId(act.data.id);
    if (act.data.name) extData.name = String(act.data.name);
    if (act.data.color) extData.color = String(act.data.color);
    activeTab = 'general';
  }
}
// ==========================================
// 6. TRINH BIEN DICH MA NGUON
// ==========================================
function buildExtensionCode() {
  var blocksSrc = extData.blocks.map(function (b) {
    var argKeys = Object.keys(b.args || {});
    var argSrc = argKeys.map(function (k) {
      return JSON.stringify(k) + ': { type: Scratch.ArgumentType.STRING, defaultValue: ' + JSON.stringify(String(b.args[k])) + ' }';
    }).join(',\n              ');
    return '{\n            opcode: ' + JSON.stringify(b.opcode) + ',\n            blockType: Scratch.BlockType.' + b.type + ',\n            text: ' + JSON.stringify(b.text) + ',\n            arguments: {\n              ' + argSrc + '\n            }\n          }';
  }).join(',\n          ');
  var methodsSrc = extData.blocks.map(function (b) {
    return '    ' + b.opcode + '(args) {\n' + b.code + '\n    }';
  }).join('\n');
  return '(function(Scratch) {\n' +
    "  'use strict';\n" +
    "  if (!Scratch.extensions.unsandboxed) throw new Error('Unsandboxed extension required');\n" +
    '  class CustomExtension {\n' +
    '    getInfo() {\n' +
    '      return {\n' +
    '        id: ' + JSON.stringify(sanitizeId(extData.id)) + ',\n' +
    '        name: ' + JSON.stringify(extData.name) + ',\n' +
    '        color1: ' + JSON.stringify(extData.color) + ',\n' +
    '        blocks: [\n          ' + blocksSrc + '\n        ]\n' +
    '      };\n' +
    '    }\n' +
    methodsSrc + '\n' +
    '  }\n' +
    '  Scratch.extensions.register(new CustomExtension());\n' +
    '})(Scratch);';
}
// ==========================================
// 7. GIAO DIEN STUDIO (SHADOW DOM MODAL)
// ==========================================
var modalElement = null;
var shadowRootRef = null;
var overlayRef = null;
var winRef = null;

var CSS_TEXT = '.overlay{position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(8,9,12,.75);z-index:999999;display:flex;align-items:center;justify-content:center}';
CSS_TEXT += '.window{width:860px;max-width:94vw;height:630px;max-height:92vh;background:var(--tf-win,#14151b);color:var(--tf-text,#f0f0f5);border-radius:16px;display:flex;flex-direction:column;overflow:hidden}';
CSS_TEXT += '.theme-dark{--tf-win:#14151b;--tf-text:#f0f0f5;--tf-head:#191a22;--tf-line:rgba(255,255,255,.08);--tf-input:#181922;--tf-card:#1c1e28;--tf-code:#0c0d12;--tf-codetx:#60ec96;--tf-mut:#8b8e9d;--tf-bot:#1c1e28}';
CSS_TEXT += '.theme-light{--tf-win:#ffffff;--tf-text:#1a1b21;--tf-head:#f5f6fa;--tf-line:rgba(0,0,0,.09);--tf-input:#ffffff;--tf-card:#f2f4f8;--tf-code:#f1f3f9;--tf-codetx:#15803d;--tf-mut:#676b7b;--tf-bot:#f1f3f9}';
CSS_TEXT += '.overlay.theme-light{background:rgba(0,0,0,.4)}';
CSS_TEXT += '.header{height:52px;padding:0 18px;display:flex;justify-content:space-between;align-items:center;background:var(--tf-head);border-bottom:1px solid var(--tf-line)}';
CSS_TEXT += '.tabs{display:flex;padding:0 16px;gap:6px;background:var(--tf-head);border-bottom:1px solid var(--tf-line)}';
CSS_TEXT += '.tab-btn{padding:10px 14px;background:transparent;border:none;color:var(--tf-mut);cursor:pointer;font-size:13px}';
CSS_TEXT += '.tab-btn.active{color:#d9383a;font-weight:600}';
CSS_TEXT += '.content{flex:1;padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;background:var(--tf-win)}';
CSS_TEXT += 'input,select,textarea{width:100%;background:var(--tf-input);border:1px solid var(--tf-line);border-radius:8px;padding:9px 12px;color:var(--tf-text);font-size:13px}';
CSS_TEXT += '.btn{background:#d9383a;color:#fff;border:none;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px}';
CSS_TEXT += '.btn-secondary{background:var(--tf-card);color:var(--tf-text);border:1px solid var(--tf-line)}';
CSS_TEXT += '.icon-btn{width:32px;height:32px;border-radius:8px;background:transparent;border:none;color:var(--tf-mut);cursor:pointer;display:inline-flex;align-items:center;justify-content:center}';
CSS_TEXT += '.chat-messages{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:14px;min-height:200px}';
CSS_TEXT += '.chat-row{display:flex;gap:10px;max-width:94%}.chat-row-user{align-self:flex-end}';
CSS_TEXT += '.avatar{width:34px;height:34px;border-radius:50%;border:1.5px solid #d9383a}';
CSS_TEXT += '.bubble{padding:11px 15px;border-radius:14px;font-size:13px;line-height:1.6;color:var(--tf-text)}';
CSS_TEXT += '.bubble-user{background:#d9383a;color:#fff}.bubble-bot{background:var(--tf-bot);border:1px solid var(--tf-line)}';
CSS_TEXT += '.chat-code-block{background:var(--tf-code);color:var(--tf-codetx);padding:9px 12px;border-radius:6px;font-family:monospace;font-size:12px;overflow-x:auto;margin:6px 0;border:1px solid var(--tf-line)}';
CSS_TEXT += '.table-wrap{overflow-x:auto;margin:10px 0;border:1px solid var(--tf-line);border-radius:8px;background:var(--tf-card)}';
CSS_TEXT += '.chat-table{width:100%;border-collapse:collapse;font-size:12px;color:var(--tf-text)}.chat-table th{color:#d9383a;padding:8px;text-align:left}.chat-table td{padding:7px 10px}';
CSS_TEXT += '.action-card{margin-top:10px;padding:12px;border:1px dashed #d9383a;border-radius:10px;background:var(--tf-win)}';
CSS_TEXT += '.block-card{background:var(--tf-card);color:var(--tf-text);border:1px solid var(--tf-line);border-radius:10px;padding:12px;display:flex;justify-content:space-between;margin-bottom:8px}';
function openBuilderModal() {
  if (modalElement) { modalElement.style.display = 'flex'; return; }
  var host = document.createElement('div');
  host.id = 'turboforge-root';
  document.body.appendChild(host);
  var shadow = null;
  try { shadow = host.attachShadow({ mode: 'open' }); }
  catch (e) { return; }
  shadowRootRef = shadow;
  var style = document.createElement('style');
  style.textContent = CSS_TEXT;
  shadow.appendChild(style);
  var overlay = document.createElement('div');
  overlay.className = 'overlay theme-' + currentTheme;
  shadow.appendChild(overlay);
  overlayRef = overlay;
  var win = document.createElement('div');
  win.className = 'window';
  overlay.appendChild(win);
  winRef = win;
  render();
  modalElement = overlay;
}
function closeModal() { if (modalElement) modalElement.style.display = 'none'; }
function chatRowHTML(m) {
  if (m.role === 'user') return '<div class="chat-row chat-row-user"><div class="bubble bubble-user">' + escHtml(m.content) + '</div></div>';
  var act = extractAction(m.content);
  var html = renderMarkdown(m.content);
  if (act) {
    var title = '', desc = '';
    if (act.type === 'ADD_BLOCK') { title = escHtml(t('actAdd')); desc = 'Tên: ' + escHtml(act.data.text) + '\nOpcode: ' + escHtml(act.data.opcode); }
    if (act.type === 'UPDATE_BLOCK') { title = escHtml(t('actUpdate')) + ': ' + escHtml(act.target); desc = escHtml(t('diffMsg')); }
    if (act.type === 'DELETE_BLOCK') { title = escHtml(t('actDelete')) + ': ' + escHtml(act.target); desc = 'Khối này sẽ được gỡ bỏ khỏi tiện ích.'; }
    if (act.type === 'UPDATE_SETTINGS') { title = escHtml(t('actSettings')); desc = escHtml(JSON.stringify(act.data)); }
    html += '<div class="action-card"><div style="font-size:12px;color:#d9383a;font-weight:600">' + title + '</div><div style="font-family:monospace;font-size:11px;white-space:pre-wrap">' + desc + '</div><div style="display:flex;gap:8px;justify-content:flex-end"><button class="btn btn-secondary" data-revise="1">' + escHtml(t('actionRevise')) + '</button><button class="btn" data-exec="' + escHtml(encodeURIComponent(JSON.stringify(act))) + '">' + escHtml(t('actionAccept')) + '</button></div></div>';
  }
  return '<div class="chat-row"><img class="avatar" src="' + BEABEA_AVATAR + '"><div class="bubble bubble-bot">' + html + '</div></div>';
}
function render() {
  if (!winRef || !overlayRef) return;
  overlayRef.className = 'overlay theme-' + currentTheme;
  var undoBtn = historyStack.length > 0 ? '<button class="btn btn-secondary" id="uiUndoBtn" style="padding:4px 8px;font-size:11px;margin-left:8px">' + escHtml(t('undoBtn')) + '</button>' : '';
  winRef.innerHTML = '<div class="header"><div style="display:flex;align-items:center;gap:10px"><img src="' + LOGO_URL + '" style="height:26px"><span style="font-weight:600;font-size:14px">TurboForge Studio</span>' + undoBtn + '</div><div style="display:flex;gap:6px"><button class="icon-btn" id="themeBtn">' + (currentTheme === 'dark' ? ICONS.sun : ICONS.moon) + '</button><button class="icon-btn" id="closeBtn">' + ICONS.close + '</button></div></div>'
    + '<div class="tabs"><button class="tab-btn' + (activeTab === 'ai' ? ' active' : '') + '" data-tab="ai">' + escHtml(t('tabAI')) + '</button><button class="tab-btn' + (activeTab === 'blocks' ? ' active' : '') + '" data-tab="blocks">' + escHtml(t('tabBlocks')) + '</button><button class="tab-btn' + (activeTab === 'general' ? ' active' : '') + '" data-tab="general">' + escHtml(t('tabGeneral')) + '</button><button class="tab-btn' + (activeTab === 'export' ? ' active' : '') + '" data-tab="export">' + escHtml(t('tabExport')) + '</button></div>'
    + '<div class="content" id="tabContent"></div>';
  winRef.querySelector('#closeBtn').onclick = closeModal;
  winRef.querySelector('#themeBtn').onclick = function () { currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; safeSet('turboforge_theme', currentTheme); render(); };
  var ub = winRef.querySelector('#uiUndoBtn');
  if (ub) ub.onclick = function () { if (undoHistory()) render(); };
  var tabs = winRef.querySelectorAll('.tab-btn');
  for (var i = 0; i < tabs.length; i++) tabs[i].onclick = function () { activeTab = this.getAttribute('data-tab'); render(); };
  var content = winRef.querySelector('#tabContent');
  if (activeTab === 'ai') renderAITab(content);
  if (activeTab === 'blocks') renderBlocksTab(content);
  if (activeTab === 'general') renderGeneralTab(content);
  if (activeTab === 'export') renderExportTab(content);
}
function renderAITab(content) {
  var prov = safeGet('turboforge_ai_prov', 'pollinations');
  var html = chatHistory.length === 0
    ? '<div class="chat-row"><img class="avatar" src="' + BEABEA_AVATAR + '"><div class="bubble bubble-bot">' + renderMarkdown(t('welcomeAiMsg', extData.blocks.length)) + '</div></div>'
    : chatHistory.map(chatRowHTML).join('');
  if (isThinking) html += '<div class="chat-row"><img class="avatar" src="' + BEABEA_AVATAR + '"><div class="bubble bubble-bot">' + escHtml(t('aiThinking')) + '</div></div>';
  content.innerHTML = '<div style="display:flex;gap:8px;align-items:center"><select id="chatProv" style="width:auto"><option value="pollinations"' + (prov === 'pollinations' ? ' selected' : '') + '>Pollinations (Free)</option><option value="groq"' + (prov === 'groq' ? ' selected' : '') + '>Groq Llama-3.3</option><option value="deepseek"' + (prov === 'deepseek' ? ' selected' : '') + '>DeepSeek</option></select><input id="chatKey" type="password" placeholder="' + escHtml(t('aiApiKey')) + '" style="' + (prov === 'pollinations' ? 'display:none' : '') + '"></div>'
    + '<div class="chat-messages" id="chatBox">' + html + '</div>'
    + '<div style="display:flex;gap:8px"><input id="chatInput" type="text" placeholder="' + escHtml(t('aiPromptPlaceholder')) + '"><button class="btn" id="sendBtn">' + ICONS.send + '</button></div>';
  var box = content.querySelector('#chatBox');
  box.scrollTop = box.scrollHeight;
  content.querySelector('#chatProv').onchange = function (e) { safeSet('turboforge_ai_prov', e.target.value); render(); };
  function doSend() {
    var inp = content.querySelector('#chatInput');
    var txt = inp.value.trim();
    if (!txt || isThinking) return;
    isThinking = true; render();
    var p = content.querySelector('#chatProv') ? content.querySelector('#chatProv').value : prov;
    var k = content.querySelector('#chatKey') ? content.querySelector('#chatKey').value : '';
    sendChatMessage(txt, p, k, null).catch(function (err) {
      chatHistory.push({ role: 'assistant', content: 'Huhu loi ket noi API: ' + err.message });
    }).then(function () { isThinking = false; render(); });
  }
  content.querySelector('#sendBtn').onclick = doSend;
  content.querySelector('#chatInput').onkeydown = function (e) { if (e.key === 'Enter') doSend(); };
  bindActionButtons(content);
}
function bindActionButtons(content) {
  var execs = content.querySelectorAll('[data-exec]');
  for (var i = 0; i < execs.length; i++) execs[i].onclick = function () {
    var act = JSON.parse(decodeURIComponent(this.getAttribute('data-exec')));
    applyAction(act); render();
  };
  var revs = content.querySelectorAll('[data-revise]');
  for (var j = 0; j < revs.length; j++) revs[j].onclick = function () {
    activeTab = 'ai'; render();
    setTimeout(function () { var inp = shadowRootRef.querySelector('#chatInput'); if (inp) { inp.value = 'BeaBea ơi, mình muốn điều chỉnh lại xíu: '; inp.focus(); } }, 50);
  };
  var polls = content.querySelectorAll('.poll-opt');
  for (var k = 0; k < polls.length; k++) polls[k].onclick = function () {
    var v = this.getAttribute('data-poll');
    var inp2 = content.querySelector('#chatInput');
    if (inp2) { inp2.value = v; inp2.focus(); }
  };
}
function renderBlocksTab(content) {
  var list = extData.blocks.map(function (b, i) {
    return '<div class="block-card"><div><div style="display:flex;gap:6px;align-items:center;margin-bottom:4px"><span class="badge" style="background:var(--tf-code);color:#d9383a">' + escHtml(b.type) + '</span><strong style="font-family:monospace">' + escHtml(b.opcode) + '</strong></div><div style="font-size:12px;color:var(--tf-mut)">' + escHtml(b.text) + '</div></div><div style="display:flex;gap:6px"><button class="icon-btn" data-fix="' + escHtml(b.opcode) + '" title="' + escHtml(t('editAiBtn')) + '">' + ICONS.magic + '</button><button class="icon-btn" data-del="' + i + '">' + ICONS.trash + '</button></div></div>';
  }).join('');
  if (!list) list = '<p style="color:var(--tf-mut);font-size:13px">' + escHtml(t('noBlocks')) + '</p>';
  content.innerHTML = '<div style="flex:1;overflow-y:auto">' + list + '</div><button class="btn btn-secondary" id="addBtn" style="margin-top:10px">' + ICONS.plus + ' ' + escHtml(t('addBlockBtn')) + '</button>';
  var dels = content.querySelectorAll('[data-del]');
  for (var i = 0; i < dels.length; i++) dels[i].onclick = function () { pushHistory(); extData.blocks.splice(Number(this.getAttribute('data-del')), 1); render(); };
  var fixes = content.querySelectorAll('[data-fix]');
  for (var j = 0; j < fixes.length; j++) fixes[j].onclick = function () {
    var op = this.getAttribute('data-fix');
    window.askAiFix(op);
  };
  content.querySelector('#addBtn').onclick = function () {
    pushHistory();
    extData.blocks.push({ opcode: 'block' + (extData.blocks.length + 1), type: 'COMMAND', text: 'khối mới [A]', args: { A: '10' }, code: 'console.log(args.A);' });
    render();
  };
}
function renderGeneralTab(content) {
  content.innerHTML = '<div><label style="font-size:12px;font-weight:600">' + escHtml(t('extId')) + '</label><input id="cfgId" value="' + escHtml(extData.id) + '"></div>'
    + '<div><label style="font-size:12px;font-weight:600">' + escHtml(t('extName')) + '</label><input id="cfgName" value="' + escHtml(extData.name) + '"></div>'
    + '<div><label style="font-size:12px;font-weight:600">' + escHtml(t('extColor')) + '</label><input id="cfgColor" type="color" value="' + escHtml(extData.color) + '" style="height:40px;cursor:pointer"></div>';
  content.querySelector('#cfgId').onchange = function (e) { pushHistory(); extData.id = sanitizeId(e.target.value); };
  content.querySelector('#cfgName').onchange = function (e) { pushHistory(); extData.name = e.target.value; };
  content.querySelector('#cfgColor').onchange = function (e) { pushHistory(); extData.color = e.target.value; };
}
function renderExportTab(content) {
  var code = buildExtensionCode();
  content.innerHTML = '<pre style="background:var(--tf-code);color:var(--tf-codetx);padding:14px;border-radius:8px;font-family:monospace;font-size:12px;overflow:auto;flex:1;border:1px solid var(--tf-line)"><code>' + escHtml(code) + '</code></pre><div style="display:flex;gap:8px"><button class="btn" id="runInject">' + ICONS.play + ' ' + escHtml(t('loadIntoEditor')) + '</button><button class="btn btn-secondary" id="runCopy">' + ICONS.copy + ' ' + escHtml(t('copyCode')) + '</button><button class="btn btn-secondary" id="runDl">' + ICONS.download + ' ' + escHtml(t('downloadFile')) + '</button></div>';
  content.querySelector('#runInject').onclick = function () {
    try {
      // Cach cu (chen <script> blob truc tiep) gay loi "Too late to register new extensions"
      // vi chay ngoai worker unsandboxed cua TurboWarp. Phai nap qua extensionManager.
      if (!Scratch.vm || !Scratch.vm.extensionManager || typeof Scratch.vm.extensionManager.loadExtensionURL !== 'function') {
        throw new Error('Không tìm thấy extensionManager của TurboWarp.');
      }
      var url = URL.createObjectURL(new Blob([code], { type: 'application/javascript' }));
      Scratch.vm.extensionManager.loadExtensionURL(url).then(function () {
        alert('✨ Tuyệt vời! Tiện ích vừa được nạp trực tiếp vào danh sách khối lệnh của TURBO-IDE! 🐾');
      }).catch(function (err) {
        alert('Có lỗi khi nạp tiện ích: ' + (err && err.message ? err.message : err));
      });
    } catch (e) { alert('Có lỗi khi nạp tiện ích: ' + e.message); }
  };
  content.querySelector('#runCopy').onclick = function () {
    if (navigator.clipboard) navigator.clipboard.writeText(code).then(function () { alert('📋 Đã sao chép mã nguồn vào bộ nhớ tạm!'); });
  };
  content.querySelector('#runDl').onclick = function () {
    var blob = new Blob([code], { type: 'application/javascript' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (extData.id || 'extension') + '.js';
    a.click();
  };
}
window.askAiFix = function (opcode) {
  activeTab = 'ai';
  render();
  setTimeout(function () {
    if (!shadowRootRef) return;
    var inp = shadowRootRef.querySelector('#chatInput');
    if (inp) { inp.value = 'BeaBea ơi, xem giúp mình khối lệnh "' + opcode + '" với! Ý tưởng của mình là: '; inp.focus(); }
  }, 80);
};
function TurboForgePalette() {
  this.openStudio = function () { openBuilderModal(); };
}
TurboForgePalette.prototype.getInfo = function () {
  return {
    id: 'turboforge',
    name: 'TurboForge',
    color1: '#d9383a',
    color2: '#c22d2f',
    color3: '#9e2426',
    menuIconURI: EXT_ICON_URL,
    blockIconURI: EXT_ICON_URL,
    blocks: [
      { blockType: Scratch.BlockType.BUTTON, text: 'Mo TurboForge Studio', func: 'openStudio' }
    ]
  };
};
try {
  Scratch.extensions.register(new TurboForgePalette());
} catch (err) {
  console.warn('TurboForge register fail:', err);
}
})(Scratch);
