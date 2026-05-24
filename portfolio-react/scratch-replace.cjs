const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    let f = path.join(dir, file);
    const stat = fs.statSync(f);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(f));
    } else if (f.endsWith('.jsx')) {
      results.push(f);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const original = content;
  content = content.replace(/sticker-violet/g, 'sticker-blue-dark');
  content = content.replace(/btn-dark-violet/g, 'btn-dark-blue-dark');
  content = content.replace(/btn-outline-violet-black/g, 'btn-outline-blue-dark-black');
  content = content.replace(/themeColor="violet"/g, 'themeColor="blue-dark"');
  content = content.replace(/case 'violet':/g, "case 'blue-dark':");

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
console.log('Done');
