const { Builder, By, Key, until } = require('selenium-webdriver');

let metrics = [];

async function trackMetrics() {
  // Set up the WebDriver (make sure you have the appropriate WebDriver executable in your PATH)
  let driver = await new Builder().forBrowser('chrome').build();

  // Navigate to your website 
  await driver.get("http://localhost:3000/");

  // Track presence time 
  const startTime = Date.now();
  let presenceTime = 0;
  while (presenceTime < 50000) {  // Track for 50 seconds (in milliseconds)
    const currentTime = Date.now();
    presenceTime = currentTime - startTime;
    var timeonsite = presenceTime / 1000;
    console.log(`Presence time: ${timeonsite} seconds`);
    metrics.push(timeonsite);

    // Track scrolling
    const scrollHeight = await driver.executeScript("return document.body.scrollHeight");
    const currentScroll = await driver.executeScript("return window.pageYOffset");
    var pix_scrolled = currentScroll / scrollHeight;
    console.log(`Scrolled ${pix_scrolled} pixels`);
    metrics.push(pix_scrolled);

    // Read text content within the page
    const pageText = await driver.findElement(By.tagName('body')).getText();
    console.log(`Text within the page: ${pageText}`);
    metrics.push(pageText);

    // Track user's location on the webpage
    const userLocation = await driver.executeScript("return [window.scrollX, window.scrollY];");
    console.log(`User location: ${userLocation}`);
    metrics.push(userLocation);

    await driver.sleep(2000);

    // Track clicks
    // const buttons = await driver.findElements(By.tagName("button"));
    // let numClicks = 0;

    // for (const button of buttons) {
    //   await button.click();
    //   numClicks++;
    // }

    // console.log(`Number of clicks: ${numClicks}`);
  }

  // Close the browser window
  await driver.quit();
  
  return metrics;
}