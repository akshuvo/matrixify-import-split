const fs = require('fs');

const urls = fs.readFileSync('/Users/akshuvo/Desktop/WorkDir/csv-xlxs-split/csv-split/image_urls.txt', 'utf8').trim().split('\n');

const headers = ['ID', 'File Name', 'Command', 'Link', 'Alt Text', 'Created At', 'Type', 'Mime Type', 'Width', 'Height', 'Duration', 'Status', 'Errors'];

let csvContent = headers.join(',') + '\n';

urls.forEach(url => {
    url = url.trim();
    if (!url) return;
    
    // Extract file name from URL
    const urlParts = url.split('?')[0].split('/');
    const fileName = urlParts[urlParts.length - 1];
    
    // Determine mime type based on extension
    let mimeType = 'image/jpeg';
    if (fileName.toLowerCase().endsWith('.png')) mimeType = 'image/png';
    else if (fileName.toLowerCase().endsWith('.gif')) mimeType = 'image/gif';
    else if (fileName.toLowerCase().endsWith('.webp')) mimeType = 'image/webp';
    
    // Format the row matching the specific columns
    const id = '';           // ID blank for new uploads usually
    const command = 'MERGE';
    const link = url;
    const altText = '';
    const createdAt = ''; // Leave blank since it's new
    const type = 'IMAGE';
    const width = '';
    const height = '';
    const duration = '';
    const status = '';
    const errors = '';
    
    const row = [
        id,
        fileName,
        command,
        link,
        altText,
        createdAt,
        type,
        mimeType,
        width,
        height,
        duration,
        status,
        errors
    ];
    
    csvContent += row.join(',') + '\n';
});

fs.writeFileSync('/Users/akshuvo/Desktop/WorkDir/csv-xlxs-split/csv-split/output_hp.csv', csvContent, 'utf8');
console.log('Successfully created output_hp.csv');
