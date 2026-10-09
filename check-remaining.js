const fs = require('fs');
const t = JSON.parse(fs.readFileSync('C:/Users/nbaoh/AppData/Local/Temp/kilo/vi-translations-output.json', 'utf8'));
const d = JSON.parse(fs.readFileSync('src/lib/tw-translations/default-messages.json', 'utf8'));
const eb = {};
for (const k in t) {
    if (t[k] === d[k]) eb[k] = d[k];
}
const g = {};
for (const k in eb) {
    const p = k.substring(0, k.indexOf('.'));
    if (!g[p]) g[p] = [];
    g[p].push(k);
}
const sorted = Object.entries(g).sort((a, b) => b[1].length - a[1].length);
console.log('English fallback by prefix:');
for (const [p, keys] of sorted) {
    console.log(p + ': ' + keys.length);
}
console.log('Total:', Object.keys(eb).length);
fs.writeFileSync('C:/Users/nbaoh/AppData/Local/Temp/kilo/english-fallback.json', JSON.stringify(eb, null, 2));
