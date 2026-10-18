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
    close: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></svg>',
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
    edit: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>',
    puzzle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2z"></path><path d="M2 12a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"></path><path d="M22 12a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2z"></path><path d="M12 22a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2z"></path></svg>'
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
      tabExtManager: 'Tiện ích mở rộng',
      extId: 'Mã định danh (ID)',
      extName: 'Tên hiển thị',
      extColor: 'Màu chủ đạo',
      addBlockBtn: 'Thêm khối thủ công',
      aiProvider: 'Dịch vụ AI',
      aiApiKey: 'Mã khóa API',
      aiThinking: 'BeaBea đang suy nghĩ',
      reasoningTitle: '🧠 Suy nghĩ của BeaBea',
      reasoningStreamTitle: '🧠 Luồng suy nghĩ',
      reasoningEmptyText: 'Luồng suy nghĩ của BeaBea sẽ xuất hiện ở đây khi AI đang reasoning...',
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
      tabExtManager: 'Extensions',
      extId: 'Identifier (ID)',
      extName: 'Display Name',
      extColor: 'Theme Color',
      addBlockBtn: 'Add Block Manually',
      aiProvider: 'AI Provider',
      aiApiKey: 'API Key',
      aiThinking: 'BeaBea is thinking',
      reasoningTitle: '🧠 BeaBea\'s reasoning',
      reasoningStreamTitle: '🧠 Thinking stream',
      reasoningEmptyText: "BeaBea's thinking stream will appear here when AI is reasoning...",
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
  var turboForgeWindow = null;
  var cssInjected = false;
  var reasoningStream = []; // luồng reasoning riêng
  var reasoningPaneCollapsed = false;

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
    return String(s == null ? '' : s)
      .replace(/&/g, '&' + 'amp;')
      .replace(/</g, '&' + 'lt;')
      .replace(/>/g, '&' + 'gt;')
      .replace(/"/g, '&' + 'quot;')
      .replace(/'/g, '&#' + '39;');
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
  // Nhan dien phan hoi JSON cua cac model reasoning (Pollinations/DeepSeek):
  // {"role":"assistant","reasoning":"...","content":"..."} -> tach reasoning va content.
  function parseAiReply(text) {
    var raw = String(text == null ? '' : text);
    var trimmed = raw.trim();
    var startsLikeJson = trimmed.charAt(0) === '[' || trimmed.charAt(0) === '{';
    if (startsLikeJson) {
      try {
        var obj = JSON.parse(trimmed);
        if (obj && typeof obj === 'object') {
          if (Array.isArray(obj.choices) && obj.choices[0] && obj.choices[0].message) obj = obj.choices[0].message;
          var content = typeof obj.content === 'string' ? obj.content : (typeof obj.text === 'string' ? obj.text : '');
          var reasoning = typeof obj.reasoning === 'string' ? obj.reasoning : (typeof obj.reasoning_content === 'string' ? obj.reasoning_content : '');
          if (content || reasoning) return { content: content, reasoning: reasoning };
        }
      } catch (e) { /* khong phai JSON hop le -> hien thi thang text goc */ }
    }
    return { content: raw, reasoning: '' };
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
      'Write clean JS for code body. Max ONE action per reply. Never wrap your whole reply in raw JSON.';
  }
  function sendChatMessage(userText, provider, apiKey, model) {
    chatHistory.push({ role: 'user', content: userText });
    // Chi gui {role, content} len API — reasoning chi de hien thi UI, khong can gui lai.
    var messages = [{ role: 'system', content: buildSystemPrompt() }].concat(chatHistory.map(function (m) { return { role: m.role, content: m.content }; }));
    var currentReasoningText = '';
    var reasoningStartTime = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
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
        var parsed = parseAiReply(reply);
        if (parsed.reasoning) {
          currentReasoningText = parsed.reasoning;
          reasoningStream.push({ text: currentReasoningText, timestamp: reasoningStartTime, source: 'reasoning', streaming: false });
        }
        chatHistory.push({ role: 'assistant', content: parsed.content, reasoning: parsed.reasoning });
        return parsed.content;
      });
    }
    var endpoint = 'https://api.openai.com/v1/chat/completions';
    if (provider === 'groq') endpoint = 'https://api.groq.com/openai/v1/chat/completions';
    if (provider === 'deepseek') endpoint = 'https://api.deepseek.com/chat/completions';
    var useModel = model || (provider === 'groq' ? 'llama-3.3-70b-versatile' : 'gpt-4o-mini');
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiKey },
      body: JSON.stringify({ model: useModel, messages: messages, stream: true })
    }).then(function (res) {
      if (!res.ok) throw new Error('API HTTP ' + res.status);
      var reader = res.body.getReader();
      var decoder = new TextDecoder();
      var buffer = '';
      return new Promise(function (resolve, reject) {
        function read() {
          reader.read().then(function (result) {
            if (result.done) {
              var parsed = parseAiReply(buffer);
              // Finalize reasoning
              reasoningStream = reasoningStream.map(function (r) { return { ...r, streaming: false }; });
              chatHistory.push({ role: 'assistant', content: parsed.content, reasoning: parsed.reasoning });
              renderWindowContent(); // render response cuối cùng
              resolve(parsed.content);
              return;
            }
            buffer += decoder.decode(result.value, { stream: true });
            var lines = buffer.split('\n');
            buffer = lines.pop();
            lines.forEach(function (line) {
              if (line.startsWith('data: ')) {
                var data = line.slice(6).trim();
                if (data === '[DONE]') return;
                try {
                  var parsed = JSON.parse(data);
                  var delta = parsed.choices?.[0]?.delta;
                  if (delta) {
                    if (delta.reasoning_content) {
                      currentReasoningText += delta.reasoning_content;
                      var now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                      var lastIdx = reasoningStream.length - 1;
                      if (lastIdx >= 0 && reasoningStream[lastIdx].streaming) {
                        reasoningStream[lastIdx].text = currentReasoningText;
                      } else {
                        reasoningStream.push({ text: currentReasoningText, timestamp: now, source: 'reasoning_content', streaming: true });
                      }
                      renderWindowContent();
                    }
                    if (delta.content) {
                      // Stream content real-time vào chat bubble cuối cùng
                      var lastMsg = chatHistory[chatHistory.length - 1];
                      if (lastMsg && lastMsg.role === 'assistant') {
                        lastMsg.content += delta.content;
                      } else {
                        chatHistory.push({ role: 'assistant', content: delta.content, reasoning: '' });
                      }
                      renderWindowContent();
                    }
                  }
                } catch (e) {}
              }
            });
            read();
          }).catch(reject);
        }
        read();
      });
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
  // 7. GIAO DIEN STUDIO (MISTWARP WINDOW SYSTEM)
  // ==========================================
  var CSS_TEXT = '';
  CSS_TEXT += '.tf-window{width:100%;height:100%;display:flex;flex-direction:column;background:var(--tf-win,#14151b);color:var(--tf-text,#f0f0f5);overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}';
  CSS_TEXT += '.theme-dark{--tf-win:#14151b;--tf-text:#f0f0f5;--tf-head:#191a22;--tf-line:rgba(255,255,255,.08);--tf-input:#181922;--tf-card:#1c1e28;--tf-code:#0c0d12;--tf-codetx:#60ec96;--tf-mut:#8b8e9d;--tf-bot:#1c1e28;--tf-reason:#101218}';
  CSS_TEXT += '.theme-light{--tf-win:#ffffff;--tf-text:#1a1b21;--tf-head:#f5f6fa;--tf-line:rgba(0,0,0,.09);--tf-input:#ffffff;--tf-card:#f2f4f8;--tf-code:#f1f3f9;--tf-codetx:#15803d;--tf-mut:#676b7b;--tf-bot:#f1f3f9;--tf-reason:#e8ebf3}';
  CSS_TEXT += '.tf-header{height:52px;padding:0 18px;display:flex;justify-content:space-between;align-items:center;background:var(--tf-head);border-bottom:1px solid var(--tf-line);flex-shrink:0}';
  CSS_TEXT += '.tf-tabs{display:flex;padding:0 16px;gap:6px;background:var(--tf-head);border-bottom:1px solid var(--tf-line);flex-shrink:0}';
  CSS_TEXT += '.tf-tab-btn{padding:10px 14px;background:transparent;border:none;color:var(--tf-mut);cursor:pointer;font-size:13px;border-radius:6px;transition:all .15s}';
  CSS_TEXT += '.tf-tab-btn:hover{background:var(--tf-line)}.tf-tab-btn.active{color:#d9383a;font-weight:600;background:var(--tf-line)}';
  CSS_TEXT += '.tf-content{flex:1;padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;background:var(--tf-win);min-height:0}';
  CSS_TEXT += '.tf-content input,.tf-content select,.tf-content textarea{width:100%;background:var(--tf-input);border:1px solid var(--tf-line);border-radius:8px;padding:9px 12px;color:var(--tf-text);font-size:13px;box-sizing:border-box}';
  CSS_TEXT += '.tf-content input:focus,.tf-content select:focus,.tf-content textarea:focus{outline:none;border-color:#d9383a;box-shadow:0 0 0 2px rgba(217,56,58,.15)}';
  CSS_TEXT += '.tf-btn{background:#d9383a;color:#fff;border:none;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all .15s}';
  CSS_TEXT += '.tf-btn:hover{filter:brightness(1.1)}.tf-btn:active{transform:scale(.98)}';
  CSS_TEXT += '.tf-btn-secondary{background:var(--tf-card);color:var(--tf-text);border:1px solid var(--tf-line)}';
  CSS_TEXT += '.tf-btn-secondary:hover{background:var(--tf-line)}';
  CSS_TEXT += '.tf-icon-btn{width:32px;height:32px;border-radius:8px;background:transparent;border:none;color:var(--tf-mut);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .15s}';
  CSS_TEXT += '.tf-icon-btn:hover{background:var(--tf-line);color:var(--tf-text)}';
  CSS_TEXT += '.tf-chat-messages{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px;min-height:0;padding-right:4px}';
  CSS_TEXT += '.tf-chat-row{display:flex;gap:10px;max-width:94%;animation:tfFadeIn .25s ease-out}.tf-chat-row-user{align-self:flex-end}';
  CSS_TEXT += '@keyframes tfFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}';
  CSS_TEXT += '.tf-avatar{width:34px;height:34px;border-radius:50%;border:1.5px solid #d9383a;flex-shrink:0;object-fit:cover}';
  CSS_TEXT += '.tf-bubble{padding:12px 16px;border-radius:16px;font-size:13.5px;line-height:1.65;color:var(--tf-text);max-width:100%;word-wrap:break-word;box-shadow:0 1px 3px rgba(0,0,0,.08)}';
  CSS_TEXT += '.tf-bubble-user{background:#d9383a;color:#fff;border-bottom-right-radius:4px}.tf-bubble-bot{background:var(--tf-bot);border:1px solid var(--tf-line);border-bottom-left-radius:4px}';
  CSS_TEXT += '.tf-chat-code-block{background:var(--tf-code);color:var(--tf-codetx);padding:10px 12px;border-radius:8px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;overflow-x:auto;margin:8px 0;border:1px solid var(--tf-line)}';
  CSS_TEXT += '.tf-table-wrap{overflow-x:auto;margin:10px 0;border:1px solid var(--tf-line);border-radius:8px;background:var(--tf-card)}';
  CSS_TEXT += '.tf-chat-table{width:100%;border-collapse:collapse;font-size:12px;color:var(--tf-text)}.tf-chat-table th{color:#d9383a;padding:8px;text-align:left}.tf-chat-table td{padding:7px 10px;border-top:1px solid var(--tf-line)}';
  CSS_TEXT += '.tf-action-card{margin-top:10px;padding:12px;border:1px dashed #d9383a;border-radius:10px;background:var(--tf-win)}';
  CSS_TEXT += '.tf-block-card{background:var(--tf-card);color:var(--tf-text);border:1px solid var(--tf-line);border-radius:10px;padding:12px;display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;gap:12px}';
  CSS_TEXT += '.tf-thinking-bubble{display:inline-flex;align-items:center;gap:9px;color:var(--tf-mut);padding:8px 12px}';
  CSS_TEXT += '.tf-thinking-label{font-size:13px;font-weight:500}';
  CSS_TEXT += '.tf-thinking-dots{display:inline-flex;gap:3px;align-items:center}';
  CSS_TEXT += '.tf-thinking-dots span{width:6px;height:6px;border-radius:50%;background:#d9383a;animation:tfDot 1.1s infinite ease-in-out}';
  CSS_TEXT += '.tf-thinking-dots span:nth-child(2){animation-delay:.12s}.tf-thinking-dots span:nth-child(3){animation-delay:.24s}';
  CSS_TEXT += '@keyframes tfDot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}}';
  CSS_TEXT += '.tf-avatar-pulse{animation:tfPulse 1.5s infinite ease-in-out}';
  CSS_TEXT += '@keyframes tfPulse{0%,100%{box-shadow:0 0 0 0 rgba(217,56,58,.35)}50%{box-shadow:0 0 0 8px rgba(217,56,58,0)}}';
  // --- Reasoning Panel (riêng biệt, không trong bubble) ---
  CSS_TEXT += '.tf-reasoning-panel{margin-bottom:10px;border:1px solid var(--tf-line);border-left:3px solid #d9383a;border-radius:10px;background:var(--tf-reason);overflow:hidden;animation:tfSlideDown .25s ease-out}';
  CSS_TEXT += '@keyframes tfSlideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}';
  CSS_TEXT += '.tf-reasoning-header{cursor:pointer;padding:10px 14px;font-size:12px;color:#d9383a;font-weight:600;list-style:none;display:flex;align-items:center;gap:8px;user-select:none;background:rgba(217,56,58,.08)}';
  CSS_TEXT += '.tf-reasoning-header::-webkit-details-marker{display:none}';
  CSS_TEXT += '.tf-reasoning-header::before{content:"\\25B8";display:inline-block;transition:transform .15s;font-size:10px}';
  CSS_TEXT += '.tf-reasoning-panel[open] .tf-reasoning-header::before{transform:rotate(90deg)}';
  CSS_TEXT += '.tf-reasoning-body{padding:12px 14px;font-size:12px;line-height:1.6;color:var(--tf-mut);white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,monospace;max-height:300px;overflow-y:auto;border-top:1px solid var(--tf-line)}';
  CSS_TEXT += '.tf-reasoning-body::-webkit-scrollbar{width:6px}.tf-reasoning-body::-webkit-scrollbar-thumb{background:var(--tf-line);border-radius:3px}';
  // --- Reasoning Stream Panel (luồng riêng, real-time) ---
  CSS_TEXT += '.tf-ai-split{display:flex;flex:1;overflow:hidden;min-height:0}';
  CSS_TEXT += '.tf-chat-pane{flex:1;display:flex;flex-direction:column;min-width:0}';
  CSS_TEXT += '.tf-reasoning-pane{width:320px;min-width:280px;max-width:45%;border-left:1px solid var(--tf-line);background:var(--tf-reason);display:flex;flex-direction:column;overflow:hidden;flex-shrink:0}';
  CSS_TEXT += '.tf-reasoning-pane.collapsed{width:0;min-width:0;border-left:none;overflow:hidden}';
  CSS_TEXT += '.tf-reasoning-header-bar{height:44px;padding:0 14px;display:flex;align-items:center;justify-content:space-between;background:rgba(217,56,58,.08);border-bottom:1px solid var(--tf-line);flex-shrink:0}';
  CSS_TEXT += '.tf-reasoning-title{font-size:12px;font-weight:600;color:#d9383a;display:flex;align-items:center;gap:8px}';
  CSS_TEXT += '.tf-reasoning-toggle{width:28px;height:28px;border-radius:6px;background:transparent;border:none;color:var(--tf-mut);cursor:pointer;display:flex;align-items:center;justify-content:center}';
  CSS_TEXT += '.tf-reasoning-toggle:hover{background:var(--tf-line);color:var(--tf-text)}';
  CSS_TEXT += '.tf-reasoning-stream{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;min-height:0}';
  CSS_TEXT += '.tf-reasoning-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--tf-mut);font-size:13px;padding:20px;text-align:center;line-height:1.6}';
  CSS_TEXT += '.tf-reasoning-empty .icon{font-size:32px;margin-bottom:10px;opacity:.5}';
  CSS_TEXT += '.tf-reasoning-item{background:var(--tf-card);border:1px solid var(--tf-line);border-radius:8px;padding:10px 12px;font-size:11.5px;line-height:1.6;color:var(--tf-text);font-family:ui-monospace,SFMono-Regular,monospace;white-space:pre-wrap;animation:tfFadeIn .2s ease-out;max-height:200px;overflow-y:auto}';
  CSS_TEXT += '.tf-reasoning-item.streaming{border-left:3px solid #d9383a;background:rgba(217,56,58,.05)}';
  CSS_TEXT += '.tf-reasoning-item .meta{font-size:10px;color:var(--tf-mut);margin-bottom:6px;display:flex;gap:8px;align-items:center}';
  CSS_TEXT += '.tf-reasoning-item .source{font-weight:600;color:#d9383a}';
  CSS_TEXT += '.tf-split-resizer{width:4px;background:var(--tf-line);cursor:col-resize;flex-shrink:0;transition:background .15s}';
  CSS_TEXT += '.tf-split-resizer:hover{background:#d9383a}';

  function injectCSS() {
    if (cssInjected) return;
    var style = document.createElement('style');
    style.id = 'turboforge-styles';
    style.textContent = CSS_TEXT;
    document.head.appendChild(style);
    cssInjected = true;
  }

  function createTurboForgeWindow() {
    if (turboForgeWindow && !turboForgeWindow.isClosed()) {
      turboForgeWindow.show();
      turboForgeWindow.bringToFront();
      return;
    }

    var wm = window.wm;
    if (!wm) {
      console.warn('WindowManager not available');
      return;
    }

    injectCSS();

    turboForgeWindow = wm.createWindow({
      id: 'turboforge-studio',
      title: 'TurboForge Studio',
      width: 860,
      height: 630,
      minWidth: 700,
      minHeight: 500,
      modal: true,
      resizable: true,
      maximizable: true,
      minimizable: true,
      closable: true,
      alwaysOnTop: true,
      onClose: function () {
        turboForgeWindow = null;
      }
    });

    // Add theme class to window element for CSS variables
    turboForgeWindow.element.classList.add('theme-' + currentTheme);

    // Set content
    renderWindowContent();

    turboForgeWindow.show();
  }

  function renderWindowContent() {
    if (!turboForgeWindow) return;
    var contentEl = turboForgeWindow.getContentElement();
    if (!contentEl) return;

    var undoBtn = historyStack.length > 0
      ? '<button class="tf-btn tf-btn-secondary" id="uiUndoBtn" style="padding:4px 8px;font-size:11px;margin-left:8px">' + escHtml(t('undoBtn')) + '</button>'
      : '';

    contentEl.innerHTML =
      '<div class="tf-window theme-' + currentTheme + '">' +
      '  <div class="tf-header">' +
      '    <div style="display:flex;align-items:center;gap:10px">' +
      '      <img src="' + LOGO_URL + '" style="height:26px">' +
      '      <span style="font-weight:600;font-size:14px">TurboForge Studio</span>' +
      undoBtn +
      '    </div>' +
      '    <div style="display:flex;gap:6px">' +
      '      <button class="tf-icon-btn" id="themeBtn" title="Toggle theme">' + (currentTheme === 'dark' ? ICONS.sun : ICONS.moon) + '</button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="tf-tabs">' +
      '    <button class="tf-tab-btn' + (activeTab === 'ai' ? ' active' : '') + '" data-tab="ai">' + escHtml(t('tabAI')) + '</button>' +
      '    <button class="tf-tab-btn' + (activeTab === 'blocks' ? ' active' : '') + '" data-tab="blocks">' + escHtml(t('tabBlocks')) + '</button>' +
      '    <button class="tf-tab-btn' + (activeTab === 'general' ? ' active' : '') + '" data-tab="general">' + escHtml(t('tabGeneral')) + '</button>' +
      '    <button class="tf-tab-btn' + (activeTab === 'export' ? ' active' : '') + '" data-tab="export">' + escHtml(t('tabExport')) + '</button>' +
      '    <button class="tf-tab-btn' + (activeTab === 'extensions' ? ' active' : '') + '" data-tab="extensions" title="' + escHtml(t('tabExtManager')) + '">' + ICONS.puzzle + '</button>' +
      '  </div>' +
      '  <div class="tf-content" id="tabContent"></div>' +
      '</div>';

    // Bind header buttons - use the window's close button from header
    var closeBtn = turboForgeWindow.headerElement.querySelector('.addon-window-btn-close');
    if (closeBtn) {
      closeBtn.onclick = function () { turboForgeWindow.close(); };
    }

    var themeBtn = contentEl.querySelector('#themeBtn');
    if (themeBtn) {
      themeBtn.onclick = function () {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        safeSet('turboforge_theme', currentTheme);
        turboForgeWindow.element.classList.remove('theme-dark', 'theme-light');
        turboForgeWindow.element.classList.add('theme-' + currentTheme);
        renderWindowContent();
      };
    }

    var undoBtnEl = contentEl.querySelector('#uiUndoBtn');
    if (undoBtnEl) {
      undoBtnEl.onclick = function () { if (undoHistory()) renderWindowContent(); };
    }

    // Bind tabs
    var tabs = contentEl.querySelectorAll('.tf-tab-btn');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].onclick = function () {
        activeTab = this.getAttribute('data-tab');
        renderWindowContent();
      };
    }

    var tabContent = contentEl.querySelector('#tabContent');
    if (activeTab === 'ai') renderAITab(tabContent);
    else if (activeTab === 'blocks') renderBlocksTab(tabContent);
    else if (activeTab === 'general') renderGeneralTab(tabContent);
    else if (activeTab === 'export') renderExportTab(tabContent);
    else if (activeTab === 'extensions') renderExtensionsTab(tabContent);
  }

  function chatRowHTML(m) {
    if (m.role === 'user') return '<div class="tf-chat-row tf-chat-row-user"><div class="tf-bubble tf-bubble-user">' + escHtml(m.content) + '</div></div>';
    var act = extractAction(m.content);
    var html = '';
    // Reasoning KHÔNG hiển thị ở đây nữa - đã có luồng riêng ở panel bên
    html += '<div class="tf-bubble tf-bubble-bot">' + renderMarkdown(m.content) + '</div>';
    if (act) {
      var title = '', desc = '';
      if (act.type === 'ADD_BLOCK') { title = escHtml(t('actAdd')); desc = 'Tên: ' + escHtml(act.data.text) + '\nOpcode: ' + escHtml(act.data.opcode); }
      if (act.type === 'UPDATE_BLOCK') { title = escHtml(t('actUpdate')) + ': ' + escHtml(act.target); desc = escHtml(t('diffMsg')); }
      if (act.type === 'DELETE_BLOCK') { title = escHtml(t('actDelete')) + ': ' + escHtml(act.target); desc = 'Khối này sẽ được gỡ bỏ khỏi tiện ích.'; }
      if (act.type === 'UPDATE_SETTINGS') { title = escHtml(t('actSettings')); desc = escHtml(JSON.stringify(act.data)); }
      html += '<div class="tf-action-card"><div style="font-size:12px;color:#d9383a;font-weight:600">' + title + '</div><div style="font-family:monospace;font-size:11px;white-space:pre-wrap">' + desc + '</div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px"><button class="tf-btn tf-btn-secondary" data-revise="1">' + escHtml(t('actionRevise')) + '</button><button class="tf-btn" data-exec="' + escHtml(encodeURIComponent(JSON.stringify(act))) + '">' + escHtml(t('actionAccept')) + '</button></div></div>';
    }
    return '<div class="tf-chat-row"><img class="tf-avatar" src="' + BEABEA_AVATAR + '"><div style="display:flex;flex-direction:column;gap:6px;max-width:100%">' + html + '</div></div>';
  }

  function renderAITab(content) {
    var prov = safeGet('turboforge_ai_prov', 'pollinations');
    var chatHtml = chatHistory.length === 0
      ? '<div class="tf-chat-row"><img class="tf-avatar" src="' + BEABEA_AVATAR + '"><div class="tf-bubble tf-bubble-bot">' + renderMarkdown(t('welcomeAiMsg', extData.blocks.length)) + '</div></div>'
      : chatHistory.map(chatRowHTML).join('');
    if (isThinking) chatHtml += '<div class="tf-chat-row"><img class="tf-avatar tf-avatar-pulse" src="' + BEABEA_AVATAR + '"><div class="tf-thinking-bubble"><span class="tf-thinking-label">' + escHtml(t('aiThinking')) + '</span><span class="tf-thinking-dots"><span></span><span></span><span></span></span></div></div>';

    var reasoningHtml = reasoningStream.length === 0
      ? '<div class="tf-reasoning-empty"><div class="icon">🧠</div><div>' + escHtml(t('reasoningEmptyText')) + '</div></div>'
      : reasoningStream.map(function (r, idx) {
          var cls = 'tf-reasoning-item' + (r.streaming ? ' streaming' : '');
          var sourceLabel = r.source === 'reasoning_content' ? 'DeepSeek Reasoner' : (r.source === 'reasoning' ? 'Reasoning' : 'Thinking');
          return '<div class="' + cls + '" id="reasoning-' + idx + '"><div class="meta"><span class="source">' + escHtml(sourceLabel) + '</span><span>' + escHtml(r.timestamp) + '</span></div>' + escHtml(r.text) + '</div>';
        }).join('');

    content.innerHTML =
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:4px">' +
      '  <select id="chatProv" style="width:auto;min-width:160px">' +
      '    <option value="pollinations"' + (prov === 'pollinations' ? ' selected' : '') + '>Pollinations (Free)</option>' +
      '    <option value="groq"' + (prov === 'groq' ? ' selected' : '') + '>Groq Llama-3.3</option>' +
      '    <option value="deepseek"' + (prov === 'deepseek' ? ' selected' : '') + '>DeepSeek</option>' +
      '  </select>' +
      '  <input id="chatKey" type="password" placeholder="' + escHtml(t('aiApiKey')) + '" style="' + (prov === 'pollinations' ? 'display:none' : 'flex:1;min-width:180px') + '">' +
      '</div>' +
      '<div class="tf-ai-split" id="aiSplit">' +
      '  <div class="tf-chat-pane">' +
      '    <div class="tf-chat-messages" id="chatBox">' + chatHtml + '</div>' +
      '    <div style="display:flex;gap:8px;margin-top:8px;flex-shrink:0">' +
      '      <input id="chatInput" type="text" placeholder="' + escHtml(t('aiPromptPlaceholder')) + '" style="flex:1" autocomplete="off">' +
      '      <button class="tf-btn" id="sendBtn" title="Send">' + ICONS.send + '</button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="tf-split-resizer" id="splitResizer" title="Kéo để thay đổi tỷ lệ"></div>' +
      '  <div class="tf-reasoning-pane' + (reasoningPaneCollapsed ? ' collapsed' : '') + '" id="reasoningPane">' +
      '    <div class="tf-reasoning-header-bar">' +
      '      <div class="tf-reasoning-title">' + escHtml(t('reasoningStreamTitle')) + '</div>' +
      '      <button class="tf-reasoning-toggle" id="reasoningToggle" title="Thu gọn/mở rộng">' + (reasoningPaneCollapsed ? ICONS.play : ICONS.check) + '</button>' +
      '    </div>' +
      '    <div class="tf-reasoning-stream" id="reasoningStream">' + reasoningHtml + '</div>' +
      '  </div>' +
      '</div>';

    var box = content.querySelector('#chatBox');
    if (box) box.scrollTop = box.scrollHeight;

    var provSelect = content.querySelector('#chatProv');
    if (provSelect) {
      provSelect.onchange = function (e) { safeSet('turboforge_ai_prov', e.target.value); renderWindowContent(); };
    }

    function doSend() {
      var inp = content.querySelector('#chatInput');
      var txt = inp.value.trim();
      if (!txt || isThinking) return;
      isThinking = true; 
      reasoningStream = []; // reset luồng reasoning khi gửi tin mới
      renderWindowContent();
      var p = content.querySelector('#chatProv') ? content.querySelector('#chatProv').value : prov;
      var k = content.querySelector('#chatKey') ? content.querySelector('#chatKey').value : '';
      sendChatMessage(txt, p, k, null).catch(function (err) {
        chatHistory.push({ role: 'assistant', content: 'Huhu lỗi kết nối API: ' + err.message });
      }).then(function () { isThinking = false; renderWindowContent(); });
    }

    var sendBtn = content.querySelector('#sendBtn');
    if (sendBtn) sendBtn.onclick = doSend;

    var chatInput = content.querySelector('#chatInput');
    if (chatInput) {
      chatInput.onkeydown = function (e) { if (e.key === 'Enter') doSend(); };
      chatInput.focus();
    }

    // Split resizer
    var resizer = content.querySelector('#splitResizer');
    var reasoningPane = content.querySelector('#reasoningPane');
    if (resizer && reasoningPane) {
      var startX, startWidth;
      resizer.onmousedown = function (e) {
        startX = e.clientX;
        startWidth = reasoningPane.offsetWidth;
        document.addEventListener('mousemove', onMove);
        document.addEventListener('mouseup', onUp);
        e.preventDefault();
      };
      function onMove(e) {
        var newWidth = startWidth - (e.clientX - startX);
        newWidth = Math.max(280, Math.min(500, newWidth));
        reasoningPane.style.width = newWidth + 'px';
        reasoningPane.style.flexBasis = newWidth + 'px';
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      }
    }

    // Toggle reasoning pane
    var toggleBtn = content.querySelector('#reasoningToggle');
    if (toggleBtn) {
      toggleBtn.onclick = function () {
        reasoningPaneCollapsed = !reasoningPaneCollapsed;
        renderWindowContent();
      };
    }

    // Auto-scroll reasoning stream
    var reasoningStreamEl = content.querySelector('#reasoningStream');
    if (reasoningStreamEl) {
      reasoningStreamEl.scrollTop = reasoningStreamEl.scrollHeight;
    }

    bindActionButtons(content);
  }

  function bindActionButtons(content) {
    var execs = content.querySelectorAll('[data-exec]');
    for (var i = 0; i < execs.length; i++) {
      execs[i].onclick = function () {
        var act = JSON.parse(decodeURIComponent(this.getAttribute('data-exec')));
        applyAction(act); renderWindowContent();
      };
    }
    var revs = content.querySelectorAll('[data-revise]');
    for (var j = 0; j < revs.length; j++) {
      revs[j].onclick = function () {
        activeTab = 'ai'; renderWindowContent();
        setTimeout(function () {
          var inp = turboForgeWindow && turboForgeWindow.getContentElement() ? turboForgeWindow.getContentElement().querySelector('#chatInput') : null;
          if (inp) { inp.value = 'BeaBea ơi, mình muốn điều chỉnh lại xíu: '; inp.focus(); }
        }, 50);
      };
    }
    var polls = content.querySelectorAll('.poll-opt');
    for (var k = 0; k < polls.length; k++) {
      polls[k].onclick = function () {
        var v = this.getAttribute('data-poll');
        var inp2 = content.querySelector('#chatInput');
        if (inp2) { inp2.value = v; inp2.focus(); }
      };
    }
  }

  function renderBlocksTab(content) {
    var list = extData.blocks.map(function (b, i) {
      return '<div class="tf-block-card"><div style="flex:1;min-width:0"><div style="display:flex;gap:6px;align-items:center;margin-bottom:4px;flex-wrap:wrap"><span class="badge" style="background:var(--tf-code);color:#d9383a;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600">' + escHtml(b.type) + '</span><strong style="font-family:monospace;font-size:13px">' + escHtml(b.opcode) + '</strong></div><div style="font-size:12px;color:var(--tf-mut);word-break:break-word">' + escHtml(b.text) + '</div></div><div style="display:flex;gap:6px;flex-shrink:0"><button class="tf-icon-btn" data-fix="' + escHtml(b.opcode) + '" title="' + escHtml(t('editAiBtn')) + '">' + ICONS.magic + '</button><button class="tf-icon-btn" data-del="' + i + '" title="Xóa khối">' + ICONS.trash + '</button></div></div>';
    }).join('');
    if (!list) list = '<p style="color:var(--tf-mut);font-size:13px;text-align:center;padding:20px">' + escHtml(t('noBlocks')) + '</p>';

    content.innerHTML =
      '<div style="flex:1;overflow-y:auto;min-height:0">' + list + '</div>' +
      '<button class="tf-btn tf-btn-secondary" id="addBtn" style="margin-top:10px;width:100%">' + ICONS.plus + ' ' + escHtml(t('addBlockBtn')) + '</button>';

    var dels = content.querySelectorAll('[data-del]');
    for (var i = 0; i < dels.length; i++) {
      dels[i].onclick = function () { pushHistory(); extData.blocks.splice(Number(this.getAttribute('data-del')), 1); renderWindowContent(); };
    }
    var fixes = content.querySelectorAll('[data-fix]');
    for (var j = 0; j < fixes.length; j++) {
      fixes[j].onclick = function () {
        var op = this.getAttribute('data-fix');
        window.askAiFix(op);
      };
    }
    var addBtn = content.querySelector('#addBtn');
    if (addBtn) {
      addBtn.onclick = function () {
        pushHistory();
        extData.blocks.push({ opcode: 'block' + (extData.blocks.length + 1), type: 'COMMAND', text: 'khối mới [A]', args: { A: '10' }, code: 'console.log(args.A);' });
        renderWindowContent();
      };
    }
  }

  function renderGeneralTab(content) {
    content.innerHTML =
      '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">' + escHtml(t('extId')) + '</label><input id="cfgId" value="' + escHtml(extData.id) + '"></div>' +
      '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">' + escHtml(t('extName')) + '</label><input id="cfgName" value="' + escHtml(extData.name) + '"></div>' +
      '<div><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">' + escHtml(t('extColor')) + '</label><input id="cfgColor" type="color" value="' + escHtml(extData.color) + '" style="height:44px;cursor:pointer;border:1px solid var(--tf-line);border-radius:8px;background:var(--tf-input)"></div>';

    var cfgId = content.querySelector('#cfgId');
    if (cfgId) cfgId.onchange = function (e) { pushHistory(); extData.id = sanitizeId(e.target.value); };
    var cfgName = content.querySelector('#cfgName');
    if (cfgName) cfgName.onchange = function (e) { pushHistory(); extData.name = e.target.value; };
    var cfgColor = content.querySelector('#cfgColor');
    if (cfgColor) cfgColor.onchange = function (e) { pushHistory(); extData.color = e.target.value; };
  }

  function renderExportTab(content) {
    var code = buildExtensionCode();
    content.innerHTML =
      '<pre style="background:var(--tf-code);color:var(--tf-codetx);padding:14px;border-radius:8px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;overflow:auto;flex:1;border:1px solid var(--tf-line);min-height:0;line-height:1.55"><code>' + escHtml(code) + '</code></pre>' +
      '<div style="display:flex;gap:8px;flex-shrink:0;margin-top:12px">' +
      '  <button class="tf-btn" id="runInject">' + ICONS.play + ' ' + escHtml(t('loadIntoEditor')) + '</button>' +
      '  <button class="tf-btn tf-btn-secondary" id="runCopy">' + ICONS.copy + ' ' + escHtml(t('copyCode')) + '</button>' +
      '  <button class="tf-btn tf-btn-secondary" id="runDl">' + ICONS.download + ' ' + escHtml(t('downloadFile')) + '</button>' +
      '</div>';

    var runInject = content.querySelector('#runInject');
    if (runInject) {
      runInject.onclick = function () {
        try {
          if (!Scratch.vm || !Scratch.vm.extensionManager || typeof Scratch.vm.extensionManager.loadExtensionURL !== 'function') {
            throw new Error('Không tìm thấy extensionManager của TurboWarp.');
          }
          var url = 'data:application/javascript,' + encodeURIComponent(code);
          var securityManager = Scratch.vm.extensionManager.securityManager;
          var prevGetSandboxMode = securityManager.getSandboxMode;
          securityManager.getSandboxMode = function (u) {
            if (u === url) return 'unsandboxed';
            return prevGetSandboxMode.call(securityManager, u);
          };
          Scratch.vm.extensionManager.loadExtensionURL(url).then(function () {
            alert('✨ Tuyệt vời! Tiện ích vừa được nạp trực tiếp vào danh sách khối lệnh của TURBO-IDE! 🐾');
          }).catch(function (err) {
            alert('Có lỗi khi nạp tiện ích: ' + (err && err.message ? err.message : err));
          }).finally(function () {
            securityManager.getSandboxMode = prevGetSandboxMode;
          });
        } catch (e) { alert('Có lỗi khi nạp tiện ích: ' + e.message); }
      };
    }

    var runCopy = content.querySelector('#runCopy');
    if (runCopy) {
      runCopy.onclick = function () {
        if (navigator.clipboard) navigator.clipboard.writeText(code).then(function () { alert('📋 Đã sao chép mã nguồn vào bộ nhớ tạm!'); });
      };
    }

    var runDl = content.querySelector('#runDl');
    if (runDl) {
      runDl.onclick = function () {
        var blob = new Blob([code], { type: 'application/javascript' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = (extData.id || 'extension') + '.js';
        a.click();
      };
    }
  }

  function renderExtensionsTab(content) {
    content.innerHTML =
      '<div style="text-align:center;padding:40px 20px">' +
      '  <div style="font-size:48px;margin-bottom:16px">' + ICONS.puzzle + '</div>' +
      '  <h3 style="margin:0 0 8px;color:var(--tf-text)">' + escHtml(t('tabExtManager')) + '</h3>' +
      '  <p style="color:var(--tf-mut);margin:0 0 24px">Mở Manage Extensions của TurboWarp.</p>' +
      '  <button class="tf-btn" id="openExtManager" style="padding:12px 24px;font-size:14px">' + ICONS.plus + ' Mở Manage Extensions</button>' +
      '</div>';

    var btn = content.querySelector('#openExtManager');
    if (btn) {
      btn.onclick = function () {
        try {
          // Đóng Studio trước
          if (turboForgeWindow) {
            turboForgeWindow.close();
            turboForgeWindow = null;
          }
          var store = window.ReduxStore;
          if (store && store.dispatch) {
            store.dispatch({ type: 'scratch-gui/modals/OPEN_MODAL', modal: 'extensionManagerModal' });
          } else {
            alert('Không truy cập được Redux store. Dùng menu Tiện ích mở rộng trên toolbar.');
          }
        } catch (e) {
          console.warn('Open extension manager failed:', e);
          alert('Lỗi: ' + e.message);
        }
      };
    }
  }

  window.askAiFix = function (opcode) {
    activeTab = 'ai';
    renderWindowContent();
    setTimeout(function () {
      if (!turboForgeWindow) return;
      var contentEl = turboForgeWindow.getContentElement();
      if (!contentEl) return;
      var inp = contentEl.querySelector('#chatInput');
      if (inp) { inp.value = 'BeaBea ơi, xem giúp mình khối lệnh "' + opcode + '" với! Ý tưởng của mình là: '; inp.focus(); }
    }, 80);
  };

  function TurboForgePalette() {
    this.openStudio = function () { createTurboForgeWindow(); };
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
        { blockType: Scratch.BlockType.BUTTON, text: 'Mở TurboForge Studio', func: 'openStudio' }
      ]
    };
  };

  try {
    Scratch.extensions.register(new TurboForgePalette());
  } catch (err) {
    console.warn('TurboForge register fail:', err);
  }
})(Scratch);