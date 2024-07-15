// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');

(async () => {
    
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.setViewport({width: 1080, height: 1024});
    await page.goto('https://linkedin.com/in/iryna-rybka-95482819a')



  })();

