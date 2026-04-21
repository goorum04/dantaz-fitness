const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://www.google.com/search?q=DANTAZ+FITNESS+ANDORRA&tbm=isch', { waitUntil: 'domcontentloaded' });
        
        const images = await page.evaluate(() => {
            const imgs = document.querySelectorAll('img');
            const urls = [];
            for (let img of imgs) {
                if (img.src && img.src.startsWith('http') && !img.src.includes('googlelogo')) {
                    urls.push(img.src);
                }
            }
            return urls.slice(1, 5); // Skip first few which might be icons
        });
        
        fs.writeFileSync('images.json', JSON.stringify(images));
        await browser.close();
        console.log('Images extracted successfully:', images);
    } catch(err) {
        console.error('Error:', err);
    }
})();
