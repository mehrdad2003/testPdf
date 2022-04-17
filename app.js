const puppeteer = require('puppeteer');
const express = require('express');
const app = express()
function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const startMonitoring = async () => {
  const PCR = require("puppeteer-chromium-resolver");
  const option = {
      revision: "",
      detectionPath: "",
      folderName: ".chromium-browser-snapshots",
      defaultHosts: ["https://storage.googleapis.com", "https://npm.taobao.org/mirrors"],
      hosts: [],
      cacheRevisions: 2,
      retry: 3,
      silent: false
  };
  const stats = await PCR(option); 
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: stats.executablePath,
    args: [
      '--no-sandbox',
      '--disable-gpu',
    ]
  });

  const page = await browser.newPage();

  try {
    const navigationPromise = page.waitForNavigation();
    await page.goto('https://mehrdad2003.github.io/testBit/1.html',
      {
        waitUntil: 'networkidle2', timeout: 0
      });

    // const handles = await page.$$('a.content');          
    // for (const handle of handles)     
    //   await handle.click();

    await page.waitFor(randomInteger(1400000, 1450000))
    //  const items=await page.evaluate(()=>{ 
    //    return Array.from(document.querySelectorAll('.yn-item_image_wrapper'))
    //  })
    //  for(let i=0;i<items.length;i++){ 
    //  await page.click(items[i],{delay:num(15)}) 
    // await page.close()
    //   await browser.close();  

    //  } 
  } catch (err) {

    console.log(err);
  }
}


const PORT = process.env.PORT || 5000
const host = process.env.HOST || '0.0.0.0';
app.listen(PORT, host, () => {
  startMonitoring()
  console.log('server is run12');

})

