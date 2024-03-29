const { Builder, By,} = require('selenium-webdriver');
const axios = require('axios');
const mysql = require('mysql2');



// MySQL database configuration

var metrics = [];
let count=0;


async function trackMetrics() {
  // Set up the WebDriver (make sure you have the appropriate WebDriver executable in your PATH)
  let driver = await new Builder().forBrowser('chrome').build();

  // Navigate to your website 
  await driver.get("http://localhost:3000/");

  // Track presence time 
  const startTime = Date.now();
  const unique_id=Math.random()*startTime;
  let presenceTime = 0;
  while (true) {  // Track for 50 seconds (in milliseconds)
    try {
      await driver.getWindowHandle(); // This will throw an error if the window is closed
    } catch (error) {
      console.log('Window is closed');
      break; // Exit the loop if the window is closed
    }
    const currentTime = Date.now();
    presenceTime = currentTime - startTime;
    var timeonsite = presenceTime / 1000;
    console.log(`Presence time: ${timeonsite} seconds`);
    metrics[0]=unique_id;
    metrics[1]=timeonsite;

    // Track scrolling
    const scrollHeight = await driver.executeScript("return document.body.scrollHeight");
    const currentScroll = await driver.executeScript("return window.pageYOffset");
    let total_pixel_scrolled=0;
    var pix_scrolled = currentScroll / scrollHeight;
    total_pixel_scrolled+=pix_scrolled;
    console.log(`Scrolled ${pix_scrolled} pixels`);
    metrics[2]=total_pixel_scrolled;
    await driver.sleep(2000);

    
    while (count<1){
      const pageText = await driver.findElement(By.tagName('body')).getText();
      console.log(`Text within the page: ${pageText}`);
      metrics[3]=pageText;

      const city = await getUserCity();
      console.log(`User city: ${city}`);
      metrics[4]=(city);

      count++;
    }
  }

  console.log(metrics);
  insertMetrics(metrics);
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

async function insertMetrics(data) {
  try {
    // Create a connection to the MySQL database
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'Riverside21!',
      database: 'platformcomputing_metrick_tracker' // Replace with your database name
    });
    connection.connect(err => {
      if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
      }
      console.log('Connected to MySQL database.');
    });
    // Insert metrics into the database

    //console.log('here are the metrics', metrics);
    await connection.execute('INSERT INTO metric_tacker_info (user_info,timeonsite, pixels_scrolled,sitetext, user_city) VALUES (?,?, ?,?, ?)', data);

    console.log('Metrics inserted into database.');
    
    // Close the connection
    await connection.end();
  } catch (error) {
    console.error('Error inserting metrics into database:', error);
  }
}


trackMetrics();
