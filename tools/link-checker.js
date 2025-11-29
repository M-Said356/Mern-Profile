const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');
const PROJECT_ROOT = path.join(__dirname, '..');

// Extract all links from markdown content
function extractLinks(content) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const links = [];
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    links.push({
      text: match[1],
      url: match[2],
      isExternal: match[2].startsWith('http://') || match[2].startsWith('https://'),
      isAnchor: match[2].startsWith('#'),
    });
  }

  return links;
}

// Check if internal link exists
function checkInternalLink(fromFile, linkUrl) {
  if (linkUrl.startsWith('#')) {
    return { exists: true, type: 'anchor' };
  }

  const fromDir = path.dirname(fromFile);
  const targetPath = path.resolve(fromDir, linkUrl.split('#')[0]);
  
  const exists = fs.existsSync(targetPath);
  return { exists, path: targetPath };
}

// Check all links in documentation
function checkAllLinks(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      checkAllLinks(filePath, results);
    } else if (file.endsWith('.md')) {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = extractLinks(content);
      const relativePath = path.relative(DOCS_DIR, filePath);

      const brokenLinks = [];
      const externalLinks = [];

      links.forEach(link => {
        if (link.isExternal) {
          externalLinks.push(link);
        } else if (!link.isAnchor) {
          const check = checkInternalLink(filePath, link.url);
          if (!check.exists) {
            brokenLinks.push({
              text: link.text,
              url: link.url,
              target: check.path
            });
          }
        }
      });

      if (brokenLinks.length > 0 || externalLinks.length > 0) {
        results.push({
          file: relativePath,
          totalLinks: links.length,
          brokenLinks,
          externalLinks: externalLinks.length,
        });
      }
    }
  });

  return results;
}

// Generate link check report
function generateLinkReport(results) {
  console.log('\n🔗 Link Checker Report\n');
  console.log('='.repeat(60));

  let totalBroken = 0;
  let totalExternal = 0;
  let filesWithBroken = 0;

  results.forEach(doc => {
    totalBroken += doc.brokenLinks.length;
    totalExternal += doc.externalLinks;
    if (doc.brokenLinks.length > 0) filesWithBroken++;
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Files Checked: ${results.length}`);
  console.log(`   Files with Broken Links: ${filesWithBroken}`);
  console.log(`   Total Broken Links: ${totalBroken}`);
  console.log(`   Total External Links: ${totalExternal}`);

  if (totalBroken > 0) {
    console.log(`\n❌ Broken Links Found:\n`);

    results.forEach(doc => {
      if (doc.brokenLinks.length > 0) {
        console.log(`📝 ${doc.file}`);
        doc.brokenLinks.forEach(link => {
          console.log(`   ❌ [${link.text}](${link.url})`);
          console.log(`      Target: ${link.target}`);
        });
        console.log('');
      }
    });
  }

  console.log('='.repeat(60));
  
  if (totalBroken === 0) {
    console.log('✅ All internal links are valid!\n');
  } else {
    console.log(`⚠️  Found ${totalBroken} broken link(s). Please fix them.\n`);
  }

  if (totalExternal > 0) {
    console.log(`ℹ️  Note: ${totalExternal} external links found. Consider checking them manually.\n`);
  }
}

// Run link checker
try {
  console.log('🔍 Checking documentation links...\n');
  const results = checkAllLinks(DOCS_DIR);
  generateLinkReport(results);
  
  process.exit(results.some(r => r.brokenLinks.length > 0) ? 1 : 0);
} catch (error) {
  console.error('❌ Error checking links:', error.message);
  process.exit(1);
}
