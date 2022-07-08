require('dotenv').config();
const Nightmare = require('nightmare');

const selector = 'table > tbody > tr.table-row';

const getScratch = async () => {
  console.log('Started scratching from web site');
  let nightmare;
  try {
    nightmare = Nightmare({ show: true, waitTimeout: 60 * 1000 });
    const result = await nightmare
      /* connect to the webpage */
      .goto(process.env.AUTH_FORM_PAGE)
      .type('#UserLoginForm_email', process.env.LOGIN_EMAIL)
      .type('#UserLoginForm_password', process.env.LOGIN_PASSWORD)
      .type('#remember', 1)
      .click('button#yw0')
      .wait('ul.index-menu')
      .click('div.content-container > ul > li:nth-child(3) > a')
      .wait('tr.table-row--first')
      
      /* click on correct link */
      .evaluate((selector) => {
        return Array.from(document.querySelectorAll(selector))
          .map(row => row.innerText
            .split('\t')
            .map((cell) => cell
              .replace('\n', '')
              .trim(),
            ));
      }, selector);
    console.log('Extracted values from scratched base...');
    const date = new Date(Date.now());
    const dateString = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    const loadedData = { result, date: dateString };
    localStorage.setItem('scr', JSON.stringify(loadedData));
    console.log('Wrote values to localstorage with key delivery...');
    console.log('Finished scratching...');
    return JSON.parse(localStorage.getItem('scr'));
  } catch (error) {
    console.error('error: ', error);
    throw error;
  } finally {
    await nightmare.end();
  }
};

module.exports = {
  getScratch,
};
