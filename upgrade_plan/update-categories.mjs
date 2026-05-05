import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'src/content/blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has category
  if (content.match(/^category:/m)) {
    console.log(`Skipping ${file}, category already exists.`);
    continue;
  }

  // Determine category based on content (title, tags)
  const titleMatch = content.match(/^title:\s*(.*)/m);
  const tagsMatch = content.match(/^tags:\s*\[(.*?)\]/m) || content.match(/^tags:\s*\n((?:\s*-\s*.*\n)*)/m);
  
  const title = titleMatch ? titleMatch[1] : '';
  const tagsStr = tagsMatch ? tagsMatch[0] : '';
  
  let categories = new Set();
  
  const textToAnalyze = (title + ' ' + tagsStr + ' ' + file).toLowerCase();
  
  if (textToAnalyze.includes('neims') || textToAnalyze.includes('superlizer') || textToAnalyze.includes('雷射') || textToAnalyze.includes('特色治療') || textToAnalyze.includes('針極') || textToAnalyze.includes('高階儀器') || textToAnalyze.includes('增生療法')) {
    categories.add('特色治療');
  }
  
  if (textToAnalyze.includes('良醫') || textToAnalyze.includes('雜誌') || textToAnalyze.includes('專訪') || textToAnalyze.includes('廣播') || textToAnalyze.includes('媒體') || textToAnalyze.includes('報導') || textToAnalyze.includes('award') || textToAnalyze.includes('top-rehab-doctor')) {
    categories.add('媒體報導');
  }
  
  // Default to 復健衛教 if missing other indicators
  if (categories.size === 0 || textToAnalyze.includes('痛') || textToAnalyze.includes('症候群') || textToAnalyze.includes('復健') || textToAnalyze.includes('衛教') || textToAnalyze.includes('傷害') || textToAnalyze.includes('保健')) {
    categories.add('復健衛教');
  }

  const categoryStr = `category: [${Array.from(categories).map(c => `'${c}'`).join(', ')}]`;
  
  // Insert category after tags
  if (tagsMatch) {
    content = content.replace(tagsMatch[0], `${categoryStr}\n${tagsMatch[0]}`);
  } else {
    // If no tags, insert before author or description
    content = content.replace(/^author:/m, `${categoryStr}\nauthor:`);
  }
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${file} with categories: ${Array.from(categories).join(', ')}`);
}
