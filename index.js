
const puppeteer = require('puppeteer');
const fs = require('fs/promises');

const XLSX = require('xlsx');




(async () => {
    
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
   
    await page.goto('https://ru.wikipedia.org/wiki/%D0%A5%D0%BE%D0%BC%D1%8F%D0%BA%D0%B8');
// take all h2 in page
    const names = await page.evaluate(() => {
      return Array.from(document.querySelectorAll("h2")).map(el => el.textContent)
    })
    // await fs.writeFile("names.txt", names.join("\r\n"));
    const jsonNames = JSON.stringify(names, null, 4);
    const namesData = await fs.writeFile('names_j.json', jsonNames, 'utf8', function(error) {
  if (error) {
    return console.error(error);
  }
  console.log("file is create")
});
// read json
const nameData = fs.readFile("./names_j.json", {ecoding : 'utf8'})
console.log(nameData)

// const newBook = XLSX.utils.book_new();
// const newSheet = XLSX.utils.json_to_sheet(names.Sheet1)
// XLSX.utils.book_append_sheet(newBook, newSheet, "Sheet1")
// XLSX.writeFile(newBook, "newBook.xlsx")

// take all img on page
//     const photos = await page.$$eval("img", (element) => {
// return element.map(el => el.src)
//     })
//     for (photo of photos) {
//       const imagepage = await page.goto(photo)
//       await fs.writeFile(photo.split("/").pop(), await imagepage.buffer())
//     }
  

    await browser.close();

  })();

  