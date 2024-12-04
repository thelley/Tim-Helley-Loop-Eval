const login = async (page, email, password) => {
    // Navigate to login page
    await page.goto('https://app.asana.com/-/login');
    await page.fill('input[name="e"]', email);
    await page.click('div.ButtonThemeablePresentation--isEnabled.LoginEmailForm-continueButton');
    await page.fill('input[name="p"]', password);
    await page.click('div[role="button"]:has-text("Log in")');
    await page.waitForSelector('text=My Tasks', { timeout: 10000 }); // Adjust selector as needed
  };
  
  module.exports = login;
  