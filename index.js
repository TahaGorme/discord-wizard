const puppeteer = require("puppeteer-extra");
const fs = require("fs-extra");
const usernames = fs.readFileSync("./input/usernames.txt", "utf-8").split("\n");
const useragents = fs
  .readFileSync("./input/useragents.txt", "utf-8")
  .split("\n");
const config = require("./config.json");
let emails;
let username, email, password, mail;
fetch("https://www.emailnator.com/generate-email", {
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.8",
    "content-type": "application/json",
    "sec-ch-ua": '"Chromium";v="112", "Brave";v="112", "Not:A-Brand";v="99"',
    "sec-ch-ua-mobile": "?1",
    "sec-ch-ua-platform": '"Android"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-requested-with": "XMLHttpRequest",
    "x-xsrf-token":
      "eyJpdiI6Ii9jNDFvN3BLY3MwSkVsdnBlcWZDRnc9PSIsInZhbHVlIjoiUGo5a090T2hEUUdCNXdteWlSK1V0ZVVuVEVJT3M1djgyZXFvQ1htOUl4ck1VV3FkTkFjK0NTQXZLZFVQWUE4aWNxRGZ4bFR6ZVhNWXJhY2RzOU5BN1JoVzVaZEhUWFZZbnF0NHZ3eGcxNnc2VFRxdkxnNlFMU0E3S2NDWE14MWEiLCJtYWMiOiI0MTc1NDk0OWY0ZmM4NjVmOTAxZTRhNTliNDA2NzdlMjlmNjg1MmE4OWRhYzcxYTBmNzAyNmQ4NTk1YzE0MzI5IiwidGFnIjoiIn0=",
    cookie:
      "XSRF-TOKEN=eyJpdiI6Ii9jNDFvN3BLY3MwSkVsdnBlcWZDRnc9PSIsInZhbHVlIjoiUGo5a090T2hEUUdCNXdteWlSK1V0ZVVuVEVJT3M1djgyZXFvQ1htOUl4ck1VV3FkTkFjK0NTQXZLZFVQWUE4aWNxRGZ4bFR6ZVhNWXJhY2RzOU5BN1JoVzVaZEhUWFZZbnF0NHZ3eGcxNnc2VFRxdkxnNlFMU0E3S2NDWE14MWEiLCJtYWMiOiI0MTc1NDk0OWY0ZmM4NjVmOTAxZTRhNTliNDA2NzdlMjlmNjg1MmE4OWRhYzcxYTBmNzAyNmQ4NTk1YzE0MzI5IiwidGFnIjoiIn0%3D; gmailnator_session=eyJpdiI6IlUrRWVoTXc5NFpkSGs2NG9kdUpCbkE9PSIsInZhbHVlIjoiakdZd0Fxb3U3QVNlbWllUitJSnRBbk10UEYxcHZSdUViMk80N1pPNEY4cnh2NTJmeWcrYlRCNFo0YzBrdWRFMUl5cGM3ZktPRlU4dkljNlVvdk9VM2YvMmJrTmtnNytYU0FocTRTNWJTY2gxZHpaMXdDa0lxb25maXJwdW5DeUYiLCJtYWMiOiJkMWU1NDRlNGRmNGI5NGQyYWM5MDhkN2FlNzFlNjI3YmRkODBkNWRjMzBjYjE5ZTkyZDJhMTcyNjQ3ODg5NDhkIiwidGFnIjoiIn0%3D",
    Referer: "https://www.emailnator.com/bulk-emails",
    "Referrer-Policy": "strict-origin-when-cross-origin",
  },
  body: '{"email":["plusGmail","dotGmail"],"emailNo":"1000"}',
  method: "POST",
})
  .then((res) => res.json())
  .then((json) => {
    emails = Object.keys(json).map(function (key) {
      return json[key];
    });
  });

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: config.captcha_api_key,
    },
    visualFeedback: true,
  })
);

function wait(timeInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
}

