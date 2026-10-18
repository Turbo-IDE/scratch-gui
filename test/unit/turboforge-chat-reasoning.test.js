const fs = require('fs');
const path = require('path');

const source = fs.readFileSync(
    path.join(__dirname, '..', '..', 'TurboWS', 'Extensions', 'TurboForge.js'),
    'utf8'
);

/**
 * Extract a top-level `function name(...) {...}` declaration from TurboForge.js.
 * Brace counting is string/comment aware so literals like '{' or comments inside
 * the body don't break the scan.
 * @param {string} name - function name to extract
 * @returns {string} the full function declaration source
 */
const extractFunctionSource = name => {
    const header = new RegExp('function\\s+' + name + '\\s*\\(').exec(source);
    expect(header).not.toBeNull();
    const braceStart = source.indexOf('{', header.index);
    let depth = 0;
    let mode = 'code';
    let end = -1;
    for (let i = braceStart; i < source.length; i++) {
        const c = source[i];
        const next = source[i + 1];
        if (mode === 'code') {
            if (c === '{') depth++;
            else if (c === '}') {
                depth--;
                if (depth === 0) {
                    end = i + 1;
                    break;
                }
            } else if (c === "'" || c === '"' || c === '`') mode = c;
            else if (c === '/' && next === '/') { mode = '//'; i++; }
            else if (c === '/' && next === '*') { mode = '/*'; i++; }
        } else if (mode === '//') {
            if (c === '\n') mode = 'code';
        } else if (mode === '/*') {
            if (c === '*' && next === '/') { mode = 'code'; i++; }
        } else if (c === '\\') {
            i++;
        } else if (c === mode) {
            mode = 'code';
        }
    }
    expect(end).toBeGreaterThan(0);
    return source.slice(header.index, end);
};

/**
 * Instantiate a real TurboForge function with stubbed dependencies, so tests
 * exercise the shipped code instead of a hand-copied duplicate.
 * @param {string} name - function name in TurboForge.js
 * @param {object} deps - map of dependency name -> value
 * @returns {Function} the instantiated function
 */
const instantiate = (name, deps) => {
    const names = Object.keys(deps);
    // eslint-disable-next-line no-new-func
    return new Function(...names, `return (${extractFunctionSource(name)});`)(...names.map(n => deps[n]));
};

const realEscHtml = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const createParseAiReply = () => instantiate('parseAiReply', {});

const createChatRowHTML = () => instantiate('chatRowHTML', {
    escHtml: realEscHtml,
    renderMarkdown: s => `<md>${s}</md>`,
    extractAction: () => null,
    t: key => key,
    BEABEA_AVATAR: 'avatar.png'
});

const createSendChatMessage = (history, fetchMock) => instantiate('sendChatMessage', {
    chatHistory: history,
    buildSystemPrompt: () => 'SYSTEM PROMPT',
    parseAiReply: createParseAiReply(),
    fetch: fetchMock
});

test('splits a Pollinations reasoning JSON reply into content and reasoning', () => {
    const parseAiReply = createParseAiReply();
    const raw = JSON.stringify({
        role: 'assistant',
        reasoning: 'User wants a smoothMoveTo block. Checking the interval math...',
        content: 'Mình gợi ý dùng **requestAnimationFrame** bạn nha 🐾'
    });
    const parsed = parseAiReply(raw);
    expect(parsed.content).toBe('Mình gợi ý dùng **requestAnimationFrame** bạn nha 🐾');
    expect(parsed.reasoning).toContain('smoothMoveTo');
});

test('passes plain markdown replies through untouched', () => {
    const parseAiReply = createParseAiReply();
    const parsed = parseAiReply('Xin chào! ### Tiêu đề `code`');
    expect(parsed.content).toBe('Xin chào! ### Tiêu đề `code`');
    expect(parsed.reasoning).toBe('');
});

