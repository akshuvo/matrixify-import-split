const fs = require('fs');
const content = fs.readFileSync('/Users/akshuvo/Desktop/WorkDir/csv-xlxs-split/csv-split/demo.html', 'utf8');

const regex = /domain\.com\/cdn\/shop\/files\/[^"\s'<>]+?\.(?:png|jpg|jpeg|gif|webp|svg)(?:\?v=\d+)?/g;
const matches = content.match(regex);

if (!matches) {
    console.log("No matches found.");
    process.exit(0);
}

// 1. Reconstruct baseline URL without query strings and size modifiers
const baseUrls = matches.map(url => {
    // strip the leading //
    let urlStr = `https://${url.replace(/^\/\//, '')}`;
    
    // strip the query string if any (?v=...)
    urlStr = urlStr.split('?')[0];
    
    // strip Shopify image size modifiers like _300x, _1024x1024, _150x@2x, _32x32, etc.
    // before the file extension.
    urlStr = urlStr.replace(/_\d+x\d*(?:@2x)?(?=\.\w+$)/i, '');
    
    return urlStr;
});

// 2. Remove duplicates
const uniqueBaseUrls = [...new Set(baseUrls)];

fs.writeFileSync('/Users/akshuvo/Desktop/WorkDir/csv-xlxs-split/csv-split/image_urls.txt', uniqueBaseUrls.join('\n'), 'utf8');
console.log(`Saved ${uniqueBaseUrls.length} main URLs to csv-split/image_urls.txt`);
