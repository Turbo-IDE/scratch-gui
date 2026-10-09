const fs=require("fs"); const path=require("path");
const p=require.resolve("scratch-blocks/package.json");
const dir=fs.realpathSync(path.dirname(p));
const t=path.join(dir,"msg/scratch_msgs.js");
const src=fs.readFileSync(t,"utf8");
const dict={};
for (const m of src.matchAll(/Blockly\.ScratchMsgs\.locales\["([^"]+)"\]\s*=\s*(\{[\s\S]*?^\});/gm)) { try { dict[m[1]]=JSON.parse(m[2]); } catch(e) {} }
const locales=Object.keys(dict);
fs.writeFileSync("C:\\Users\\nbaoh\\AppData\\Local\\Temp\\blocks_vi.txt",
  "block locales count: "+locales.length+"\n"+
  "locales: "+locales.join(", ")+"\n"+
  "has vi: "+("vi" in dict)+"\n"+
  "en key count: "+(dict.en?Object.keys(dict.en).length:0)+"\n"+
  "vi key count: "+(dict.vi?Object.keys(dict.vi).length:0));
console.log("SCRIPT_DONE");
