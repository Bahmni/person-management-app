const fs = require('fs');

const indexPath = 'build/index.html';
let html = fs.readFileSync(indexPath, 'utf8');

const cssHrefRegex = /href="\.\/static\/css\/([^"]+\.css)"/;
const cssMatch = html.match(cssHrefRegex);
if (cssMatch) {
  const originalHref = cssMatch[0];
  const cssFilename = cssMatch[1];
  const newHref = `href="/person-management/static/css/${cssFilename}"`;

  html = html.replace(originalHref, newHref);
}

const jsHrefRegex = /src="\.\/static\/js\/([^"]+\.js)"/;
const jsMatch = html.match(jsHrefRegex);
if (jsMatch) {
    const originalHref = jsMatch[0];
    const jsFilename = jsMatch[1];
    const newHref = `src="/person-management/static/js/${jsFilename}"`;
  
    html = html.replace(originalHref, newHref);
  }

fs.writeFileSync(indexPath, html);