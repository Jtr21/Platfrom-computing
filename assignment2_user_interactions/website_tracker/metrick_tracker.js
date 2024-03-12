const { Builder, By, Key, until } = require('selenium-webdriver');
const axios = require('axios');
var metrics = [];
let count=0;

async function trackMetrics() {
  // Set up the WebDriver (make sure you have the appropriate WebDriver executable in your PATH)
  let driver = await new Builder().forBrowser('chrome').build();

  // Navigate to your website 
  await driver.get("http://localhost:3000/");

  // Track presence time 
  const startTime = Date.now();
  let presenceTime = 0;
  while (true) {  // Track for 50 seconds (in milliseconds)
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
    await driver.sleep(2000);

    
    while (count<1){
      const pageText = await driver.findElement(By.tagName('body')).getText();
      console.log(`Text within the page: ${pageText}`);
      metrics.push(pageText);

      const city = await getUserCity();
      console.log(`User city: ${city}`);
      metrics.push(city);

      count++;
    }
    console.log(metrics);
  }
}

async function getUserCity() {
  try {
    const response = await axios.get('https://ipinfo.io/json');
    const { city } = response.data;
    return city;
  } catch (error) {
    console.error('Error fetching user city:', error.message);
    return 'Unknown';
  }
}

trackMetrics();