const fs = require('fs');

// Load existing state
const genTrans = JSON.parse(fs.readFileSync('src/lib/tw-translations/generated-translations.json', 'utf8'));
const defaults = JSON.parse(fs.readFileSync('src/lib/tw-translations/default-messages.json', 'utf8'));

// Load the English fallback keys
const englishFallback = JSON.parse(fs.readFileSync('C:/Users/nbaoh/AppData/Local/Temp/kilo/english-fallback.json', 'utf8'));

// Additional translations for the remaining 16 English fallbacks that can be translated
const extraTranslations = {
    "Kick": "Đuổi",
    "Diff": "So sánh",
    "Gradient": "Chuyển màu",
    "Commit": "Lưu thay đổi",
};

// Apply all translations from the previous script
const translations = {};
for (const key of Object.keys(englishFallback)) {
    const enText = englishFallback[key];
    if (extraTranslations[enText]) {
        translations[key] = extraTranslations[enText];
    } else {
        translations[key] = enText; // Will be overridden by the comprehensive dict below
    }
}

// Now apply the comprehensive dictionary from translate-vi-final.js
// We need to re-run the full dictionary here
// ... (the dictionary is very long, let me just read the output from the previous run)
// Actually, let me re-derive the translations from the output file

const prevTranslations = JSON.parse(fs.readFileSync('C:/Users/nbaoh/AppData/Local/Temp/kilo/vi-translations-output.json', 'utf8'));

// Merge: apply extra translations for the remaining English fallbacks
for (const key of Object.keys(englishFallback)) {
    const enText = englishFallback[key];
    if (extraTranslations[enText]) {
        prevTranslations[key] = extraTranslations[enText];
    }
}

// Merge into generated-translations.json
genTrans.vi = { ...genTrans.vi, ...prevTranslations };

// Write the updated file
fs.writeFileSync('src/lib/tw-translations/generated-translations.json', JSON.stringify(genTrans, null, 2) + '\n');

// Verify
const viEntries = genTrans.vi;
const total = Object.keys(viEntries).length;

// Read upstream for comparison
const upstreamSrc = fs.readFileSync(require.resolve('@turbowarp/scratch-l10n/locales/editor-msgs.js'), 'utf8');
const upstream = JSON.parse(upstreamSrc.slice(upstreamSrc.indexOf('{')).replace(/;?\s*$/, ''));
const upstreamVi = upstream.vi || {};
const upstreamEn = upstream.en || {};

const englishCount = Object.keys(viEntries).filter(k => viEntries[k] === defaults[k] || viEntries[k] === upstreamEn?.[k]).length;

const stillEnglish = Object.keys(englishFallback).filter(k => prevTranslations[k] === englishFallback[k]);
console.log('Updated generated-translations.json');
console.log('Total vi entries:', total);
console.log('Still in English (fallback):', stillEnglish.length);
if (stillEnglish.length > 0) {
    console.log('  Keys:', stillEnglish.join(', '));
}

// Verify no broken placeholders
const placeholderRegex = /\{([a-zA-Z_][a-zA-Z0-9_]*)\}/g;
let errors = 0;
for (const [key, viText] of Object.entries(viEntries)) {
    const enText = defaults[key] || upstreamEn[key];
    if (!enText) continue;
    
    const enPlaces = (enText.match(placeholderRegex) || []).sort();
    const viPlaces = (viText.match(placeholderRegex) || []).sort();
    
    if (JSON.stringify(enPlaces) !== JSON.stringify(viPlaces)) {
        // Check for ICU format differences
        if (viText !== enText) {
            console.log('Placeholder mismatch:', key);
            console.log('  EN:', enText);
            console.log('  VI:', viText);
            errors++;
        }
    }
}
console.log('Placeholder errors:', errors);
