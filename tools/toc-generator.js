const fs = require('fs');
const path = require('path');

// Generate TOC for a markdown file
function generateTOC(content) {
  const lines = content.split('\n');
  const headings = [];
  
  lines.forEach(line => {
    const match = line.match(/^(#{2,6})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].replace(/[`*_]/g, '');
      const anchor = text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-');
      
      headings.push({ level, text, anchor });
    }
  });
  
  if (headings.length === 0) return null;
  
  let toc = '## Table of Contents\n\n';
  headings.forEach(h => {
    const indent = '  '.repeat(h.level - 2);
    toc += `${indent}- [${h.text}](#${h.anchor})\n`;
  });
  
  return toc + '\n';
}

// Process file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Check if TOC already exists
  if (content.includes('## Table of Contents')) {
    console.log(`⏭️  Skipping ${filePath} (TOC already exists)`);
    return false;
  }
  
  const toc = generateTOC(content);
  if (!toc) {
    console.log(`⏭️  Skipping ${filePath} (no headings found)`);
    return false;
  }
  
  // Insert TOC after first heading
  const lines = content.split('\n');
  const firstHeadingIndex = lines.findIndex(line => line.startsWith('#'));
  
  if (firstHeadingIndex === -1) return false;
  
  // Find where to insert (after title and any intro text)
  let insertIndex = firstHeadingIndex + 1;
  while (insertIndex < lines.length && !lines[insertIndex].startsWith('##')) {
    insertIndex++;
  }
  
  lines.splice(insertIndex, 0, toc);
  const newContent = lines.join('\n');
  
  fs.writeFileSync(filePath, newContent);
  console.log(`✅ Generated TOC for ${filePath}`);
  return true;
}

// Main
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node toc-generator.js <file.md>');
  console.log('   or: node toc-generator.js --all (process all docs)');
  process.exit(1);
}

if (args[0] === '--all') {
  const DOCS_DIR = path.join(__dirname, '../docs');
  let processed = 0;
  
  function processDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        processDir(filePath);
      } else if (file.endsWith('.md') && file !== 'README.md') {
        if (processFile(filePath)) processed++;
      }
    });
  }
  
  processDir(DOCS_DIR);
  console.log(`\n✅ Processed ${processed} file(s)`);
} else {
  processFile(args[0]);
}
