const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');

// Read CSV file
const fileContent = fs.readFileSync('input.csv', 'utf8');

// Parse to JSON (array of objects)
let data = parse(fileContent, { columns: true, skip_empty_lines: true, bom: true });

// Stop if empty
if (!data.length) {
  console.log("No data found!");
  process.exit(0);
}

// 🔥 Reverse rows (Z → A)
data = data.reverse();

const chunkSize = 10;

for (let i = 0; i < data.length; i += chunkSize) {
  const chunk = data.slice(i, i + chunkSize);

  // Convert chunk back to CSV string
  const outputCsv = stringify(chunk, { header: true });

  // Write to new file
  fs.writeFileSync(`output_${Math.floor(i / chunkSize) + 1}.csv`, outputCsv);
}

console.log("Reversed + split completed!");
