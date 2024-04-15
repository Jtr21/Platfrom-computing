const { Builder, By,} = require('selenium-webdriver');


async function keyworduser(wanted_stock) {
    // Set up the WebDriver (make sure you have the appropriate WebDriver executable in your PATH)
    let driver = await new Builder().forBrowser('chrome').build();

    // Navigate to your website 
    await driver.get("https://stackoverflow.com/questions/3496518/using-a-dictionary-to-count-the-items-in-a-list");

    // Track presence time 
    const startTime = Date.now();
    let reward=10000;//this is 10 seconds in milliseconds
    let Totalreward = 0;
    let stock_names=[];
    //let all_stocks=document.getElementsByClassName("simpTblRow ")
    //reads the table with al the stocks
    const all_stocks= await driver.executeScript("return document.getElementsByClassName('simpTblRow ')");
    for (let i = 0; i < (all_stocks.length); i++) {
        //get the actual hmtl text from the stocks table

        let stock_name= await (driver.executeScript( `return arguments[0].firstElementChild.nextElementSibling.firstChild.textContent;`, all_stocks[i]));
        stock_names.push(stock_name);

    }
    if (stock_names.some(name => name.toLowerCase().includes(wanted_stock.toLowerCase()))){
        Totalreward+=reward;
        driver.sleep(Totalreward);
        driver.quit();
        console.log("Presence Time: ",Totalreward);
    }
    else{
        console.log( `The stock ${wanted_stock} is not here`);
        driver.quit();
    }
}


keyworduser('TEsla, inc.');


