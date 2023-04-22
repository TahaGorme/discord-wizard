const puppeteer = require("puppeteer-extra");
const { DEFAULT_INTERCEPT_RESOLUTION_PRIORITY } = require("puppeteer");

const fs = require("fs-extra");
const usernames = fs.readFileSync("./input/usernames.txt", "utf-8").split("\n");
const useragents = fs
  .readFileSync("./input/useragents.txt", "utf-8")
  .split("\n");
const config = require("./config.json");
let emails;
let username, email, password, mail;
const { PuppeteerBlocker } = require("@cliqz/adblocker-puppeteer");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");
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
// const AdblockerPlugin = require("puppeteer-extra-plugin-adblocker");
// puppeteer.use(
//   AdblockerPlugin({
//     interceptResolutionPriority: DEFAULT_INTERCEPT_RESOLUTION_PRIORITY,
//   })
// );

puppeteer.use(StealthPlugin());

function wait(timeInMs) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeInMs);
  });
}
new Promise(async (resolve, reject) => {
  puppeteer
    .launch({
      headless: "new",
      defaultViewport: null,
      // args: ["--proxy-server=http://p.webshare.io:80"],
    })
    .then(async (browser) => {
      const page = await browser.newPage();

      PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInPage(page);
      });

      await page.goto("https://www.emailnator.com/bulk-emails");

      await page.waitForSelector(".form-select");

      await page.click(".form-select");

      // Fill "1000" on <select> [name="emailNo"]
      await page.waitForSelector('[name="emailNo"]');

      await page.select('[name="emailNo"]', "1000");

      // Click on <input> #custom-switch-domain
      await page.waitForSelector("#custom-switch-domain");

      await page.click("#custom-switch-domain");

      // Click on <button> "Generate New "
      await page.waitForSelector(
        "#root > div > div.page--bulk--emails.mt-lg-5 > div > div > div.col-lg-6.col-md-10 > div.card > div > button"
      );
      await page.click(
        "#root > div > div.page--bulk--emails.mt-lg-5 > div > div > div.col-lg-6.col-md-10 > div.card > div > button"
      );
      await page.waitForSelector(
        `#root > div > div.page--bulk--emails.mt-lg-5 > div > div > div.col-lg-6.col-md-10 > div.col-12.text-center.mt-2 > div:nth-child(1) > a`
      );
      emails = await page.evaluate(() => {
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const text = document.body.innerText;
        return text.match(emailRegex);
      });
      emails.pop();
      if (config.devMode) console.log(`Fetched ${emails.length} emails.`);

      browser.close();
      resolve();
    });
}).then(async () => {
  puppeteer
    .launch({
      headless: false,
      ignoreHTTPSErrors: true,
      defaultViewport: { width: 1536, height: 864 },
      args: [
        "--disable-web-security",
        "--ignore-certificate-errors",
        `--window-size=1536,864`,

        // "--disable-features=IsolateOrigins,site-per-process",
        "--enable-features=NetworkService",
        // "--proxy-server=http://p.webshare.io:80",
      ],
    })
    .then(async (browser) => {
      const page = await browser.newPage();
      
      // await wait(randomInt(300, 400));

      await page.setUserAgent(
        useragents[Math.floor(Math.random() * useragents.length)].trim()
      );
      await page.goto("https://www.discord.com/", {
        waitUntil: "networkidle0",
        timeout: 70000,
      });
      //open devtools
      // await page.evaluate(() => { debugger; });
      // Resize window to 1536 x 718
      //await page.setViewport({ width: 1536, height: 718 });

      username = usernames[Math.floor(Math.random() * usernames.length)];
      email = emails[Math.floor(Math.random() * emails.length)];
      password = generatePassword();
      if (config.devMode)
        console.log(
          `Generated Username: ${username} Email: ${email} Password: ${password}`
        );

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

      await page.waitForSelector(
        "#app-mount > div > div > div.grid-3d2PVT.heroBackground-itJzsn > div.row-31oovZ.heroContainer-3YphMz > div > div.ctaContainer-5100Xg > button"
      );
      await wait(randomInt(300, 400));
      await page.click(
        "#app-mount > div > div > div.grid-3d2PVT.heroBackground-itJzsn > div.row-31oovZ.heroContainer-3YphMz > div > div.ctaContainer-5100Xg > button"
      );

      await page.focus(
        "#app-mount > div > div > div.grid-3d2PVT.heroBackground-itJzsn > div.row-31oovZ.heroContainer-3YphMz > div > div.formContainer-1Mw7aR > form > input"
      );
      await page.keyboard.type(username, { delay: randomInt(60, 120) });

      await page.click("[class *= 'checkbox']").catch((err) => {
        if (config.devMode) console.log("No TOS checkbox found");
      });

      await wait(randomInt(800, 1200));
      //press enter
      // await page.waitForSelector(
      //   "#app-mount > div > div > div.grid-3d2PVT.heroBackground-itJzsn > div.row-31oovZ.heroContainer-3YphMz > div > div.formContainer-1Mw7aR > form > input"
      // );
      await page
        .focus(
          "#app-mount > div > div > div.grid-3d2PVT.heroBackground-itJzsn > div.row-31oovZ.heroContainer-3YphMz > div > div.formContainer-1Mw7aR > form > input"
        )
        .catch((err) => {});
      await wait(randomInt(200, 400));

      await page.keyboard.press("Enter");

      try {
        await page.waitForSelector("[src*=sitekey]");
        if (config.devMode) console.log("Solving captcha");
        await page.addScriptTag({ content: `hcaptcha.execute()` });
        await page.solveRecaptchas();
        if (config.devMode) console.log("Captcha solved");

        //detecting captcha loop
        await wait(randomInt(2000, 3000));
        const captcha_2 = await page
          .waitForSelector("[src*=sitekey]", { timeout: 5000 })
          .catch(() => {
            captcha_2 = false;
          });

        if (captcha_2) {
          if (config.devMode) console.log("Captcha loop detected");
          if (config.devMode) console.log(`Solving 2nd captcha...`);
          await page.addScriptTag({ content: `hcaptcha.execute()` });
          await page.solveRecaptchas();
          if (config.devMode) console.log("2nd Captcha solved");
          await wait(randomInt(2000, 3000));

          const captcha_3 = await page
            .waitForSelector("[src*=sitekey]", { timeout: 5000 })
            .catch(() => {
              captcha_3 = false;
            });

          if (captcha_3) {
            if (config.devMode) console.log("Captcha loop detected");
            if (config.devMode) console.log(`Solving 3nd captcha...`);
            await page.addScriptTag({ content: `hcaptcha.execute()` });
            await page.solveRecaptchas();
            if (config.devMode) console.log("3nd Captcha solved");
          }
        }
      } catch (e) {}

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

      console.log("Generated Token: " + token);
      fs.appendFileSync("./output/tokens.txt", `${token}\n`, (err) => {});
      fs.appendFile(
        "./output/accounts.txt",
        `${email}:${password}\n`,
        (err) => {
          if (err) throw err;
        }
      );

      fetch("https://discord.com/api/v9/users/@me/library", {
        headers: {
          Authorization: token,
        },
      }).then((response) => {
        if (response.status == 200) {
          fs.appendFileSync("./output/unlocked.txt", `${token}\n`, (err) => {});
          console.log(`${token} - is Unlocked :)`);
        } else {
          fs.appendFileSync("./output/locked.txt", `${token} -\n`, (err) => {});
          console.log(`${token} - is Locked :(`);
        }
      });

      await wait(randomInt(2000, 3000));
      var verify = true;
      await page
        .waitForSelector(
          "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(4) > div > div.flex-2S1XBF.flex-3BkGQD.vertical-3aLnqW.flex-3BkGQD.directionColumn-3pi1nm.justifyStart-2Mwniq.alignCenter-14kD11.noWrap-hBpHBz.verification-2oQUwN > div.flex-2S1XBF.flex-3BkGQD.vertical-3aLnqW.flex-3BkGQD.directionColumn-3pi1nm.justifyCenter-rrurWZ.alignCenter-14kD11.noWrap-hBpHBz.container-1Yj1aL > div.flex-2S1XBF.flex-3BkGQD.vertical-3aLnqW.flex-3BkGQD.directionColumn-3pi1nm.justifyCenter-rrurWZ.alignStretch-Uwowzr.noWrap-hBpHBz > button > div"
        )
        .catch((err) => {
          console.log("No phone verification dialog found");
          verify = false;
        });
      if (!verify) return;
      verify = await page.$eval(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(4) > div > div.flex-2S1XBF.flex-3BkGQD.vertical-3aLnqW.flex-3BkGQD.directionColumn-3pi1nm.justifyStart-2Mwniq.alignCenter-14kD11.noWrap-hBpHBz.verification-2oQUwN > div.flex-2S1XBF.flex-3BkGQD.vertical-3aLnqW.flex-3BkGQD.directionColumn-3pi1nm.justifyCenter-rrurWZ.alignCenter-14kD11.noWrap-hBpHBz.container-1Yj1aL > div.flex-2S1XBF.flex-3BkGQD.vertical-3aLnqW.flex-3BkGQD.directionColumn-3pi1nm.justifyCenter-rrurWZ.alignStretch-Uwowzr.noWrap-hBpHBz > button > div",
        (el) => el.innerHTML,
        { timeout: 5000 }
      );

      if (verify && verify.includes("Verify")) {
        console.log("Phone Verification Required... Quitting");
        process.exit(0);
      }

      await page.waitForSelector("#react-select-2-input", { timeout: 1000 });
      await page.focus("#react-select-2-input");
      await page.keyboard.type(month, { delay: randomInt(80, 120) });
      await page.keyboard.press("Enter");

      await page.waitForSelector("#react-select-3-input", { timeout: 1000 });
      await page.focus("#react-select-3-input");
      await page.keyboard.type(date, { delay: randomInt(80, 120) });
      await page.keyboard.press("Enter");

      await page.waitForSelector("#react-select-4-input", { timeout: 1000 });
      await page.focus("#react-select-4-input");
      await page.keyboard.type(year, { delay: randomInt(80, 120) });
      await page.keyboard.press("Enter");

      await page.waitForSelector(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div.content-rR1mSS.theme-light > div > div > div > div > form > div.footer-3VMrvt > div > button"
      );

      await page.click(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div.content-rR1mSS.theme-light > div > div > div > div > form > div.footer-3VMrvt > div > button"
      );

      await wait(randomInt(2000, 2500));

      await page.waitForSelector(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div.content-rR1mSS.theme-light > button"
      );

      await page.click(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div.content-rR1mSS.theme-light > button"
      );

      await wait(randomInt(1500, 2000));

      await page.waitForSelector(
        "#:r1: > div.text-md-normal-2rFCH3.formBody-3nEn-J"
      );

      await page.waitForSelector(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div > div.content-1OG56Q.thin-RnSY0a.scrollerBase-1Pkza4 > form > div:nth-child(1) > div > input"
      );

      await page.focus(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div > div.content-1OG56Q.thin-RnSY0a.scrollerBase-1Pkza4 > form > div:nth-child(1) > div > input"
      );
      await page.keyboard.type(email, { delay: randomInt(80, 120) });

      await page.waitForSelector(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div > div.content-1OG56Q.thin-RnSY0a.scrollerBase-1Pkza4 > form > div:nth-child(2) > div > input"
      );

      await page.focus(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div > div.content-1OG56Q.thin-RnSY0a.scrollerBase-1Pkza4 > form > div:nth-child(2) > div > input"
      );
      await page.keyboard.type(password, { delay: randomInt(80, 120) });

      await wait(randomInt(500, 1000));

      //hit enter
      await page.keyboard.press("Enter");

      //get innerhtml

      // #react-select-2-input
      // #react-select-3-input
      // #react-select-4-input

      // click button
      // #app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div.content-rR1mSS.theme-light > div > div > div > div > form > div.footer-3VMrvt > div > button

      //click close button
      // #app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div.content-rR1mSS.theme-light > button

      //#\:r1\: > div.text-md-normal-2rFCH3.formBody-3nEn-J

      // Claim your account by entering an email and password.

      // ==================
      //#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div > div.content-1OG56Q.thin-RnSY0a.scrollerBase-1Pkza4 > form > div:nth-child(1) > div > input

      //#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div > div.content-1OG56Q.thin-RnSY0a.scrollerBase-1Pkza4 > form > div:nth-child(2) > div > input

      //close
      //#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(3) > div.layer-fP3xEz > div > div > div > div.content-1OG56Q.successContent-2f_jZT.thin-RnSY0a.scrollerBase-1Pkza4 > button

      // await page.waitForSelector(
      //   "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(4) > div.layer-fP3xEz > div > div > div.container-MI32-l > div.marginBottom20-315RVT > div > input"
      // );

      // await page.focus(
      //   "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(4) > div.layer-fP3xEz > div > div > div.container-MI32-l > div.marginBottom20-315RVT > div > input"
      // );
      // await page.keyboard.type(email, { delay: randomInt(60, 120) });

      // await page.focus(
      //   "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(4) > div.layer-fP3xEz > div > div > div.container-MI32-l > div.marginBottom40-fvAlAV > div > input"
      // );

      // await page.keyboard.type(password, { delay: randomInt(60, 120) });

      // await page.click(
      //   "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div:nth-child(4) > div.layer-fP3xEz > div > div > div.container-MI32-l > button"
      // );

      console.log("Trying to verify email...");
      if (config.devMode) console.log("Fetching emails...");
      const fetchHeaders = await browser.newPage();
      await fetchHeaders.setRequestInterception(true);
      fetchHeaders.on("request", async (request) => {
        if (request.url() === "https://www.emailnator.com/message-list") {
          request.abort();

          fetch("https://www.emailnator.com/message-list", {
            headers: request.headers(),
            body: `{"email":"${email}"}`,
            method: "POST",
          })
            .then((response) => response.json())
            .then((data) => {
              // console.log(data);
              if (data.messageData.length >= 1) {
                // fetchHeaders.close();
                var index = 0;
                if (config.devMode)
                  console.log("Trying to find the right email from discord...");
                verifyEmail(data, index, email, page, request.headers());
              }
            });
        } else {
          request.continue();
        }
      });
      await fetchHeaders.setUserAgent(
        useragents[Math.floor(Math.random() * useragents.length)].trim()
      );
      PuppeteerBlocker.fromPrebuiltAdsAndTracking(fetch).then((blocker) => {
        blocker.enableBlockingInPage(fetchHeaders);
      });

      await fetchHeaders.goto(`https://www.emailnator.com/inbox#${email}`, {
        timeout: 60000,
      });
    });
});

