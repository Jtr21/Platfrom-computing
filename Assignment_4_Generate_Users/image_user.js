const { Builder, By,} = require('selenium-webdriver');


async function image_user(website) {
    // Set up the WebDriver (make sure you have the appropriate WebDriver executable in your PATH)
    let driver = await new Builder().forBrowser('chrome').build();

    // Navigate to your website 
    await driver.get(website);


    let total_reward=0;
    let reward=10000;//this is 10 seconds in milliseconds
    
    const all_pics= await  driver.executeScript('return document.getElementsByTagName("img");');

    for(let i=0;i<all_pics.length;i++){
        total_reward+=reward;
        await driver.sleep(total_reward);
    }

    console.log("Presence Time: ", total_reward);
    driver.quit();
    
}


image_user('https://rosswintle.uk/2016/11/websites-without-photos/');