
const puppeteer = require('puppeteer');
const fs = require('fs/promises');



(async () => {
    
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
   
    await page.goto('https://ru.wikipedia.org/wiki/%D0%A5%D0%BE%D0%BC%D1%8F%D0%BA%D0%B8');
// take all h2 in page
    const names = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("h2")).map(el => el.textContent)
    })
    await fs.writeFile("names.txt", names.join("\r\n"));
// take all img on page
    const photos = await page.$$eval("img", (element) => {
return element.map(el => el.src)
    })
    for (photo of photos) {
      const imagepage = await page.goto(photo)
      await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
    }
  

    await browser.close();

  })();

