import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';
import {generateRandomUser} from '../utils/DataGenerator';

test('User can log in with valid credentials', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(generateRandomUser().username, generateRandomUser().password);
    await expect(page).toHaveURL('https://demo-bank.vercel.app/pulpit.html');
});