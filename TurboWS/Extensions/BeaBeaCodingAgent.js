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
    magic: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L15 5L10 10L15 15L12 18L9 15L4 10L9 5L12 2Z"></path><path d="M19 12L22 15L17 20L22 25L19 28L14 23L19 18L14 13L19 12Z"></path></svg>',
    settings: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>',
    sprite: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
    chevronDown: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="6 9 12 15 18 9"></polyline></svg>',
    turboforge: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h2z"></path><path d="M2 12a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-2z"></path><path d="M22 12a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2z"></path><path d="M12 22a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2z"></path></svg>',
    trash: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>',
    code: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>',
    ask: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path></svg>',
    debug: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.32 5H6.68a4 4 0 0 0-3.97 4.35L2.5 14.65A4 4 0 0 0 6.68 19H17.32a4 4 0 0 0 3.97-4.35L21.5 9.35a4 4 0 0 0-3.97-4.35Z"></path><path d="M12 2v4"></path><path d="M12 18v4"></path><path d="M4.93 4.93l2.83 2.83"></path><path d="M16.24 16.24l2.83 2.83"></path><path d="M2 12h4"></path><path d="M18 12h4"></path><path d="M4.93 19.07l2.83-2.83"></path><path d="M16.24 7.76l2.83-2.83"></path></svg>',
    plan: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="15" x2="15" y2="15"></line><line x1="9" y1="12" x2="15" y2="12"></line></svg>',
    sparkle: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>',
    brain: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5a3 3 0 1 0-3 3c0 1.5 1.5 2 3 2s3-.5 3-2a3 3 0 1 0-3-3z"></path><path d="M12 19a3 3 0 1 0 3-3c0 1.5-1.5 2-3 2s-3-.5-3-2a3 3 0 1 0 3 3z"></path><path d="M5 12a7 7 0 1 1 14 0"></path></svg>',
    check: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
    stop: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>',
    forward: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon><line x1="19" y1="3" x2="19" y2="21"></line></svg>',
    auto: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>',
    multiSelect: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect></svg>'
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
      welcomeMsg: 'Hế lô bạn nha! ✨ Mình là **BeaBea** 🐾, AI Agent của bạn trong Turbo-IDE. Mình có thể đọc/viết biến, list, chạy script, giúp debug, refactor... Cứ nhờ mình nhé! 🌸',
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
      reasoningTitle: ICONS.brain + ' Suy nghĩ của BeaBea',
      copiedContext: '📋 Đã sao chép ngữ cảnh sprite!',
      noReduxStore: 'Không truy cập được Redux store. Dùng menu Tiện ích mở rộng trên toolbar.',
      errorPrefix: 'Lỗi: ',
      actionAccept: 'Chấp nhận',
      actionRevise: 'Sửa lại',
      // Autonomous mode translations
      autoMode: 'Tự động',
      autoModeOn: ICONS.auto + ' Tự động: BẬT',
      autoModeOff: ICONS.auto + ' Tự động: TẮT',
      planOnly: ICONS.plan + ' Lập kế hoạch',
      stepOnce: ICONS.forward + ' Bước tiếp theo',
      stopAuto: ICONS.stop + ' Dừng tự động',
      taskGoal: 'Mục tiêu tác vụ',
      taskPlan: 'Kế hoạch',
      taskProgress: 'Tiến độ',
      stepStatus: 'Trạng thái',
      stepCompleted: 'Hoàn thành',
      stepExecuting: 'Đang thực hiện',
      stepPending: 'Chờ thực hiện',
      stepFailed: 'Thất bại',
      maxStepsReached: 'Đã đạt giới hạn bước tự động',
      taskCompleted: 'Tác vụ hoàn thành',
      taskFailed: 'Tác vụ thất bại',
      taskStopped: 'Tác vụ đã dừng',
      noActiveTask: 'Không có tác vụ nào đang chạy',
      confirmAutoMode: 'Bật chế độ tự động? BeaBea sẽ thực hiện các bước mà không cần xác nhận.',
      autoConfirmActions: 'Tự động xác nhận hành động',
      autoConfirmOn: 'Bật',
      autoConfirmOff: 'Tắt',
      // Mode selector
      modeCode: 'Viết Code',
      modeAsk: 'Hỏi đáp',
      modeDebug: 'Gỡ lỗi',
      modePlan: 'Lập kế hoạch'
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
      welcomeMsg: 'Hi there! I am **BeaBea**, your AI Agent in Turbo-IDE. I can read/write variables, lists, run scripts, help debug, refactor... Just ask!',
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
      reasoningTitle: ICONS.brain + ' BeaBea\'s Reasoning',
      copiedContext: '📋 Context copied!',
      noReduxStore: 'Cannot access Redux store. Use Extensions menu on toolbar.',
      errorPrefix: 'Error: ',
      actionAccept: 'Accept',
      actionRevise: 'Revise',
      // Autonomous mode translations
      autoMode: 'Auto',
      autoModeOn: ICONS.auto + ' Auto: ON',
      autoModeOff: ICONS.auto + ' Auto: OFF',
      planOnly: ICONS.plan + ' Plan',
      stepOnce: ICONS.forward + ' Step',
      stopAuto: ICONS.stop + ' Stop Auto',
      taskGoal: 'Task Goal',
      taskPlan: 'Plan',
      taskProgress: 'Progress',
      stepStatus: 'Status',
      stepCompleted: 'Completed',
      stepExecuting: 'Executing',
      stepPending: 'Pending',
      stepFailed: 'Failed',
      maxStepsReached: 'Max auto steps reached',
      taskCompleted: 'Task Completed',
      taskFailed: 'Task Failed',
      taskStopped: 'Task Stopped',
      noActiveTask: 'No active task',
      confirmAutoMode: 'Enable auto mode? BeaBea will execute steps without confirmation.',
      autoConfirmActions: 'Auto-confirm actions',
      autoConfirmOn: 'On',
      autoConfirmOff: 'Off',
      // Mode selector
      modeCode: 'Write Code',
      modeAsk: 'Ask',
      modeDebug: 'Debug',
      modePlan: 'Plan'
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
  var currentModel = safeGet('beabea_model', 'openai-reasoning');
  var autoConfirmActions = safeGet('beabea_auto_confirm', 'false') === 'true';
  var savedMaxAutoSteps = parseInt(safeGet('beabea_max_auto_steps', '10'), 10);
  maxAutoSteps = isNaN(savedMaxAutoSteps) ? 10 : savedMaxAutoSteps;

  // Load task queue from localStorage
  var taskQueue = [];
  try {
    var savedTasks = localStorage.getItem('beabea_task_queue');
    if (savedTasks) taskQueue = JSON.parse(savedTasks);
  } catch (e) {}

  // Mode state
  var currentMode = 'plan'; // 'code' | 'ask' | 'debug' | 'plan'
  var selectedSpriteNames = []; // For multi-sprite selection

  // Autocomplete state
  var mentionDropdown = null;
  var mentionActive = false;
  var mentionFilter = '';
  var mentionIndex = -1;
  var mentionSprites = [];

  // Agent state
  var actionHistory = [];

  // Task/Autonomous state
  var currentTask = null;
  var taskQueue = [];
  var isAutonomousMode = false;
  var maxAutoSteps = 10;
  var autoStepCount = 0;
  var consecutiveFailures = 0;
  var maxConsecutiveFailures = 3;

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
      'AUTONOMOUS PLANNING & EXECUTION:\n' +
      'When given a complex goal, create a structured plan:\n' +
      '<plan>[\n' +
      '  {"step":1,"tool":"get_sprite_data","args":{"sprite_name":"Player"},"description":"Read Player sprite structure","expected":"sprite blocks, variables, lists"},\n' +
      '  {"step":2,"tool":"set_variable","args":{"sprite_name":"Player","name":"score","value":0},"description":"Initialize score variable","expected":"score = 0"}\n' +
      ']</plan>\n\n' +
      'During execution, after each tool result, decide next action:\n' +
      '<decision>{"action":"continue|replan|finish","reason":"..."}</decision>\n' +
      '- "continue": proceed to next planned step\n' +
      '- "replan": current plan needs adjustment, provide reason\n' +
      '- "finish": goal achieved or cannot continue\n\n' +
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
    var names = matches.map(function (m) { return m.slice(1); });
    // Add to multi-select
    names.forEach(function (name) {
      if (selectedSpriteNames.indexOf(name) === -1) {
        selectedSpriteNames.push(name);
      }
    });
    return names;
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

  // Multi-sprite selector dropdown
  var multiSpriteDropdown = null;
  function showMultiSpriteSelector(contentEl) {
    if (multiSpriteDropdown) {
      hideMultiSpriteDropdown();
      return;
    }
    var sprites = getAllSpritesData();
    if (!sprites.length) return;

    multiSpriteDropdown = document.createElement('div');
    multiSpriteDropdown.className = 'bb-multi-sprite-dropdown';
    multiSpriteDropdown.id = 'beabea-multi-sprite-dropdown';

    var rect = contentEl.querySelector('#multiSelectBtn').getBoundingClientRect();
    multiSpriteDropdown.style.top = (rect.bottom + window.scrollY + 4) + 'px';
    multiSpriteDropdown.style.left = (rect.left + window.scrollX) + 'px';

    sprites.forEach(function (sprite) {
      var isSelected = selectedSpriteNames.indexOf(sprite.name) !== -1;
      var item = document.createElement('div');
      item.className = 'bb-multi-sprite-item' + (isSelected ? ' selected' : '');
      item.dataset.name = sprite.name;
      item.innerHTML =
        '<div class="sprite-icon">' + ICONS.sprite + '</div>' +
        '<span class="sprite-name">' + escHtml(sprite.name) + '</span>' +
        '<span class="sprite-type">' + (sprite.isStage ? 'Stage' : 'Sprite') + '</span>' +
        '<span class="sprite-check">' + (isSelected ? ICONS.check : '') + '</span>';
      item.onclick = function () {
        toggleSpriteSelection(sprite.name);
      };
      multiSpriteDropdown.appendChild(item);
    });

    // Add "Select All" / "Clear All" buttons
    var actionsDiv = document.createElement('div');
    actionsDiv.className = 'bb-multi-sprite-actions';
    actionsDiv.style.cssText = 'display:flex;gap:8px;padding:8px;border-top:1px solid var(--bb-line)';
    actionsDiv.innerHTML =
      '<button class="bb-btn bb-btn-secondary" id="selectAllBtn" style="flex:1;font-size:11px;padding:6px">Chọn tất cả</button>' +
      '<button class="bb-btn bb-btn-secondary" id="clearAllBtn" style="flex:1;font-size:11px;padding:6px">Bỏ chọn tất cả</button>';
    multiSpriteDropdown.appendChild(actionsDiv);

    document.body.appendChild(multiSpriteDropdown);

    // Bind action buttons
    var selectAllBtn = multiSpriteDropdown.querySelector('#selectAllBtn');
    var clearAllBtn = multiSpriteDropdown.querySelector('#clearAllBtn');
    if (selectAllBtn) selectAllBtn.onclick = function () { selectAllSprites(); };
    if (clearAllBtn) clearAllBtn.onclick = function () { clearAllSprites(); };
  }

  function hideMultiSpriteDropdown() {
    if (multiSpriteDropdown) {
      multiSpriteDropdown.remove();
      multiSpriteDropdown = null;
    }
  }

  function toggleSpriteSelection(spriteName) {
    var idx = selectedSpriteNames.indexOf(spriteName);
    if (idx === -1) {
      selectedSpriteNames.push(spriteName);
    } else {
      selectedSpriteNames.splice(idx, 1);
    }
    // Also update single selection for backward compatibility
    if (selectedSpriteNames.length === 1) {
      selectedSpriteName = selectedSpriteNames[0];
    } else {
      selectedSpriteName = null;
    }
    if (beabeaWindow) {
      var contentEl = beabeaWindow.getContentElement();
      if (contentEl) updateContextPane(contentEl);
    }
    showMultiSpriteSelector(beabeaWindow.getContentElement()); // Refresh dropdown
  }

  function selectAllSprites() {
    var sprites = getAllSpritesData();
    selectedSpriteNames = sprites.map(function (s) { return s.name; });
    selectedSpriteName = null;
    if (beabeaWindow) {
      var contentEl = beabeaWindow.getContentElement();
      if (contentEl) updateContextPane(contentEl);
    }
    hideMultiSpriteDropdown();
  }

  function clearAllSprites() {
    selectedSpriteNames = [];
    selectedSpriteName = null;
    if (beabeaWindow) {
      var contentEl = beabeaWindow.getContentElement();
      if (contentEl) updateContextPane(contentEl);
    }
    hideMultiSpriteDropdown();
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
    // Add to multi-select
    if (selectedSpriteNames.indexOf(spriteName) === -1) {
      selectedSpriteNames.push(spriteName);
    }
    selectedSpriteName = spriteName;
    if (beabeaWindow) {
      var contentEl = beabeaWindow.getContentElement();
      if (contentEl) updateContextPane(contentEl);
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
  // 6d. PLAN & DECISION PARSING
  // ==========================================
  function parsePlan(text) {
    var match = text.match(/<plan>([\s\S]*?)<\/plan>/);
    if (!match) return { steps: [], isComplete: false };
    try {
      var cleanJson = match[1].replace(/```json/g, '').replace(/```/g, '').trim();
      var steps = JSON.parse(cleanJson);
      if (!Array.isArray(steps)) return { steps: [], isComplete: false };
      // Validate each step
      var validSteps = steps.filter(function (s) {
        return s && s.tool && s.args && s.description;
      });
      return { steps: validSteps, isComplete: validSteps.length > 0 };
    } catch (e) {
      console.error('[BeaBea] Plan parse error:', e);
      return { steps: [], isComplete: false };
    }
  }

  function parseDecision(text) {
    var match = text.match(/<decision>([\s\S]*?)<\/decision>/);
    if (!match) return { action: 'continue', reason: '' };
    try {
      var cleanJson = match[1].replace(/```json/g, '').replace(/```/g, '').trim();
      var decision = JSON.parse(cleanJson);
      if (decision && (decision.action === 'continue' || decision.action === 'replan' || decision.action === 'finish')) {
        return decision;
      }
      return { action: 'continue', reason: '' };
    } catch (e) {
      console.error('[BeaBea] Decision parse error:', e);
      return { action: 'continue', reason: '' };
    }
  }

  function extractPlanAndDecision(text) {
    var planResult = parsePlan(text);
    var decisionResult = parseDecision(text);
    // Remove plan and decision tags from content for display
    var cleanContent = text
      .replace(/<plan>[\s\S]*?<\/plan>/g, '')
      .replace(/<decision>[\s\S]*?<\/decision>/g, '')
      .trim();
    return {
      content: cleanContent,
      plan: planResult,
      decision: decisionResult
    };
  }

  // ==========================================
  // 6e. AUTONOMOUS EXECUTION ENGINE
  // ==========================================
  function runAutonomousLoop(goal, contentEl) {
    console.log('[BeaBea] Starting autonomous loop for goal:', goal);
    isAutonomousMode = true;
    autoStepCount = 0;
    consecutiveFailures = 0;
    currentTask = {
      id: Date.now(),
      goal: goal,
      plan: [],
      currentStep: 0,
      status: 'planning',
      startTime: Date.now()
    };
    renderChat(contentEl); // Update UI to show planning status

    // Phase 1: Generate plan via AI
    requestPlan(goal).then(function (planResult) {
      if (!beabeaWindow) return; // Window closed
      if (!planResult.plan.isComplete || !planResult.plan.steps.length) {
        finishTask('no_plan', 'Không thể tạo kế hoạch. Vui lòng thử lại với mục tiêu rõ ràng hơn.');
        return;
      }
      currentTask.plan = planResult.plan.steps;
      currentTask.status = 'executing';
      currentTask.planReasoning = planResult.reasoning;
      executeNextStep(contentEl);
    }).catch(function (err) {
      console.error('[BeaBea] Plan request failed:', err);
      finishTask('plan_failed', 'Lỗi khi lập kế hoạch: ' + err.message);
    });
  }

  function requestPlan(goal) {
    var messages = [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: 'MỤC TIÊU: ' + goal + '\n\nHãy tạo kế hoạch chi tiết để hoàn thành mục tiêu này. Trả về JSON trong thẻ <plan>.' }
    ];
    return sendToAI('', { stream: false, messages: messages }).then(function (parsed) {
      var extracted = extractPlanAndDecision(parsed.content);
      return {
        plan: extracted.plan,
        reasoning: extracted.plan.steps.length ? 'Đã tạo kế hoạch ' + extracted.plan.steps.length + ' bước' : '',
        content: extracted.content
      };
    });
  }

  function requestReplan(reason) {
    var messages = [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: 'Kế hoạch trước đó thất bại hoặc cần điều chỉnh. Lý do: ' + reason + '\nMục tiêu gốc: ' + currentTask.goal + '\n\nHãy tạo kế hoạch mới hoặc điều chỉnh. Trả về JSON trong thẻ <plan>.' }
    ];
    return sendToAI('', { stream: false, messages: messages }).then(function (parsed) {
      var extracted = extractPlanAndDecision(parsed.content);
      return extracted.plan;
    });
  }

  function executeNextStep(contentEl) {
    if (!beabeaWindow || !currentTask) return;
    if (autoStepCount >= maxAutoSteps) {
      finishTask('max_steps', 'Đã đạt giới hạn ' + maxAutoSteps + ' bước tự động. Hãy bật chế độ tự động lại để tiếp tục.');
      return;
    }
    if (currentTask.currentStep >= currentTask.plan.length) {
      finishTask('completed', 'Hoàn thành mục tiêu!');
      return;
    }

    var step = currentTask.plan[currentTask.currentStep];
    step.status = 'executing';
    currentTask.status = 'executing';
    renderChat(contentEl); // Update UI with current step

    console.log('[BeaBea] Executing step', currentTask.currentStep + 1, '/', currentTask.plan.length, ':', step.tool);

    executeAction({ type: step.tool, args: step.args }).then(function (result) {
      if (!beabeaWindow || !currentTask) return;

      step.result = result;
      step.status = result.success ? 'completed' : 'failed';
      currentTask.currentStep++;
      autoStepCount++;

      if (result.success) {
        consecutiveFailures = 0;
        // Feed observation to AI for next decision
        sendObservationToAI(step, result).then(function (decisionResult) {
          if (!beabeaWindow || !currentTask) return;

          var decision = decisionResult.decision;
          if (decision.action === 'continue') {
            executeNextStep(contentEl);
          } else if (decision.action === 'replan') {
            requestReplan(decision.reason).then(function (newPlan) {
              if (!beabeaWindow || !currentTask) return;
              if (newPlan.isComplete && newPlan.steps.length) {
                currentTask.plan = newPlan.steps;
                currentTask.currentStep = 0;
                executeNextStep(contentEl);
              } else {
                finishTask('replan_failed', 'Không thể lập kế hoạch lại: ' + decision.reason);
              }
            }).catch(function (err) {
              finishTask('replan_error', 'Lỗi lập kế hoạch lại: ' + err.message);
            });
          } else if (decision.action === 'finish') {
            finishTask('completed', decision.reason || 'Mục tiêu đã hoàn thành');
          }
        }).catch(function (err) {
          console.error('[BeaBea] Observation error:', err);
          // Continue anyway on observation error
          executeNextStep(contentEl);
        });
      } else {
        consecutiveFailures++;
        handleStepError(result.error || 'Unknown error', step, contentEl);
      }
    }).catch(function (err) {
      console.error('[BeaBea] Step execution error:', err);
      consecutiveFailures++;
      handleStepError(err.message, step, contentEl);
    });
  }

  function sendObservationToAI(step, result) {
    var observationMsg = 'Bước ' + (currentTask.currentStep) + '/' + currentTask.plan.length + ' hoàn thành:\n' +
      'Hành động: ' + step.tool + '\n' +
      'Mô tả: ' + step.description + '\n' +
      'Kết quả: ' + (result.success ? 'Thành công' : 'Thất bại') + '\n' +
      (result.message ? 'Thông báo: ' + result.message : '') + '\n' +
      (result.value !== undefined ? 'Giá trị: ' + JSON.stringify(result.value) : '') + '\n' +
      (result.error ? 'Lỗi: ' + result.error : '');

    var messages = [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: observationMsg + '\n\nQuyết định tiếp theo? Trả về JSON trong thẻ <decision>: {"action":"continue|replan|finish","reason":"..."}' }
    ];
    return sendToAI('', { stream: false, messages: messages }).then(function (parsed) {
      var extracted = extractPlanAndDecision(parsed.content);
      return { decision: extracted.decision };
    });
  }

  function handleStepError(errorMsg, step, contentEl) {
    console.error('[BeaBea] Step error:', errorMsg);
    step.error = errorMsg;
    step.status = 'failed';

    if (consecutiveFailures >= maxConsecutiveFailures) {
      finishTask('max_failures', 'Quá nhiều lỗi liên tiếp (' + consecutiveFailures + '). Dừng thực hiện tự động.');
      return;
    }

    // Ask AI whether to retry, skip, or replan
    var messages = [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: 'Bước ' + (currentTask.currentStep + 1) + ' thất bại: ' + errorMsg + '\n\nBạn muốn: retry (thử lại), skip (bỏ qua), hoặc replan (lập kế hoạch lại)? Trả về JSON trong thẻ <decision>.' }
    ];
    sendToAI('', { stream: false, messages: messages }).then(function (parsed) {
      var extracted = extractPlanAndDecision(parsed.content);
      var decision = extracted.decision;

      if (decision.action === 'replan') {
        requestReplan('Bước thất bại: ' + errorMsg + '. ' + decision.reason).then(function (newPlan) {
          if (newPlan.isComplete && newPlan.steps.length) {
            currentTask.plan = newPlan.steps;
            currentTask.currentStep = 0;
            executeNextStep(contentEl);
          } else {
            finishTask('replan_failed', 'Không thể lập kế hoạch lại');
          }
        });
      } else if (decision.action === 'finish') {
        finishTask('completed', 'Dừng do lỗi: ' + errorMsg);
      } else {
        // Default: skip this step and continue
        currentTask.currentStep++;
        autoStepCount++;
        executeNextStep(contentEl);
      }
    }).catch(function (err) {
      // On AI error, skip step and continue
      currentTask.currentStep++;
      autoStepCount++;
      executeNextStep(contentEl);
    });
  }

  function finishTask(status, message) {
    console.log('[BeaBea] Task finished:', status, message);
    if (!currentTask) return;

    currentTask.status = status;
    currentTask.endTime = Date.now();
    currentTask.message = message;
    isAutonomousMode = false;
    autoStepCount = 0;

    // Add completion message to chat
    var statusIcon = status === 'completed' ? '✅' : '⚠️';
    var finalMsg = statusIcon + ' **Kết thúc tác vụ**: ' + message;
    if (currentTask.plan.length) {
      finalMsg += '\n\n**Tóm tắt**: ' + currentTask.plan.filter(function (s) { return s.status === 'completed'; }).length + '/' + currentTask.plan.length + ' bước thành công';
    }
    chatHistory.push({ role: 'assistant', content: finalMsg });

    if (beabeaWindow) {
      var contentEl = beabeaWindow.getContentElement();
      if (contentEl) renderChat(contentEl);
    }

    // Save to task history
    taskQueue.push(currentTask);
    // Persist to localStorage (keep last 50 tasks)
    try {
      var toSave = taskQueue.slice(-50);
      localStorage.setItem('beabea_task_queue', JSON.stringify(toSave));
    } catch (e) {}
    currentTask = null;
  }

  function stopAutonomousMode() {
    isAutonomousMode = false;
    autoStepCount = 0;
    if (currentTask) {
      currentTask.status = 'stopped';
      taskQueue.push(currentTask);
      try {
        var toSave = taskQueue.slice(-50);
        localStorage.setItem('beabea_task_queue', JSON.stringify(toSave));
      } catch (e) {}
      currentTask = null;
    }
    if (beabeaWindow) {
      var contentEl = beabeaWindow.getContentElement();
      if (contentEl) renderChat(contentEl);
    }
  }

  function stepOnce(contentEl) {
    if (!currentTask || currentTask.status !== 'executing') return;
    isAutonomousMode = true;
    executeNextStep(contentEl);
  }

  // ==========================================
  // 7. POLLINATIONS API (OpenAI-compatible, streaming)
  // ==========================================
  function callPollinations(messages, model, onChunk) {
    var useModel = model || currentModel || 'openai-reasoning';
    console.log('[BeaBea] Calling Pollinations API with model:', useModel, 'messages:', messages.length, 'stream:', !!onChunk);
    
    var safeSeed = Math.floor(Math.random() * 2147483647);
    var body = {
      messages: messages,
      model: useModel,
      seed: safeSeed,
      stream: !!onChunk,
      reasoning_effort: 'medium'
    };

    return fetch('https://gen.pollinations.ai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (res) {
      console.log('[BeaBea] Pollinations response status:', res.status, res.statusText);
      if (!res.ok) throw new Error('Pollinations HTTP ' + res.status);
      
      if (onChunk && res.body) {
        return handleStreamingResponse(res, onChunk);
      }
      return res.json();
    }).then(function (data) {
      if (onChunk) return data; // Streaming handled via callback
      console.log('[BeaBea] Pollinations response:', data);
      var content = data.choices?.[0]?.message?.content || '';
      var reasoning = data.choices?.[0]?.message?.reasoning_content || data.choices?.[0]?.message?.reasoning || '';
      return { content: content, reasoning: reasoning };
    }).catch(function (e) {
      console.error('[BeaBea] Pollinations error:', e);
      throw e;
    });
  }

  function handleStreamingResponse(res, onChunk) {
    var reader = res.body.getReader();
    var decoder = new TextDecoder();
    var buffer = '';
    var fullContent = '';
    var fullReasoning = '';
    var reasoningStarted = false;
    
    return new Promise(function (resolve, reject) {
      function read() {
        reader.read().then(function (result) {
          if (result.done) {
            onChunk({ done: true, content: fullContent, reasoning: fullReasoning });
            resolve({ content: fullContent, reasoning: fullReasoning });
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
                    fullReasoning += delta.reasoning_content;
                    onChunk({ reasoning: delta.reasoning_content, reasoningAccumulated: fullReasoning });
                  }
                  if (delta.content) {
                    fullContent += delta.content;
                    onChunk({ content: delta.content, contentAccumulated: fullContent });
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
  }

  function sendToAI(userText, options) {
    options = options || {};
    var isStreaming = options.stream !== false; // default true
    var onChunk = options.onChunk;
    var customMessages = options.messages; // For internal calls (planning, replanning, etc.)
    
    console.log('[BeaBea] sendToAI called with:', userText || '(custom messages)', 'streaming:', isStreaming);
    
    var messages;
    if (customMessages) {
      messages = customMessages;
    } else {
      var spriteRefs = parseSpriteReferences(userText);
      
      // Build context from multi-selected sprites (if any) or from @mentions
      var spritesToUse = selectedSpriteNames.length > 0 ? selectedSpriteNames : spriteRefs;
      var contextMd = '';
      if (spritesToUse.length > 0) {
        spritesToUse.forEach(function (name) {
          var ctx = extractSpriteContext(name);
          if (ctx) contextMd += formatSpriteDataForAI(ctx) + '\n---\n';
        });
        // Update legacy single selection for backward compatibility
        selectedSpriteName = spritesToUse[spritesToUse.length - 1];
      }

      messages = [{ role: 'system', content: buildSystemPrompt() + (contextMd ? '\n\nSPRITE CONTEXT:\n' + contextMd : '') }];
      chatHistory.forEach(function (m) {
        if (!m.isThinking) {
          messages.push({ role: m.role, content: m.content });
        }
      });
    }

    return callPollinations(messages, currentModel, isStreaming ? onChunk : null)
      .then(function (reply) {
        if (onChunk) return reply; // Already handled via callback
        var parsed = parseAiReply(reply.content || reply);
        parsed.reasoning = parsed.reasoning || reply.reasoning || '';
        console.log('[BeaBea] AI response received, content length:', (parsed.content || '').length);
        return parsed;
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
  // 9. CHAT SEND WITH RETRY LOOP (Streaming)
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

      var streamingMsgIndex = chatHistory.length - 1;
      var streamingContent = '';
      var streamingReasoning = '';
      var reasoningComplete = false;

      sendToAI(userText, {
        stream: true,
        onChunk: function (chunk) {
          if (!beabeaWindow) { isProcessing = false; return; }
          
          if (chunk.done) {
            // Streaming complete
            chatHistory[streamingMsgIndex] = {
              role: 'assistant',
              content: streamingContent,
              reasoning: streamingReasoning,
              isThinking: false
            };
            renderChat(contentEl);
            bindActionButtons(contentEl);
            isProcessing = false;
            hideBlockingOverlay();
            return;
          }
          
          if (chunk.reasoning) {
            streamingReasoning = chunk.reasoningAccumulated || streamingReasoning;
            chatHistory[streamingMsgIndex] = {
              role: 'assistant',
              content: streamingContent,
              reasoning: streamingReasoning,
              isThinking: true,
              streaming: true
            };
            renderChat(contentEl);
          }
          
          if (chunk.content) {
            streamingContent = chunk.contentAccumulated || streamingContent;
            chatHistory[streamingMsgIndex] = {
              role: 'assistant',
              content: streamingContent,
              reasoning: streamingReasoning,
              isThinking: false,
              streaming: true
            };
            renderChat(contentEl);
          }
        }
      }).then(function (parsed) {
        if (!beabeaWindow) { isProcessing = false; return; }
        console.log('[BeaBea] sendToAI succeeded (non-streaming fallback)');
        chatHistory.pop(); // remove thinking message
        var finalContent = parsed.content.replace(/<action>[\s\S]*?<\/action>/g, '').trim();
        chatHistory.push({ role: 'assistant', content: finalContent || parsed.content, reasoning: parsed.reasoning });
        renderChat(contentEl);
        bindActionButtons(contentEl);
        isProcessing = false;
        hideBlockingOverlay();
      }).catch(function (err) {
        if (!beabeaWindow) { isProcessing = false; return; }
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
  // Multi-sprite dropdown
  CSS_TEXT += '.bb-multi-sprite-dropdown{position:absolute;background:var(--bb-card);border:1px solid var(--bb-line);border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,.3);z-index:10000;min-width:220px;max-width:300px;max-height:300px;overflow-y:auto}';
  CSS_TEXT += '.bb-multi-sprite-item{padding:8px 12px;cursor:pointer;display:flex;align-items:center;gap:8px;font-size:13px;color:var(--bb-text);transition:background .1s}';
  CSS_TEXT += '.bb-multi-sprite-item:hover,.bb-multi-sprite-item.selected{background:var(--bb-line)}';
  CSS_TEXT += '.bb-multi-sprite-item .sprite-icon{width:24px;height:24px;border-radius:4px;background:var(--bb-code);display:flex;align-items:center;justify-content:center}';
  CSS_TEXT += '.bb-multi-sprite-item .sprite-name{flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}';
  CSS_TEXT += '.bb-multi-sprite-item .sprite-type{font-size:11px;color:var(--bb-mut);text-transform:uppercase}';
  CSS_TEXT += '.bb-multi-sprite-item .sprite-check{color:var(--bb-accent);font-weight:bold}';
  CSS_TEXT += '.bb-multi-sprite-actions{display:flex;gap:8px;padding:8px;border-top:1px solid var(--bb-line)}';
  // Mode selector
  CSS_TEXT += '.bb-mode-select{appearance:none;background-image:url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E");background-repeat:no-repeat;background-position:right 8px center;padding-right:28px}';
  // Reasoning panel
  CSS_TEXT += '.bb-reasoning-panel{margin-top:8px;border:1px solid var(--bb-line);border-left:3px solid var(--bb-accent);border-radius:8px;background:var(--bb-card);overflow:hidden}';
  CSS_TEXT += '.bb-reasoning-header{cursor:pointer;padding:8px 12px;font-size:12px;color:var(--bb-accent);font-weight:600;display:flex;align-items:center;gap:6px;user-select:none;background:rgba(217,56,58,.1)}';
  CSS_TEXT += '.bb-reasoning-header::-webkit-details-marker{display:none}';
  CSS_TEXT += '.bb-reasoning-header::before{content:"\\25B8";display:inline-block;transition:transform .15s;font-size:10px}';
  CSS_TEXT += '.bb-reasoning-panel[open] .bb-reasoning-header::before{transform:rotate(90deg)}';
  CSS_TEXT += '.bb-reasoning-body{padding:10px 12px;font-size:11px;line-height:1.5;color:var(--bb-mut);white-space:pre-wrap;font-family:ui-monospace,SFMono-Regular,monospace;max-height:200px;overflow-y:auto;border-top:1px solid var(--bb-line)}';
  // Inline reasoning (streaming)
  CSS_TEXT += '.bb-reasoning-inline{font-size:11px;line-height:1.5;color:var(--bb-mut);font-style:italic;font-family:ui-monospace,SFMono-Regular,monospace;white-space:pre-wrap;margin-bottom:8px;padding:6px 10px;background:rgba(0,0,0,.05);border-radius:6px;border-left:2px solid var(--bb-mut)}';
  CSS_TEXT += '.bb-reasoning-inline.streaming{border-left-color:var(--bb-accent);background:rgba(217,56,58,.05)}';
  CSS_TEXT += '.bb-streaming-cursor{display:inline-block;animation:bbCursorBlink 1s infinite;color:var(--bb-accent);margin-left:2px}';
  CSS_TEXT += '@keyframes bbCursorBlink{0%,50%{opacity:1}51%,100%{opacity:0}}';
  // Status indicator
  CSS_TEXT += '.bb-status-indicator{display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:12px;font-size:11px;font-weight:500;margin-bottom:8px}';
  CSS_TEXT += '.bb-status-indicator.idle{background:rgba(96,236,150,.15);color:#60ec96}';
  CSS_TEXT += '.bb-status-indicator.processing{background:rgba(217,56,58,.15);color:#d9383a}';
  CSS_TEXT += '.bb-status-indicator.acting{background:rgba(255,180,0,.15);color:#ffb400}';
  CSS_TEXT += '.bb-status-dots{display:inline-flex;gap:3px}';
  CSS_TEXT += '.bb-status-dots span{width:5px;height:5px;border-radius:50%;background:currentColor;animation:bbDot 1.1s infinite ease-in-out}';
  CSS_TEXT += '.bb-status-dots span:nth-child(2){animation-delay:.12s}.bb-status-dots span:nth-child(3){animation-delay:.24s}';
  // Task panel styles
  CSS_TEXT += '.bb-task-panel{animation:bbSlideDown .25s ease-out}';
  CSS_TEXT += '@keyframes bbSlideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}';
  CSS_TEXT += '.bb-task-step{transition:all .2s ease}';
  CSS_TEXT += '.bb-task-step.completed{border-left-color:var(--bb-codetx)}';
  CSS_TEXT += '.bb-task-step.executing{border-left-color:var(--bb-accent);animation:bbPulseBorder 1s infinite ease-in-out}';
  CSS_TEXT += '.bb-task-step.failed{border-left-color:#d9383a}';
  CSS_TEXT += '.bb-task-step.pending{border-left-color:var(--bb-mut)}';

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
    
    // Render reasoning inline (grey/italic text above content)
    var reasoningHtml = '';
    if (m.reasoning) {
      var reasoningDisplay = m.streaming 
        ? '<div class="bb-reasoning-inline streaming">' + escHtml(m.reasoning) + '<span class="bb-streaming-cursor">▌</span></div>'
        : '<div class="bb-reasoning-inline">' + escHtml(m.reasoning) + '</div>';
      reasoningHtml = reasoningDisplay;
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
    return '<div class="bb-chat-row"><img class="bb-avatar" src="' + BEABEA_AVATAR + '"><div class="bb-bubble bb-bubble-bot">' + reasoningHtml + renderMarkdown(m.content) + actionHtml + '</div></div>';
  }

  function renderChatTab(content) {
    var chatHtml = chatHistory.length === 0
      ? '<div class="bb-chat-row"><img class="bb-avatar" src="' + BEABEA_AVATAR + '"><div class="bb-bubble bb-bubble-bot">' + renderMarkdown(t('welcomeMsg')) + '</div></div>'
      : chatHistory.map(chatRowHTML).join('');

    var selectedSpriteHtml = selectedSpriteName
      ? '<div class="bb-selected-sprite">' + ICONS.sprite + ' ' + escHtml(t('spriteSelected', selectedSpriteName)) + '</div>'
      : '';

    // Build task panel HTML if there's an active task
    var taskPanelHtml = '';
    if (currentTask) {
      var progress = currentTask.plan.length > 0 
        ? Math.round((currentTask.currentStep / currentTask.plan.length) * 100) 
        : 0;
      var stepsHtml = currentTask.plan.map(function (step, idx) {
        var statusClass = 'pending';
        var statusIcon = '⏳';
        var statusText = t('stepPending');
        if (step.status === 'completed') { statusClass = 'completed'; statusIcon = '✅'; statusText = t('stepCompleted'); }
        else if (step.status === 'executing') { statusClass = 'executing'; statusIcon = '◐'; statusText = t('stepExecuting'); }
        else if (step.status === 'failed') { statusClass = 'failed'; statusIcon = '❌'; statusText = t('stepFailed'); }
        return '<div class="bb-task-step ' + statusClass + '" style="padding:8px 12px;margin:4px 0;border-radius:6px;background:var(--bb-card);border-left:3px solid ' + 
          (statusClass === 'completed' ? 'var(--bb-codetx)' : statusClass === 'executing' ? 'var(--bb-accent)' : statusClass === 'failed' ? '#d9383a' : 'var(--bb-mut)') + ';">' +
          '<div style="display:flex;justify-content:space-between;align-items:center">' +
          '<span style="font-weight:600;font-size:12px">' + statusIcon + ' Bước ' + (idx + 1) + ': ' + escHtml(step.description) + '</span>' +
          '<span style="font-size:11px;color:var(--bb-mut)">' + escHtml(step.tool) + '</span>' +
          '</div>' +
          (step.result ? '<div style="font-size:11px;color:var(--bb-mut);margin-top:4px;font-family:monospace">' + escHtml(JSON.stringify(step.result).slice(0, 200)) + '</div>' : '') +
          '</div>';
      }).join('');
      
      taskPanelHtml = 
        '<div class="bb-task-panel" style="background:var(--bb-card);border:1px solid var(--bb-line);border-radius:10px;padding:12px;margin-bottom:12px;">' +
        '  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '    <span style="font-weight:600;color:var(--bb-accent)">' + ICONS.magic + ' ' + escHtml(t('taskGoal')) + '</span>' +
        '    <button class="bb-icon-btn" id="closeTaskBtn" title="Close task panel">' + ICONS.close + '</button>' +
        '  </div>' +
        '  <div style="font-size:13px;color:var(--bb-text);margin-bottom:10px;word-break:break-word">' + escHtml(currentTask.goal) + '</div>' +
        '  <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">' +
        '    <div style="flex:1;min-width:120px">' +
        '      <div style="font-size:11px;color:var(--bb-mut);margin-bottom:4px">' + escHtml(t('taskProgress')) + '</div>' +
        '      <div style="height:6px;background:var(--bb-code);border-radius:3px;overflow:hidden">' +
        '        <div style="width:' + progress + '%;height:100%;background:var(--bb-accent);transition:width .3s"></div>' +
        '      </div>' +
        '      <div style="font-size:11px;color:var(--bb-mut);text-align:right;margin-top:2px">' + currentTask.currentStep + '/' + currentTask.plan.length + ' ' + escHtml(t('stepStatus')) + '</div>' +
        '    </div>' +
        '  </div>' +
        '  <div class="bb-task-steps" style="max-height:200px;overflow-y:auto">' + stepsHtml + '</div>' +
        '</div>';
    }

    var statusHtml = isProcessing
      ? '<div class="bb-status-indicator processing">' + ICONS.magic + ' ' + escHtml(t('aiThinking')) + ' <span class="bb-status-dots"><span></span><span></span><span></span></span></div>'
      : isAutonomousMode
        ? '<div class="bb-status-indicator acting">' + ICONS.magic + ' ' + escHtml(t('autoModeOn')) + ' (' + autoStepCount + '/' + maxAutoSteps + ')</div>'
        : '<div class="bb-status-indicator idle">' + ICONS.magic + ' Sẵn sàng</div>';

    content.innerHTML =
      '<div class="bb-split">' +
      '  <div class="bb-chat-pane">' +
      '    <div class="bb-chat-messages" id="chatBox">' + chatHtml + '</div>' +
      '    ' + selectedSpriteHtml +
      '    ' + taskPanelHtml +
      '    ' + statusHtml +
      '    <div style="display:flex;gap:8px;margin-top:8px;flex-shrink:0;flex-wrap:wrap;align-items:center">' +
      '      <div class="bb-mode-selector" style="display:flex;align-items:center;gap:6px">' +
      '        <select id="modeSelect" class="bb-mode-select" style="padding:6px 10px;border-radius:6px;background:var(--bb-input);border:1px solid var(--bb-line);color:var(--bb-text);font-size:12px;min-width:130px">' +
      '          <option value="code"' + (currentMode === 'code' ? ' selected' : '') + '>' + ICONS.code + ' ' + escHtml(t('modeCode')) + '</option>' +
      '          <option value="ask"' + (currentMode === 'ask' ? ' selected' : '') + '>' + ICONS.ask + ' ' + escHtml(t('modeAsk')) + '</option>' +
      '          <option value="debug"' + (currentMode === 'debug' ? ' selected' : '') + '>' + ICONS.debug + ' ' + escHtml(t('modeDebug')) + '</option>' +
      '          <option value="plan"' + (currentMode === 'plan' ? ' selected' : '') + '>' + ICONS.plan + ' ' + escHtml(t('modePlan')) + '</option>' +
      '        </select>' +
      '      </div>' +
      '      <input id="chatInput" type="text" placeholder="' + escHtml(t('promptPlaceholder')) + '" style="flex:1;min-width:200px" autocomplete="off">' +
      '      <button class="bb-btn" id="sendBtn" title="Send" ' + (isProcessing ? 'disabled' : '') + '>' + ICONS.send + '</button>' +
      (isAutonomousMode 
        ? '<button class="bb-btn bb-btn-secondary" id="stopAutoBtn" title="' + escHtml(t('stopAuto')) + '">' + escHtml(t('stopAuto')) + '</button>' +
          '<button class="bb-btn bb-btn-secondary" id="stepOnceBtn" title="' + escHtml(t('stepOnce')) + '">' + escHtml(t('stepOnce')) + '</button>'
        : '<button class="bb-btn bb-btn-secondary" id="autoModeBtn" title="' + escHtml(t('autoMode')) + '">' + escHtml(t('autoModeOff')) + '</button>') +
      '    </div>' +
      '  </div>' +
      '  <div class="bb-context-pane" id="contextPane">' +
      '    <div class="bb-context-header">' +
      '      <span style="font-size:12px;font-weight:600;color:var(--bb-accent)">' + ICONS.sprite + ' Sprite Context</span>' +
      '      <button class="bb-icon-btn" id="multiSelectBtn" title="Chọn nhiều sprite">' + ICONS.multiSelect + '</button>' +
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
      
      // Check if user wants to start autonomous task (e.g., "tự động: ..." or "auto: ...")
      var isAutoRequest = /^(tự động|auto|tự động làm|tự động thực hiện|autonomous|auto:)/i.test(txt);
      if (isAutoRequest && !currentTask) {
        var goal = txt.replace(/^(tự động|auto|tự động làm|tự động thực hiện|autonomous|auto:)\s*/i, '');
        if (goal) {
          runAutonomousLoop(goal, content);
          return;
        }
      }
      
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
    
    // Mode selector handler
    var modeSelect = content.querySelector('#modeSelect');
    if (modeSelect) {
      modeSelect.onchange = function (e) {
        currentMode = e.target.value;
      };
    }
    
    // Multi-select sprites button handler
    var multiSelectBtn = content.querySelector('#multiSelectBtn');
    if (multiSelectBtn) {
      multiSelectBtn.onclick = function () {
        showMultiSpriteSelector(content);
      };
    }
    
    // Autonomous mode button handlers
    var autoModeBtn = content.querySelector('#autoModeBtn');
    if (autoModeBtn) {
      autoModeBtn.onclick = function () {
        var inp = content.querySelector('#chatInput');
        var txt = inp.value.trim();
        if (!txt) {
          alert('Vui lòng nhập mục tiêu tác vụ trước khi bật chế độ tự động.');
          inp.focus();
          return;
        }
        if (confirm(t('confirmAutoMode'))) {
          runAutonomousLoop(txt, content);
        }
      };
    }
    
    var stopAutoBtn = content.querySelector('#stopAutoBtn');
    if (stopAutoBtn) {
      stopAutoBtn.onclick = function () {
        stopAutonomousMode();
        chatHistory.push({ role: 'assistant', content: '⏹ **Đã dừng chế độ tự động**' });
        renderChat(content);
      };
    }
    
    var stepOnceBtn = content.querySelector('#stepOnceBtn');
    if (stepOnceBtn) {
      stepOnceBtn.onclick = function () {
        stepOnce(content);
      };
    }
    
    var closeTaskBtn = content.querySelector('#closeTaskBtn');
    if (closeTaskBtn) {
      closeTaskBtn.onclick = function () {
        // Just hide the task panel by clearing currentTask display (but keep task running)
        // For now, we'll stop the task
        stopAutonomousMode();
      };
    }
    
    updateContextPane(content);
  }

  function updateContextPane(content) {
    var contextContent = content.querySelector('#contextContent');
    if (!contextContent) return;
    
    // Use multi-select if available, otherwise fall back to single selection
    var spritesToShow = selectedSpriteNames.length > 0 ? selectedSpriteNames : (selectedSpriteName ? [selectedSpriteName] : []);
    
    if (spritesToShow.length > 0) {
      var cardsHtml = spritesToShow.map(function (spriteName) {
        var ctx = extractSpriteContext(spriteName);
        if (!ctx) return '';
        return '<div class="bb-sprite-card" style="margin-bottom:8px">' +
          '<div class="bb-sprite-info" style="display:flex;justify-content:space-between;align-items:flex-start">' +
          '  <div>' +
          '    <div class="bb-sprite-name">' + escHtml(ctx.name) + (ctx.isStage ? ' (Stage)' : '') + '</div>' +
          '    <div class="bb-sprite-meta" style="margin-top:4px">' +
          (ctx.blocks.length ? '<span class="bb-sprite-badge">' + ctx.blocks.length + ' blocks</span>' : '') +
          (ctx.variables.length ? '<span class="bb-sprite-badge">' + ctx.variables.length + ' vars</span>' : '') +
          (ctx.lists.length ? '<span class="bb-sprite-badge">' + ctx.lists.length + ' lists</span>' : '') +
          (ctx.costumes.length ? '<span class="bb-sprite-badge">' + ctx.costumes.length + ' costumes</span>' : '') +
          '    </div>' +
          '  </div>' +
          '  <button class="bb-icon-btn bb-remove-sprite" data-sprite="' + escHtml(spriteName) + '" title="Xóa sprite này">' + ICONS.close + '</button>' +
          '</div>' +
          '</div>';
      }).join('');
      
      contextContent.innerHTML = cardsHtml || '<div style="color:var(--bb-mut);font-size:12px;padding:10px">Sprite not found</div>';
      
      // Bind remove buttons
      var removeBtns = contextContent.querySelectorAll('.bb-remove-sprite');
      for (var i = 0; i < removeBtns.length; i++) {
        removeBtns[i].onclick = function () {
          var name = this.getAttribute('data-sprite');
          selectedSpriteNames = selectedSpriteNames.filter(function (n) { return n !== name; });
          if (selectedSpriteName === name) selectedSpriteName = null;
          updateContextPane(content);
        };
      }
    } else {
      contextContent.innerHTML = '<div style="color:var(--bb-mut);font-size:12px;padding:10px;text-align:center">Chọn @sprite_name trong chat hoặc dùng nút ' + ICONS.multiSelect + ' để chọn nhiều sprite</div>';
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
    
    // Update task panel if exists
    var taskPanel = tabContent.querySelector('.bb-task-panel');
    if (taskPanel && currentTask) {
      var progress = currentTask.plan.length > 0 
        ? Math.round((currentTask.currentStep / currentTask.plan.length) * 100) 
        : 0;
      var stepsHtml = currentTask.plan.map(function (step, idx) {
        var statusClass = 'pending';
        var statusIcon = '⏳';
        var statusText = t('stepPending');
        if (step.status === 'completed') { statusClass = 'completed'; statusIcon = '✅'; statusText = t('stepCompleted'); }
        else if (step.status === 'executing') { statusClass = 'executing'; statusIcon = '◐'; statusText = t('stepExecuting'); }
        else if (step.status === 'failed') { statusClass = 'failed'; statusIcon = '❌'; statusText = t('stepFailed'); }
        return '<div class="bb-task-step ' + statusClass + '" style="padding:8px 12px;margin:4px 0;border-radius:6px;background:var(--bb-card);border-left:3px solid ' + 
          (statusClass === 'completed' ? 'var(--bb-codetx)' : statusClass === 'executing' ? 'var(--bb-accent)' : statusClass === 'failed' ? '#d9383a' : 'var(--bb-mut)') + ';">' +
          '<div style="display:flex;justify-content:space-between;align-items:center">' +
          '<span style="font-weight:600;font-size:12px">' + statusIcon + ' Bước ' + (idx + 1) + ': ' + escHtml(step.description) + '</span>' +
          '<span style="font-size:11px;color:var(--bb-mut)">' + escHtml(step.tool) + '</span>' +
          '</div>' +
          (step.result ? '<div style="font-size:11px;color:var(--bb-mut);margin-top:4px;font-family:monospace">' + escHtml(JSON.stringify(step.result).slice(0, 200)) + '</div>' : '') +
          '</div>';
      }).join('');
      
      taskPanel.innerHTML = 
        '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">' +
        '  <span style="font-weight:600;color:var(--bb-accent)">' + ICONS.magic + ' ' + escHtml(t('taskGoal')) + '</span>' +
        '  <button class="bb-icon-btn" id="closeTaskBtn" title="Close task panel">' + ICONS.close + '</button>' +
        '</div>' +
        '<div style="font-size:13px;color:var(--bb-text);margin-bottom:10px;word-break:break-word">' + escHtml(currentTask.goal) + '</div>' +
        '<div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap">' +
        '  <div style="flex:1;min-width:120px">' +
        '    <div style="font-size:11px;color:var(--bb-mut);margin-bottom:4px">' + escHtml(t('taskProgress')) + '</div>' +
        '    <div style="height:6px;background:var(--bb-code);border-radius:3px;overflow:hidden">' +
        '      <div style="width:' + progress + '%;height:100%;background:var(--bb-accent);transition:width .3s"></div>' +
        '    </div>' +
        '    <div style="font-size:11px;color:var(--bb-mut);text-align:right;margin-top:2px">' + currentTask.currentStep + '/' + currentTask.plan.length + ' ' + escHtml(t('stepStatus')) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="bb-task-steps" style="max-height:200px;overflow-y:auto">' + stepsHtml + '</div>';
      
      // Re-bind close button
      var closeBtn = taskPanel.querySelector('#closeTaskBtn');
      if (closeBtn) closeBtn.onclick = function () { stopAutonomousMode(); };
    }
    
    // Update status indicator
    var statusEl = tabContent.querySelector('.bb-status-indicator');
    if (statusEl) {
      if (isProcessing) {
        statusEl.className = 'bb-status-indicator processing';
        statusEl.innerHTML = ICONS.magic + ' ' + escHtml(t('aiThinking')) + ' <span class="bb-status-dots"><span></span><span></span><span></span></span>';
      } else if (isAutonomousMode) {
        statusEl.className = 'bb-status-indicator acting';
        statusEl.innerHTML = ICONS.magic + ' ' + escHtml(t('autoModeOn')) + ' (' + autoStepCount + '/' + maxAutoSteps + ')';
      } else {
        statusEl.className = 'bb-status-indicator idle';
        statusEl.innerHTML = ICONS.magic + ' Sẵn sàng';
      }
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
      { value: 'pollinations', label: t('modelPollinations'), models: ['openai-reasoning', 'openai', 'gpt-4o', 'gpt-4o-mini'] },
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
      '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">' + escHtml(t('autoConfirmActions')) + '</label>' +
      '  <select id="autoConfirmSelect" style="width:100%">' +
      '    <option value="true"' + (autoConfirmActions ? ' selected' : '') + '>' + escHtml(t('autoConfirmOn')) + '</option>' +
      '    <option value="false"' + (!autoConfirmActions ? ' selected' : '') + '>' + escHtml(t('autoConfirmOff')) + '</option>' +
      '  </select></div>' +
      '<div style="margin-bottom:16px"><label style="font-size:12px;font-weight:600;display:block;margin-bottom:6px">Max Auto Steps</label>' +
      '  <input id="maxAutoStepsInput" type="number" min="1" max="50" value="' + maxAutoSteps + '" style="width:100%"></div>' +
      '<button class="bb-btn" id="saveSettings" style="width:100%">' + escHtml(t('settingsSaved')) + '</button>';

    var themeSelect = content.querySelector('#themeSelect');
    if (themeSelect) themeSelect.onchange = function (e) { currentTheme = e.target.value; safeSet('beabea_theme', currentTheme); beabeaWindow.element.classList.remove('theme-dark', 'theme-light'); beabeaWindow.element.classList.add('theme-' + currentTheme); };
    var provSelect = content.querySelector('#provSelect');
    if (provSelect) provSelect.onchange = function (e) { currentProvider = e.target.value; safeSet('beabea_provider', currentProvider); renderWindowContent(); };
    var modelSelect = content.querySelector('#modelSelect');
    if (modelSelect) modelSelect.onchange = function (e) { currentModel = e.target.value; safeSet('beabea_model', currentModel); };
    var autoConfirmSelect = content.querySelector('#autoConfirmSelect');
    if (autoConfirmSelect) autoConfirmSelect.onchange = function (e) { autoConfirmActions = e.target.value === 'true'; safeSet('beabea_auto_confirm', autoConfirmActions); };
    var maxAutoStepsInput = content.querySelector('#maxAutoStepsInput');
    if (maxAutoStepsInput) maxAutoStepsInput.onchange = function (e) { var v = parseInt(e.target.value, 10); if (!isNaN(v) && v >= 1 && v <= 50) { maxAutoSteps = v; safeSet('beabea_max_auto_steps', v); } };
    var saveBtn = content.querySelector('#saveSettings');
    if (saveBtn) saveBtn.onclick = function () { alert(t('settingsSaved')); };
  }

  function renderHistoryTab(content) {
    var chatJson = JSON.stringify(chatHistory, null, 2);
    var contextMd = selectedSpriteName
      ? formatSpriteDataForAI(extractSpriteContext(selectedSpriteName))
      : formatAllSpritesForAI(getAllSpritesData());
    var actionJson = JSON.stringify(actionHistory, null, 2);
    var taskJson = JSON.stringify(taskQueue, null, 2);

    content.innerHTML =
      '<div style="display:flex;flex-direction:column;gap:12px;height:100%">' +
      '  <div style="display:flex;gap:8px;flex-wrap:wrap">' +
      '    <button class="bb-btn" id="exportChatBtn">' + escHtml(t('exportChat')) + '</button>' +
      '    <button class="bb-btn bb-btn-secondary" id="exportContextBtn">' + escHtml(t('exportContext')) + '</button>' +
      '    <button class="bb-btn bb-btn-secondary" id="exportActionsBtn">' + ICONS.download + ' Xuất hành động</button>' +
      '    <button class="bb-btn bb-btn-secondary" id="exportTasksBtn">' + ICONS.download + ' Xuất tác vụ</button>' +
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
      '      <h4 style="margin:0 0 8px;font-size:13px;color:var(--bb-mut)">Task History</h4>' +
      '      <pre id="taskPreview" style="flex:1;background:var(--bb-code);color:var(--bb-codetx);padding:12px;border-radius:8px;font-family:ui-monospace,SFMono-Regular,monospace;font-size:11px;overflow:auto;border:1px solid var(--bb-line);white-space:pre-wrap;word-wrap:break-word;min-height:150px">' + escHtml(taskJson) + '</pre>' +
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
    var exportTasksBtn = content.querySelector('#exportTasksBtn');
    if (exportTasksBtn) {
      exportTasksBtn.onclick = function () {
        var blob = new Blob([taskJson], { type: 'application/json' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'beabea-task-history.json';
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
          taskQueue = [];
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



