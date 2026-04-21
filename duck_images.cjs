const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        // Let's use duckduckgo image search for the specific instagram or just dantaz fitness
        await page.goto('https://duckduckgo.com/?q=DANTAZ+FITNESS+ANDORRA&iax=images&ia=images', { waitUntil: 'domcontentloaded' });
        
        // Wait for images to load
        await new Promise(r => setTimeout(r, 3000));
        
        const images = await page.evaluate(() => {
            const imgs = document.querySelectorAll('img.tile--img__img');
            const urls = [];
            for (let img of imgs) {
                if (img.src && img.src.startsWith('http')) {
                    urls.push(img.src);
                } else if (img.dataset && img.dataset.src) { // sometimes duckduckgo uses data-src
                    urls.push(img.dataset.src);
                }
            }
            return urls.slice(0, 5);
        });
        
        console.log("Found DuckDuckGo Images:");
        console.log(images);
        
        await browser.close();
    } catch(err) {
        console.error('Error:', err);
    }
})();
