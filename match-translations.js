const fs = require('fs');

// Read upstream vi translations
const upstreamSrc = fs.readFileSync(require.resolve('@turbowarp/scratch-l10n/locales/editor-msgs.js'), 'utf8');
const upstream = JSON.parse(upstreamSrc.slice(upstreamSrc.indexOf('{')).replace(/;?\s*$/, ''));
const upstreamVi = upstream.vi || {};
const upstreamEn = upstream.en || {};

// Build mapping: English text -> Vietnamese translation (from upstream)
const enToVi = {};
for (const [id, viText] of Object.entries(upstreamVi)) {
    const enText = upstreamEn[id];
    if (enText && !enToVi[enText]) {
        enToVi[enText] = viText;
    }
}

// Read defaults (new messages from MistWarp codebase)
const defaults = JSON.parse(fs.readFileSync('src/lib/tw-translations/default-messages.json', 'utf8'));

// Read existing genTrans vi
const genTrans = JSON.parse(fs.readFileSync('src/lib/tw-translations/generated-translations.json', 'utf8'));
const genVi = genTrans.vi || {};

// Find missing keys
const missingKeys = Object.keys(defaults).filter(k => !(k in upstreamVi) && !(k in genVi));

// Try to match by English text
let matchedByEnText = 0;
let unmatched = [];
for (const key of missingKeys) {
    const enText = defaults[key];
    if (enToVi[enText]) {
        genVi[key] = enToVi[enText];
        matchedByEnText++;
    } else {
        unmatched.push({ key, en: enText });
    }
}

console.log('Total missing keys:', missingKeys.length);
console.log('Matched by English text from upstream vi:', matchedByEnText);
console.log('Still unmatched:', unmatched.length);

// Save unmatched for further translation
fs.writeFileSync('C:/Users/nbaoh/AppData/Local/Temp/kilo/still-unmatched.json', JSON.stringify(Object.fromEntries(unmatched.map(u => [u.key, u.en])), null, 2));

// Update generated-translations.json
genTrans.vi = genVi;
fs.writeFileSync('src/lib/tw-translations/generated-translations.json', JSON.stringify(genTrans, null, 2) + '\n');
console.log('Updated generated-translations.json. Total vi entries:', Object.keys(genVi).length);
