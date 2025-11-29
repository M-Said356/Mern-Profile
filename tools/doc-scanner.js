const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');

// Scan documentation files
function scanDocs(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDocs(filePath, results);
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativePath = path.relative(DOCS_DIR, filePath);
      
      results.push({
        path: relativePath,
        file: file,
        lines: content.split('\n').length,
        words: content.split(/\s+/).length,
        hasTitle: content.startsWith('#'),
        hasTOC: content.includes('## Table of Contents') || content.includes('## Contents'),
        links: (content.match(/\[.*?\]\(.*?\)/g) || []).length,
        codeBlocks: (content.match(/```/g) || []).length / 2,
      });
    }
  });

  return results;
}

// Generate report
function generateReport(results) {
  console.log('\n📚 Documentation Scan Report\n');
  console.log('='.repeat(60));
  
  let totalLines = 0;
  let totalWords = 0;
  let totalLinks = 0;
  let totalCodeBlocks = 0;
  let filesWithoutTitle = 0;
  let filesWithoutTOC = 0;

  results.forEach(doc => {
    totalLines += doc.lines;
    totalWords += doc.words;
    totalLinks += doc.links;
    totalCodeBlocks += doc.codeBlocks;
    if (!doc.hasTitle) filesWithoutTitle++;
    if (!doc.hasTOC && doc.lines > 50) filesWithoutTOC++;
  });

  console.log(`\n📊 Statistics:`);
  console.log(`   Total Files: ${results.length}`);
  console.log(`   Total Lines: ${totalLines.toLocaleString()}`);
  console.log(`   Total Words: ${totalWords.toLocaleString()}`);
  console.log(`   Total Links: ${totalLinks}`);
  console.log(`   Code Blocks: ${totalCodeBlocks}`);
  
  console.log(`\n⚠️  Issues:`);
  console.log(`   Files without title: ${filesWithoutTitle}`);
  console.log(`   Large files without TOC: ${filesWithoutTOC}`);

  console.log(`\n📁 Files by Category:`);
  const categories = {};
  results.forEach(doc => {
    const category = doc.path.split(path.sep)[0] || 'root';
    categories[category] = (categories[category] || 0) + 1;
  });
  
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`   ${cat}: ${count} files`);
  });

  console.log(`\n📄 Detailed File List:`);
  results.forEach(doc => {
    const status = doc.hasTitle ? '✅' : '⚠️ ';
    console.log(`   ${status} ${doc.path} (${doc.lines} lines, ${doc.words} words)`);
  });

  console.log('\n' + '='.repeat(60));
  console.log('✅ Scan complete!\n');
}

// Run scanner
try {
  const results = scanDocs(DOCS_DIR);
  generateReport(results);
} catch (error) {
  console.error('❌ Error scanning documentation:', error.message);
  process.exit(1);
}
