
const puppeteer = require('puppeteer');
const fs = require('fs/promises');



(async () => {
    
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
   
    await page.goto('https://uk.wikipedia.org/wiki/JavaScript');

    const name = ["Ira", "Mary", "Ann"]
    await fs.writeFile("names.txt", name.join("\r\n"));

    const photos = await page.$$eval("img", (element) => {
return element.map(el => el.src)
    })
    for (photo of photos) {
      const imagepage = await image.goto(photo)
      await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
    }
  

    await browser.close();

  })();

