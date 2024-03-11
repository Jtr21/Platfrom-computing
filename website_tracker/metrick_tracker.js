const { Builder, By, Key, until } = require('selenium-webdriver');


async function trackMetrics() {
  // Set up the WebDriver (make sure you have the appropriate WebDriver executable in your PATH)
  let driver = await new Builder().forBrowser('chrome').build();

  // Navigate to your website 
  await driver.get("http://localhost:3000/");
  let metrics=[];
  // Track presence time 
  const startTime = Date.now();
  let presenceTime = 0;
  while (presenceTime < 50000) {  // Track for 50 seconds (in milliseconds)
    const currentTime = Date.now();
    presenceTime = currentTime - startTime;
    var  timeonsite=presenceTime / 1000;
    console.log(`Presence time: ${timeonsite} seconds`);
    metrics.push(timeonsite);

    // Track scrolling
    const scrollHeight = await driver.executeScript("return document.body.scrollHeight");
    const currentScroll = await driver.executeScript("return window.pageYOffset");
    var pix_scrolled=currentScroll/scrollHeight;
    console.log(`Scrolled ${pix_scrolled} pixels`);
    metrics.push(pix_scrolled);

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
  console.log(metrics);
}

// Run the function
trackMetrics();

