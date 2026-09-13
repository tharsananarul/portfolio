const sharp = require('./node_modules/sharp');
const fs = require('fs');
const path = require('path');

const projectRoot = __dirname;
const imagesDir = path.join(projectRoot, 'public/images');

// Recursive function to get all image files in a directory
function getImages(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      getImages(fullPath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        fileList.push(fullPath);
      }
    }
  }
  return fileList;
}

async function optimizeImages() {
  console.log('Scanning images directory...');
  const images = getImages(imagesDir);
  console.log(`Found ${images.length} images to process.\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let processedCount = 0;

  for (const imgPath of images) {
    const relPath = path.relative(projectRoot, imgPath);
    
    // Skip if it is already a webp check (only png/jpg/jpeg are in our list)
    const ext = path.extname(imgPath).toLowerCase();
    const webpPath = imgPath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
    const relWebpPath = path.relative(projectRoot, webpPath);

    const stats = fs.statSync(imgPath);
    const originalSize = stats.size;
    totalOriginalSize += originalSize;

    // Determine target width limit
    let maxWidth = 1200;
    if (relPath.includes('couvertures') || relPath.includes('ma-photo') || relPath.includes('profile')) {
      maxWidth = 800;
    } else if (relPath.includes('site') || relPath.includes('projets-crea')) {
      maxWidth = 1400;
    }

    try {
      const imageInfo = await sharp(imgPath).metadata();
      const needsResize = imageInfo.width > maxWidth;

      let pipeline = sharp(imgPath);
      if (needsResize) {
        pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
      }

      await pipeline
        .webp({ quality: 80 })
        .toFile(webpPath);

      const optimizedStats = fs.statSync(webpPath);
      const optimizedSize = optimizedStats.size;
      totalOptimizedSize += optimizedSize;
      processedCount++;

      const savings = ((1 - optimizedSize / originalSize) * 100).toFixed(1);
      console.log(`[OK] Optimized: ${relPath}`);
      console.log(`     Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB | WebP: ${(optimizedSize / 1024).toFixed(1)} KB (-${savings}%)`);
      if (needsResize) {
        console.log(`     Resized from ${imageInfo.width}px to ${maxWidth}px`);
      }
    } catch (err) {
      console.error(`[ERROR] Failed to process ${relPath}:`, err.message);
      // In case of error, if optimization failed, assume original size for total
      totalOptimizedSize += originalSize;
    }
  }

  console.log('\n======================================');
  console.log('IMAGE OPTIMIZATION COMPLETE');
  console.log(`Total images successfully processed: ${processedCount}/${images.length}`);
  console.log(`Total Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total Optimized Size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
  const totalSavings = ((1 - totalOptimizedSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`Overall Savings: -${totalSavings}%`);
  console.log('======================================\n');
}

optimizeImages();
