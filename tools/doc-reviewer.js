const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');

// Review criteria
const REVIEW_CRITERIA = {
  minLines: 10,
  minWords: 50,
  requireTitle: true,
  requireTOCForLargeFiles: 100, // lines
  checkBrokenLinks: true,
  checkCodeBlocks: true,
};

// Review a single document
function reviewDocument(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const issues = [];
  const suggestions = [];

  // Check minimum content
  if (lines.length < REVIEW_CRITERIA.minLines) {
    issues.push(`File is too short (${lines.length} lines, minimum ${REVIEW_CRITERIA.minLines})`);
  }

  if (words.length < REVIEW_CRITERIA.minWords) {
    issues.push(`File has too few words (${words.length} words, minimum ${REVIEW_CRITERIA.minWords})`);
  }

  // Check for title
  if (REVIEW_CRITERIA.requireTitle && !content.startsWith('#')) {
    issues.push('Missing main title (should start with #)');
  }

  // Check for TOC in large files
  if (lines.length > REVIEW_CRITERIA.requireTOCForLargeFiles) {
    if (!content.includes('## Table of Contents') && !content.includes('## Contents')) {
      suggestions.push('Consider adding a Table of Contents for better navigation');
    }
  }

  // Check for code blocks balance
  const codeBlockMarkers = (content.match(/```/g) || []).length;
  if (codeBlockMarkers % 2 !== 0) {
    issues.push('Unbalanced code blocks (missing closing ```)');
  }

  // Check for empty links
  const emptyLinks = content.match(/\[.*?\]\(\s*\)/g);
  if (emptyLinks) {
    issues.push(`Found ${emptyLinks.length} empty link(s)`);
  }

  // Check for TODO or FIXME
  const todos = content.match(/TODO|FIXME/gi);
  if (todos) {
    suggestions.push(`Found ${todos.length} TODO/FIXME comment(s) to address`);
  }

  // Check for proper headings hierarchy
  const headings = content.match(/^#+\s/gm) || [];
  if (headings.length > 0) {
    const levels = headings.map(h => h.match(/^#+/)[0].length);
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i-1] > 1) {
        suggestions.push('Heading hierarchy skips levels (e.g., # to ###)');
        break;
      }
    }
  }

  return { issues, suggestions, stats: { lines: lines.length, words: words.length } };
}

// Review all documents
function reviewAllDocs(dir, results = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      reviewAllDocs(filePath, results);
    } else if (file.endsWith('.md')) {
      const relativePath = path.relative(DOCS_DIR, filePath);
      const review = reviewDocument(filePath);
      
      results.push({
        path: relativePath,
        ...review
      });
    }
  });

  return results;
}

// Generate review report
function generateReviewReport(results) {
  console.log('\n🔍 Documentation Review Report\n');
  console.log('='.repeat(60));

  let totalIssues = 0;
  let totalSuggestions = 0;
  let filesWithIssues = 0;

  results.forEach(doc => {
    totalIssues += doc.issues.length;
    totalSuggestions += doc.suggestions.length;
    if (doc.issues.length > 0) filesWithIssues++;
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Total Files Reviewed: ${results.length}`);
  console.log(`   Files with Issues: ${filesWithIssues}`);
  console.log(`   Total Issues: ${totalIssues}`);
  console.log(`   Total Suggestions: ${totalSuggestions}`);

  console.log(`\n📄 Detailed Review:\n`);

  results.forEach(doc => {
    if (doc.issues.length > 0 || doc.suggestions.length > 0) {
      console.log(`📝 ${doc.path}`);
      console.log(`   Stats: ${doc.stats.lines} lines, ${doc.stats.words} words`);
      
      if (doc.issues.length > 0) {
        console.log(`   ❌ Issues:`);
        doc.issues.forEach(issue => console.log(`      - ${issue}`));
      }
      
      if (doc.suggestions.length > 0) {
        console.log(`   💡 Suggestions:`);
        doc.suggestions.forEach(suggestion => console.log(`      - ${suggestion}`));
      }
      
      console.log('');
    }
  });

  const healthScore = Math.round(((results.length - filesWithIssues) / results.length) * 100);
  console.log('='.repeat(60));
  console.log(`\n📈 Documentation Health Score: ${healthScore}%`);
  
  if (healthScore >= 90) {
    console.log('✅ Excellent! Documentation is in great shape.\n');
  } else if (healthScore >= 70) {
    console.log('⚠️  Good, but some improvements needed.\n');
  } else {
    console.log('❌ Needs attention. Please address the issues above.\n');
  }
}

// Run reviewer
try {
  console.log('🔍 Starting documentation review...\n');
  const results = reviewAllDocs(DOCS_DIR);
  generateReviewReport(results);
} catch (error) {
  console.error('❌ Error reviewing documentation:', error.message);
  process.exit(1);
}
