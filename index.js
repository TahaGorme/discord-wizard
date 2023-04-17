const puppeteer = require("puppeteer-extra");
const fs = require("fs-extra");
const usernames = fs.readFileSync('./input/usernames.txt', 'utf-8').split('\n')
const mails = fs.readFileSync('./input/mails.txt', 'utf-8').split('\n')
const accounts = fs.readFileSync('./output/accounts.txt', 'utf-8').split('\n')

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: "2captcha api key",
    },
    visualFeedback: true,
  })
);

function wait(timeInMs) {
  return new Promise(resolve => {
    setTimeout(resolve, timeInMs)
  })
}

puppeteer
  .launch({ headless: false, defaultViewport: null, ignoreHTTPSErrors: true })
  .then(async (browser) => {
    const page = await browser.newPage();
    await wait(300)

    await page.goto("https://www.discord.com/register");
    // Resize window to 1536 x 718
    //await page.setViewport({ width: 1536, height: 718 });

    username = usernames[Math.floor(Math.random() * usernames.length)]
    mailCount = accounts.length
    console.log(mailCount)  
    mail = mails[mailCount]
    accountSplit = mail.split(':')
    email = mail
    password = generatePassword();
    console.log(username, email, password)    

  var month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ][Math.floor(Math.random() * 12)];
    var date = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
    ][Math.floor(Math.random() * 28)];
    var year = [
      "1980",
      "1981",
      "1982",
      "1983",
      "1984",
      "1985",
      "1986",
      "1987",
      "1988",
      "1989",
      "1990",
      "1991",
      "1992",
      "1993",
      "1994",
      "1995",
      "1996",
      "1997",
      "1998",
      "1999",
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
    ][Math.floor(Math.random() * 26)];
    // Click on <input> #uid_5
    await page.waitForSelector("#uid_5");
    await page.click("#uid_5");
    await wait(400)

    await page.waitForSelector("#uid_5:not([disabled])");
    await page.type("#uid_5", email);
    await wait(300)

    await page.waitForSelector("#uid_6");
    await page.click("#uid_6");
    await wait(500)

    await page.waitForSelector("#uid_6:not([disabled])");
    await page.type("#uid_6", username);
    await wait(300)

    await page.waitForSelector("#uid_7");
    await page.click("#uid_7");
    await wait(300)

    await page.waitForSelector("#uid_7:not([disabled])");
    await page.type("#uid_7", password);
    await wait(600)

    await page.waitForSelector(
      "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div.app-3xd6d0 > div > div > div > form > div.centeringWrapper-dGnJPQ > div > fieldset > div.inputs-3ELGTz > div.month-1Z2bRu > div > div > div > div > div.css-1hwfws3 > div.css-mb2az-placeholder > span"
    );
    await wait(900)
    await page.click(
      "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div.app-3xd6d0 > div > div > div > form > div.centeringWrapper-dGnJPQ > div > fieldset > div.inputs-3ELGTz > div.month-1Z2bRu > div > div > div > div > div.css-1hwfws3 > div.css-mb2az-placeholder > span"
    );

    await page.waitForSelector(".css-kfxh0s-control span");
    await page.click(".css-kfxh0s-control span");
    await wait(300)

    await page.waitForSelector("#react-select-2-input:not([disabled])");
    await page.type("#react-select-2-input", month);
    await wait(300)

    await page.waitForSelector("#react-select-2-input");
    await page.keyboard.press("Enter");

    await page.waitForSelector("#react-select-3-input:not([disabled])");
    await page.type("#react-select-3-input", date);

    await page.waitForSelector("#react-select-3-input");
    await page.keyboard.press("Enter");
    await wait(300)

    await page.waitForSelector("#react-select-4-input:not([disabled])");
    await page.type("#react-select-4-input", year);
    await wait(700)

    await page.waitForSelector("#react-select-4-input");
    await page.keyboard.press("Enter");

    await page.waitForSelector(".inputDefault-2DXavk");
    await page.click(".inputDefault-2DXavk");
    await wait(300)

    await page.waitForSelector(".button-1cRKG6");
    await page.click(".button-1cRKG6");

    // setTimeout(async () => {
      await page.waitForSelector("[src*=sitekey]");
      await page.addScriptTag({ content: `hcaptcha.execute()` });

      await page.solveRecaptchas();

    // }, 3000);

    fs.appendFile('./output/accounts.txt', `${mail}:${password}\n`, (err) => {
      if (err) throw err;
    }); 
  });
const generatePassword = () => { const length = 16; const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="; let password = ""; for (let i = 0; i < length; i++) { const randomIndex = Math.floor(Math.random() * charset.length); password += charset[randomIndex]; } return password; }

  
