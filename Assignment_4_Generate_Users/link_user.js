const { Builder, By,} = require('selenium-webdriver');
const { JSDOM } = require('jsdom');

async function findWord(driver,wordlist){
    let pgs=await driver.getPageSource();
    for (let i=0; i<wordlist.length;i++){
        if(pgs.toLowerCase().includes(wordlist[i].toLowerCase()))
        {
            console.log(true);
            return true;
        }
    }
    return false;
    
}

// async function tag_element_count(driver, tag_names) {
//     let count = 0;
//     for (let tag of tag_names) {
//         console.log("pre elements",);
//         try {
//             let elements = await driver.findElements(By.css(tag));
//             console.log("elements", elements);
//             count += elements.length;
//         } catch (error) {
//             console.error('Error occurred:', error);
//         }
//     }
//     console.log("Count:", count); // Log count to ensure it's correct
//     return count; // Return count here
// }

async function tag_element_count(driver, tags) {
    let pgs = await driver.getPageSource();

    // Parse the page source into a DOM structure using jsdom
    const dom = new JSDOM(pgs);
    const document = dom.window.document;

    let totalCount = 0;

    // Loop through each tag
    for (let tag of tags) {
        let count = document.getElementsByTagName(tag).length;
        totalCount += count;
    }

    // Return the total tag count
    console.log("Total count:", totalCount);
    return totalCount;
}






async function findLink() {
    // Fetch the webpage content
    const response = await fetch("https://www.pbase.com/tmurray74/caterpillars");
    const html = await response.text();

    // Parse the HTML content using jsdom
    const dom = new JSDOM(html);
    const document = dom.window.document;

    // Find the first anchor element
    let firstLink = document.querySelector('a');

    if (!firstLink) {
        console.error("Error finding the first link");
        return false;
    }

    // Simulate a click on the first anchor element
    // (Since jsdom doesn't actually navigate, we'll just log the href)
    console.log("Clicked on the first link:", firstLink.href);

    // Return true to indicate successful "click"
    return true;
}


async function plink(driver) {
    await driver.get(driver.getCurrentUrl());

    async function clickLinkAndWait() {
        const allLinks = await driver.findElements(By.tagName('a'));
        
        if (allLinks.length > 0) {
            await allLinks[0].click();
            total_reward += reward;
            console.log("Presence Time: ", total_reward);
            await driver.sleep(reward);
            await clickLinkAndWait();
        } else {
            console.log("No more links found.");
        }
    }

    let total_reward = 0;
    const reward = 10000;

    await clickLinkAndWait();
}




async function linkUser(action, driver,reward_time,req_list){
    let total_rewardTime = 0;
    if (action.toLowerCase()=="keyword"){
        for (let i=0; i<req_list.length;i++){
            if(findWord(driver,req_list)){
                total_rewardTime+=reward_time;
            }
            else
            {
                console.log("Not Found")
            }
        }
    }
    else if(action.toLowerCase=="image"){
        let num_images=tag_element_count(driver,req_list);
        total_rewardTime=reward_time*num_images;
        driver.sleep(total_rewardTime);
    return total_rewardTime;
        

    }

}



async function check(){
    let driver = await new Builder().forBrowser('chrome').build();
    await driver.get("https://www.pbase.com/tmurray74/caterpillars");
    driver.sleep(1000);
    findWord(driver,[""]);
    let count= await tag_element_count(driver,["img"]);
    console.log(count);
    findLink(driver);
    plink(driver);
    driver.quit();

}

check();