const generatePassword = () => {
  const length = 16;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
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
async function verifyEmail(data, index, email, page, headers) {
  if (
    data?.messageData[index]?.subject?.includes(
      "Verify Email Address for Discord"
    ) &&
    data?.messageData[index]?.from?.includes("noreply@discord.com")
  ) {
    console.log("Found the right email from discord!");
    console.log(data.messageData[index].messageID);

    // await page.setRequestInterception(false);
    await page.setUserAgent(
      useragents[Math.floor(Math.random() * useragents.length)].trim()
    );
    await page.goto(
      `https://www.emailnator.com/inbox/${email}/${data.messageData[index].messageID}`,
      { waitUntil: "networkidle0", timeout: 60000 }
    );
    await page.bringToFront();
    var selector =
      "#root > div > section > div > div > div.mb-3.col-lg-6.col-sm-12 > div > div > div.card > div > div > div:nth-child(10) > div:nth-child(3) > div > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > a";
    await page.waitForSelector(selector, { timeout: 20000 }).catch(() => {
      selector =
        "#root > div > section > div > div > div.mb-3.col-lg-6.col-sm-12 > div > div > div.card > div > div > div:nth-child(13) > div:nth-child(4) > div > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > a";
    });

    var link = await getHrefs(page, selector);

    // console.log(link);
    await page.goto(link[0], {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    try {
      var firstCaptcha = await page
        .waitForSelector("[src*=sitekey]", {
          timeout: 6000,
        })
        .catch(() => {
          firstCaptcha = false;
        });
      if (firstCaptcha) {
        if (config.devMode) console.log("Solving captcha");
        await page.addScriptTag({ content: `hcaptcha.execute()` });
        await page.solveRecaptchas();
        if (config.devMode) console.log("Captcha solved");

        //detecting captcha loop
        const captcha_2 = await page
          .waitForSelector("[src*=sitekey]", { timeout: 5000 })
          .catch(() => {
            captcha_2 = false;
          });

        if (captcha_2) {
          if (config.devMode) console.log("Captcha loop detected");
          if (config.devMode) console.log(`Solving 2nd captcha...`);
          await page.addScriptTag({ content: `hcaptcha.execute()` });
          await page.solveRecaptchas();
          if (config.devMode) console.log("2nd Captcha solved");

          const captcha_3 = await page
            .waitForSelector("[src*=sitekey]", { timeout: 5000 })
            .catch(() => {
              captcha_3 = false;
            });

          if (captcha_3) {
            if (config.devMode) console.log("Captcha loop detected");
            if (config.devMode) console.log(`Solving 3nd captcha...`);
            await page.addScriptTag({ content: `hcaptcha.execute()` });
            await page.solveRecaptchas();
            if (config.devMode) console.log("3nd Captcha solved");
          }
        }
      }
    } catch (e) {}

    await page.goto("https://discord.com/app", {
      waitUntil: "networkidle0",
      timeout: 60000,
    });
    if (config.devMode) console.log("Trying to get token...");

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

    console.log("Rechecking if the token is locked or unlocked...");
    fetch("https://discord.com/api/v9/users/@me/library", {
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      if (response.status == 200) {
        fs.appendFileSync("./output/unlocked.txt", `${token}\n`, (err) => {});
        console.log(`${token} - is Unlocked :)`);
      } else {
        console.log(`${token} - is Locked :(`);
      }
    });
    // await page.click(
    //   "#root > div > section > div > div > div.mb-3.col-lg-6.col-sm-12 > div > div > div.card > div > div > div:nth-child(13) > div:nth-child(4) > div > table > tbody > tr > td > div > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td > a"
    // );
    // fetch("https://www.emailnator.com/message-list", {
    //   headers: headers,
    //   body: `{"email":"${email}","messageID":"${data.messageData[index].messageID}"}`,
    //   method: "POST",
    // })
    //   .then((response) => response.text())
    //   .then(async (data) => {
    //     if (discordRegex.test(data)) {
    //       var discordLink = data.match(discordRegex)[0];
    //       if (config.devMode) console.log(`Discord link: ${discordLink}`);

    //
    //     }
    //   });
  } else {
    if (config.devMode && data?.messageData[index]?.subject)
      console.log(data?.messageData[index]?.subject);
    if (index == 3) {
      index = 0;
      await wait(randomInt(1500, 2500));

      verifyEmail(data, index, email, page, headers);
    } else {
      index++;
      await wait(randomInt(500, 1000));
      verifyEmail(data, index, email, page, headers);
    }
  }
}

async function getHrefs(page, selector) {
  return await page.$$eval(selector, (anchors) =>
    [].map.call(anchors, (a) => a.href)
  );
}