puppeteer
  .launch({ headless: false, defaultViewport: null, ignoreHTTPSErrors: true })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.setUserAgent(
      useragents[Math.floor(Math.random() * useragents.length)].trim()
    );

    await page.goto("https://www.discord.com/register", {
      waitUntil: "networkidle0",
      timeout: 70000,
    });
    // Resize window to 1536 x 718
    //await page.setViewport({ width: 1536, height: 718 });

    username = usernames[Math.floor(Math.random() * usernames.length)];
    // mailCount = accounts.length;
    // console.log(mailCount);
    email = emails[0][Math.floor(Math.random() * emails.length)];
    password = generatePassword();
    console.log(username, email, password);

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
    await wait(randomInt(300, 400));

    await page.waitForSelector("#uid_5:not([disabled])");
    await page.type("#uid_5", email);
    await wait(randomInt(300, 400));

    await page.waitForSelector("#uid_6");
    await page.click("#uid_6");
    await wait(randomInt(300, 500));

    await page.waitForSelector("#uid_6:not([disabled])");
    await page.type("#uid_6", username);
    await wait(randomInt(300, 450));

    await page.waitForSelector("#uid_7");
    await page.click("#uid_7");
    await wait(randomInt(250, 300));

    await page.waitForSelector("#uid_7:not([disabled])");
    await page.type("#uid_7", password);
    // await wait(randomI);

    await page.waitForSelector(
      "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div.app-3xd6d0 > div > div > div > form > div.centeringWrapper-dGnJPQ > div > fieldset > div.inputs-3ELGTz > div.month-1Z2bRu > div > div > div > div > div.css-1hwfws3 > div.css-mb2az-placeholder > span"
    );
    await wait(randomInt(400, 500));
    await page.click(
      "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div.app-3xd6d0 > div > div > div > form > div.centeringWrapper-dGnJPQ > div > fieldset > div.inputs-3ELGTz > div.month-1Z2bRu > div > div > div > div > div.css-1hwfws3 > div.css-mb2az-placeholder > span"
    );

    await page.waitForSelector(".css-kfxh0s-control span");
    await page.click(".css-kfxh0s-control span");
    await wait(randomInt(200, 300));

    await page.waitForSelector("#react-select-2-input:not([disabled])");
    await page.type("#react-select-2-input", month);
    await wait(randomInt(300, 400));

    await page.waitForSelector("#react-select-2-input");
    await page.keyboard.press("Enter");

    await page.waitForSelector("#react-select-3-input:not([disabled])");
    await page.type("#react-select-3-input", date);

    await page.waitForSelector("#react-select-3-input");
    await page.keyboard.press("Enter");
    await wait(randomInt(300, 500));

    await page.waitForSelector("#react-select-4-input:not([disabled])");
    await page.type("#react-select-4-input", year);
    await wait(randomInt(200, 450));

    await page.waitForSelector("#react-select-4-input");
    await page.keyboard.press("Enter");

    await page.waitForSelector(".inputDefault-2DXavk");
    await page.click(".inputDefault-2DXavk");
    await wait(randomInt(150, 200));

    await page.waitForSelector(".button-1cRKG6");
    await page.click(".button-1cRKG6");

    // setTimeout(async () => {
    try {
      await page.waitForSelector("[src*=sitekey]");
      await page.addScriptTag({ content: `hcaptcha.execute()` });

      while (true) {
        try {
          await page.solveRecaptchas();

          return true;
        } catch (err) {
          sleep(3000);
        }
      }
    } catch (e) {}

    fetch("https://www.emailnator.com/message-list", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Chromium";v="112", "Brave";v="112", "Not:A-Brand";v="99"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token":
          "eyJpdiI6IlBQS2hMb3dISU5oZ2srRVlJUzZsb1E9PSIsInZhbHVlIjoiZ3gwS3AxSCtmcytIMWovZWs5Qzl3dE95YWlsQmVGQ0haNmFWNXMxNi8rQjN1Y3MranMvVUI1U1h0eGxFSVVtODltZG1lUXFrdTcwcTZiSWZFRjBjaUlseEh3UGs3ZE1yaEcrV3NaVjh0WldCSFBoRVp5Q0xPSEh5MmV2S0FDNUsiLCJtYWMiOiJhNjM3NDVmOTUwMzgxY2FiMjI0ZWU3Yjk3ZjU0YjljYjg1MGJmNjYzOTVmMzU2NDgzNTUxMDQzMmQ0OThjMWI2IiwidGFnIjoiIn0=",
        cookie:
          "XSRF-TOKEN=eyJpdiI6IlBQS2hMb3dISU5oZ2srRVlJUzZsb1E9PSIsInZhbHVlIjoiZ3gwS3AxSCtmcytIMWovZWs5Qzl3dE95YWlsQmVGQ0haNmFWNXMxNi8rQjN1Y3MranMvVUI1U1h0eGxFSVVtODltZG1lUXFrdTcwcTZiSWZFRjBjaUlseEh3UGs3ZE1yaEcrV3NaVjh0WldCSFBoRVp5Q0xPSEh5MmV2S0FDNUsiLCJtYWMiOiJhNjM3NDVmOTUwMzgxY2FiMjI0ZWU3Yjk3ZjU0YjljYjg1MGJmNjYzOTVmMzU2NDgzNTUxMDQzMmQ0OThjMWI2IiwidGFnIjoiIn0%3D; gmailnator_session=eyJpdiI6IllpSWFUQ2ZPRnRWeUsyWDQxSDhQZEE9PSIsInZhbHVlIjoid29wa1FIMUREQWpqR3owTkhmK0xKWDFzclpwcUNaeDZvQXhNU3VFMzd3Y0J1djZNek4rRTEyVmg1MlFwQldDa2puMGZJVVhFQzMvV3pIU3JHM3Z2bjNpNFJPcnR0T1h6bnl6YVYxWGZMVXlSbHN0dUQrY1pYSWhkN3pPT0tSaUsiLCJtYWMiOiI3MTNmZjhlOWVhZDgyYzRiNGU4OTk1NzY0Mzc2YTBkNjRmYTZlNzBjZjkyODZlYWJhNWZlNzU0YmQ0NzRhZjliIiwidGFnIjoiIn0%3D",
        Referer: "https://www.emailnator.com/inbox",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `{"email":"${email}"}`,
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.messageData.length > 1) {
          var index = 1;

          verifyEmail(data, index, email, page);
        }
      });

    fs.appendFile("./output/accounts.txt", `${email}:${password}\n`, (err) => {
      if (err) throw err;
    });
  });
