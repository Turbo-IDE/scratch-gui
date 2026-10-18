// Name: BeaBea Coding Agent
// ID: beabeaCodingAgent
// Description: AI-powered coding agent studio with BeaBea 🐾
// By: TurboWS Team
// License: MIT
(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('BeaBea Coding Agent must run as an unsandboxed extension');
  }

  // ==========================================
  // 1. RESOURCES & ICONS
  // ==========================================
  var BEABEA_AVATAR = 'https://raw.githubusercontent.com/danvPR/workshop/refs/heads/main/Assets/BeaBea.jpg';
  var EXT_ICON_URL = 'https://files.catbox.moe/diofi9.png';

  var ICONS = {
    close: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></svg>',
    send: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>',
    download: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
    copy: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
    plus: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>',
    sun: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line></svg>',
    moon: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
    scan: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"></path><path d="M17 3h2a2 2 0 0 1 2 2v2"></path><path d="M21 17v2a2 2 0 0 1-2 2h-2"></path><path d="M7 21H5a2 2 0 0 1-2-2v-2"></path><line x1="7" y1="12" x2="17" y2="12"></line><line x1="12" y1="7" x2="12" y2="17"></line></svg>',
    magic: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5 4 4"></path><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"></path><path d="m8 6 2-2"></path><path d="m18 16 2-2"></path><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"></path></svg>',
    settings: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    sprite: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
    chevronDown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',
    turboforge: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2z"></path><path d="M2 12a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"></path><path d="M22 12a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2z"></path><path d="M12 22a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2z"></path></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>'
  };

  // ==========================================
  // 2. LOCALIZATION (VI / EN)
  // ==========================================
  var TRANSLATIONS = {
    vi: {
      title: 'BeaBea Coding Agent',
      openStudio: 'Mở BeaBea Coding Agent',
      tabChat: 'Agent',
      tabSprites: 'Context',
      tabSettings: 'Cài đặt',
      tabHistory: 'Lịch sử & Xuất',
      aiProvider: 'Dịch vụ AI',
      aiModel: 'Model',
      aiThinking: 'BeaBea đang suy nghĩ',
      deepThinking: 'Đang suy nghĩ sâu...',
      retryAttempt: 'Thử lại lần $1/$2',
      maxRetriesReached: 'Đã thử $1 lần, không thể kết nối. Vui lòng thử lại sau.',
      promptPlaceholder: 'Hỏi BeaBea về code, sprite, hoặc yêu cầu sửa dự án... (@sprite_name để tham chiếu)',
      welcomeMsg: 'Hế lô bạn nha! ✨ Mình là **BeaBea** 🐾, AI Agent của bạn trong TurboWarp. Mình có thể đọc/viết biến, list, chạy script, giúp debug, refactor... Cứ nhờ mình nhé! 🌸',
      scanProjectBtn: ICONS.scan + ' Quét toàn bộ dự án',
      scanComplete: 'Đã quét xong $1 sprite(s)',
      spriteSelected: 'Đã chọn sprite: $1',
      noSpritesFound: 'Không tìm thấy sprite nào',
      theme: 'Chủ đề',
      darkTheme: 'Tối',
      lightTheme: 'Sáng',
      exportChat: ICONS.download + ' Xuất hội thoại',
      exportContext: ICONS.copy + ' Sao chép ngữ cảnh',
      clearHistory: ICONS.trash + ' Xóa lịch sử',
      openInTurboForge: ICONS.turboforge + ' Mở trong TurboForge',
      settingsSaved: 'Đã lưu cài đặt',
      modelOpenAI: 'OpenAI (GPT)',
      modelDeepSeek: 'DeepSeek',
      modelGroq: 'Groq (Llama)',
      modelPollinations: 'Pollinations (Miễn phí)',
      actionExecuted: '✅ Đã thực hiện: $1',
      actionFailed: '❌ Thất bại: $1',
      confirmAction: 'Bạn có chắc chắn muốn $1?',
      reasoningTitle: '🧠 Suy nghĩ của BeaBea',
      copiedContext: '📋 Đã sao chép ngữ cảnh sprite!',
      noReduxStore: 'Không truy cập được Redux store. Dùng menu Tiện ích mở rộng trên toolbar.',
      errorPrefix: 'Lỗi: ',
      actionAccept: 'Chấp nhận',
      actionRevise: 'Sửa lại'
    },
    en: {
      title: 'BeaBea Coding Agent',
      openStudio: 'Open BeaBea Coding Agent',
      tabChat: 'Agent',
      tabSprites: 'Context',
      tabSettings: 'Settings',
      tabHistory: 'History & Export',
      aiProvider: 'AI Provider',
      aiModel: 'Model',
      aiThinking: 'BeaBea is thinking',
      deepThinking: 'Thinking deeply...',
      retryAttempt: 'Retry attempt $1/$2',
      maxRetriesReached: 'Failed after $1 retries. Please try again later.',
      promptPlaceholder: 'Ask BeaBea about code, sprites, or request project changes... (@sprite_name to reference)',
      welcomeMsg: 'Hi there! I am **BeaBea** 🐾, your AI Agent in TurboWarp. I can read/write variables, lists, run scripts, help debug, refactor... Just ask! 🌸',
      scanProjectBtn: ICONS.scan + ' Scan Entire Project',
      scanComplete: 'Scanned $1 sprite(s)',
      spriteSelected: 'Selected sprite: $1',
      noSpritesFound: 'No sprites found',
      theme: 'Theme',
      darkTheme: 'Dark',
      lightTheme: 'Light',
      exportChat: ICONS.download + ' Export Chat',
      exportContext: ICONS.copy + ' Copy Context',
      clearHistory: ICONS.trash + ' Clear History',
      openInTurboForge: ICONS.turboforge + ' Open in TurboForge',
      settingsSaved: 'Settings saved',
      modelOpenAI: 'OpenAI (GPT)',
      modelDeepSeek: 'DeepSeek',
      modelGroq: 'Groq (Llama)',
      modelPollinations: 'Pollinations (Free)',
      actionExecuted: '✅ Executed: $1',
      actionFailed: '❌ Failed: $1',
      confirmAction: 'Are you sure you want to $1?',
      reasoningTitle: '🧠 BeaBea\'s Reasoning',
      copiedContext: '📋 Context copied!',
      noReduxStore: 'Cannot access Redux store. Use Extensions menu on toolbar.',
      errorPrefix: 'Error: ',
      actionAccept: 'Accept',
      actionRevise: 'Revise'
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
  // 3. STATE
  // ==========================================
  var chatHistory = [];
  var isProcessing = false;
  var currentTheme = safeGet('beabea_theme', 'dark');
  var activeTab = 'chat';
  var retryCount = 0;
  var maxRetries = 3;
  var beabeaWindow = null;
  var cssInjected = false;
  var selectedSpriteName = null;
  var currentProvider = safeGet('beabea_provider', 'pollinations');
  var currentModel = safeGet('beabea_model', 'openai');

  // Autocomplete state
  var mentionDropdown = null;
  var mentionActive = false;
  var mentionFilter = '';
  var mentionIndex = -1;
  var mentionSprites = [];

  // Agent state
  var actionHistory = [];

  // Extension knowledge base
  var KNOWN_EXTENSIONS = {
    'CloudDB': { id: 'danvCloudDB', name: 'DANV Cloud DB', desc: 'Cloud variables and data storage for multi-player games', capabilities: ['cloud variables', 'leaderboards', 'data persistence'] },
    'WOWEconomy': { id: 'danvWowEconomy', name: 'WOW Economy', desc: 'WOW energy currency system integration', capabilities: ['virtual currency', 'energy system', 'economy'] },
    'EmbedWindows': { id: 'EmbedWindowsv2', name: 'Embed Windows v2', desc: 'Create fake windows in your project page', capabilities: ['modal windows', 'draggable UI', 'custom HTML'] },
    'TurboForge': { id: 'turboforge', name: 'TurboForge Studio', desc: 'Build custom extensions with AI BeaBea', capabilities: ['extension builder', 'AI co-creator', 'block generator'] },
    'Patching': { id: 'patching', name: 'Patching', desc: 'Inject JavaScript into compiled projects', capabilities: ['runtime patching', 'code injection', 'modding'] },
    'TurboWarp Blocks': { id: 'tw', name: 'TurboWarp Blocks', desc: 'Weird new blocks for TurboWarp', capabilities: ['custom blocks', 'advanced features', 'performance'] }
  };

  // ==========================================
  // 4. MARKDOWN RENDERING (Code + Table + List)
  // ==========================================
  function escHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&')
      .replace(/</g, '<')
      .replace(/>/g, '>')
      .replace(/"/g, '"')
      .replace(/'/g, "&apos;");
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
    var text = String(content).trim();
    var codeBlocks = [];
    text = text.replace(/```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g, function (m, lang, code) {
      var id = '__CODE_BLOCK_' + codeBlocks.length + '__';
      codeBlocks.push({ lang: lang || 'javascript', code: code });
      return id;
    });
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
    var lines = String(text).split('\n');
    var out = [];
    lines.forEach(function (line) {
      var tr = line.trim();
      if (/^__CODE_BLOCK_\d+__$/.test(tr)) { out.push(tr); return; }
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
      var html = '<div class="chat-code-container"><div class="chat-code-header"><span>' + escHtml(item.lang) + '</span></div><pre class="chat-code-block"><code>' + escHtml(item.code) + '</code></pre></div>';
      result = result.split('__CODE_BLOCK_' + idx + '__').join(html);
    });
    return result;
  }

  // Parse Pollinations response (may be JSON-wrapped)
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
      } catch (e) { }
    }
    return { content: raw, reasoning: '' };
  }
  function extractAction(content) {
    var m = String(content || '').match(/<action>([\s\S]*?)<\/action>/);
    if (!m) return null;
    try { 
      var cleanJson = m[1].replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleanJson); 
    } catch (e) { return null; }
  }

  // ==========================================
  // 5. SYSTEM PROMPT BUILDER
  // ==========================================
  function buildSystemPrompt() {
    var lang = getLocale() === 'vi' ? 'Vietnamese' : 'English';
    var extList = Object.values(KNOWN_EXTENSIONS).map(function (e) {
      return '- ' + e.name + ' (' + e.id + '): ' + e.desc + ' | Capabilities: ' + e.capabilities.join(', ');
    }).join('\n');
    
    // Auto-include project summary
    var projectSummary = '';
    try {
      var sprites = getAllSpritesData();
      if (sprites.length > 0) {
        projectSummary = 'CURRENT PROJECT:\n' + sprites.map(function (s) {
          var parts = [s.name + (s.isStage ? ' (Stage)' : '')];
          if (s.blocks.length) parts.push(s.blocks.length + ' blocks');
          if (s.variables.length) parts.push(s.variables.length + ' vars');
          if (s.lists.length) parts.push(s.lists.length + ' lists');
          if (s.costumes.length) parts.push(s.costumes.length + ' costumes');
          return '- ' + parts.join(', ');
        }).join('\n') + '\n\n';
      }
    } catch (e) {}
    
    return projectSummary +
      'You are BeaBea, a sweet friendly AI coding agent inside TurboWarp.\n' +
      'Reply in ' + lang + '. Be cute, use emojis. Address user as "bạn" (VI) / "you" (EN), yourself as "mình/BeaBea".\n' +
      'You can READ and MODIFY Scratch projects in real-time.\n\n' +
      'AVAILABLE TOOLS (use via <action>{"type":"tool_name","args":{...}}</action>):\n' +
      '1. get_sprite_data - Read sprite info (blocks, variables, lists, costumes)\n' +
      '   Args: {sprite_name?: string}\n' +
      '2. set_variable - Set a variable value\n' +
      '   Args: {sprite_name?: string, name: string, value: any}\n' +
      '3. get_variable - Get a variable value\n' +
      '   Args: {sprite_name?: string, name: string}\n' +
      '4. set_list - Replace list contents\n' +
      '   Args: {sprite_name?: string, name: string, value: array}\n' +
      '5. get_list - Get list contents\n' +
      '   Args: {sprite_name?: string, name: string}\n' +
      '6. list_sprites - List all sprites in project\n' +
      '   Args: {}\n\n' +
      'WORKFLOW:\n' +
      '- PLAN: Think about what tools you need\n' +
      '- ACT: Call ONE tool per <action> tag\n' +
      '- OBSERVE: Wait for tool result\n' +
      '- REPEAT: As needed per user message\n' +
      '- CONFIRM: Ask before destructive changes (delete, overwrite)\n\n' +
      'When user mentions @sprite_name, that sprite context is provided automatically.\n' +
      'KNOWN EXTENSIONS (for coordination):\n' + extList + '\n\n' +
      'FORMAT: Use markdown for code blocks, tables, lists. Show reasoning before actions.';
  }

  // ==========================================
  // 6. SPRITE CONTEXT EXTRACTION
  // ==========================================
  function extractSpriteContext(spriteName) {
    if (!Scratch.vm || !Scratch.vm.runtime || !Scratch.vm.runtime.targets) {
      return null;
    }
    var targets = Scratch.vm.runtime.targets;
    for (var i = 0; i < targets.length; i++) {
      var target = targets[i];
      if (target.sprite && target.sprite.name === spriteName) {
        var blocks = {};
        if (target.blocks && target.blocks._blocks) {
          Object.keys(target.blocks._blocks).forEach(function (opcode) {
            blocks[opcode] = true;
          });
        }
        var variables = [];
        var lists = [];
        if (target.variables) {
          Object.values(target.variables).forEach(function (v) {
            if (v.isList) lists.push(v.name);
            else variables.push(v.name);
          });
        }
        var costumes = [];
        if (target.sprite && target.sprite.costumes) {
          target.sprite.costumes.forEach(function (c) { costumes.push(c.name); });
        }
        var sounds = [];
        if (target.sprite && target.sprite.sounds) {
          target.sprite.sounds.forEach(function (s) { sounds.push(s.name); });
        }
        return {
          name: target.sprite.name,
          isStage: target.isStage,
          blocks: Object.keys(blocks),
          variables: variables,
          lists: lists,
          costumes: costumes,
          sounds: sounds
        };
      }
    }
    return null;
  }

  function getAllSpritesData() {
    if (!Scratch.vm || !Scratch.vm.runtime || !Scratch.vm.runtime.targets) {
      return [];
    }
    var results = [];
    var targets = Scratch.vm.runtime.targets;
    for (var i = 0; i < targets.length; i++) {
      var target = targets[i];
      if (target.sprite) {
        var blocks = {};
        if (target.blocks && target.blocks._blocks) {
          Object.keys(target.blocks._blocks).forEach(function (opcode) { blocks[opcode] = true; });
        }
        var variables = [];
        var lists = [];
        if (target.variables) {
          Object.values(target.variables).forEach(function (v) {
            if (v.isList) lists.push(v.name);
            else variables.push(v.name);
          });
        }
        var costumes = [];
        if (target.sprite.costumes) {
          target.sprite.costumes.forEach(function (c) { costumes.push(c.name); });
        }
        results.push({
          name: target.sprite.name,
          isStage: target.isStage,
          blocks: Object.keys(blocks),
          variables: variables,
          lists: lists,
          costumes: costumes
        });
      }
    }
    return results;
  }

  function formatSpriteDataForAI(spriteData) {
    if (!spriteData) return '';
    var md = '### Sprite: ' + spriteData.name + (spriteData.isStage ? ' (Stage)' : '') + '\n\n';
    if (spriteData.blocks.length) {
      md += '**Blocks:** ' + spriteData.blocks.slice(0, 20).join(', ');
      if (spriteData.blocks.length > 20) md += ' ... (+' + (spriteData.blocks.length - 20) + ' more)';
      md += '\n\n';
    }
    if (spriteData.variables.length) md += '**Variables:** ' + spriteData.variables.join(', ') + '\n\n';
    if (spriteData.lists.length) md += '**Lists:** ' + spriteData.lists.join(', ') + '\n\n';
    if (spriteData.costumes.length) md += '**Costumes:** ' + spriteData.costumes.slice(0, 15).join(', ') + (spriteData.costumes.length > 15 ? ' ...' : '') + '\n\n';
    if (spriteData.sounds && spriteData.sounds.length) md += '**Sounds:** ' + spriteData.sounds.slice(0, 10).join(', ') + '\n\n';
    return md;
  }

  function formatAllSpritesForAI(allSprites) {
    if (!allSprites.length) return t('noSpritesFound');
    var md = '## Project Sprites Overview\n\n';
    allSprites.forEach(function (s) {
      md += '### ' + s.name + (s.isStage ? ' (Stage)' : '') + '\n';
      if (s.blocks.length) md += '- **Blocks:** ' + s.blocks.slice(0, 10).join(', ') + (s.blocks.length > 10 ? ' ...' : '') + '\n';
      if (s.variables.length) md += '- **Variables:** ' + s.variables.join(', ') + '\n';
      if (s.lists.length) md += '- **Lists:** ' + s.lists.join(', ') + '\n';
      if (s.costumes.length) md += '- **Costumes:** ' + s.costumes.slice(0, 8).join(', ') + (s.costumes.length > 8 ? ' ...' : '') + '\n';
      md += '\n';
    });
    return md;
  }

  // Parse @sprite_name from user input
  function parseSpriteReferences(text) {
    var matches = text.match(/@([\p{L}\p{N}_]+)/gu);
    if (!matches) return [];
    return matches.map(function (m) { return m.slice(1); });
  }

  // ==========================================
  // 6b. MENTION AUTOCOMPLETE
  // ==========================================
  function getMentionSprites(filter) {
    var sprites = getAllSpritesData();
    if (filter) {
      var f = filter.toLowerCase();
      sprites = sprites.filter(function (s) { return s.name.toLowerCase().indexOf(f) === 0; });
    }
    return sprites;
  }

  function showMentionDropdown(inputEl, filter) {
    hideMentionDropdown();
    mentionFilter = filter || '';
    mentionSprites = getMentionSprites(mentionFilter);
    if (!mentionSprites.length) return;

    mentionDropdown = document.createElement('div');
    mentionDropdown.className = 'bb-mention-dropdown';
    mentionDropdown.id = 'beabea-mention-dropdown';

    var rect = inputEl.getBoundingClientRect();
    mentionDropdown.style.top = (rect.bottom + window.scrollY + 4) + 'px';
    mentionDropdown.style.left = (rect.left + window.scrollX) + 'px';

    mentionSprites.forEach(function (sprite, idx) {
      var item = document.createElement('div');
      item.className = 'bb-mention-item' + (idx === 0 ? ' selected' : '');
      item.dataset.index = idx;
      item.dataset.name = sprite.name;
      item.innerHTML =
        '<div class="sprite-icon">' + ICONS.sprite + '</div>' +
        '<span class="sprite-name">' + escHtml(sprite.name) + '</span>' +
        '<span class="sprite-type">' + (sprite.isStage ? 'Stage' : 'Sprite') + '</span>';
      item.onclick = function () {
        selectMentionItem(inputEl, sprite.name);
      };
      mentionDropdown.appendChild(item);
    });

    if (!mentionSprites.length) {
      var empty = document.createElement('div');
      empty.className = 'bb-mention-empty';
      empty.textContent = 'Không tìm thấy sprite';
      mentionDropdown.appendChild(empty);
    }

    document.body.appendChild(mentionDropdown);
    mentionActive = true;
    mentionIndex = 0;
  }

  function hideMentionDropdown() {
    if (mentionDropdown) {
      mentionDropdown.remove();
      mentionDropdown = null;
    }
    mentionActive = false;
    mentionIndex = -1;
    mentionFilter = '';
  }

  function cleanupMentionDropdown() {
    hideMentionDropdown();
  }

  function selectMentionItem(inputEl, spriteName) {
    var val = inputEl.value;
    var pos = inputEl.selectionStart;
    var before = val.slice(0, pos);
    var after = val.slice(pos);
    var match = before.match(/@(\w*)$/);
    if (match) {
      var start = pos - match[0].length;
      inputEl.value = val.slice(0, start) + '@' + spriteName + ' ' + after;
      inputEl.selectionStart = inputEl.selectionEnd = start + spriteName.length + 2;
    }
    hideMentionDropdown();
    inputEl.focus();
  }

  function handleMentionKeydown(inputEl, e) {
    if (!mentionActive || !mentionDropdown) return;
    var items = mentionDropdown.querySelectorAll('.bb-mention-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      mentionIndex = Math.min(mentionIndex + 1, items.length - 1);
      updateMentionSelection(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      mentionIndex = Math.max(mentionIndex - 1, 0);
      updateMentionSelection(items);
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      e.preventDefault();
      if (mentionIndex >= 0 && items[mentionIndex]) {
        selectMentionItem(inputEl, items[mentionIndex].dataset.name);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      hideMentionDropdown();
    }
  }

  function updateMentionSelection(items) {
    items.forEach(function (item, idx) {
      item.classList.toggle('selected', idx === mentionIndex);
    });
    if (items[mentionIndex]) {
      items[mentionIndex].scrollIntoView({ block: 'nearest' });
    }
  }

  function setupMentionAutocomplete(inputEl) {
    inputEl.addEventListener('input', function (e) {
      var pos = e.target.selectionStart;
      var text = e.target.value.slice(0, pos);
      var match = text.match(/@([\p{L}\p{N}_]*)$/u);
      if (match && (pos === e.target.value.length || e.target.value.charAt(pos) === ' ')) {
        showMentionDropdown(e.target, match[1]);
      } else {
        hideMentionDropdown();
      }
    });

    inputEl.addEventListener('keydown', function (e) {
      handleMentionKeydown(e.target, e);
    });

    inputEl.addEventListener('blur', function () {
      setTimeout(hideMentionDropdown, 150);
    });

    inputEl.addEventListener('focus', function (e) {
      var pos = e.target.selectionStart;
      var text = e.target.value.slice(0, pos);
      var match = text.match(/@([\p{L}\p{N}_]*)$/u);
      if (match) {
        showMentionDropdown(e.target, match[1]);
      }
    });
  }

  // ==========================================
  // 6c. AGENT ACTIONS - READ/WRITE PROJECT STATE
  // ==========================================
  function getTargetByName(spriteName) {
    if (!Scratch.vm || !Scratch.vm.runtime || !Scratch.vm.runtime.targets) return null;
    var targets = Scratch.vm.runtime.targets;
    for (var i = 0; i < targets.length; i++) {
      if (targets[i].sprite && targets[i].sprite.name === spriteName) {
        return targets[i];
      }
    }
    return null;
  }

  function getVariable(target, name) {
    if (!target || !target.variables) return null;
    var vars = Object.values(target.variables);
    for (var i = 0; i < vars.length; i++) {
      if (vars[i].name === name && !vars[i].isList) return vars[i];
    }
    return null;
  }

  function getList(target, name) {
    if (!target || !target.variables) return null;
    var vars = Object.values(target.variables);
    for (var i = 0; i < vars.length; i++) {
      if (vars[i].name === name && vars[i].isList) return vars[i];
    }
    return null;
  }

  var AGENT_ACTIONS = {
    get_sprite_data: function (args) {
      var spriteName = args.sprite_name || selectedSpriteName;
      if (!spriteName) return { error: 'No sprite specified. Use @sprite_name or provide sprite_name argument.' };
      var ctx = extractSpriteContext(spriteName);
      if (!ctx) return { error: 'Sprite not found: ' + spriteName };
      return { success: true, data: ctx };
    },

    set_variable: function (args) {
      var spriteName = args.sprite_name || selectedSpriteName;
      if (!spriteName) return { error: 'No sprite specified.' };
      var target = getTargetByName(spriteName);
      if (!target) return { error: 'Sprite not found: ' + spriteName };
      var variable = getVariable(target, args.name);
      if (!variable) return { error: 'Variable not found: ' + args.name };
      variable.value = args.value;
      target.variables[variable.id] = variable;
      // Notify VM of variable change
      if (Scratch.vm && Scratch.vm.runtime) {
        Scratch.vm.runtime.emit('variableChange', { targetId: target.id, name: args.name, value: args.value });
        Scratch.vm.runtime.requestRedraw();
      }
      return { success: true, message: 'Set ' + spriteName + '.' + args.name + ' = ' + args.value };
    },

    set_list: function (args) {
      var spriteName = args.sprite_name || selectedSpriteName;
      if (!spriteName) return { error: 'No sprite specified.' };
      var target = getTargetByName(spriteName);
      if (!target) return { error: 'Sprite not found: ' + spriteName };
      var list = getList(target, args.name);
      if (!list) return { error: 'List not found: ' + args.name };
      
      if (!Array.isArray(args.value)) {
        return { error: 'CRITICAL: "value" argument must be a JSON Array. Prevented engine crash.' };
      }
      
      list.value = args.value;
      target.variables[list.id] = list;
      // Notify VM of list change
      if (Scratch.vm && Scratch.vm.runtime) {
        Scratch.vm.runtime.emit('listChange', { targetId: target.id, name: args.name, value: args.value });
        Scratch.vm.runtime.requestRedraw();
      }
      return { success: true, message: 'Updated list ' + spriteName + '.' + args.name + ' (' + args.value.length + ' items)' };
    },

    get_variable: function (args) {
      var spriteName = args.sprite_name || selectedSpriteName;
      if (!spriteName) return { error: 'No sprite specified.' };
      var target = getTargetByName(spriteName);
      if (!target) return { error: 'Sprite not found: ' + spriteName };
      var variable = getVariable(target, args.name);
      if (!variable) return { error: 'Variable not found: ' + args.name };
      return { success: true, value: variable.value };
    },

    get_list: function (args) {
      var spriteName = args.sprite_name || selectedSpriteName;
      if (!spriteName) return { error: 'No sprite specified.' };
      var target = getTargetByName(spriteName);
      if (!target) return { error: 'Sprite not found: ' + spriteName };
      var list = getList(target, args.name);
      if (!list) return { error: 'List not found: ' + args.name };
      return { success: true, value: list.value };
    },

    run_script: function (args) {
      // Execute a simple script by creating blocks programmatically
      // This is a simplified version - in practice would need more complex block creation
      var spriteName = args.sprite_name || selectedSpriteName;
      if (!spriteName) return { error: 'No sprite specified.' };
      var target = getTargetByName(spriteName);
      if (!target) return { error: 'Sprite not found: ' + spriteName };
      
      // For now, return info about what would be run
      return { 
        success: true, 
        message: 'Script execution requested for ' + spriteName + '. Blocks: ' + JSON.stringify(args.blocks || []) 
      };
    },

    list_sprites: function (args) {
      var sprites = getAllSpritesData();
      return { success: true, sprites: sprites.map(function (s) { return s.name; }) };
    }
  };

  function executeAction(action) {
    var handler = AGENT_ACTIONS[action.type];
    if (!handler) {
      return { error: 'Unknown action: ' + action.type };
    }
    try {
      var result = handler(action.args || {});
      actionHistory.push({ action: action, result: result, timestamp: Date.now() });
      return result;
    } catch (e) {
      var err = { error: e.message };
      actionHistory.push({ action: action, result: err, timestamp: Date.now() });
      return err;
    }
  }

  function parseActions(text) {
    var actions = [];
    var regex = /<action>([\s\S]*?)<\/action>/g;
    var match;
    while ((match = regex.exec(text)) !== null) {
      try {
        var action = JSON.parse(match[1].trim());
        if (action && action.type) actions.push(action);
      } catch (e) {}
    }
    return actions;
  }

  // ==========================================
  // 7. POLLINATIONS API WITH TIMEOUT & RETRY
  // ==========================================
  function callPollinations(messages, model) {
    console.log('[BeaBea] Calling Pollinations API with model:', model, 'messages:', messages.length);
    var safeSeed = Math.floor(Math.random() * 2147483647);
    return fetch('https://text.pollinations.ai/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messages, model: model || 'openai', seed: safeSeed })
    }).then(function (res) {
      console.log('[BeaBea] Pollinations response status:', res.status, res.statusText);
      if (!res.ok) throw new Error('Pollinations HTTP ' + res.status);
      return res.text();
    }).then(function (text) {
      console.log('[BeaBea] Pollinations raw response length:', text.length);
      return text;
    }).catch(function (e) {
      console.error('[BeaBea] Pollinations error:', e);
      throw e;
    });
  }

  function sendToAI(userText) {
    console.log('[BeaBea] sendToAI called with:', userText);
    var spriteRefs = parseSpriteReferences(userText);
    var contextMd = '';
    if (spriteRefs.length > 0) {
      spriteRefs.forEach(function (name) {
        var ctx = extractSpriteContext(name);
        if (ctx) contextMd += formatSpriteDataForAI(ctx) + '\n---\n';
      });
      selectedSpriteName = spriteRefs[spriteRefs.length - 1];
    }

    var messages = [{ role: 'system', content: buildSystemPrompt() + (contextMd ? '\n\nSPRITE CONTEXT:\n' + contextMd : '') }];
    chatHistory.forEach(function (m) {
      if (!m.isThinking) {
        messages.push({ role: m.role, content: m.content });
      }
    });

    return callPollinations(messages, currentModel)
      .then(function (reply) {
        var parsed = parseAiReply(reply);
        console.log('[BeaBea] AI response received, content length:', (parsed.content || '').length);
        return parsed; // return full parsed object with action
      });
  }

  // ==========================================
  // 8. INPUT BLOCKING OVERLAY
  // ==========================================
  var blockingOverlay = null;
  function showBlockingOverlay() {
    if (blockingOverlay) return;
    blockingOverlay = document.createElement('div');
    blockingOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.3);z-index:999999;pointer-events:auto;cursor:wait;';
    blockingOverlay.id = 'beabea-blocking-overlay';
    document.body.appendChild(blockingOverlay);
    if (beabeaWindow && beabeaWindow.element) {
      beabeaWindow.element.classList.add('processing');
    }
  }
  function hideBlockingOverlay() {
    if (blockingOverlay) {
      blockingOverlay.remove();
      blockingOverlay = null;
    }
    if (beabeaWindow && beabeaWindow.element) {
      beabeaWindow.element.classList.remove('processing');
    }
  }

  // ==========================================
  // 9. CHAT SEND WITH RETRY LOOP
  // ==========================================
  function doSend(userText, contentEl) {
    console.log('[BeaBea] doSend called, isProcessing:', isProcessing);
    if (!userText.trim() || isProcessing) return;
    isProcessing = true;
    retryCount = 0;
    showBlockingOverlay();
    renderChat(contentEl);

    function attemptSend() {
      console.log('[BeaBea] attemptSend, retryCount:', retryCount);
      var thinkingMsg = t('aiThinking');
      if (retryCount > 0) thinkingMsg = t('retryAttempt', retryCount, maxRetries);
      chatHistory.push({ role: 'assistant', content: thinkingMsg, isThinking: true });
      renderChat(contentEl);

      sendToAI(userText).then(function (parsed) {
        if (!beabeaWindow) { isProcessing = false; return; } // Window closed while loading
        console.log('[BeaBea] sendToAI succeeded');
        chatHistory.pop(); // remove thinking message
        var finalContent = parsed.content.replace(/<action>[\s\S]*?<\/action>/g, '').trim();
        chatHistory.push({ role: 'assistant', content: finalContent || parsed.content, reasoning: parsed.reasoning });
        renderChat(contentEl);
        bindActionButtons(contentEl);
        isProcessing = false;
        hideBlockingOverlay();
      }).catch(function (err) {
        if (!beabeaWindow) { isProcessing = false; return; } // Window closed while loading
        console.error('[BeaBea] sendToAI failed:', err);
        chatHistory.pop(); // remove thinking message
        
        // Stop retry if it is a 400 Bad Request (Context too long / Invalid format)
        var isBadRequest = err.message && err.message.indexOf('400') !== -1;
        
        retryCount++;
        if (retryCount < maxRetries && !isBadRequest) {
          chatHistory.push({ role: 'assistant', content: t('deepThinking'), isThinking: true });
          renderChat(contentEl);
          setTimeout(attemptSend, 500);
        } else {
          var errorMsg = isBadRequest ? '❌ Context quá dài hoặc bị lỗi (HTTP 400), hãy xoá bớt lịch sử.' : t('maxRetriesReached', maxRetries);
          chatHistory.push({ role: 'assistant', content: errorMsg });
          renderChat(contentEl);
          isProcessing = false;
          hideBlockingOverlay();
        }
      });
    }
    attemptSend();
  }

  function bindActionButtons(contentEl) {
    var execs = contentEl.querySelectorAll('[data-action-exec]');
    for (var i = 0; i < execs.length; i++) {
      execs[i].onclick = function () {
        var act = JSON.parse(decodeURIComponent(this.getAttribute('data-action-exec')));
        var result = executeAction(act);
        // Show result as a system message
        var resultMsg = result.success
          ? '✅ ' + (result.message || 'Đã thực hiện: ' + act.type)
          : '❌ ' + (result.error || 'Thất bại: ' + act.type);
        chatHistory.push({ role: 'assistant', content: resultMsg });
        renderChat(contentEl);
        bindActionButtons(contentEl);
      };
    }
    var revs = contentEl.querySelectorAll('[data-action-revise]');
    for (var j = 0; j < revs.length; j++) {
      revs[j].onclick = function () {
        var inp = contentEl.querySelector('#chatInput');
        if (inp) { inp.value = 'BeaBea ơi, mình muốn điều chỉnh lại: '; inp.focus(); }
      };
    }
  }

  // ==========================================
  // 10. CSS SYSTEM
  // ==========================================
  var CSS_TEXT = '';
  CSS_TEXT += '.bb-window{width:100%;height:100%;display:flex;flex-direction:column;background:var(--bb-win,#14151b);color:var(--bb-text,#f0f0f5);overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}';
  CSS_TEXT += '.theme-dark{--bb-win:#14151b;--bb-text:#f0f0f5;--bb-head:#191a22;--bb-line:rgba(255,255,255,.08);--bb-input:#181922;--bb-card:#1c1e28;--bb-code:#0c0d12;--bb-codetx:#60ec96;--bb-mut:#8b8e9d;--bb-bot:#1c1e28;--bb-accent:#d9383a}';
  CSS_TEXT += '.theme-light{--bb-win:#ffffff;--bb-text:#1a1b21;--bb-head:#f5f6fa;--bb-line:rgba(0,0,0,.09);--bb-input:#ffffff;--bb-card:#f2f4f8;--bb-code:#f1f3f9;--bb-codetx:#15803d;--bb-mut:#676b7b;--bb-bot:#f1f3f9;--bb-accent:#d9383a}';
  CSS_TEXT += '.bb-header{height:52px;padding:0 18px;display:flex;justify-content:space-between;align-items:center;background:var(--bb-head);border-bottom:1px solid var(--bb-line);flex-shrink:0}';
  CSS_TEXT += '.bb-tabs{display:flex;padding:0 16px;gap:6px;background:var(--bb-head);border-bottom:1px solid var(--bb-line);flex-shrink:0}';
  CSS_TEXT += '.bb-tab-btn{padding:10px 14px;background:transparent;border:none;color:var(--bb-mut);cursor:pointer;font-size:13px;border-radius:6px;transition:all .15s;display:inline-flex;align-items:center;gap:6px}';
  CSS_TEXT += '.bb-tab-btn:hover{background:var(--bb-line)}.bb-tab-btn.active{color:var(--bb-accent);font-weight:600;background:var(--bb-line)}';
  CSS_TEXT += '.bb-content{flex:1;padding:18px;overflow-y:auto;display:flex;flex-direction:column;gap:14px;background:var(--bb-win);min-height:0}';
  CSS_TEXT += '.bb-content input,.bb-content select,.bb-content textarea{width:100%;background:var(--bb-input);border:1px solid var(--bb-line);border-radius:8px;padding:9px 12px;color:var(--bb-text);font-size:13px;box-sizing:border-box}';
  CSS_TEXT += '.bb-content input:focus,.bb-content select:focus,.bb-content textarea:focus{outline:none;border-color:var(--bb-accent);box-shadow:0 0 0 2px rgba(217,56,58,.15)}';
  CSS_TEXT += '.bb-btn{background:var(--bb-accent);color:#fff;border:none;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all .15s}';
  CSS_TEXT += '.bb-btn:hover{filter:brightness(1.1)}.bb-btn:active{transform:scale(.98)}';
  CSS_TEXT += '.bb-btn-secondary{background:var(--bb-card);color:var(--bb-text);border:1px solid var(--bb-line)}';
  CSS_TEXT += '.bb-btn-secondary:hover{background:var(--bb-line)}';
  CSS_TEXT += '.bb-icon-btn{width:32px;height:32px;border-radius:8px;background:transparent;border:none;color:var(--bb-mut);cursor:pointer;display:inline-flex;align-items:center;justify-content:center;transition:all .15s}';
  CSS_TEXT += '.bb-icon-btn:hover{background:var(--bb-line);color:var(--bb-text)}';
  CSS_TEXT += '.bb-chat-messages{flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px;min-height:0;padding-right:4px}';
  CSS_TEXT += '.bb-chat-row{display:flex;gap:10px;max-width:94%;animation:bbFadeIn .25s ease-out}.bb-chat-row-user{align-self:flex-end}';
  CSS_TEXT += '@keyframes bbFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}';
  CSS_TEXT += '.bb-avatar{width:34px;height:34px;border-radius:50%;border:1.5px solid var(--bb-accent);flex-shrink:0;object-fit:cover}';
  CSS_TEXT += '.bb-bubble{padding:12px 16px;border-radius:16px;font-size:13.5px;line-height:1.65;color:var(--bb-text);max-width:100%;word-wrap:break-word;box-shadow:0 1px 3px rgba(0,0,0,.08)}';
  CSS_TEXT += '.bb-bubble-user{background:var(--bb-accent);color:#fff;border-bottom-right-radius:4px}.bb-bubble-bot{background:var(--bb-bot);border:1px solid var(--bb-line);border-bottom-left-radius:4px}';
  CSS_TEXT += '.bb-chat-code-block{background:var(--bb-code);color:var(--bb-codetx);padding:10px 12px;border-radius:8px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px;overflow-x:auto;margin:8px 0;border:1px solid var(--bb-line)}';
  CSS_TEXT += '.bb-table-wrap{overflow-x:auto;margin:10px 0;border:1px solid var(--bb-line);border-radius:8px;background:var(--bb-card)}';
  CSS_TEXT += '.bb-chat-table{width:100%;border-collapse:collapse;font-size:12px;color:var(--bb-text)}.bb-chat-table th{color:var(--bb-accent);padding:8px;text-align:left}.bb-chat-table td{padding:7px 10px;border-top:1px solid var(--bb-line)}';
  CSS_TEXT += '.bb-thinking-bubble{display:inline-flex;align-items:center;gap:9px;color:var(--bb-mut);padding:8px 12px}';
  CSS_TEXT += '.bb-thinking-label{font-size:13px;font-weight:500}';
  CSS_TEXT += '.bb-thinking-dots{display:inline-flex;gap:3px;align-items:center}';
  CSS_TEXT += '.bb-thinking-dots span{width:6px;height:6px;border-radius:50%;background:var(--bb-accent);animation:bbDot 1.1s infinite ease-in-out}';
  CSS_TEXT += '.bb-thinking-dots span:nth-child(2){animation-delay:.12s}.bb-thinking-dots span:nth-child(3){animation-delay:.24s}';
  CSS_TEXT += '@keyframes bbDot{0%,80%,100%{transform:translateY(0);opacity:.4}40%{transform:translateY(-4px);opacity:1}}';
  CSS_TEXT += '.bb-avatar-pulse{animation:bbPulse 1.5s infinite ease-in-out}';
  CSS_TEXT += '@keyframes bbPulse{0%,100%{box-shadow:0 0 0 0 rgba(217,56,58,.35)}50%{box-shadow:0 0 0 8px rgba(217,56,58,0)}}';
  CSS_TEXT += '.bb-sprite-card{background:var(--bb-card);border:1px solid var(--bb-line);border-radius:10px;padding:12px;margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;gap:12px}';
  CSS_TEXT += '.bb-sprite-info{flex:1;min-width:0}';
  CSS_TEXT += '.bb-sprite-name{font-weight:600;font-size:14px}';
  CSS_TEXT += '.bb-sprite-meta{font-size:11px;color:var(--bb-mut);margin-top:4px;display:flex;gap:12px;flex-wrap:wrap}';
  CSS_TEXT += '.bb-sprite-badge{background:var(--bb-code);color:var(--bb-accent);padding:2px 8px;border-radius:4px;font-size:10px;font-weight:600}';
  CSS_TEXT += '.bb-sprite-select-btn{padding:6px 12px;font-size:12px}';
  CSS_TEXT += '.bb-selected-sprite{background:var(--bb-accent);color:#fff;padding:4px 10px;border-radius:20px;font-size:12px;display:inline-flex;align-items:center;gap:6px;margin-bottom:12px}';
  CSS_TEXT += '.bb-processing{animation:bbPulseBorder 1s infinite ease-in-out}';
  CSS_TEXT += '@keyframes bbPulseBorder{0%,100%{box-shadow:0 0 0 0 var(--bb-accent)}50%{box-shadow:0 0 0 4px rgba(217,56,58,.4)}}';
  CSS_TEXT += '.bb-split{display:flex;gap:12px;flex:1;min-height:0}';
  CSS_TEXT += '.bb-chat-pane{flex:1;display:flex;flex-direction:column;min-width:0}';
  CSS_TEXT += '.bb-context-pane{width:300px;min-width:260px;max-width:40%;border-left:1px solid var(--bb-line);background:var(--bb-card);display:flex;flex-direction:column;overflow:hidden;flex-shrink:0}';
  CSS_TEXT += '.bb-context-header{height:44px;padding:0 14px;display:flex;align-items:center;justify-content:space-between;background:rgba(217,56,58,.08);border-bottom:1px solid var(--bb-line);flex-shrink:0}';
  CSS_TEXT += '.bb-context-content{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:8px;min-height:0}';
  CSS_TEXT += '.chat-inline-code{background:var(--bb-code);color:var(--bb-codetx);padding:2px 6px;border-radius:4px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:12px}';
  CSS_TEXT += '.chat-code-container{margin:8px 0;border-radius:8px;overflow:hidden;border:1px solid var(--bb-line)}';
  CSS_TEXT += '.chat-code-header{background:var(--bb-head);padding:6px 10px;border-bottom:1px solid var(--bb-line);font-size:11px;color:var(--bb-mut);display:flex;justify-content:space-between}';
  CSS_TEXT += '.chat-quote{border-left:3px solid var(--bb-accent);padding-left:12px;margin:8px 0;color:var(--bb-mut);font-style:italic}';
  CSS_TEXT += '.chat-li{margin-left:16px}.chat-dot{margin-right:6px}.chat-num{margin-right:6px;font-weight:600}';
  // Mention autocomplete dropdown
  CSS_TEXT += '.bb-mention-dropdown{position:absolute;background:var(--bb-card);border:1px solid var(--bb-line);border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.3);z-index:10000;min-width:200px;max-width:280px;max-height:200px;overflow-y:auto}';
  CSS_TEXT += '.bb-mention-item{padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;font-size:13px;color:var(--bb-text);transition:background .1s}';
  CSS_TEXT += '.bb-mention-item:hover,.bb-mention-item.selected{background:var(--bb-line)}';
  CSS_TEXT += '.bb-mention-item .sprite-icon{width:24px;height:24px;border-radius:4px;background:var(--bb-code);display:flex;align-items:center;justify-content:center}';
  CSS_TEXT += '.bb-mention-item .sprite-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
  CSS_TEXT += '.bb-mention-item .sprite-type{font-size:11px;color:var(--bb-mut);text-transform:uppercase}';
  CSS_TEXT += '.bb-mention-empty{padding:12px;text-align:center;color:var(--bb-mut);font-size:12px}';
  // Reasoning panel
  CSS_TEXT += '.bb-reasoning-panel{margin-top:8px;border:1px solid var(--bb-line);border-left:3px solid var(--bb-accent);border-radius:8px;background:var(--bb-card);overflow:hidden}';
  CSS_TEXT += '.bb-reasoning-header{cursor:pointer;padding:8px 12px;font-size:12px;color:var(--bb-accent);font-weight:600;display:flex;align-items:center;gap:6px;user-select:none;background:rgba(217,56,58,.1)}';
  CSS_TEXT += '.bb-reasoning-header::-webkit-details-marker{display:none}';
  CSS_TEXT += '.bb-reasoning-header::before{content:"\\25B8";display:inline-block;transition:transform .15s;font-size:10px}';
  CSS_TEXT += '.bb-reasoning-panel[open] .bb-reasoning-header::before{transform:rotate(90deg)}';
  CSS_TEXT += '.bb-reasoning-body{padding:10px 12px;font-size:11px;line-height:1.5;color:var(--bb-mut);white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,monospace;max-height:200px;overflow-y:auto;border-top:1px solid var(--bb-line)}';
  // Status indicator
  CSS_TEXT += '.bb-status-indicator{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:500;margin-bottom:8px}';
  CSS_TEXT += '.bb-status-indicator.idle{background:rgba(96,236,150,.15);color:#60ec96}';
  CSS_TEXT += '.bb-status-indicator.processing{background:rgba(217,56,58,.15);color:#d9383a}';
  CSS_TEXT += '.bb-status-indicator.acting{background:rgba(255,180,0,.15);color:#ffb400}';
  CSS_TEXT += '.bb-status-dots{display:inline-flex;gap:3px}';
  CSS_TEXT += '.bb-status-dots span{width:5px;height:5px;border-radius:50%;background:currentColor;animation:bbDot 1.1s infinite ease-in-out}';
  CSS_TEXT += '.bb-status-dots span:nth-child(2){animation-delay:.12s}.bb-status-dots span:nth-child(3){animation-delay:.24s}';

  function injectCSS() {
    if (cssInjected) return;
    var style = document.createElement('style');
    style.id = 'beabea-styles';
    style.textContent = CSS_TEXT;
    document.head.appendChild(style);
    cssInjected = true;
  }

  // ==========================================
  // 11. WINDOW MANAGEMENT
  // ==========================================
  function createBeaBeaWindow() {
    if (beabeaWindow && !beabeaWindow.isClosed()) {
      beabeaWindow.show();
      beabeaWindow.bringToFront();
      return;
    }
    var wm = window.wm;
    if (!wm) {
      console.warn('WindowManager not available');
      alert('⚠️ BeaBea Agent yêu cầu cài đặt Extension để tạo giao diện hiển thị. Vui lòng thêm extension đó và thử lại.');
      return;
    }
    injectCSS();
    beabeaWindow = wm.createWindow({
      id: 'beabea-coding-agent',
      title: t('title'),
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
        cleanupMentionDropdown();
        hideBlockingOverlay();
        if (cssInjected) {
          var style = document.getElementById('beabea-styles');
          if (style) style.remove();
          cssInjected = false;
        }
        beabeaWindow = null;
      }
    });
    beabeaWindow.element.classList.add('theme-' + currentTheme);
    renderWindowContent();
    beabeaWindow.show();
  }

  function renderWindowContent() {
    if (!beabeaWindow) return;
    cleanupMentionDropdown();
    var contentEl = beabeaWindow.getContentElement();
    if (!contentEl) return;

    contentEl.innerHTML =
      '<div class="bb-window theme-' + currentTheme + '">' +
      '  <div class="bb-header">' +
      '    <div style="display:flex;align-items:center;gap:10px">' +
      '      <img src="' + EXT_ICON_URL + '" style="height:26px">' +
      '      <span style="font-weight:600;font-size:14px">' + escHtml(t('title')) + '</span>' +
      '    </div>' +
      '    <div style="display:flex;gap:6px">' +
      '      <button class="bb-icon-btn" id="themeBtn" title="Toggle theme">' + (currentTheme === 'dark' ? ICONS.sun : ICONS.moon) + '</button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="bb-tabs">' +
      '    <button class="bb-tab-btn' + (activeTab === 'chat' ? ' active' : '') + '" data-tab="chat">' + ICONS.magic + ' ' + escHtml(t('tabChat')) + '</button>' +
      '    <button class="bb-tab-btn' + (activeTab === 'sprites' ? ' active' : '') + '" data-tab="sprites">' + ICONS.sprite + ' ' + escHtml(t('tabSprites')) + '</button>' +
      '    <button class="bb-tab-btn' + (activeTab === 'settings' ? ' active' : '') + '" data-tab="settings">' + ICONS.settings + ' ' + escHtml(t('tabSettings')) + '</button>' +
      '    <button class="bb-tab-btn' + (activeTab === 'history' ? ' active' : '') + '" data-tab="history">' + ICONS.download + ' ' + escHtml(t('tabHistory')) + '</button>' +
      '  </div>' +
      '  <div class="bb-content" id="tabContent"></div>' +
      '</div>';

    var themeBtn = contentEl.querySelector('#themeBtn');
    if (themeBtn) {
      themeBtn.onclick = function () {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        safeSet('beabea_theme', currentTheme);
        beabeaWindow.element.classList.remove('theme-dark', 'theme-light');
        beabeaWindow.element.classList.add('theme-' + currentTheme);
        renderWindowContent();
      };
    }
    var tabs = contentEl.querySelectorAll('.bb-tab-btn');
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].onclick = function () {
        activeTab = this.getAttribute('data-tab');
        renderWindowContent();
      };
    }
    var tabContent = contentEl.querySelector('#tabContent');
    if (activeTab === 'chat') renderChatTab(tabContent);
    else if (activeTab === 'sprites') renderSpritesTab(tabContent);
    else if (activeTab === 'settings') renderSettingsTab(tabContent);
    else if (activeTab === 'history') renderHistoryTab(tabContent);
  }

  // ==========================================
  // 12. TAB RENDERERS
  // ==========================================
  function chatRowHTML(m) {
    if (m.role === 'user') {
      return '<div class="bb-chat-row bb-chat-row-user"><div class="bb-bubble bb-bubble-user">' + escHtml(m.content) + '</div></div>';
    }
    if (m.isThinking) {
      return '<div class="bb-chat-row"><img class="bb-avatar bb-avatar-pulse" src="' + BEABEA_AVATAR + '"><div class="bb-thinking-bubble"><span class="bb-thinking-label">' + escHtml(m.content) + '</span><span class="bb-thinking-dots"><span></span><span></span><span></span></span></div></div>';
    }
    var reasoningHtml = '';
    if (m.reasoning) {
      reasoningHtml = '<details class="bb-reasoning-panel" style="margin-top:8px"><summary class="bb-reasoning-header">' + ICONS.magic + ' ' + escHtml(t('reasoningTitle')) + '</summary><div class="bb-reasoning-body">' + escHtml(m.reasoning) + '</div></details>';
    }
    var action = extractAction(m.content);
    var actionHtml = '';
    if (action) {
      var title = '', desc = '';
      if (action.type === 'set_variable') { title = 'Đặt biến'; desc = action.args.name + ' = ' + action.args.value; }
      else if (action.type === 'set_list') { title = 'Cập nhật list'; desc = action.args.name + ' (' + (action.args.value && action.args.value.length) + ' items)'; }
      else if (action.type === 'get_sprite_data') { title = 'Đọc sprite'; desc = action.args.sprite_name || 'current'; }
      else if (action.type === 'get_variable') { title = 'Đọc biến'; desc = action.args.name; }
      else if (action.type === 'get_list') { title = 'Đọc list'; desc = action.args.name; }
      else if (action.type === 'list_sprites') { title = 'Liệt kê sprite'; desc = ''; }
      else { title = 'Hành động: ' + action.type; desc = JSON.stringify(action.args); }
      actionHtml = '<div class="bb-action-card" style="margin-top:10px;padding:12px;border:1px dashed var(--bb-accent);border-radius:10px;background:var(--bb-win)"><div style="font-size:12px;color:var(--bb-accent);font-weight:600">' + escHtml(title) + '</div><div style="font-family:monospace;font-size:11px;white-space:pre-wrap;color:var(--bb-mut)">' + escHtml(desc) + '</div><div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px"><button class="bb-btn bb-btn-secondary" data-action-revise="1">' + escHtml(t('actionRevise')) + '</button><button class="bb-btn" data-action-exec="' + escHtml(encodeURIComponent(JSON.stringify(action))) + '">' + escHtml(t('actionAccept')) + '</button></div></div>';
    }
    return '<div class="bb-chat-row"><img class="bb-avatar" src="' + BEABEA_AVATAR + '"><div class="bb-bubble bb-bubble-bot">' + renderMarkdown(m.content) + reasoningHtml + actionHtml + '</div></div>';
  }

  function renderChatTab(content) {
    var chatHtml = chatHistory.length === 0
      ? '<div class="bb-chat-row"><img class="bb-avatar" src="' + BEABEA_AVATAR + '"><div class="bb-bubble bb-bubble-bot">' + renderMarkdown(t('welcomeMsg')) + '</div></div>'
      : chatHistory.map(chatRowHTML).join('');

    var selectedSpriteHtml = selectedSpriteName
      ? '<div class="bb-selected-sprite">' + ICONS.sprite + ' ' + escHtml(t('spriteSelected', selectedSpriteName)) + '</div>'
      : '';

    var statusHtml = isProcessing
      ? '<div class="bb-status-indicator processing">' + ICONS.magic + ' ' + escHtml(t('aiThinking')) + ' <span class="bb-status-dots"><span></span><span></span><span></span></span></div>'
      : '<div class="bb-status-indicator idle">' + ICONS.magic + ' Sẵn sàng</div>';

    content.innerHTML =
      '<div class="bb-split">' +
      '  <div class="bb-chat-pane">' +
      '    <div class="bb-chat-messages" id="chatBox">' + chatHtml + '</div>' +
      '    ' + selectedSpriteHtml +
      '    ' + statusHtml +
      '    <div style="display:flex;gap:8px;margin-top:8px;flex-shrink:0">' +
      '      <input id="chatInput" type="text" placeholder="' + escHtml(t('promptPlaceholder')) + '" style="flex:1" autocomplete="off">' +
      '      <button class="bb-btn" id="sendBtn" title="Send" ' + (isProcessing ? 'disabled' : '') + '>' + ICONS.send + '</button>' +
      '    </div>' +
      '  </div>' +
      '  <div class="bb-context-pane" id="contextPane">' +
      '    <div class="bb-context-header">' +
      '      <span style="font-size:12px;font-weight:600;color:var(--bb-accent)">' + ICONS.sprite + ' Sprite Context</span>' +
      '    </div>' +
      '    <div class="bb-context-content" id="contextContent"></div>' +
      '  </div>' +
      '</div>';

    var box = content.querySelector('#chatBox');
    if (box) box.scrollTop = box.scrollHeight;

    function handleUserSend() {
      var inp = content.querySelector('#chatInput');
      var txt = inp.value.trim();
      if (!txt || isProcessing) return;
      inp.value = '';
      chatHistory.push({ role: 'user', content: txt });
      renderChat(content);
      doSend(txt, content);
    }

    var sendBtn = content.querySelector('#sendBtn');
    if (sendBtn) sendBtn.onclick = handleUserSend;
    var chatInput = content.querySelector('#chatInput');
    if (chatInput) {
      chatInput.onkeydown = function (e) { if (e.key === 'Enter') handleUserSend(); };
      chatInput.focus();
      setupMentionAutocomplete(chatInput);
    }
    updateContextPane(content);
  }

  function updateContextPane(content) {
    var contextContent = content.querySelector('#contextContent');
    if (!contextContent) return;
    if (selectedSpriteName) {
      var ctx = extractSpriteContext(selectedSpriteName);
      if (ctx) {
        contextContent.innerHTML = '<div class="bb-sprite-card">' +
          '<div class="bb-sprite-info">' +
          '  <div class="bb-sprite-name">' + escHtml(ctx.name) + (ctx.isStage ? ' (Stage)' : '') + '</div>' +
          '  <div class="bb-sprite-meta">' +
          (ctx.blocks.length ? '<span class="bb-sprite-badge">' + ctx.blocks.length + ' blocks</span>' : '') +
          (ctx.variables.length ? '<span class="bb-sprite-badge">' + ctx.variables.length + ' vars</span>' : '') +
          (ctx.lists.length ? '<span class="bb-sprite-badge">' + ctx.lists.length + ' lists</span>' : '') +
          (ctx.costumes.length ? '<span class="bb-sprite-badge">' + ctx.costumes.length + ' costumes</span>' : '') +
          '  </div>' +
          '</div>' +
          '</div>';
      } else {
        contextContent.innerHTML = '<div style="color:var(--bb-mut);font-size:12px;padding:10px">Sprite not found</div>';
      }
    } else {
      contextContent.innerHTML = '<div style="color:var(--bb-mut);font-size:12px;padding:10px;text-align:center">Chọn @sprite_name trong chat để xem ngữ cảnh</div>';
    }
  }

  function renderChat(content) {
    var tabContent = beabeaWindow && beabeaWindow.getContentElement() ? beabeaWindow.getContentElement().querySelector('#tabContent') : null;
    if (!tabContent) return;
    var chatHtml = chatHistory.length === 0
      ? '<div class="bb-chat-row"><img class="bb-avatar" src="' + BEABEA_AVATAR + '"><div class="bb-bubble bb-bubble-bot">' + renderMarkdown(t('welcomeMsg')) + '</div></div>'
      : chatHistory.map(chatRowHTML).join('');
    var box = tabContent.querySelector('#chatBox');
    if (box) {
      box.innerHTML = chatHtml;
      box.scrollTop = box.scrollHeight;
    }
    updateContextPane(tabContent);
  }

  function renderSpritesTab(content) {
    var allSprites = getAllSpritesData();
    var list = allSprites.map(function (s) {
      return '<div class="bb-sprite-card">' +
        '<div class="bb-sprite-info">' +
        '  <div class="bb-sprite-name">' + escHtml(s.name) + (s.isStage ? ' (Stage)' : '') + '</div>' +
        '  <div class="bb-sprite-meta">' +
        (s.blocks.length ? '<span class="bb-sprite-badge">' + s.blocks.length + ' blocks</span>' : '') +
        (s.variables.length ? '<span class="bb-sprite-badge">' + s.variables.length + ' vars</span>' : '') +
        (s.lists.length ? '<span class="bb-sprite-badge">' + s.lists.length + ' lists</span>' : '') +
        (s.costumes.length ? '<span class="bb-sprite-badge">' + s.costumes.length + ' costumes</span>' : '') +
        '  </div>' +
        '</div>' +
        '<button class="bb-btn bb-btn-secondary bb-sprite-select-btn" data-sprite="' + escHtml(s.name) + '">Chọn</button>' +
        '</div>';
    }).join('');
    if (!list) list = '<p style="color:var(--bb-mut);font-size:13px;text-align:center;padding:20px">' + escHtml(t('noSpritesFound')) + '</p>';

    content.innerHTML =
      '<div style="flex:1;overflow-y:auto;min-height:0">' + list + '</div>' +
      '<button class="bb-btn" id="scanBtn" style="margin-top:10px;width:100%">' + escHtml(t('scanProjectBtn')) + '</button>';

    var selects = content.querySelectorAll('[data-sprite]');
    for (var i = 0; i < selects.length; i++) {
      selects[i].onclick = function () {
        selectedSpriteName = this.getAttribute('data-sprite');
        renderWindowContent();
      };
    }
    var scanBtn = content.querySelector('#scanBtn');
    if (scanBtn) {
      scanBtn.onclick = function () {
        var all = getAllSpritesData();
        chatHistory.push({ role: 'assistant', content: t('scanComplete', all.length) + '\n\n' + formatAllSpritesForAI(all) });
        renderWindowContent();
      };
    }
  }

  function renderSettingsTab(content) {
    var providers = [
      { value: 'pollinations', label: t('modelPollinations'), models: ['openai', 'gpt-4o', 'gpt-4o-mini'] },
      { value: 'deepseek', label: t('modelDeepSeek'), models: ['deepseek-chat', 'deepseek-reasoner'] },
      { value: 'groq', label: t('modelGroq'), models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant'] }
    ];
    var provHtml = providers.map(function (p) {
      return '<option value="' + p.value + '"' + (currentProvider === p.value ? ' selected' : '') + '>' + escHtml(p.label) + '</option>';
    }).join('');
    var modelOptions = providers.find(function (p) { return p.value === currentProvider; });
    var modelHtml = (modelOptions ? modelOptions.models : []).map(function (m) {
      return '<option value="' + m + '"' + (currentModel === m ? ' selected' : '') + '>' + escHtml(m) + '</option>';
    }).join('');

    content.innerHTML =
      '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">' + escHtml(t('theme')) + '</label>' +
      '  <select id="themeSelect" style="width:100%">' +
      '    <option value="dark"' + (currentTheme === 'dark' ? ' selected' : '') + '>' + escHtml(t('darkTheme')) + '</option>' +
      '    <option value="light"' + (currentTheme === 'light' ? ' selected' : '') + '>' + escHtml(t('lightTheme')) + '</option>' +
      '  </select></div>' +
      '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">' + escHtml(t('aiProvider')) + '</label>' +
      '  <select id="provSelect" style="width:100%">' + provHtml + '</select></div>' +
      '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">' + escHtml(t('aiModel')) + '</label>' +
      '  <select id="modelSelect" style="width:100%">' + modelHtml + '</select></div>' +
      '<button class="bb-btn" id="saveSettings" style="width:100%">' + escHtml(t('settingsSaved')) + '</button>';

    var themeSelect = content.querySelector('#themeSelect');
    if (themeSelect) themeSelect.onchange = function (e) { currentTheme = e.target.value; safeSet('beabea_theme', currentTheme); beabeaWindow.element.classList.remove('theme-dark', 'theme-light'); beabeaWindow.element.classList.add('theme-' + currentTheme); };
    var provSelect = content.querySelector('#provSelect');
    if (provSelect) provSelect.onchange = function (e) { currentProvider = e.target.value; safeSet('beabea_provider', currentProvider); renderWindowContent(); };
    var modelSelect = content.querySelector('#modelSelect');
    if (modelSelect) modelSelect.onchange = function (e) { currentModel = e.target.value; safeSet('beabea_model', currentModel); };
    var saveBtn = content.querySelector('#saveSettings');
    if (saveBtn) saveBtn.onclick = function () { alert(t('settingsSaved')); };
  }

  function renderHistoryTab(content) {
    var chatJson = JSON.stringify(chatHistory, null, 2);
    var contextMd = selectedSpriteName
      ? formatSpriteDataForAI(extractSpriteContext(selectedSpriteName))
      : formatAllSpritesForAI(getAllSpritesData());
    var actionJson = JSON.stringify(actionHistory, null, 2);

    content.innerHTML =
      '<div style="display:flex;flex-direction:column;gap:12px;height:100%">' +
      '  <div style="display:flex;gap:8px;flex-wrap:wrap">' +
      '    <button class="bb-btn" id="exportChatBtn">' + escHtml(t('exportChat')) + '</button>' +
      '    <button class="bb-btn bb-btn-secondary" id="exportContextBtn">' + escHtml(t('exportContext')) + '</button>' +
      '    <button class="bb-btn bb-btn-secondary" id="exportActionsBtn">' + ICONS.download + ' Xuất hành động</button>' +
      '    <button class="bb-btn bb-btn-secondary" id="clearHistoryBtn">' + escHtml(t('clearHistory')) + '</button>' +
      '    <button class="bb-btn bb-btn-secondary" id="openTurboForgeBtn">' + escHtml(t('openInTurboForge')) + '</button>' +
      '  </div>' +
      '  <div style="flex:1;overflow:auto;min-height:0;display:flex;flex-direction:column;gap:12px">' +
      '    <div style="flex:1;display:flex;flex-direction:column;min-height:0">' +
      '      <h4 style="margin:0 0 8px;font-size:13px;color:var(--bb-mut)">' + escHtml(t('tabChat')) + ' History</h4>' +
      '      <pre id="historyPreview" style="flex:1;background:var(--bb-code);color:var(--bb-codetx);padding:12px;border-radius:8px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;overflow:auto;border:1px solid var(--bb-line);white-space:pre-wrap;word-wrap:break-word;min-height:150px">' + escHtml(chatJson) + '</pre>' +
      '    </div>' +
      '    <div style="flex:1;display:flex;flex-direction:column;min-height:0">' +
      '      <h4 style="margin:0 0 8px;font-size:13px;color:var(--bb-mut)">Action History</h4>' +
      '      <pre id="actionPreview" style="flex:1;background:var(--bb-code);color:var(--bb-codetx);padding:12px;border-radius:8px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;overflow:auto;border:1px solid var(--bb-line);white-space:pre-wrap;word-wrap:break-word;min-height:150px">' + escHtml(actionJson) + '</pre>' +
      '    </div>' +
      '    <div style="flex:1;display:flex;flex-direction:column;min-height:0">' +
      '      <h4 style="margin:0 0 8px;font-size:13px;color:var(--bb-mut)">Current Sprite Context</h4>' +
      '      <pre id="contextPreview" style="flex:1;background:var(--bb-code);color:var(--bb-codetx);padding:12px;border-radius:8px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;overflow:auto;border:1px solid var(--bb-line);white-space:pre-wrap;word-wrap:break-word;min-height:150px">' + escHtml(contextMd) + '</pre>' +
      '    </div>' +
      '  </div>' +
      '</div>';

    var exportChatBtn = content.querySelector('#exportChatBtn');
    if (exportChatBtn) {
      exportChatBtn.onclick = function () {
        var blob = new Blob([chatJson], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'beabea-chat-history.json';
        a.click();
      };
    }
    var exportActionsBtn = content.querySelector('#exportActionsBtn');
    if (exportActionsBtn) {
      exportActionsBtn.onclick = function () {
        var blob = new Blob([actionJson], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'beabea-action-history.json';
        a.click();
      };
    }
    var exportContextBtn = content.querySelector('#exportContextBtn');
    if (exportContextBtn) {
      exportContextBtn.onclick = function () {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(contextMd).then(function () {
            alert(t('copiedContext'));
          });
        }
      };
    }
    var clearHistoryBtn = content.querySelector('#clearHistoryBtn');
    if (clearHistoryBtn) {
      clearHistoryBtn.onclick = function () {
        if (confirm(t('confirmAction', 'xóa toàn bộ lịch sử hội thoại?'))) {
          chatHistory = [];
          actionHistory = [];
          renderWindowContent();
        }
      };
    }
    var openTurboForgeBtn = content.querySelector('#openTurboForgeBtn');
    if (openTurboForgeBtn) {
      openTurboForgeBtn.onclick = function () {
        try {
          var store = window.ReduxStore;
          if (store && store.dispatch) {
            store.dispatch({ type: 'scratch-gui/modals/OPEN_MODAL', modal: 'extensionManagerModal' });
          } else {
            alert(t('noReduxStore'));
          }
        } catch (e) {
          alert(t('errorPrefix') + e.message);
        }
      };
    }
  }

  // ==========================================
  // 13. EXTENSION ENTRY POINT
  // ==========================================
  function BeaBeaCodingAgentPalette() {
    this.openStudio = function () { createBeaBeaWindow(); };
  }

  BeaBeaCodingAgentPalette.prototype.getInfo = function () {
    return {
      id: 'beabeaCodingAgent',
      name: 'BeaBea Coding Agent',
      color1: '#d9383a',
      color2: '#c22d2f',
      color3: '#9e2426',
      menuIconURI: EXT_ICON_URL,
      blockIconURI: EXT_ICON_URL,
      blocks: [
        { blockType: Scratch.BlockType.BUTTON, text: 'Mở BeaBea Coding Agent', func: 'openStudio' }
      ]
    };
  };

  try {
    Scratch.extensions.register(new BeaBeaCodingAgentPalette());
  } catch (err) {
    console.warn('BeaBea Coding Agent register fail:', err);
  }
})(Scratch);



