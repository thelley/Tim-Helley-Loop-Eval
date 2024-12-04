require('dotenv').config();

const login = async (page, email, password) => {
  const loginUrl = process.env.BASEURL;

  await page.goto(loginUrl);
  await page.fill('input[name="e"]', email);
  await page.click('div.ButtonThemeablePresentation--isEnabled.LoginEmailForm-continueButton');
  await page.fill('input[name="p"]', password);
  await page.click('div[role="button"]:has-text("Log in")');
  await page.waitForSelector('text=My Tasks');
};

export default login;