const generatePassword = () => {
  const length = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
async function verifyEmail(data, index, email, page) {
  var discordRegex =
    /^((https?:)(\/\/\/?)([\w]*(?::[\w]*)?@)?([\d\w\.-]+)(?::(\d+))?)?([\/\\\w\.()-]*)?(?:([?][^#]*)?(#.*)?)*/gim;

  if (
    data.messageData[index].subject.includes(
      "Verify Email Address for Discord"
    ) &&
    data.messageData[index].from.includes("noreply@discord.com")
  ) {
    fetch("https://www.emailnator.com/message-list", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua":
          '"Chromium";v="112", "Brave";v="112", "Not:A-Brand";v="99"',
        "sec-ch-ua-mobile": "?1",
        "sec-ch-ua-platform": '"Android"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token":
          "eyJpdiI6InUxanIreVphQnpOcGJoblg5SSswZFE9PSIsInZhbHVlIjoiUE12MUtTNTFobGhCUEZ2ZnZPd2FyQUcvTlBMNXEyZm5uSVYyVlNiQ2lnV25BMXRzMndKR0k3NnlSVmdqKzdENmpZekl1VHVPWGdmalZiUXhuQWxDeHJCZVo5eE5rNVh5cEZDVmd0QXRmV1hvSDYrVXE1L0dicTRHVzZCcVk1ZGkiLCJtYWMiOiJhNTNiODdkYmI2MDVmYzgwMTkwZjUxN2FhYjE1Y2U2MDhiM2MwZTQ4NzMzZGJlYjVmMjUxNjZiNjIzMmI0MjkxIiwidGFnIjoiIn0=",
        cookie:
          "XSRF-TOKEN=eyJpdiI6InUxanIreVphQnpOcGJoblg5SSswZFE9PSIsInZhbHVlIjoiUE12MUtTNTFobGhCUEZ2ZnZPd2FyQUcvTlBMNXEyZm5uSVYyVlNiQ2lnV25BMXRzMndKR0k3NnlSVmdqKzdENmpZekl1VHVPWGdmalZiUXhuQWxDeHJCZVo5eE5rNVh5cEZDVmd0QXRmV1hvSDYrVXE1L0dicTRHVzZCcVk1ZGkiLCJtYWMiOiJhNTNiODdkYmI2MDVmYzgwMTkwZjUxN2FhYjE1Y2U2MDhiM2MwZTQ4NzMzZGJlYjVmMjUxNjZiNjIzMmI0MjkxIiwidGFnIjoiIn0%3D; gmailnator_session=eyJpdiI6IkYzUzNtOGpaV3BEMFpINzF6MnVEa0E9PSIsInZhbHVlIjoiTDJ3Q2owQm5VV2ZqUWp5bE1GRlo5STBXL2Q1K2Vvdlc4SXpJN2RSWjlKSDh2S1pYVWpESXMrdG1BVm5xSjlpeVorNlNmd2Yzc3dMNXp6QWdYa3E5dytSYkdBWnl0RVdqdmxsdEprU2gxUXZhaUh3dzNia05TbDBQYytwY1ArL1ciLCJtYWMiOiI3MjMyYmI0OTJkYmIxZjcxN2Y5Mzk1M2VjOTE3ZDc0YTEwMjJlNGY5NDM1ZmE1NWU2YmU2YWQ1MjI1ZTBjMTY1IiwidGFnIjoiIn0%3D",
        Referer: `https://www.emailnator.com/inbox/${email}/${data.messageData[index].messageID}`,
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: `{"email":"${email}","messageID":"${data.messageData[index].messageID}"}`,
      method: "POST",
    })
      .then((response) => response.json())
      .then(async (data) => {
        if (discordRegex.test(data)) {
          var discordLink = data.match(discordRegex)[0];
          await page.goto(discordLink, {
            waitUntil: "networkidle0",
            timeout: 60000,
          });
          try {
            await page.waitForSelector("[src*=sitekey]");
            await page.addScriptTag({
              content: `hcaptcha.execute()`,
            });

            while (true) {
              try {
                await page.solveRecaptchas();
                return true;
              } catch (err) {
                sleep(3000);
              }
            }
          } catch (e) {}

          await page.goto("https://discord.com/app", {
            waitUntil: "networkidle0",
            timeout: 60000,
          });

          const token = await page.evaluate(() => {
            return window.webpackChunkdiscord_app.push([
              [Math.random()],
              {},
              (req) => {
                for (const m of Object.keys(req.c)
                  .map((x) => req.c[x].exports)
                  .filter((x) => x)) {
                  if (m.default && m.default.getToken !== undefined) {
                    return m.default.getToken();
                  }
                  if (m.getToken !== undefined) {
                    return m.getToken();
                  }
                }
              },
            ]);
          });

          fs.appendFileSync("./output/tokens.txt", `${token}\n`, (err) => {});

          console.log(token);

          fetch("https://discord.com/api/v9/users/@me/library", {
            headers: {
              Authorization: token,
            },
          }).then((response) => {
            if (response.status == 200) {
              fs.appendFileSync(
                "./output/unlocked.txt",
                `${token}\n`,
                (err) => {}
              );
              console.log(`${token} - UNLOCKED`);
            } else {
              fs.appendFileSync(
                "./output/locked.txt",
                `${token} -\n`,
                (err) => {}
              );
              console.log(`${token} - LOCKED`);
            }
          });
        }
      });
  } else {
    index++;
    verifyEmail(data, index, email, page);
  }
}
