const https = require('https');

https.get('https://www.google.com/maps/place/DANTAZ+FITNESS%2F+WELLNESS/@42.5046608,1.51263', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
}, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const regex = /https:\/\/lh\d\.googleusercontent\.com\/p\/[a-zA-Z0-9_\-]+/g;
        const matches = [...new Set(data.match(regex))];
        console.log("Found " + matches.length + " unique images.");
        matches.slice(0, 10).forEach((m, i) => {
            console.log(`Image ${i+1}: ${m}=s1920-k-no`);
        });
    });
}).on('error', (e) => {
    console.error(e);
});