test('unwraps OpenAI-style choices and DeepSeek reasoning_content', () => {
    const parseAiReply = createParseAiReply();
    const choices = JSON.stringify({
        choices: [{message: {content: 'đáp án', reasoning_content: 'suy nghĩ'}}]
    });
    const parsed = parseAiReply(choices);
    expect(parsed.content).toBe('đáp án');
    expect(parsed.reasoning).toBe('suy nghĩ');
});

test('falls back to raw text when the reply only looks like broken JSON', () => {
    const parseAiReply = createParseAiReply();
    const parsed = parseAiReply('{oops not json');
    expect(parsed.content).toBe('{oops not json');
    expect(parsed.reasoning).toBe('');
});

test('parseAiReply is top-level so sendChatMessage can call it at runtime', () => {
    // Guard against it being accidentally nested inside extractAction: syntax stays
    // valid and unit stubs keep passing, but the real chat would hit a ReferenceError.
    const extractActionSrc = extractFunctionSource('extractAction');
    expect(extractActionSrc).not.toContain('function parseAiReply');
    expect(extractActionSrc).toContain('return null');
});

test('renders reasoning as a collapsible box above the answer', () => {
    const chatRowHTML = createChatRowHTML();
    const html = chatRowHTML({role: 'assistant', content: 'Câu trả lời', reasoning: 'phân tích <b>thô</b>'});
    expect(html).toContain('reasoning-box');
    expect(html).toContain('reasoningTitle');
    // reasoning must be escaped, never injected as raw HTML
    expect(html).toContain('phân tích &lt;b&gt;thô&lt;/b&gt;');
    expect(html.indexOf('reasoning-box')).toBeLessThan(html.indexOf('<md>Câu trả lời</md>'));
});

test('bot rows without reasoning skip the collapsible box', () => {
    const chatRowHTML = createChatRowHTML();
    const html = chatRowHTML({role: 'assistant', content: 'Chỉ trả lời', reasoning: ''});
    expect(html).not.toContain('reasoning-box');
    expect(html).toContain('<md>Chỉ trả lời</md>');
});

test('pollinations: stores parsed content and keeps reasoning for display only', async () => {
    const history = [];
    const raw = JSON.stringify({role: 'assistant', reasoning: 'thinking hard', content: 'Xin chào bạn nha'});
    const fetchMock = jest.fn(async () => ({ok: true, text: async () => raw}));
    const sendChatMessage = createSendChatMessage(history, fetchMock);

    const reply = await sendChatMessage('tạo extension test', 'pollinations', '', null);

    expect(reply).toBe('Xin chào bạn nha');
    expect(history[1]).toEqual({role: 'assistant', content: 'Xin chào bạn nha', reasoning: 'thinking hard'});
    const payload = JSON.parse(fetchMock.mock.calls[0][1].body);
    // seed must stay within int32 so Pollinations does not reject it
    expect(payload.seed).toBeLessThanOrEqual(2147483647);
    // reasoning is UI-only and must not be sent back to the API
    payload.messages.forEach(m => expect(m.reasoning).toBeUndefined());
});

test('pollinations: plain text replies still work', async () => {
    const history = [];
    const fetchMock = jest.fn(async () => ({ok: true, text: async () => 'trả lời thường'}));
    const sendChatMessage = createSendChatMessage(history, fetchMock);

    const reply = await sendChatMessage('hi', 'pollinations', '', null);

    expect(reply).toBe('trả lời thường');
    expect(history[1]).toEqual({role: 'assistant', content: 'trả lời thường', reasoning: ''});
});

test('openai-compatible: captures DeepSeek reasoning_content separately', async () => {
    const history = [];
    const fetchMock = jest.fn(async () => ({
        ok: true,
        json: async () => ({choices: [{message: {content: 'câu trả lời', reasoning_content: 'suy nghĩ sâu'}}]})
    }));
    const sendChatMessage = createSendChatMessage(history, fetchMock);

    const reply = await sendChatMessage('hi', 'deepseek', 'sk-test', null);

    expect(reply).toBe('câu trả lời');
    expect(history[1]).toEqual({role: 'assistant', content: 'câu trả lời', reasoning: 'suy nghĩ sâu'});
});

